import { Link } from "wouter";
import { Menu, ShoppingCart } from "lucide-react";
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
import { useState } from "react";

export default function Navbar() {
  const { state } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

          <div className="flex items-center gap-2">
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

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-8">
                  <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                    <a className="text-lg hover:text-primary">Home</a>
                  </Link>
                  <Link href="/services" onClick={() => setMobileMenuOpen(false)}>
                    <a className="text-lg hover:text-primary">Services</a>
                  </Link>
                  <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
                    <a className="text-lg hover:text-primary">About</a>
                  </Link>
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                    <a className="text-lg hover:text-primary">Contact</a>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}