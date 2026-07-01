import { db } from "@/db";
import { products, timelinePosts, users, verifications, questions, answers } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const [product] = await db
    .select({ name: products.name, description: products.description })
    .from(products)
    .where(eq(products.slug, params.slug))
    .limit(1);

  if (!product) {
    return { title: "Product Not Found | Campfire" };
  }

  return {
    title: `${product.name} Reviews | Campfire`,
    description: `Read reviews for ${product.name} from verified owners.`,
  };
}

export default async function ProductPage(props: PageProps) {
  const params = await props.params;
  
  // 1. Fetch Product
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.slug, params.slug))
    .limit(1);

  if (!product) {
    notFound();
  }

  // 2. Fetch Verified Owners Count
  const verifiedOwners = await db
    .select()
    .from(verifications)
    .where(and(eq(verifications.productId, product.id), eq(verifications.status, "approved")));

  const verifiedCount = verifiedOwners.length;

  // 3. Fetch Timeline Posts (Experiences)
  const experiences = await db
    .select({
      id: timelinePosts.id,
      content: timelinePosts.content,
      milestone: timelinePosts.milestone,
      rating: timelinePosts.rating,
      createdAt: timelinePosts.createdAt,
      user: {
        name: users.name,
        imageUrl: users.imageUrl,
      },
    })
    .from(timelinePosts)
    .innerJoin(users, eq(timelinePosts.userId, users.id))
    .where(eq(timelinePosts.productId, product.id))
    .orderBy(desc(timelinePosts.createdAt));

  // 4. Fetch Q&A
  const qa = await db
    .select({
      id: questions.id,
      content: questions.content,
      createdAt: questions.createdAt,
      asker: {
        name: users.name,
        imageUrl: users.imageUrl,
      },
      answer: {
        content: answers.content,
        createdAt: answers.createdAt,
      }
    })
    .from(questions)
    .innerJoin(users, eq(questions.userId, users.id))
    .leftJoin(answers, eq(answers.questionId, questions.id))
    .where(eq(questions.productId, product.id))
    .orderBy(desc(questions.createdAt));

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <Link href="/products" className="text-stone-400 hover:text-stone-900 transition-colors">
            ← Back to Catalog
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-12">
        {/* Product Hero */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md">
              {product.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              {verifiedCount} Verified Owners
            </div>
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-stone-900 tracking-tight text-balance">
              {product.name}
            </h1>
            <p className="mt-4 text-lg text-stone-600 font-serif leading-relaxed text-pretty">
              {product.description}
            </p>
          </div>
        </section>

        {/* Timeline Experiences */}
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-serif font-bold text-stone-900 flex items-center gap-3">
            Reviews
            <span className="text-sm font-medium text-stone-500 bg-stone-200 px-2 py-0.5 rounded-full">
              {experiences.length}
            </span>
          </h2>
          
          <div className="flex flex-col gap-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-stone-200 before:to-transparent">
            {experiences.length === 0 ? (
              <div className="text-stone-500 text-sm pl-12 md:pl-0 md:text-center">No reviews yet.</div>
            ) : (
              experiences.map((exp, idx) => (
                <div key={exp.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-stone-50 bg-orange-100 text-orange-600 font-bold text-xs z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm">
                    {exp.rating}★
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {exp.user.imageUrl ? (
                          <img src={exp.user.imageUrl} alt={exp.user.name || "User"} className="w-6 h-6 rounded-full" />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-stone-200" />
                        )}
                        <span className="text-sm font-bold text-stone-900">{exp.user.name || "Verified Owner"}</span>
                        <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-100 font-semibold">Verified</span>
                      </div>
                      <span className="text-xs font-bold text-stone-500 bg-stone-100 px-2 py-1 rounded-md">{exp.milestone}</span>
                    </div>
                    <p className="text-stone-700 text-sm leading-relaxed">{exp.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Q&A Section */}
        <section className="flex flex-col gap-6 pt-8 border-t border-stone-200">
          <h2 className="text-2xl font-serif font-bold text-stone-900 flex items-center gap-3">
            Questions & Answers
            <span className="text-sm font-medium text-stone-500 bg-stone-200 px-2 py-0.5 rounded-full">
              {qa.length}
            </span>
          </h2>

          <div className="flex flex-col gap-6">
            {qa.length === 0 ? (
              <div className="text-stone-500 text-sm">No questions asked yet.</div>
            ) : (
              qa.map((q) => (
                <div key={q.id} className="bg-white p-6 rounded-2xl border border-stone-200 flex flex-col gap-4">
                  <div className="flex gap-3">
                    <span className="text-stone-400 font-serif font-bold text-lg">Q.</span>
                    <div className="flex-1">
                      <p className="font-medium text-stone-900">{q.content}</p>
                      <span className="text-xs text-stone-500 mt-1 block">Asked by {q.asker.name || "User"}</span>
                    </div>
                  </div>
                  {q.answer ? (
                    <div className="flex gap-3 pl-4 md:pl-8 border-l-2 border-orange-200">
                      <span className="text-orange-500 font-serif font-bold text-lg">A.</span>
                      <div className="flex-1">
                        <p className="text-stone-700 text-sm">{q.answer.content}</p>
                        <span className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1">
                          <span className="w-1 h-1 bg-emerald-500 rounded-full" />
                          Answered by a Verified Owner
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="pl-4 md:pl-8 text-xs text-stone-400 font-medium">
                      Waiting for a verified owner to answer...
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
