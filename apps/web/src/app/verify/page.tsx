"use client";

import React, { useState, useEffect } from "react";
import { TransitionLink as Link } from "@/components/TransitionLink";
import { UserButton, useAuth } from "@clerk/nextjs";
import { verifyReceiptAction } from "@/app/verifyActions";

export default function VerifyPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    productName: string;
    purchaseDate: string;
    slug: string;
  } | null>(null);

  const loadingSteps = [
    "Uploading secure buffer to memory...",
    "Analyzing via Gemini 3.1 Flash Lite...",
    "Extracting primary product name & date...",
    "Applying Immediate Discard Policy to personal info...",
    "Unlocking Verified Owner Badge..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingTextIndex((prev) => (prev + 1) % loadingSteps.length);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [loading, loadingSteps.length]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setError(null);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select or drop a receipt image first.");
      return;
    }

    setLoading(true);
    setError(null);
    setLoadingTextIndex(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await verifyReceiptAction(formData);
      if (res.success && res.data) {
        setSuccessData(res.data);
      } else {
        setError(res.error || "An error occurred during verification.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to contact verification server.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    setSuccessData(null);
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col selection:bg-orange-500 selection:text-stone-900 font-sans">
      {/* Dynamic Glow Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-radial from-orange-600/20 via-transparent to-transparent pointer-events-none blur-3xl" />

      {/* Navigation Bar */}
      <div className="w-full max-w-6xl mx-auto px-6 z-10">
        <header className="h-16 md:h-20 flex items-center justify-between border-b border-stone-800">
          <Link href="/" className="flex items-center gap-2.5 md:gap-3.5">
            <img
              src="/logo-transparent.png"
              alt="Campfire Logo"
              className="w-7 h-7 md:w-9 md:h-9 object-contain"
            />
            <span
              className="text-3xl md:text-4xl font-normal tracking-wide text-stone-100 drop-shadow-sm"
              style={{ fontFamily: "'Jersey 25', sans-serif" }}
            >
              Campfire
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/products"
              className="text-sm font-medium text-stone-400 hover:text-stone-200 transition-colors"
            >
              Hardware Catalog
            </Link>
            {isLoaded && isSignedIn && <UserButton />}
          </div>
        </header>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-12 z-10 flex flex-col justify-center">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Verify Your Hardware
          </h1>
          <p className="text-stone-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Submit a store receipt or digital invoice to securely unlock your Verified Owner badge. Our AI analyzes only the product name and purchase date.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-800/80 border border-stone-700 text-xs text-orange-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Immediate Discard Policy Active • Zero Image Storage
          </div>
        </div>

        {/* Auth Check */}
        {isLoaded && !isSignedIn ? (
          <div className="bg-stone-850 border border-stone-800 rounded-2xl p-8 text-center shadow-2xl">
            <h2 className="text-xl font-bold text-stone-200 mb-3">
              Sign in Required
            </h2>
            <p className="text-stone-400 text-sm mb-6 max-w-md mx-auto">
              You must be signed in to assign verified products to your Campfire profile.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-orange-600 hover:bg-orange-500 text-stone-950 font-semibold transition-all shadow-lg shadow-orange-600/30"
            >
              Go to Home & Sign In
            </Link>
          </div>
        ) : successData ? (
          /* Success Screen */
          <div className="bg-stone-850 border border-stone-800 rounded-3xl p-8 md:p-10 text-center shadow-2xl animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-orange-500/10 border border-orange-500/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-500/10">
              <svg
                className="w-10 h-10 text-orange-500 animate-bounce"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <span className="text-xs font-mono tracking-widest text-orange-400 uppercase bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
              Verified Badge Unlocked
            </span>

            <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-4 mb-2">
              {successData.productName}
            </h2>
            <p className="text-stone-400 text-sm mb-8">
              Officially acquired & verified on <span className="text-stone-200 font-medium">{successData.purchaseDate}</span>
            </p>

            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 text-left mb-8 space-y-3 shadow-inner">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-stone-500">AUTHENTICATION ENGINE</span>
                <span className="text-emerald-400 font-medium">Gemini 3.1 Flash Lite</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-stone-500">SENSITIVE DATA STATUS</span>
                <span className="text-emerald-400 font-medium">Instantly Discarded</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-stone-500">IMAGE BUFFER</span>
                <span className="text-emerald-400 font-medium">Purged from Memory</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/`}
                className="px-6 py-3 rounded-full bg-orange-600 hover:bg-orange-500 text-stone-950 font-bold transition-all shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2"
              >
                Go to Hub / Home
              </Link>
              <button
                onClick={resetForm}
                className="px-6 py-3 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium transition-all"
              >
                Verify Another Product
              </button>
            </div>
          </div>
        ) : (
          /* Upload Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-3xl p-10 text-center transition-all flex flex-col items-center justify-center min-h-[300px] cursor-pointer bg-stone-850/80 backdrop-blur-sm shadow-xl ${
                preview ? "border-orange-500/50 bg-stone-850" : "border-stone-700 hover:border-stone-500"
              }`}
            >
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                disabled={loading}
              />

              {preview ? (
                <div className="space-y-4 pointer-events-none z-10 w-full flex flex-col items-center">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border border-stone-700 shadow-md">
                    <img src={preview} alt="Receipt Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-sm font-medium text-stone-200">
                    {file?.name}
                  </div>
                  <p className="text-xs text-stone-500">
                    Click or drag another image to replace
                  </p>
                </div>
              ) : (
                <div className="space-y-4 pointer-events-none z-10">
                  <div className="w-16 h-16 bg-stone-800 border border-stone-700 rounded-full flex items-center justify-center mx-auto text-orange-500 shadow-lg">
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="text-stone-200 font-bold text-base block mb-1">
                      Drop your receipt image here
                    </span>
                    <span className="text-stone-400 text-sm block">
                      or click to browse from your device
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 font-mono">
                    Supports PNG, JPG, WEBP, HEIC
                  </p>
                </div>
              )}
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-sm text-center font-medium flex items-center justify-center gap-2 animate-in fade-in duration-300">
                <svg className="w-5 h-5 flex-shrink-0 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !file}
              className={`w-full py-4 rounded-full font-bold text-base transition-all flex items-center justify-center gap-3 shadow-xl ${
                loading || !file
                  ? "bg-stone-800 text-stone-500 cursor-not-allowed"
                  : "bg-orange-600 hover:bg-orange-500 text-stone-950 shadow-orange-600/30 active:scale-[0.99]"
              }`}
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-stone-950 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                  <span className="animate-pulse">{loadingSteps[loadingTextIndex]}</span>
                </>
              ) : (
                "Execute Privacy-First Verification"
              )}
            </button>
          </form>
        )}
      </main>

      {/* Minimal Footer */}
      <footer className="w-full max-w-6xl mx-auto px-6 py-8 border-t border-stone-800 text-center text-xs text-stone-500 z-10">
        <p>© 2026 Campfire. Built by and for the people. Full privacy enforcement active.</p>
        <div className="mt-2 flex justify-center gap-4">
          <Link href="/privacy" className="hover:text-stone-300 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-stone-300 transition-colors">Terms of Use</Link>
          <Link href="/disclaimer" className="hover:text-stone-300 transition-colors">Compliance</Link>
        </div>
      </footer>
    </div>
  );
}
