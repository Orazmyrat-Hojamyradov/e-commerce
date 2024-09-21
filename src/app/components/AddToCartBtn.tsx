import { Button } from "@/components/ui/button";

export const AddToCartButton: React.FC<{ productId: string }> = ({
  productId,
}) => {
  return <Button className=" text-white px-4 py-2 rounded">Add to Cart</Button>;
};
