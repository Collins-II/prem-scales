import { Product } from "@/data/dummy";
import IndexDetailsPage from "./components";
import { getProductBySlug } from "@/actions/getProductBySlug";

interface ProductDetailsProps {
  params: { slug: string };
}

// Make the page async to safely unwrap params
export default async function ProductDetailsPage({ params }: ProductDetailsProps) {
  // If params is a promise, await it
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Product not found
      </div>
    );
  }

  return <IndexDetailsPage product={product as Product} />;
}
