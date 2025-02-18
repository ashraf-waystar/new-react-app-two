import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Service } from "@shared/schema";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

// Google Sheets submission URL
const FORM_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxTGMgJ0wvGAsq7BaikEKj6CWYt_vXx2Ccerg0q6zo8dH3KBwlb7N0AoZoU528vUSQF/exec";

export default function Cart() {
  const { state, removeFromCart, clearCart } = useCart();
  const { data: services } = useQuery<Service[]>({ 
    queryKey: ["/api/services"]
  });
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const { toast } = useToast();

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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneDigits = phone.replace(/\D/g, '');
    return phoneDigits.length >= 10;
  };

  const handleCheckout = async () => {
    if (!formData.name.trim()) {
      toast({
        title: "Please enter your name",
        variant: "destructive"
      });
      return;
    }
    if (!validateEmail(formData.email)) {
      toast({
        title: "Please enter a valid email",
        variant: "destructive"
      });
      return;
    }
    if (!validatePhone(formData.phone)) {
      toast({
        title: "Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('idea', cartItems.map(item => 
        `${item.service!.name} (Quantity: ${item.quantity})`
      ).join(', '));
      formDataToSend.append('additional_info', 'Submitted through checkout process');

      await fetch(FORM_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formDataToSend
      });

      toast({
        title: "Order submitted successfully!",
        description: "We'll contact you soon to process your order."
      });
      clearCart();
      setCheckoutOpen(false);
    } catch (error) {
      toast({
        title: "Error submitting order",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <Button 
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 shadow-md"
            onClick={() => setCheckoutOpen(true)}
          >
            Checkout
          </Button>
          <Button
            variant="outline"
            className="w-full rounded-xl"
            onClick={() => clearCart()}
          >
            Clear Cart
          </Button>
        </div>
      </div>

      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Complete Your Order</DialogTitle>
            <DialogDescription>
              Please provide your contact information to process your order.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
            <Input
              type="tel"
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
            <Button 
              onClick={handleCheckout} 
              disabled={isSubmitting}
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 shadow-md"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : null}
              Submit Order
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}