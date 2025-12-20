import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Linkedin,
  Twitter,
  MessageCircle,
} from "lucide-react";
import { NEWS, NewsArticle } from "@/data/dummy";

interface PageProps {
  article: NewsArticle;
}

export default function NewsArticlePage({ article }: PageProps) {
  /*const relatedArticles = NEWS.filter(
    (n) => n.slug !== article.slug && n.category === article.category
  ).slice(0, 3);*/

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "";

  return (
    <main className="bg-white text-gray-900">

      {/* ================= HEADER ================= */}
      <header className="border-b">
        <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
            {article.category}
          </p>

          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
            {article.title}
          </h1>

          <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
            <time>
              {new Date(article.date).toLocaleDateString("en-ZM", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="h-1 w-1 rounded-full bg-gray-400" />
            <span>Company News</span>
          </div>
        </div>
      </header>

      {/* ================= FEATURE IMAGE ================= */}
      {article.image && (
        <section className="max-w-5xl mx-auto px-6 mt-12">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>
      )}

      {/* ================= BODY ================= */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-16">

        {/* Article content */}
        <article
          className="prose prose-neutral prose-lg max-w-none
                     prose-headings:font-semibold
                     prose-a:text-red-600"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Share (subtle) */}
        <aside className=" sticky top-28 space-y-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Share
          </p>

          <div className="flex flex-row md:flex-col gap-3">
            <ShareBtn
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
              icon={<Linkedin size={16} />}
            />
            <ShareBtn
              href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
              icon={<Twitter size={16} />}
            />
            <ShareBtn
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              icon={<Facebook size={16} />}
            />
            <ShareBtn
              href={`https://wa.me/?text=${shareUrl}`}
              icon={<MessageCircle size={16} />}
            />
          </div>
        </aside>
      </section>

      {/* ================= RELATED ================= */}
      {NEWS.length > 0 && (
        <section className="border-t">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <h2 className="text-red-600 text-xl font-bold mb-10">
              Related articles
            </h2>

            <div className="grid md:grid-cols-3 gap-10">
              {NEWS.map((item) => (
                <Link
                  key={item.id}
                  href={`/News/${item.slug}`}
                  className="group"
                >
                  <article className="space-y-4">
                    <div className="relative h-48 rounded-xl overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div>
                      <p className="text-xs uppercase font-semibold text-gray-500">
                        {item.category}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold group-hover:text-red-600 transition">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {item.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

/* -----------------------------
   Share Button
----------------------------- */
function ShareBtn({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      className="
        h-9 w-9 flex items-center justify-center
        rounded-full border border-gray-200
        text-gray-600 hover:bg-gray-100 transition
      "
    >
      {icon}
    </a>
  );
}
