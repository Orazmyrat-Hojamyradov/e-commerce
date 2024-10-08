"use client";

import PageHeader from "../_components/PageHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, XCircle } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";
import { products } from "@/lib/data";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function AdminProductPage() {
  const { data: session } = useSession();

  if (!session)
    return (
      <div className="w-full h-full text-center">
        <Link
          href="/auth/signin"
          className="w-full font-bold text-2xl text-center"
        >
          Sign In to see this page
        </Link>
      </div>
    );
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Products</PageHeader>
      </div>
      <ProductsTable />
    </>
  );
}

async function ProductsTable() {
  if (products.length === 0) return <p>No products found</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Available for purchase</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              {product.isAvailableForPurchase ? (
                <>
                  <CheckCircle2 />
                  <span className="sr-only">Available</span>
                </>
              ) : (
                <>
                  <XCircle className="stroke-destructive" />
                  <span className="sr-only">Unavailable</span>
                </>
              )}
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
            <TableCell>
              {formatCurrency((product.priceInCents / 100) * 2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
