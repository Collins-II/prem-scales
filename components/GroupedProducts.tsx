import ProductListing from "@/components/ProductListing";
import { GroupedProducts } from "@/types/products";

// Group products by category

interface GroupedProps {
  groupedProducts: GroupedProducts;
}

// Render listings
export default function GroupedProductsPage({ groupedProducts }: GroupedProps) {
  return (
    <div className="space-y-8">
      {Object.entries(groupedProducts).map(([category, products], index) => (
        <ProductListing
          key={index}
          title={category}                // Category title
          categoryLabel={category}        // Label for banner
          bannerImage={products[0].image || "/placeholder.png"} // pick first product image as banner
          products={products}
          viewAllHref={`/Products/${category.toLowerCase()}`} // optional
        />
      ))}
    </div>
  );
}
