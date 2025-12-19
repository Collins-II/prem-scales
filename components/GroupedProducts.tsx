import { PRODUCTS, Product } from "@/data/dummy";
import ProductListing from "@/components/ProductListing";

// Group products by category
const groupedProducts: Record<string, Product[]> = PRODUCTS.reduce(
  (acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  },
  {} as Record<string, Product[]>
);

// Render listings
export default function GroupedProducts() {
  return (
    <div className="space-y-8">
      {Object.entries(groupedProducts).map(([category, products], index) => (
        <ProductListing
          key={index}
          title={category}                // Category title
          categoryLabel={category}        // Label for banner
          bannerImage={products[0].image || "/placeholder.png"} // pick first product image as banner
          products={products}
          viewAllHref={`/products/${category.toLowerCase()}`} // optional
        />
      ))}
    </div>
  );
}
