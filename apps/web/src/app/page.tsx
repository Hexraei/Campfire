"use client";

import { useState } from "react";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";

export default function Home() {
  const [voted, setVoted] = useState<string | null>(null);
  const [categories, setCategories] = useState([
    { id: "laptops", name: "Laptops & Notebooks", votes: 4821 },
    { id: "smartphones", name: "Smartphones & Mobile Devices", votes: 3912 },
    { id: "audio", name: "Headphones & Audio Gear", votes: 2489 },
    { id: "keyboards", name: "Mechanical Keyboards", votes: 1823 },
  ]);

  const handleVote = (id: string) => {
    if (voted) return;
    setVoted(id);
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, votes: c.votes + 1 } : c))
    );
  };

  const scrollToRegistry = () => {
    const el = document.getElementById("registry-signup");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf8f6] text-stone-900 font-sans antialiased selection:bg-orange-500/10 selection:text-orange-950 relative overflow-x-hidden w-full max-w-full">
      {/* Background warm neutral glowing accents */}
      <div className="absolute top-0 left-0 w-[65%] h-[35%] bg-gradient-to-br from-orange-100/20 via-stone-100/5 to-transparent blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[45%] h-[45%] bg-gradient-to-tl from-stone-150/15 via-stone-100/5 to-transparent blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-5 md:px-6 flex-1 flex flex-col relative z-10">
        
        {/* Minimal Header */}
        <header className="h-16 md:h-20 flex items-center justify-between border-b border-stone-200/60">
          <div className="flex items-center gap-2 md:gap-3">
            {/* Elegant Vector Flame Icon */}
            <svg
              className="w-4 h-4 md:w-5 md:h-5 text-orange-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
              />
            </svg>
            <span className="text-base md:text-lg font-serif font-bold tracking-tight text-stone-850">
              Campfire
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer px-2 py-1">
                  Sign In
                </button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <div className="flex items-center gap-2 md:gap-4">
                <span className="text-[9px] md:text-xs text-stone-500 font-semibold bg-stone-100 border border-stone-200 px-2 py-0.5 md:px-3 md:py-1 rounded-full">
                  Founding Member
                </span>
                <UserButton />
              </div>
            </Show>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 py-10 md:py-20 flex flex-col gap-14 md:gap-20">
          <section className="flex flex-col gap-5 text-left max-w-3xl">
            {/* Refined intro indicator */}
            <div className="text-[10px] md:text-xs font-mono font-bold tracking-wider text-orange-850/80 uppercase">
              First-hand experiences from verified owners
            </div>

            {/* Core Narrative Headline */}
            <h1 className="text-3xl md:text-6xl font-serif font-extrabold tracking-tight leading-[1.1] text-stone-900 text-wrap-balance">
              The internet broke word-of-mouth.
            </h1>
            
            <p className="text-base md:text-xl text-stone-600 leading-relaxed font-serif text-wrap-pretty">
              Fake reviews, search engine ads, and affiliate commission kickbacks have made finding honest product feedback impossible. Campfire connects you directly with verified owners who actually use the products you want to buy.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-1.5">
              <Show when="signed-out">
                <button
                  onClick={scrollToRegistry}
                  className="w-full sm:w-auto text-center text-sm font-bold text-white bg-stone-900 hover:bg-stone-850 transition-colors rounded-full px-6 py-3.5 shadow-md active:scale-97 cursor-pointer"
                >
                  Join the Founding Registry
                </button>
              </Show>
              <Show when="signed-in">
                <button
                  onClick={scrollToRegistry}
                  className="w-full sm:w-auto text-center text-sm font-bold text-stone-900 bg-white border border-stone-200 hover:bg-stone-50 transition-colors rounded-full px-6 py-3.5 shadow-sm active:scale-97 cursor-pointer"
                >
                  View Your Registry Node
                </button>
              </Show>
            </div>
          </section>

          {/* Core Narrative / Friction Step with Connected Layout */}
          <section className="p-6 md:p-8 rounded-3xl border border-stone-200/80 bg-white/70 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:border-stone-300/80 transition-all duration-350 flex flex-col gap-6 md:gap-8">
            <h2 className="text-xl font-serif font-bold text-stone-850">The Modern Purchase Loop</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 relative before:hidden sm:before:block before:absolute before:top-2.5 before:left-[10%] before:right-[10%] before:h-[1px] before:bg-gradient-to-r before:from-stone-200 before:via-stone-300 before:to-orange-200 z-0">
              <div className="flex flex-col gap-2 relative z-10 bg-white/40 md:bg-transparent rounded-2xl p-5 md:p-0 border border-stone-200/40 md:border-transparent">
                <div className="text-xs font-mono font-bold text-stone-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full border border-stone-300 bg-white flex items-center justify-center text-[10px] text-stone-500 font-bold shadow-sm">1</span>
                  <span>STEP 01</span>
                </div>
                <div className="font-serif font-bold text-sm text-stone-850 mt-2">The Research Hunt</div>
                <p className="text-xs text-stone-500 leading-relaxed">
                  You spend hours scrolling community threads trying to isolate real opinions from promotional bots.
                </p>
              </div>

              <div className="flex flex-col gap-2 relative z-10 bg-white/40 md:bg-transparent rounded-2xl p-5 md:p-0 border border-stone-200/40 md:border-transparent">
                <div className="text-xs font-mono font-bold text-stone-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full border border-stone-300 bg-white flex items-center justify-center text-[10px] text-stone-500 font-bold shadow-sm">2</span>
                  <span>STEP 02</span>
                </div>
                <div className="font-serif font-bold text-sm text-stone-850 mt-2">The Affiliate Gimmick</div>
                <p className="text-xs text-stone-500 leading-relaxed">
                  You browse directories that promise honest comparisons but only link to products with active commission payouts.
                </p>
              </div>

              <div className="flex flex-col gap-2 relative z-10 bg-white/40 md:bg-transparent rounded-2xl p-5 md:p-0 border border-stone-200/40 md:border-transparent">
                <div className="text-xs font-mono font-bold text-stone-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full border border-stone-300 bg-white flex items-center justify-center text-[10px] text-stone-500 font-bold shadow-sm">3</span>
                  <span>STEP 03</span>
                </div>
                <div className="font-serif font-bold text-sm text-stone-850 mt-2">The Review Video</div>
                <p className="text-xs text-stone-500 leading-relaxed">
                  You watch breakdowns where reviewers highlight positive aspects because their equipment was supplied by the manufacturer.
                </p>
              </div>

              <div className="flex flex-col gap-2 relative z-10 bg-[#fefaf6] border border-orange-200/60 rounded-2xl p-5 shadow-sm md:shadow-sm">
                <div className="text-xs font-mono font-bold text-orange-700 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full border border-orange-300 bg-white flex items-center justify-center text-[10px] text-orange-750 font-bold shadow-sm">4</span>
                  <span>STEP 04</span>
                </div>
                <div className="font-serif font-bold text-sm text-stone-850 mt-2">The Realization</div>
                <p className="text-xs text-stone-500 leading-relaxed font-medium text-orange-900">
                  You buy the product. It degrades within months. No public rating warned you because reviews rarely look back.
                </p>
              </div>
            </div>
          </section>

          {/* New Section: Interactive Visual Timeline & Verified Q&A Previews */}
          <section className="flex flex-col gap-4 py-2 md:py-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              
              {/* Visual Timeline Preview Card (Redesigned for authenticity/attractiveness) */}
              <div className="p-6 rounded-3xl border border-stone-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:border-stone-300/90 transition-all duration-300 flex flex-col justify-between gap-6 relative overflow-hidden">
                
                {/* Corner Log ID Badge */}
                <div className="absolute top-4 right-4 pointer-events-none">
                  <div className="bg-stone-50 border border-stone-200/60 px-2.5 py-1 rounded-md shadow-sm">
                    <span className="text-[9px] font-mono font-bold text-stone-450 tracking-wider">
                      LOG #832
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono font-bold text-orange-850 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    TIMELINE PREVIEW
                  </span>
                </div>
                
                <div>
                  <h3 className="font-serif font-bold text-stone-850 text-lg mt-1">Laptop Ownership Story</h3>
                  <p className="text-xs text-stone-500 mt-1">Authentic timeline updates logged directly by a verified owner.</p>
                </div>

                <div className="flex flex-col gap-6 border-l border-stone-200/80 pl-5 ml-2.5 mt-2">
                  <div className="relative">
                    <div className="absolute top-1.5 left-[-25px] w-2.5 h-2.5 rounded-full bg-stone-300 border-2 border-white shadow-sm" />
                    <div className="flex items-center justify-between text-xs font-mono font-semibold text-stone-400">
                      <span>Day 1</span>
                      <span className="text-[10px] text-emerald-600 font-medium font-sans">Battery: 100% Health</span>
                    </div>
                    <div className="text-xs text-stone-850 font-medium mt-1 leading-relaxed">
                      "Out of the box. Keyboard feels tactile, display is vibrant. Battery hits ~9 hours."
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute top-1.5 left-[-25px] w-2.5 h-2.5 rounded-full bg-stone-300 border-2 border-white shadow-sm" />
                    <div className="flex items-center justify-between text-xs font-mono font-semibold text-stone-400">
                      <span>Month 6</span>
                      <span className="text-[10px] text-amber-600 font-medium font-sans">Battery: 92% Health</span>
                    </div>
                    <div className="text-xs text-stone-850 font-medium mt-1 leading-relaxed">
                      "Display is still great, but the left fan has developed a slight whine under heavy load. Battery now holding ~7.5 hours."
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute top-1.5 left-[-25px] w-2.5 h-2.5 rounded-full bg-orange-500 border-2 border-white shadow-sm" />
                    <div className="flex items-center justify-between text-xs font-mono font-semibold text-orange-700">
                      <span>Year 1</span>
                      <span className="text-[10px] text-orange-700 font-bold font-sans">Battery: 81% Health</span>
                    </div>
                    <div className="text-xs text-stone-850 font-medium mt-1 leading-relaxed">
                      "Left fan replaced under warranty. Keyboard still solid, battery is now firmly at 6 hours. Glad I didn't buy the base model."
                    </div>
                  </div>
                </div>
              </div>

              {/* Q&A Gated Answer Mockup Card (Redesigned for authenticity/attractiveness) */}
              <div className="p-6 rounded-3xl border border-stone-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:border-stone-300/90 transition-all duration-300 flex flex-col justify-between gap-6">
                <div>
                  <span className="text-[10px] font-mono font-bold text-stone-500 bg-stone-100 border border-stone-250 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    VERIFIED Q&A PREVIEW
                  </span>
                  <h3 className="font-serif font-bold text-stone-850 text-lg mt-3">Gated Answer Interface</h3>
                  <p className="text-xs text-stone-500 mt-1">Gating answers to verified buyers ensures spam-free product support.</p>
                </div>

                {/* Question */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/60 flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-stone-200 text-[10px] font-bold text-stone-600 flex items-center justify-center shrink-0 shadow-inner">
                    MK
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold text-stone-400">BUYER QUESTION</div>
                    <p className="text-xs text-stone-850 font-semibold mt-1">"Does the screen wobble on a standard train commuter ride?"</p>
                  </div>
                </div>

                {/* Answer with verified badge */}
                <div className="p-4 rounded-2xl border border-orange-200 bg-orange-50/20 flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-200 text-[10px] font-bold text-orange-850 flex items-center justify-center shrink-0 shadow-inner">
                    NV
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between border-b border-orange-100/60 pb-1.5 mb-1.5">
                      <span className="text-[10px] font-mono font-bold text-orange-850">Navin V.</span>
                      <span className="text-[9px] font-bold text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
                        14 Months Ownership
                      </span>
                    </div>
                    <p className="text-xs text-stone-855 font-medium leading-relaxed">
                      "Yes, slightly. The friction hinge isn't stiff enough for heavy vibrations. If you type aggressively on a train table, it will wobble. I mitigate this by using a laptop lap tray."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* The Manifesto & Privacy Pledge / Product logic */}
          <section className="flex flex-col sm:flex-row gap-10 md:gap-12 items-start py-2">
            <div className="flex-1 flex flex-col gap-5 w-full">
              <div className="flex flex-col gap-3">
                <h2 className="text-xl md:text-3xl font-serif font-extrabold text-stone-900 leading-tight">
                  Authenticity through validation.
                </h2>
                <p className="text-xs md:text-base text-stone-600 leading-relaxed font-serif">
                  Campfire is built on verified ownership. We require proof of purchase—like a simple store invoice upload—to unlock posting rights. If you haven't owned the product, you can't post about it. Period.
                </p>
              </div>

              {/* Privacy Pledge Block */}
              <div className="p-4.5 rounded-2xl border border-stone-200/80 bg-stone-50/50 flex flex-col gap-1.5 w-full">
                <div className="flex items-center gap-2 text-[10px] md:text-xs font-mono font-bold text-stone-500">
                  <svg
                    className="w-3.5 h-3.5 text-stone-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                    />
                  </svg>
                  <span>Verification Privacy Pledge</span>
                </div>
                <p className="text-[10px] md:text-xs text-stone-500 leading-relaxed font-mono">
                  We verify using automated OCR extraction. Billing details, prices, and addresses are instantly redacted and discarded. We only store the product model and purchase date to validate ownership. No receipt images are kept on our public servers.
                </p>
              </div>
            </div>
            
            {/* The Wishlist Poll */}
            <div className="w-full md:w-[350px] p-5 md:p-6 rounded-3xl border border-stone-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:border-stone-300/90 transition-all duration-300 flex flex-col gap-3.5">
              <div>
                <h3 className="font-serif font-bold text-stone-800 text-sm">Where should we start?</h3>
                <p className="text-[10px] md:text-xs text-stone-500 mt-1">Select the product category you would like to see launched first.</p>
              </div>

              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleVote(cat.id)}
                    disabled={voted !== null}
                    className={`w-full text-left p-3 rounded-2xl border text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                      voted === cat.id
                        ? "border-orange-500 bg-orange-50/50 text-orange-950 font-bold"
                        : voted !== null
                        ? "border-stone-100 bg-stone-50/30 text-stone-400"
                        : "border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className={`text-[10px] ${voted === cat.id ? "text-orange-700 font-bold" : "text-stone-400"}`}>
                      {cat.votes.toLocaleString()} votes
                    </span>
                  </button>
                ))}
              </div>

              {voted && (
                <div className="text-[10px] md:text-[11px] text-orange-850 font-semibold text-center mt-1 animate-pulse">
                  Thank you. We will prioritize this category for the initial rollout.
                </div>
              )}
            </div>
          </section>

          {/* Founding Member Call to Action */}
          <section id="registry-signup" className="py-10 md:py-14 border-t border-stone-250/60 flex flex-col items-center gap-6 md:gap-8 text-center max-w-2xl mx-auto w-full">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 leading-tight">
                Help build the future of word-of-mouth.
              </h2>
              <p className="text-xs md:text-sm text-stone-600 leading-relaxed font-serif">
                By joining Campfire today, you secure your place in the founding registry. Early accounts are permanently designated with the Founding Member badge across the network.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3.5 w-full">
              <Show when="signed-out">
                <SignUpButton mode="modal">
                  <button className="w-full sm:w-auto text-sm md:text-base font-bold text-white bg-stone-900 hover:bg-stone-800 transition-colors rounded-full px-8 py-3.5 shadow-md active:scale-97 cursor-pointer">
                    Join the Ownership Network
                  </button>
                </SignUpButton>
                <div className="text-[10px] md:text-[11px] text-stone-500">
                  One-click Google or GitHub signup. Zero friction.
                </div>
              </Show>

              <Show when="signed-in">
                {/* Clean, Non-Emoji Founding Member Badge UI */}
                <div className="w-full max-w-sm border border-stone-250/80 rounded-2xl bg-white shadow-sm p-5 md:p-6 flex flex-col gap-4 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-gradient-to-bl from-orange-200/20 to-transparent rounded-full blur-xl pointer-events-none" />
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <span className="text-[10px] md:text-xs font-mono font-bold tracking-widest text-stone-400">CAMPFIRE REGISTRY</span>
                    <span className="text-[9px] md:text-[10px] font-bold text-orange-850 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Founding Member
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-[9px] md:text-[10px] text-stone-400 font-bold uppercase tracking-wider">Member ID</div>
                    <div className="font-mono text-xs md:text-sm text-stone-850 font-bold">#10,483</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-[9px] md:text-[10px] text-stone-400 font-bold uppercase tracking-wider">Registry Node</div>
                    <div className="text-[11px] md:text-xs text-stone-700 font-semibold truncate">guides@campfire.net</div>
                  </div>
                </div>
              </Show>
            </div>
          </section>

        </main>

        {/* Footer */}
        <footer className="py-12 border-t border-stone-200/60 text-center text-xs text-stone-500">
          &copy; {new Date().getFullYear()} Campfire. Restoring the human scale to product discovery.
        </footer>

      </div>
    </div>
  );
}
