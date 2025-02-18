import { Link } from "wouter";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Cart from "./Cart";
import { useCart } from "@/contexts/CartContext";

export default function Navbar() {
  const { state } = useCart();
  const itemCount = Object.values(state.items).reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="text-2xl font-bold">Agency</a>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link href="/"><a className="hover:text-primary">Home</a></Link>
            <Link href="/services"><a className="hover:text-primary">Services</a></Link>
            <Link href="/about"><a className="hover:text-primary">About</a></Link>
            <Link href="/contact"><a className="hover:text-primary">Contact</a></Link>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full h-5 w-5 text-xs flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
                <SheetDescription>
                  Review your selected services
                </SheetDescription>
              </SheetHeader>
              <Cart />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
