import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use | Campfire",
  description: "Terms of Use governing the Campfire community. Read our rules on user-generated content, community guidelines, and our zero-sponsorship policy.",
  robots: "index, follow",
  openGraph: {
    title: "Terms of Use | Campfire",
    description: "Terms of Use governing the Campfire community. Read our rules on user-generated content, community guidelines, and our zero-sponsorship policy.",
    type: "website",
    siteName: "Campfire",
  },
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf8f6] text-stone-900 font-sans antialiased selection:bg-orange-500/10 selection:text-orange-950 relative overflow-x-hidden w-full max-w-full">
      {/* Background warm neutral glowing accents */}
      <div className="absolute top-0 left-0 w-[65%] h-[35%] bg-gradient-to-br from-orange-100/20 via-stone-100/5 to-transparent blur-[130px] pointer-events-none" />
      
      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-5 md:px-6 flex-1 flex flex-col relative z-10 w-full">
        
        {/* Minimal Header */}
        <header className="h-16 md:h-20 flex items-center justify-between border-b border-stone-200/60">
          <Link href="/" className="flex items-center gap-2.5 md:gap-3.5">
            <img
              src="/logo-transparent.png"
              alt="Campfire Logo"
              className="w-7 h-7 md:w-9 md:h-9 object-contain"
            />
            <span className="text-xl md:text-2xl font-serif font-black tracking-wide text-stone-900 drop-shadow-sm">
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
              Terms of Use
            </h1>
            <p className="text-sm font-mono text-stone-500">
              Last Updated: June 2026
            </p>
          </div>

          <section className="flex flex-col gap-6 text-stone-700 leading-relaxed font-serif text-base md:text-lg">
            <p>
              Welcome to Campfire. By accessing or using our platform, you agree to be bound by these Terms of Use. Our mission is to provide an authentic, unsponsored environment for genuine product reviews and discussions.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-4">
              1. Community Code of Conduct & Zero-Sponsorship Policy
            </h2>
            <p>
              Campfire is dedicated to radical transparency. To maintain the integrity of our verified network, you agree to the following strict rules:
            </p>
            <ul className="list-disc pl-6 flex flex-col gap-2 text-base">
              <li><strong>No Sponsored Content:</strong> You agree never to publish reviews, logs, or comments for which you have received financial compensation, free sample products, or special favors from a brand or manufacturer.</li>
              <li><strong>No Affiliate Links:</strong> You agree not to post affiliate marketing links, promotional coupon codes, or tracking URLs intended to monetize community discussions.</li>
              <li><strong>Respectful Discourse:</strong> You agree to treat fellow consumers with dignity and respect. Harassment, spam, and bad-faith arguments will result in immediate termination of posting privileges.</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-4">
              2. User-Generated Content & Verification
            </h2>
            <p>
              By posting timelines, Q&A responses, or product logs on Campfire, you grant us a non-exclusive, royalty-free license to display and distribute your contributions across the Campfire platform. You represent and warrant that your contributions reflect your genuine, personal experience with a product you genuinely own or have owned.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-4">
              3. Account Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate any account that violates our Zero-Sponsorship Policy or engages in fraudulent behavior, such as submitting fabricated proofs of purchase or manipulating community votes.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-4">
              4. Limitation of Liability
            </h2>
            <p>
              All user-generated reviews, advice, and Q&A responses on Campfire are provided for informational purposes only. Campfire makes no warranties regarding the accuracy, reliability, or safety of any products reviewed on the platform. Your reliance on community advice is strictly at your own risk.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-4">
              5. Modifications to Terms
            </h2>
            <p>
              We may update these Terms of Use periodically to reflect changes in our community governance. Continued use of the platform constitutes acceptance of the updated Terms.
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
