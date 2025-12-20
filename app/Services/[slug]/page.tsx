import { SERVICE_DETAILS } from "@/data/dummy";
import IndexDetailsPage from "./components";
import { notFound } from "next/navigation";
import { getRelatedProducts } from "@/lib/utils";

interface ProductDetailsProps {
  params: { slug: string };
}

// Make the page async to safely unwrap params
export default async function ServiceDetailsPage({ params }: ProductDetailsProps) {
  // If params is a promise, await it
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const service = SERVICE_DETAILS.find(s => s.slug === slug);
  if (!service) return notFound();

  const relatedProducts = getRelatedProducts(service.relatedProductTags);


  return <IndexDetailsPage service={service} related={relatedProducts} />;
}
