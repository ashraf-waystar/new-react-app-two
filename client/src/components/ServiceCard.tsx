import { Service } from "@shared/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="overflow-hidden rounded-2xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg bg-gradient-to-br from-white to-blue-50">
      <div className="aspect-video w-full overflow-hidden rounded-t-2xl">
        <img
          src={service.image}
          alt={service.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          {service.name}
        </CardTitle>
        <CardDescription className="text-gray-600">{service.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-gray-900">${Number(service.price).toLocaleString()}</p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 shadow-md"
          onClick={() => addToCart(service.id)}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}