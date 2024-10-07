import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProductCard, ProductCardSkeleton } from "../components/ProductCard";
import { Suspense } from "react";
import { products, Product } from "@/lib/data";

export default function HomePage() {
  return (
    <main className="space-y-12">
      <ProductGridSection title="Most Popular" productsFetcher={products} />
      <ProductGridSection title="Newest" productsFetcher={products} />
    </main>
  );
}

type ProductGridSectionProps = {
  title: string;
  productsFetcher: Product[];
};

function ProductGridSection({ title }: ProductGridSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button variant="outline" asChild>
          <Link href="/products" className="space-x-2">
            <span> View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <div>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </div>
          }
        >
          <ProductSuspense productFetcher={products} />
        </Suspense>
      </div>
    </div>
  );
}

async function ProductSuspense({}: { productFetcher: Product[] }) {
  return products.map((product: Product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
