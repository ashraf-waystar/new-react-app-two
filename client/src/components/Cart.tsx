import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Service } from "@shared/schema";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Cart() {
  const { state, removeFromCart, clearCart } = useCart();
  const { data: services } = useQuery<Service[]>({ 
    queryKey: ["/api/services"]
  });

  if (!services) return null;

  const cartItems = Object.values(state.items).map(item => {
    const service = services.find(s => s.id === item.serviceId);
    return {
      ...item,
      service
    };
  }).filter(item => item.service);

  const total = cartItems.reduce((sum, item) => {
    return sum + (Number(item.service!.price) * item.quantity);
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-gray-500">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 -mx-6 px-6">
        <div className="space-y-4">
          {cartItems.map(({ service, quantity }) => (
            <div key={service!.id} className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{service!.name}</h3>
                <p className="text-sm text-gray-500">
                  ${Number(service!.price).toLocaleString()} x {quantity}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFromCart(service!.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t mt-4 pt-4 space-y-4">
        <div className="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span>${total.toLocaleString()}</span>
        </div>
        <div className="space-y-2">
          <Button className="w-full" size="lg">
            Checkout
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => clearCart()}
          >
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
