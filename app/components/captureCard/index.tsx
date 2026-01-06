"use client";

import { useState } from "react";

export default function LeadCaptureCard() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  setLoading(true);
  setError(null);
  setSuccess(false);

  const form = e.currentTarget; // ✅ capture BEFORE await
  const formData = new FormData(form);

  const payload = {
    username: String(formData.get("username") || ""),
    email: String(formData.get("email") || ""),
    phonenumber: String(formData.get("phonenumber") || ""),
    website: String(formData.get("website") || ""),
  };

  try {
    const res = await fetch("/api/analyst", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Request failed");
    }

    setSuccess(true);
    setError(null);

    // ✅ SAFE RESET
    form.reset();
  } catch (err: any) {
    console.error("Submit error:", err);
    setError(err.message || "Something went wrong. Try again.");
    setSuccess(false);
  } finally {
    setLoading(false);
  }
}




  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br border p-6 md:p-8 hover:border-orange-500/30 transition-all duration-300 md:col-span-2 flex flex-col justify-center items-center text-center from-neutral-900 to-neutral-950 border-neutral-800">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>

      <div className="relative z-10 w-full max-w-lg">
        <h2 className="font-mono text-2xl font-semibold mb-2 tracking-tight text-white">
          For Analysts, Not Gamblers
        </h2>

        <p className="text-sm mb-6 text-neutral-400">
          Built for fantasy sports enthusiasts, data nerds, and anyone tired of
          binary outcomes.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          {/* Username + Email */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
              <input
                name="username"
                type="text"
                placeholder="Enter Full Name"
                required
                className="w-full pl-4 pr-4 py-3 bg-neutral-950 border border-neutral-700 rounded-lg text-sm text-white placeholder-neutral-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 font-mono transition-all"
              />
            </div>

            <input
              name="email"
              type="email"
              placeholder="Enter email"
              required
              className="flex-[1.5] border text-sm rounded-lg px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-all font-mono placeholder:text-neutral-700 bg-neutral-950 border-neutral-700 text-neutral-200"
            />
          </div>

          {/* Phone */}
          <input
            name="phonenumber"
            type="tel"
            placeholder="Enter Phone Number"
            className="border text-sm rounded-lg px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-all font-mono placeholder:text-neutral-700 bg-neutral-950 border-neutral-700 text-neutral-200"
          />

          {/* Website */}
          <input
            name="website"
            type="url"
            placeholder="your_website (optional)"
            className="border text-sm rounded-lg px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-all font-mono placeholder:text-neutral-700 bg-neutral-950 border-neutral-700 text-neutral-200"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-orange-600 hover:bg-orange-500 disabled:opacity-60 text-white font-semibold py-3 rounded-lg text-sm tracking-tight transition-all"
          >
            {loading ? "SUBMITTING..." : "CLAIM HANDLE"}
          </button>
        </form>

        {success && (
          <p className="mt-3 text-xs font-mono text-green-400">
            ✔ Successfully submitted. You’re on the list.
          </p>
        )}

        {error && (
          <p className="mt-3 text-xs font-mono text-red-400">{error}</p>
        )}

        <p className="mt-4 text-[10px] font-mono text-neutral-600">
          LIMITED SPOTS FOR BETA ACCESS • LAUNCHING Q1 2025
        </p>
      </div>
    </div>
  );
}
