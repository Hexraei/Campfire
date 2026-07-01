"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export function CatalogSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }
      router.push(`?${params.toString()}`);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, router, searchParams]);

  return (
    <div className="w-full relative">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full h-14 pl-12 pr-4 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-stone-900 placeholder:text-stone-400 shadow-sm text-lg font-medium"
      />
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      </div>
    </div>
  );
}
