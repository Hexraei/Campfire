"use client";

import { useState, useEffect } from "react";
import { SignInButton, SignUpButton, SignOutButton, Show, UserButton, useAuth, useClerk } from "@clerk/nextjs";
import { savePollPreferences } from "./actions";

export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isPollDone, setIsPollDone] = useState(false);
  const { isSignedIn } = useAuth();
  const clerk = useClerk();

  useEffect(() => {
    if (isSignedIn) {
      const pendingVote = localStorage.getItem("pending_vote");
      if (pendingVote) {
        try {
          const categories = JSON.parse(pendingVote);
          savePollPreferences(categories);
          localStorage.removeItem("pending_vote");
          setIsPollDone(true);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [isSignedIn]);

  const categories = [
    { id: "laptops", name: "Laptops & Notebooks" },
    { id: "smartphones", name: "Smartphones & Mobile Devices" },
    { id: "audio", name: "Headphones & Audio Gear" },
    { id: "keyboards", name: "Mechanical Keyboards" },
  ];

  const handleToggleCategory = (id: string) => {
    if (isPollDone) return;
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handlePollDone = async () => {
    setIsPollDone(true);
    if (isSignedIn) {
      await savePollPreferences(selectedCategories);
    } else {
      localStorage.setItem("pending_vote", JSON.stringify(selectedCategories));
      clerk.openSignUp();
    }
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
                <SignOutButton>
                  <button className="text-[10px] md:text-xs font-medium text-stone-500 hover:text-stone-900 transition-colors cursor-pointer px-2 py-1 bg-stone-100 hover:bg-stone-200 rounded-full">
                    Sign Out
                  </button>
                </SignOutButton>
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
            <h1 className="text-3xl md:text-5xl font-serif font-extrabold tracking-tight leading-[1.1] text-stone-900 text-wrap-balance">
              Finding honest product reviews shouldn't be this hard.
            </h1>
            
            <p className="text-base md:text-lg text-stone-600 leading-relaxed font-serif text-wrap-pretty">
              It's hard to tell what's real online anymore. Between sponsored content and SEO articles, finding a genuine opinion is frustrating. Campfire connects you directly with verified owners who actually use the products you're looking for.
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
                  View Registration Status
                </button>
              </Show>
            </div>
          </section>

          {/* Core Narrative / Friction Step with Connected Layout */}
          <section className="p-6 md:p-8 rounded-3xl border border-stone-200/80 bg-white/70 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:border-stone-300/80 transition-all duration-350 flex flex-col gap-6 md:gap-8">
            <h2 className="text-xl font-serif font-bold text-stone-850">The typical buying experience</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 relative before:hidden sm:before:block before:absolute before:top-2.5 before:left-[10%] before:right-[10%] before:h-[1px] before:bg-gradient-to-r before:from-stone-200 before:via-stone-300 before:to-orange-200 z-0">
              <div className="flex flex-col gap-2 relative z-10 bg-white/40 md:bg-transparent rounded-2xl p-5 md:p-0 border border-stone-200/40 md:border-transparent">
                <div className="text-xs font-mono font-bold text-stone-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full border border-stone-300 bg-white flex items-center justify-center text-[10px] text-stone-500 font-bold shadow-sm">1</span>
                </div>
                <div className="font-serif font-bold text-sm text-stone-850 mt-2">Searching for opinions</div>
                <p className="text-xs text-stone-500 leading-relaxed">
                  You spend time reading threads trying to figure out which comments are from actual users and which ones are promotional.
                </p>
              </div>

              <div className="flex flex-col gap-2 relative z-10 bg-white/40 md:bg-transparent rounded-2xl p-5 md:p-0 border border-stone-200/40 md:border-transparent">
                <div className="text-xs font-mono font-bold text-stone-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full border border-stone-300 bg-white flex items-center justify-center text-[10px] text-stone-500 font-bold shadow-sm">2</span>
                </div>
                <div className="font-serif font-bold text-sm text-stone-850 mt-2">Sifting through articles</div>
                <p className="text-xs text-stone-500 leading-relaxed">
                  You browse "top 10" lists that are mostly just linking to whatever pays the best affiliate commission.
                </p>
              </div>

              <div className="flex flex-col gap-2 relative z-10 bg-white/40 md:bg-transparent rounded-2xl p-5 md:p-0 border border-stone-200/40 md:border-transparent">
                <div className="text-xs font-mono font-bold text-stone-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full border border-stone-300 bg-white flex items-center justify-center text-[10px] text-stone-500 font-bold shadow-sm">3</span>
                </div>
                <div className="font-serif font-bold text-sm text-stone-850 mt-2">Watching videos</div>
                <p className="text-xs text-stone-500 leading-relaxed">
                  You watch reviews from creators who received the product for free, making it hard to trust if it's truly worth your own money.
                </p>
              </div>

              <div className="flex flex-col gap-2 relative z-10 bg-[#fefaf6] border border-orange-200/60 rounded-2xl p-5 shadow-sm md:shadow-sm">
                <div className="text-xs font-mono font-bold text-orange-700 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full border border-orange-300 bg-white flex items-center justify-center text-[10px] text-orange-750 font-bold shadow-sm">4</span>
                </div>
                <div className="font-serif font-bold text-sm text-stone-850 mt-2">Making a guess</div>
                <p className="text-xs text-stone-500 leading-relaxed font-medium text-orange-900">
                  You eventually just buy it and hope for the best, because finding a genuine long-term review is too difficult.
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
                  Real reviews from real owners.
                </h2>
                <p className="text-xs md:text-base text-stone-600 leading-relaxed font-serif">
                  Campfire requires a simple proof of purchase to unlock posting rights. This keeps things honest: if someone hasn't bought the product, they can't review it. It's a simple idea to bring back trust.
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
                  <span>We care about privacy</span>
                </div>
                <p className="text-[10px] md:text-xs text-stone-500 leading-relaxed font-mono">
                  When you upload a receipt, we only look at the product name and purchase date to verify ownership. All personal details, addresses, and prices are ignored and discarded. We never store receipt images.
                </p>
              </div>
            </div>
            
            {/* The Wishlist Poll */}
            <div className="w-full md:w-[350px] p-5 md:p-6 rounded-3xl border border-stone-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:border-stone-300/90 transition-all duration-300 flex flex-col gap-3.5">
              <div>
                <h3 className="font-serif font-bold text-stone-800 text-sm">Where should we start?</h3>
                <p className="text-[10px] md:text-xs text-stone-500 mt-1">Select the product categories you'd like to see first.</p>
              </div>

              <div className="flex flex-col gap-2">
                {categories.map((cat) => {
                  const isSelected = selectedCategories.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleToggleCategory(cat.id)}
                      disabled={isPollDone}
                      className={`w-full text-left p-3 rounded-2xl border text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "border-orange-500 bg-orange-50/50 text-orange-950 font-bold"
                          : isPollDone
                          ? "border-stone-100 bg-stone-50/30 text-stone-400"
                          : "border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700"
                      }`}
                    >
                      <span>{cat.name}</span>
                      {isSelected && (
                        <svg className="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>

              {!isPollDone && selectedCategories.length > 0 && (
                <button
                  onClick={handlePollDone}
                  className="mt-2 w-full py-2.5 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800 transition-colors"
                >
                  Done
                </button>
              )}

              {isPollDone && (
                <div className="text-[10px] md:text-[11px] text-orange-850 font-semibold text-center mt-1">
                  Thanks for your input! We'll prioritize these categories.
                </div>
              )}
            </div>
          </section>

          {/* Founding Member Call to Action */}
          <section id="registry-signup" className="py-10 md:py-14 border-t border-stone-250/60 flex flex-col items-center gap-6 md:gap-8 text-center max-w-2xl mx-auto w-full">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 leading-tight">
                Join the early access list.
              </h2>
              <p className="text-xs md:text-sm text-stone-600 leading-relaxed font-serif">
                Sign up today to get notified when we open our doors. Early members will get a special badge on their profile as a thank you for supporting the idea.
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
                <div className="w-full max-w-sm border border-emerald-200 bg-emerald-50/50 rounded-2xl p-5 md:p-6 flex flex-col gap-2 text-center">
                  <div className="text-emerald-600 mb-1 flex justify-center">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <h3 className="font-serif font-bold text-stone-900 text-lg">You're on the list</h3>
                  <p className="text-xs text-stone-600">
                    You have successfully registered for early access. We'll email you when Campfire opens up.
                  </p>
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
