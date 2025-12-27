import IndexProducts from "./components/IndexProducts";
import { getProductsByType } from "@/actions/getProductsByType";

interface ProductIndexProps {
  params: { slug: string };
}

// Make the page async to safely unwrap params
export default async function ProductIndexPage({ params }: ProductIndexProps) {
  // If params is a promise, await it
  const resolvedParams = await params;
  const { slug } = resolvedParams;

 const products = await getProductsByType(slug);

  if (!products) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Product not found
      </div>
    );
  }

  return <IndexProducts products={products as any} />;
}
