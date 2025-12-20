import { NEWS } from "@/data/dummy";
import IndexDetailsPage from "./components";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: { slug: string };
}

/* -----------------------------
   SEO + OpenGraph
----------------------------- */
export function generateMetadata({ params }: PageProps): Metadata {
  const article = NEWS.find(n => n.slug === params.slug);
  if (!article) return {};

  return {
    title: `${article.title} | Press & News`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: "article",
    },
  };
}

// Make the page async to safely unwrap params
export default async function NewsDetailsPage({ params }: PageProps) {
  // If params is a promise, await it
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const article = NEWS.find(n => n.slug === slug);
  if (!article) return notFound();


  return <IndexDetailsPage article={article} />;
}
