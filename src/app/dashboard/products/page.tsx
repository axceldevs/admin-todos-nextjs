import { products } from "@/products/data/products";
import { ProductCard } from "@/products/components/ProductCard";

export default function ProductsPage() {
  return (
    <div
      className="
  grid
  gap-4
  px-3
  sm:px-4
  md:px-6
  grid-cols-[repeat(auto-fit,minmax(220px,1fr))]
"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
