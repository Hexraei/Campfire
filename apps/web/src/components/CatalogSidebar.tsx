"use client";

import { useRouter, useSearchParams } from "next/navigation";

const CATEGORIES = ["laptops", "smartphones", "cameras", "furniture"];
const SORTS = [
  { label: "Newest Arrivals", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

export function CatalogSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentCategory = searchParams.get("category");
  const currentSort = searchParams.get("sort") || "newest";

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full flex flex-col gap-8 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm sticky top-24">
      {/* Sort Options */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-4">Sort By</h3>
        <div className="flex flex-col gap-3">
          {SORTS.map((sort) => (
            <label key={sort.value} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="sort"
                value={sort.value}
                checked={currentSort === sort.value}
                onChange={() => updateParam("sort", sort.value)}
                className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-stone-300"
              />
              <span className={`text-sm font-medium transition-colors ${currentSort === sort.value ? 'text-stone-900' : 'text-stone-600 group-hover:text-stone-900'}`}>
                {sort.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-stone-100" />

      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-4">Categories</h3>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="category"
              checked={!currentCategory}
              onChange={() => updateParam("category", null)}
              className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-stone-300"
            />
            <span className={`text-sm font-medium transition-colors ${!currentCategory ? 'text-stone-900' : 'text-stone-600 group-hover:text-stone-900'}`}>
              All Categories
            </span>
          </label>
          {CATEGORIES.map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="category"
                value={cat}
                checked={currentCategory === cat}
                onChange={() => updateParam("category", cat)}
                className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-stone-300"
              />
              <span className={`text-sm font-medium capitalize transition-colors ${currentCategory === cat ? 'text-stone-900' : 'text-stone-600 group-hover:text-stone-900'}`}>
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
