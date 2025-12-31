import IndexProducts from "./components/IndexProducts";
import { getProductsByType } from "@/actions/getProductsByType";


// Make the page async to safely unwrap params
export default async function ProductIndexPage() {


 const products = await getProductsByType();

  if (!products) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Product not found
      </div>
    );
  }

  return <IndexProducts products={products as any} />;
}
