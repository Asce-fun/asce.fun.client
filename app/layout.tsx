import type { Metadata } from "next";
import { Inter, Source_Code_Pro, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Web3Provider from "./providers/web3-provider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const sourceCodePro = Source_Code_Pro({ 
  subsets: ["latin"],
  variable: '--font-source-code-pro',
});

const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
});
const isProd = process.env.NEXT_PUBLIC_WORK_ENVIRONMENT === "production";

export const metadata: Metadata = {
  title: "asce.fun | Precision Prediction Markets",
  description: "Trade player performance. Payouts scale with your accuracy, not just the result. Get paid for precision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${sourceCodePro.variable} ${instrumentSerif.variable} font-sans antialiased selection:bg-orange-500/20 selection:text-orange-500`}
      >
      <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}