"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import PageHeader from "../_components/PageHeader";
import { users } from "@/lib/data";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function UsersPage() {
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
      <PageHeader>Customers</PageHeader>
      <UsersTable />
    </>
  );
}

async function UsersTable() {
  if (users.length === 0) return <p>No customers found</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead>Value</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, i) => (
          <TableRow key={user.id}>
            <TableCell>{user.email}</TableCell>
            <TableCell>{formatNumber(users.length - i)}</TableCell>
            <TableCell>{formatCurrency(i * 5)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
