import { db } from "@/db";
import { products, verifications } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { TransitionLink as Link } from "@/components/TransitionLink";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campfire | Browse Verified Products",
  description: "Browse our catalog of hardware products backed by authentic, verified owner experiences.",
};

export const revalidate = 3600; // Cache the catalog for 1 hour

export default async function ProductsCatalogPage() {
  // Fetch all products and count their verified owners
  const catalog = await db
    .select({
      id: products.id,
      slug: products.slug,
      name: products.name,
      category: products.category,
      description: products.description,
      verifiedCount: sql<number>`count(${verifications.id})`,
    })
    .from(products)
    .leftJoin(
      verifications,
      sql`${verifications.productId} = ${products.id} AND ${verifications.status} = 'approved'`
    )
    .groupBy(products.id, products.slug, products.name, products.category, products.description)
    .orderBy(products.createdAt);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <img src="/logo-transparent.png" alt="Campfire" className="w-7 h-7 object-contain" />
            <span className="text-2xl font-normal tracking-wide text-stone-900" style={{ fontFamily: "'Jersey 25', sans-serif" }}>
              Campfire
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/verify" className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors">
              Verify Product
            </Link>
            <div className="text-sm font-medium text-stone-500 hidden sm:block">
              Hardware Catalog
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-serif font-extrabold text-stone-900">
              Hardware Catalog
            </h1>
            <p className="text-stone-600 mt-2 max-w-2xl">
              Browse products and read reviews from people who have verified they own them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {catalog.map((product) => (
              <Link 
                key={product.id} 
                href={`/products/${product.slug}`}
                className="group flex flex-col gap-4 p-6 bg-white rounded-2xl border border-stone-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300 active:scale-[0.98]"
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    {product.verifiedCount} Verified Owners
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-bold text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                    {product.name}
                  </h2>
                  <p className="text-sm text-stone-500 mt-1.5 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="mt-auto pt-4 flex items-center text-sm font-semibold text-stone-900 group-hover:text-orange-600 transition-colors">
                  Read Reviews <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
            
            {catalog.length === 0 && (
              <div className="col-span-full py-20 text-center text-stone-500 font-medium">
                No products found in the catalog.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
