import { db } from "@/db";
import { products, verifications } from "@/db/schema";
import { eq, sql, ilike, and, desc, asc, inArray } from "drizzle-orm";
import { TransitionLink as Link } from "@/components/TransitionLink";
import { Metadata } from "next";
import { CatalogSearch } from "@/components/CatalogSearch";
import { CatalogSidebar } from "@/components/CatalogSidebar";


export const metadata: Metadata = {
  title: "Campfire | Hardware Catalog",
  description: "Browse our catalog of hardware products backed by authentic, verified owner experiences.",
};

// Remove revalidate = 3600 so it can dynamically read searchParams
export const dynamic = "force-dynamic";

export default async function ProductsCatalogPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const q = typeof searchParams.q === 'string' ? searchParams.q : undefined;
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'newest';

  // Build the WHERE clause
  const conditions = [];
  if (q) {
    conditions.push(ilike(products.name, `%${q}%`));
  }
  if (category) {
    conditions.push(eq(products.category, category));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // Fetch products
  const catalog = await db
    .select({
      id: products.id,
      slug: products.slug,
      name: products.name,
      category: products.category,
      description: products.description,
      price: products.price,
      imageUrl: products.imageUrl,
      verifiedCount: sql<number>`count(${verifications.id})`,
    })
    .from(products)
    .leftJoin(
      verifications,
      sql`${verifications.productId} = ${products.id} AND ${verifications.status} = 'approved'`
    )
    .where(whereClause)
    .groupBy(products.id, products.slug, products.name, products.category, products.description, products.price, products.imageUrl)
    .orderBy(
      sort === 'price_asc' ? asc(products.price) :
      sort === 'price_desc' ? desc(products.price) :
      desc(products.createdAt)
    );

  const formatPrice = (cents: number | null) => {
    if (!cents) return "Price Unavailable";
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
  };

  return (
    <div className="min-h-screen bg-[#faf8f6] flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
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
            <div className="text-sm font-medium text-stone-900 hidden sm:block">
              Hardware Catalog
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col gap-8">
        
        {/* Search Bar Top */}
        <div className="w-full max-w-2xl mx-auto">
          <CatalogSearch />
        </div>

        {/* 1/3 Sidebar and 2/3 Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Sidebar Filters (1/4 on LG, but feels like 1/3 visual weight) */}
          <div className="lg:col-span-1 w-full">
            <CatalogSidebar />
          </div>

          {/* Product Grid (3/4 on LG) */}
          <div className="lg:col-span-3 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {catalog.map((product) => (
                <Link 
                  key={product.id} 
                  href={`/products/${product.slug}`}
                  className="group flex flex-col bg-white rounded-2xl border border-stone-200 hover:border-orange-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 active:scale-[0.98] overflow-hidden h-full"
                >
                  {/* Product Image */}
                  <div className="w-full aspect-square bg-stone-100 relative overflow-hidden">
                    {product.imageUrl ? (
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-400">
                        No Image
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-700 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md shadow-sm">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-5 flex flex-col flex-1 gap-3">
                    <div className="flex flex-col gap-1">
                      <h2 className="text-lg font-bold text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                        {product.name}
                      </h2>
                      <p className="text-lg font-semibold text-stone-700">
                        {formatPrice(product.price)}
                      </p>
                    </div>

                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-stone-100">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100/50">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        {product.verifiedCount} Verified
                      </div>
                      <span className="text-xs font-bold text-stone-400 group-hover:text-orange-500 transition-colors uppercase tracking-wider">
                        View Details
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
              
              {catalog.length === 0 && (
                <div className="col-span-full py-32 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-stone-200 border-dashed">
                  <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4 text-stone-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  </div>
                  <h3 className="text-lg font-bold text-stone-900">No products found</h3>
                  <p className="text-stone-500 mt-1 max-w-sm">
                    Try adjusting your search query or filters to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
