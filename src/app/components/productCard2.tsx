// Server Component
"use client";

import db from "@/db/db";
import { ProductCard } from "./ProductCard";

export default async function ProductList() {
  // const products = await db.product.findMany(); // Fetch products from database

  return (
    <div>
      {/* {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          priceInCents={product.priceInCents}
          descryption={product.descryption}
          imagePath={product.imagePath}
        />
      ))} */}
    </div>
  );
}
