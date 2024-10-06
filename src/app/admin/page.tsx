import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { products } from "@/lib/data";

export default async function AdminDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCardProps
        title="Sales"
        subtitle={`${products.length - 4} Orders`}
        body={0}
      />
      <DashboardCardProps
        title="Customers"
        subtitle={`${3 / 3} Average Value`}
        body={3}
      />
      <DashboardCardProps
        title="Active products"
        subtitle={`1 Inactive`}
        body={products.length}
      />
    </div>
  );
}

type DashboardCardProps = {
  title: string;
  subtitle: string;
  body: number;
};

function DashboardCardProps({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardDescription className="px-6">{subtitle}</CardDescription>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}
