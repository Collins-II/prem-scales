import { Product, PRODUCTS } from "@/data/dummy";
import IndexDetailsPage from "./components";

interface ProductDetailsProps {
  params: { slug: string };
}

// Make the page async to safely unwrap params
export default async function ProductDetailsPage({ params }: ProductDetailsProps) {
  // If params is a promise, await it
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  console.log("DETAILS_SLUG", slug);

  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Product not found
      </div>
    );
  }

  return <IndexDetailsPage product={product as Product} />;
}
