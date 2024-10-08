import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import AddToCartButton from "./AddToCartBtn";
import { Product } from "@/lib/data";

export type ProductCardProps = {
  id: number;
  name: string;
  priceInCents: number;
  description: string;
  imagePath: string;
};

export function ProductCard(data: Product) {
  return (
    <Card className="flex overflow-hidden flex-col">
      <div className="relative w-[60%] h-auto m-auto aspect-square">
        <Image
          className="p-4 h-full w-full"
          priority
          src={data.imagePath}
          height={400}
          width={400}
          alt={data.name}
        />
      </div>
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
        <CardDescription>
          {formatCurrency(data.priceInCents / 100)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-4">{data.description}</p>
      </CardContent>
      <CardFooter>
        <AddToCartButton product={data} />
      </CardFooter>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="flex overflow-hidden flex-col animate-pulse">
      <div className=" w-full aspect-video bg-gray-300"></div>
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300"></div>
        </CardTitle>
        <CardDescription>
          <div className="w-1/2 h-4 rounded-full bg-gray-300"></div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300"></div>
        <div className="w-full h-4 rounded-full bg-gray-300"></div>
        <div className="w-3/4 h-4 rounded-full bg-gray-300"></div>
      </CardContent>
      <CardFooter>
        <Button disabled size="lg" className="w-full"></Button>
      </CardFooter>
    </Card>
  );
}
