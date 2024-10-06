import { ProductCard, ProductCardSkeleton } from "@/app/components/ProductCard";
import { Suspense } from "react";
import { products } from "@/lib/data";

export default function ProductsPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold m-4">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <div>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </div>
          }
        >
          <ProductSuspense />
        </Suspense>
      </div>
    </div>
  );
}

async function ProductSuspense() {
  return products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
