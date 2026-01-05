"use client"
import { useEffect, useState } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export default function Home() {
    const { setShowAuthFlow, primaryWallet, handleLogOut } = useDynamicContext();
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const clearPreviousSession = async () => {
      localStorage.removeItem("lastWalletAddress");
      localStorage.removeItem("dynamic-env-1-auth");
      localStorage.removeItem("dynamic-env-1-connector-choice");

      sessionStorage.removeItem("dynamic-env-1-auth");

      if (handleLogOut) {
        try {
          await handleLogOut();
        } catch (error) {
          console.log("No active session to log out");
        }
      }
    };

    clearPreviousSession();
  }, [handleLogOut]);

  const handleClaim = async () => {
    try {
      if (handleLogOut) {
        await handleLogOut();
      }

      localStorage.removeItem("lastWalletAddress");
      localStorage.removeItem("dynamic-env-1-auth");
      localStorage.removeItem("dynamic-env-1-connector-choice");
      sessionStorage.removeItem("dynamic-env-1-auth");

      document.cookie.split(";").forEach((cookie) => {
        const [name] = cookie.trim().split("=");
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      setAuthError(null);

      setShowAuthFlow(true);

      setTimeout(() => {
        if (!primaryWallet?.address) {
          setAuthError("Authentication failed. Please try again.");
        }
      }, 30000); // 30 second timeout
    } catch (error) {
      console.error("Error during claim process:", error);
      setAuthError("An error occurred. Please try again.");
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-400 overflow-x-hidden">
      {/* Navbar */}
      <nav className="w-full border-b backdrop-blur-md sticky top-0 z-50 border-neutral-800 bg-neutral-950/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <span className="font-serif italic text-3xl text-white tracking-wide hover:text-orange-500 transition-colors duration-300">
              asce.fun
            </span>
          </a>
        </div>
      </nav>

      <main className="flex-grow w-full relative">
        {/* Hero Section with Interactive Floating Cards */}
        <section className="hero-section min-h-[90vh] flex flex-col overflow-hidden w-full pt-24 pr-4 pb-24 pl-4 relative items-center justify-center">
          {/* Background Radial */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/30 via-neutral-950 to-neutral-950 pointer-events-none"></div>

          {/* Floating Cards */}
          {/* Card 1: E. Haaland (Top Left) */}
          <div className="absolute top-[8%] left-[2%] lg:left-[5%] hidden md:block animate-float cursor-pointer">
            <div className="floater glass-card-bg w-64 border-neutral-800 border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10">
                  <img
                    src="https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=100&h=100&fit=crop&q=80"
                    className="w-10 h-10 rounded-full object-cover border border-neutral-700"
                    alt="Haaland"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-neutral-950 rounded-full p-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">E. Haaland</div>
                  <div className="text-[10px] text-neutral-500 font-mono">MCI vs ARS</div>
                </div>
              </div>
              <div className="flex justify-between items-end mb-3 pb-3 border-b border-neutral-800">
                <div>
                  <div className="text-[10px] text-neutral-500 font-mono mb-1">GOALS &gt; 1.5</div>
                  <div className="text-xs text-green-400 font-mono">+12.4%</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-neutral-500 font-mono mb-1">PRICE</div>
                  <div className="text-lg font-mono font-medium text-white">$0.45</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-green-500/10 text-green-500 border border-green-500/20 text-[10px] py-1.5 rounded font-mono font-medium">
                  LONG
                </button>
                <button className="bg-neutral-800 text-neutral-400 border border-neutral-700 text-[10px] py-1.5 rounded font-mono font-medium">
                  SHORT
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: K. Mbappé (Top Right) */}
          <div className="absolute top-[10%] right-[2%] lg:right-[5%] hidden md:block animate-float-delayed cursor-pointer">
            <div className="floater glass-card-bg w-64 rounded-xl p-6 border border-neutral-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10">
                  <img
                    src="https://images.unsplash.com/photo-1511886929837-354d827aae26?w=100&h=100&fit=crop&q=80"
                    className="w-10 h-10 rounded-full object-cover border border-neutral-700"
                    alt="Mbappe"
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">K. Mbappé</div>
                  <div className="text-[10px] text-neutral-500 font-mono">RMA vs BAR</div>
                </div>
              </div>
              <div className="flex justify-between items-end mb-3 pb-3 border-b border-neutral-800">
                <div>
                  <div className="text-[10px] text-neutral-500 font-mono mb-1">SOT &gt; 2.5</div>
                  <div className="text-xs text-red-400 font-mono">-4.2%</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-neutral-500 font-mono mb-1">PRICE</div>
                  <div className="text-lg font-mono font-medium text-white">$0.62</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] py-1.5 rounded font-mono font-medium">
                  LONG
                </button>
                <button className="bg-neutral-800 text-neutral-400 border border-neutral-700 text-[10px] py-1.5 rounded font-mono font-medium">
                  SHORT
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Shohei Ohtani (Top Center-Right) */}
          <div className="absolute top-[5%] left-[60%] lg:left-[55%] hidden xl:block animate-float-reverse cursor-pointer">
            <div className="floater glass-card-bg w-60 rounded-xl p-5 border border-neutral-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10">
                  <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700"></div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">S. Ohtani</div>
                  <div className="text-[10px] text-neutral-500 font-mono">LAD vs NYY</div>
                </div>
              </div>
              <div className="flex justify-between items-center bg-neutral-900 rounded p-2 border border-neutral-800">
                <span className="text-[10px] text-neutral-500 font-mono">HR &gt; 0.5</span>
                <span className="text-sm font-mono font-medium text-orange-400">32.1%</span>
              </div>
            </div>
          </div>

          {/* Card 4: Patrick Mahomes (Bottom Center-Left) */}
          <div className="absolute bottom-[20%] left-[25%] lg:left-[35%] hidden xl:block animate-float-slow cursor-pointer">
            <div className="floater glass-card-bg w-60 rounded-xl p-6 border border-neutral-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10">
                  <img
                    src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg"
                    className="w-10 h-10 rounded-full object-cover border border-neutral-700"
                    alt="Mahomes"
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">P. Mahomes</div>
                  <div className="text-[10px] text-neutral-500 font-mono">KC vs LV</div>
                </div>
              </div>
              <div className="flex justify-between items-end mb-3 pb-3 border-b border-neutral-800">
                <div>
                  <div className="text-[10px] text-neutral-500 font-mono mb-1">YDS &gt; 280.5</div>
                  <div className="text-xs text-green-400 font-mono">+8.1%</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-neutral-500 font-mono mb-1">PRICE</div>
                  <div className="text-lg font-mono font-medium text-white">$0.58</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-green-500/10 text-green-500 border border-green-500/20 text-[10px] py-1.5 rounded font-mono font-medium">
                  LONG
                </button>
                <button className="bg-neutral-800 text-neutral-400 border border-neutral-700 text-[10px] py-1.5 rounded font-mono font-medium">
                  SHORT
                </button>
              </div>
            </div>
          </div>

          {/* Card 5: LeBron James (Bottom Left) */}
          <div className="absolute bottom-[12%] left-[3%] xl:left-[8%] hidden lg:block animate-float-slow cursor-pointer">
            <div className="floater glass-card-bg w-60 rounded-xl p-5 border border-neutral-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10">
                  <img
                    src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg"
                    className="w-10 h-10 rounded-full object-cover border border-neutral-700"
                    alt="LeBron"
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">LeBron James</div>
                  <div className="text-[10px] text-neutral-500 font-mono">PTS &gt; 25.5</div>
                </div>
              </div>
              <div className="flex justify-between items-center bg-neutral-900 rounded p-2 border border-neutral-800">
                <span className="text-[10px] text-neutral-500 font-mono">IMPLIED PROB</span>
                <span className="text-sm font-mono font-medium text-orange-400">58.4%</span>
              </div>
            </div>
          </div>

          {/* Card 6: Ronaldo (Middle Left Edge) */}
          <div className="absolute top-[45%] left-[-2%] lg:left-[1%] hidden 2xl:block animate-float-fast cursor-pointer">
            <div className="floater glass-card-bg w-56 rounded-xl p-5 border border-neutral-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-9 h-9">
                  <img
                    src="https://images.unsplash.com/photo-1570498839593-e565b39455fc?w=100&h=100&fit=crop&q=80"
                    className="w-9 h-9 rounded-full object-cover border border-neutral-700"
                    alt="Ronaldo"
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">C. Ronaldo</div>
                  <div className="text-[10px] text-neutral-500 font-mono">Gls &gt; 0.5</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-[10px] text-neutral-500 font-mono">Last 5: 3G</div>
                <div className="text-xs text-green-400 font-mono">+1.2%</div>
              </div>
            </div>
          </div>

          {/* Card 7: Max Verstappen (Bottom Right) */}
          <div className="absolute bottom-[15%] right-[3%] xl:right-[8%] hidden lg:block animate-float-fast cursor-pointer">
            <div className="floater glass-card-bg w-60 rounded-xl p-5 border border-neutral-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10">
                  <img
                    src="https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&q=80"
                    className="w-10 h-10 rounded-full object-cover border border-neutral-700"
                    alt="Verstappen"
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Verstappen</div>
                  <div className="text-[10px] text-neutral-500 font-mono">Pos &lt; 1.5</div>
                </div>
              </div>
              <div className="flex justify-between items-center bg-neutral-900 rounded p-2 border border-neutral-800">
                <span className="text-[10px] text-neutral-500 font-mono">IMPLIED PROB</span>
                <span className="text-sm font-mono font-medium text-red-400">88.1%</span>
              </div>
            </div>
          </div>

          {/* Central Content */}
          <div className="hero-content relative z-30 text-center max-w-4xl mx-auto pointer-events-none px-4">
            <div className="pointer-events-auto">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight font-sans mb-6 leading-[1.1]">
                Precision prediction markets{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                  where accuracy meets reward.
                </span>
              </h1>

              <p className="text-base md:text-lg text-neutral-400 mx-auto mb-12 leading-relaxed font-normal">
                Go LONG. Go SHORT. Get paid for being right. Unlike binary markets, ASCE rewards you proportionally based on how accurate your player performance predictions are.
              </p>

              {/* Primary Dual Input Form */}
              <div className=" mx-auto">
                  <button
                    onClick={handleClaim}
                    className="w-full cursor-pointer bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 rounded-lg text-sm tracking-tight transition-all shadow-[0_0_20px_-5px_rgba(234,88,12,0.5)] hover:shadow-[0_0_25px_-5px_rgba(234,88,12,0.6)]"
                  >
                    Claim Username
                  </button>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Layout Container */}
        <div className="w-full max-w-7xl mx-auto px-6 pb-20 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-min">
            {/* ROW 1 */}
            {/* 1/3: The Problem */}
            <div className="group relative overflow-hidden rounded-xl border p-6 md:p-8 transition-all duration-300 md:col-span-1 flex flex-col justify-between bg-neutral-900/40 border-neutral-800 hover:border-neutral-700">
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  className="text-neutral-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="4" height="6" x="14" y="14" rx="2"></rect>
                  <rect width="4" height="6" x="6" y="4" rx="2"></rect>
                  <path d="M6 20h4m4-10h4M6 14h2v6m6-16h2v6"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-mono text-lg font-semibold mb-2 tracking-tight text-white">Binary is Broken</h3>
                <p className="text-sm leading-relaxed text-neutral-400">
                  Current markets are YES or NO. If you predict 2 goals and Messi scores 3, you lose to someone who predicted 10. That&apos;s luck, not skill.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-neutral-800">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-2">
                  <span>BINARY PAYOUT</span>
                  <span className="text-red-500">0% or 100%</span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden bg-neutral-800">
                  <div className="w-1/2 h-full bg-neutral-600"></div>
                </div>
              </div>
            </div>

            {/* 2/3: The Solution / UI Demo */}
            <div className="group relative overflow-hidden rounded-xl border p-6 md:p-8 transition-all duration-300 md:col-span-2 bg-neutral-900/40 border-neutral-800 hover:border-neutral-700">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="font-mono text-xl font-semibold mb-2 tracking-tight text-white">Your Edge, Quantified</h3>
                  <p className="text-sm max-w-lg text-neutral-400">
                    We set BUY and SELL prices. You take a position. Payouts scale based on the delta between your entry and the actual performance.
                  </p>
                </div>

                {/* Fake UI Component */}
                <div className="mt-auto border rounded-lg p-4 shadow-sm relative overflow-hidden bg-neutral-950 border-neutral-800">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4 border-b pb-4 border-neutral-800">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c543a9e1-f226-4ced-80b0-feb8445a75b9_1600w.jpg"
                        className="w-10 h-10 rounded-full object-cover border border-neutral-700"
                        alt="Avatar"
                      />
                      <div>
                        <div className="text-sm font-semibold text-white">Lionel Messi</div>
                        <div className="text-xs text-neutral-500">Goals Scored • Next Match</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded border text-[10px] font-mono text-green-500 flex items-center gap-1 bg-neutral-900 border-neutral-800">
                        <span className="w-1 h-1 rounded-full bg-green-500"></span> LIVE
                      </span>
                    </div>
                  </div>

                  {/* Trading Action */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* SELL */}
                    <div className="group/btn relative cursor-pointer border rounded p-3 transition-all border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 hover:border-neutral-600">
                      <div className="text-xs text-neutral-500 font-mono mb-1">SHORT (Under)</div>
                      <div className="flex items-end justify-between">
                        <span className="text-xl font-mono font-medium text-white">0.5</span>
                        <span className="text-xs text-neutral-500 mb-1">Sell Price</span>
                      </div>
                      <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                    {/* BUY */}
                    <div className="group/btn relative cursor-pointer border hover:border-orange-500/50 rounded p-3 transition-all border-orange-900/30 bg-orange-900/10 hover:bg-orange-900/20">
                      <div className="text-xs font-mono mb-1 text-orange-400">LONG (Over)</div>
                      <div className="flex items-end justify-between">
                        <span className="text-xl font-mono font-medium text-white">1.5</span>
                        <span className="text-xs mb-1 text-orange-400/70">Buy Price</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-neutral-600">
                    <span>ORACLE: CHAINLINK SPORTS</span>
                    <span>SETTLEMENT: T+1H</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 2 */}
            {/* 2/3: Comparison / Proportional Logic */}
            <div className="group relative overflow-hidden rounded-xl border p-6 md:p-8 transition-all duration-300 md:col-span-2 bg-neutral-900/40 border-neutral-800 hover:border-neutral-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                <div>
                  <div className="flex items-center gap-2 mb-3 text-orange-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M14 15H9v-5m7-7h5v5m0-5L9 15"></path>
                    </svg>
                    <span className="text-xs font-mono uppercase tracking-wider">Proportional Payouts</span>
                  </div>
                  <h3 className="font-mono text-xl font-semibold mb-4 tracking-tight text-white">
                    Closer prediction = Higher profit
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-400">
                    If you predict 5 goals and he scores 5, you maximize returns. If he scores 4, you still profit, just less. We smoothed the curve. Expert knowledge isn&apos;t binary.
                  </p>
                  <ul className="mt-6 space-y-2">
                    <li className="flex items-start gap-2 text-sm text-neutral-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        className="text-orange-500 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                      Reward scales with delta accuracy
                    </li>
                    <li className="flex items-start gap-2 text-sm text-neutral-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        className="text-orange-500 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                      Monetize deep player knowledge
                    </li>
                  </ul>
                </div>
                <div className="h-40 md:h-full w-full rounded border relative flex items-end px-4 pb-4 overflow-hidden bg-neutral-950 border-neutral-800">
                  {/* Abstract Graph */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <div className="w-full h-[1px] bg-neutral-500"></div>
                    <div className="h-full w-[1px] bg-neutral-500 absolute"></div>
                  </div>
                  <svg className="w-full h-24 overflow-visible" preserveAspectRatio="none">
                    {/* Binary Step */}
                    <path d="M0,80 L40,80 L40,20 L100,20" fill="none" stroke="#525252" strokeWidth="2" strokeDasharray="4 4"></path>
                    {/* Linear ASCE */}
                    <path d="M0,80 Q50,70 100,10" fill="none" stroke="#f97316" strokeWidth="2"></path>
                    {/* Points */}
                    <circle cx="100%" cy="10" r="3" fill="#f97316"></circle>
                  </svg>
                  <div className="absolute top-4 right-4 text-[10px] font-mono text-orange-500">ASCE Model</div>
                  <div className="absolute bottom-4 left-4 text-[10px] font-mono text-neutral-600">Binary Model</div>
                </div>
              </div>
            </div>

            {/* 1/3: Short Selling */}
            <div className="group relative overflow-hidden rounded-xl border p-6 md:p-8 transition-all duration-300 md:col-span-1 bg-neutral-900/40 border-neutral-800 hover:border-neutral-700">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="w-10 h-10 rounded flex items-center justify-center text-orange-500 mb-4 bg-neutral-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 17h6v-6"></path>
                      <path d="m22 17l-8.5-8.5l-5 5L2 7"></path>
                    </svg>
                  </div>
                  <h3 className="font-mono text-lg font-semibold mb-2 tracking-tight text-white">Short the Hype</h3>
                  <p className="text-sm text-neutral-400">
                    Think a player is overrated? Or facing a tough defense? We are the only platform allowing you to short player performance directly.
                  </p>
                </div>
                <div className="mt-6 p-3 rounded border bg-neutral-950 border-neutral-800">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-neutral-500 font-mono">Haaland (Goals)</span>
                    <span className="text-xs font-mono text-red-400">-12%</span>
                  </div>
                  <div className="w-full h-1 rounded overflow-hidden bg-neutral-900">
                    <div className="w-3/4 h-full bg-red-500/50"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 3 */}
            {/* 1/3: Tech & Trust */}
            <div className="group relative overflow-hidden rounded-xl border p-6 md:p-8 transition-all duration-300 md:col-span-1 bg-neutral-900/40 border-neutral-800 hover:border-neutral-700">
              <div className="absolute -right-4 -top-4 opacity-50 rotate-12 text-neutral-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="120"
                  height="120"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2"></path>
                  <rect width="8" height="8" x="14" y="2" rx="1"></rect>
                </svg>
              </div>
              <div className="relative z-10">
                <h3 className="font-mono text-lg font-semibold mb-4 tracking-tight text-white">Trustless Settlement</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="min-w-[20px] mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        className="text-neutral-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">Oracle Verified</h4>
                      <p className="text-xs text-neutral-500 mt-1">Real-world data delivered on-chain instantly after match end.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="min-w-[20px] mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        className="text-neutral-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
                        <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">Instant Payouts</h4>
                      <p className="text-xs text-neutral-500 mt-1">Smart contracts settle positions automatically. No middlemen.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2/3: Handle Claim / CTA */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br border p-6 md:p-8 hover:border-orange-500/30 transition-all duration-300 md:col-span-2 flex flex-col justify-center items-center text-center from-neutral-900 to-neutral-950 border-neutral-800">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>

              <div className="relative z-10 w-full max-w-lg">
                <h2 className="font-mono text-2xl font-semibold mb-2 tracking-tight text-white">For Analysts, Not Gamblers</h2>
                <p className="text-sm mb-6 text-neutral-400">
                  Built for fantasy sports enthusiasts, data nerds, and anyone tired of binary outcomes.
                </p>

                <form className="flex flex-col gap-3 w-full">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-neutral-500 text-sm font-mono">@</span>
                      </div>
                      <input
                        type="text"
                        placeholder="username"
                        className="w-full pl-8 pr-4 py-3 bg-neutral-950 border border-neutral-700 rounded-lg text-sm text-white placeholder-neutral-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 font-mono transition-all"
                        required
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="enter_your_email"
                      className="flex-[1.5] border text-sm rounded-lg px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-all font-mono placeholder:text-neutral-700 bg-neutral-950 border-neutral-700 text-neutral-200"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 rounded-lg text-sm tracking-tight transition-all"
                  >
                    CLAIM HANDLE
                  </button>
                </form>
                <p className="mt-4 text-[10px] font-mono text-neutral-600">LIMITED SPOTS FOR BETA ACCESS • LAUNCHING Q3 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t pt-8 pb-12 border-neutral-900 bg-neutral-950 relative z-20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="font-serif italic text-lg text-neutral-300">asce.fun</span>
              <span className="text-xs font-mono text-neutral-600">©️ 2024</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-neutral-500 hover:text-orange-500 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6c2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4c-.9-4.2 4-6.6 7-3.8c1.1 0 3-1.2 3-1.2"></path>
                </svg>
              </a>
              <a href="#" className="text-neutral-500 hover:text-orange-500 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </a>
              <a href="#" className="text-neutral-500 hover:text-orange-500 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5c.08-1.25-.27-2.48-1-3.5c.28-1.15.28-2.35 0-3.5c0 0-1 0-3 1.5c-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5c-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}