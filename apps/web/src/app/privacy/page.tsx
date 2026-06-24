import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Campfire",
  description: "Learn how Campfire protects your privacy. We verify receipt ownership dates and product names while discarding all personal data and receipt images.",
  robots: "index, follow",
  openGraph: {
    title: "Privacy Policy | Campfire",
    description: "Learn how Campfire protects your privacy. We verify receipt ownership dates and product names while discarding all personal data and receipt images.",
    type: "website",
    siteName: "Campfire",
  },
};

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-sm font-mono text-stone-500">
              Last Updated: June 2026
            </p>
          </div>

          <section className="flex flex-col gap-6 text-stone-700 leading-relaxed font-serif text-base md:text-lg">
            <p>
              At Campfire, we believe that restoring trust to online reviews begins with radical respect for your privacy. This Privacy Policy outlines what data we collect, how it is processed, and your rights as a member of our community.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-4">
              1. Receipt Verification & Proof of Purchase
            </h2>
            <p>
              When you submit a store receipt or proof of purchase to unlock verified owner posting rights, our automated verification engines analyze only two specific data points: <strong>the product name</strong> and <strong>the date of purchase</strong>.
            </p>
            <p>
              <strong>Immediate Discard Policy:</strong> All sensitive personal information—including your name, billing/shipping addresses, payment card details, and purchase prices—are immediately ignored and permanently discarded from memory. We do not store receipt images in our databases.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-4">
              2. Information We Collect
            </h2>
            <p>
              We collect the minimum amount of information necessary to maintain a secure, authentic community:
            </p>
            <ul className="list-disc pl-6 flex flex-col gap-2 text-base">
              <li><strong>Account Information:</strong> Your email address and public display name when you authenticate via Google, GitHub, or email.</li>
              <li><strong>Community Contributions:</strong> The product timelines, logs, and Q&A responses you actively publish to the platform.</li>
              <li><strong>Category Preferences:</strong> Wishlist selections and poll responses to help us prioritize community categories.</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-4">
              3. Data Sharing & Third Parties
            </h2>
            <p>
              We strictly prohibit the sale, rental, or commercialization of your personal data. Because Campfire operates entirely independently of brand sponsorships, affiliate marketing networks, and ad trackers, your usage habits are never shared with advertisers or third-party brokers.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-4">
              4. Your Privacy Rights (GDPR & CCPA)
            </h2>
            <p>
              Depending on your jurisdiction, you retain the full right to access, correct, export, or permanently delete your personal data from our systems at any time. You can execute an immediate account deletion directly through your profile settings or by contacting our support team.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-4">
              5. Contact Us
            </h2>
            <p>
              If you have questions or concerns regarding this Privacy Policy or our data processing practices, please reach out to us at <span className="font-mono text-stone-900">privacy@campfire.network</span>.
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
