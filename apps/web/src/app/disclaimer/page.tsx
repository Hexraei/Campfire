import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compliance & Legal Disclaimer | Campfire",
  description: "Campfire legal disclaimers and FTC compliance disclosures affirming our commitment to 100% organic, unsponsored reviews.",
  robots: "index, follow",
  openGraph: {
    title: "Compliance & Legal Disclaimer | Campfire",
    description: "Campfire legal disclaimers and FTC compliance disclosures affirming our commitment to 100% organic, unsponsored reviews.",
    type: "website",
    siteName: "Campfire",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf8f6] text-stone-900 font-sans antialiased selection:bg-orange-500/10 selection:text-orange-950 relative overflow-x-hidden w-full max-w-full">
      {/* Background warm neutral glowing accents */}
      <div className="absolute top-0 left-0 w-[65%] h-[35%] bg-gradient-to-br from-orange-100/20 via-stone-100/5 to-transparent blur-[130px] pointer-events-none" />
      
      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-5 md:px-6 flex-1 flex flex-col relative z-10 w-full">
        
        {/* Minimal Header */}
        <header className="h-16 md:h-20 flex items-center justify-between border-b border-stone-200/60">
          <Link href="/" className="flex items-center gap-2 md:gap-3">
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
          </Link>
          <Link href="/" className="text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors">
            &larr; Back to Home
          </Link>
        </header>

        <main className="flex-1 py-12 md:py-20 flex flex-col gap-10 max-w-3xl">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl md:text-5xl font-serif font-extrabold tracking-tight text-stone-900">
              Compliance & Legal Disclaimer
            </h1>
            <p className="text-sm font-mono text-stone-500">
              Last Updated: June 2026
            </p>
          </div>

          <section className="flex flex-col gap-6 text-stone-700 leading-relaxed font-serif text-base md:text-lg">
            <p>
              Campfire operates with an uncompromising commitment to legal transparency and consumer protection. This page outlines our regulatory compliance standards and legal disclaimers.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-4">
              1. FTC Endorsement Guides Compliance & Zero Sponsorship Affirmation
            </h2>
            <p>
              In strict accordance with the Federal Trade Commission (FTC) Guides Concerning the Use of Endorsements and Testimonials in Advertising (16 CFR Part 255), Campfire openly affirms that our platform operates entirely free of brand sponsorship, product seeding, or financial kickbacks.
            </p>
            <p>
              We enforce a rigorous verification process to guarantee that reviews reflect the sincere, unsponsored opinions of real consumers who have purchased products independently. Any user discovered receiving undisclosed incentives from manufacturers will face immediate banning.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-4">
              2. No Financial, Technical, or Professional Advice
            </h2>
            <p>
              Content shared across Campfire product timelines and Q&A boards represents personal user experiences rather than certified technical or professional advice. Users should consult official manufacturer manuals and qualified technicians before performing hardware modifications or warranty-voiding procedures.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-4">
              3. Copyright & DMCA Policy
            </h2>
            <p>
              We respect the intellectual property rights of others. If you believe that your copyrighted work has been posted or distributed on Campfire without authorization, please submit a formal DMCA takedown notice containing the required statutory elements to <span className="font-mono text-stone-900">dmca@campfire.network</span>.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-4">
              4. Trademarks & Brand Mentions
            </h2>
            <p>
              All product names, logos, brands, and registered trademarks featured or referred to within Campfire timelines are the property of their respective trademark holders. These trademark holders are not affiliated with Campfire and do not sponsor or endorse our community platform.
            </p>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-12 border-t border-stone-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} Campfire. A community built by and for the people.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-stone-800 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-stone-800 transition-colors">Terms of Use</Link>
            <Link href="/disclaimer" className="hover:text-stone-800 transition-colors">Compliance & Legal</Link>
          </div>
        </footer>

      </div>
    </div>
  );
}
