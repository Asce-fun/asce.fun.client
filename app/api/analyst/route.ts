import { google } from "googleapis";
import { NextResponse } from "next/server";

function getSheetsClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID_USER_FEEDBACK;

  if (!email || !key || !spreadsheetId) {
    throw new Error("Missing Google Sheets env vars");
  }

  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return {
    sheets: google.sheets({ version: "v4", auth }),
    spreadsheetId,
  };
}

async function ensureSheetTab(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  tabName: string
) {
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const exists = meta.data.sheets?.some(
    s => s.properties?.title === tabName
  );

  if (exists) return;

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          addSheet: {
            properties: {
              title: tabName,
              gridProperties: { rowCount: 1000, columnCount: 5 },
            },
          },
        },
      ],
    },
  });

  // headers
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `'${tabName}'!A1:E1`,
    valueInputOption: "RAW",
    requestBody: {
      values: [[
        "timestamp",
        "username",
        "email",
        "phonenumber",
        "website",
      ]],
    },
  });
}

export async function POST(req: Request) {
  try {
    const {
      username,
      email,
      phonenumber,
      website,
    } = await req.json();

    const { sheets, spreadsheetId } = getSheetsClient();
    const tabName = (process.env.GOOGLE_SHEETS_TAB || "Leads").trim();

    await ensureSheetTab(sheets, spreadsheetId, tabName);

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `'${tabName}'!A:E`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [[
          new Date().toISOString(),
          username,
          email,
          phonenumber,
          website,
        ]],
      },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err: any) {
    console.error("Leads POST error:", err);

    return NextResponse.json(
      { ok: false, error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
