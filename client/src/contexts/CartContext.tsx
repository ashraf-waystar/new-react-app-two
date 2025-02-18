import { createContext, useContext, useReducer, ReactNode } from "react";
import { CartItem, Service } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface CartState {
  items: Record<number, CartItem>;
}

type CartAction =
  | { type: "ADD_ITEM"; serviceId: number }
  | { type: "REMOVE_ITEM"; serviceId: number }
  | { type: "CLEAR_CART" };

const CartContext = createContext<{
  state: CartState;
  addToCart: (serviceId: number) => void;
  removeFromCart: (serviceId: number) => void;
  clearCart: () => void;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const currentQuantity = state.items[action.serviceId]?.quantity || 0;
      return {
        ...state,
        items: {
          ...state.items,
          [action.serviceId]: { serviceId: action.serviceId, quantity: currentQuantity + 1 }
        }
      };
    }
    case "REMOVE_ITEM": {
      const { [action.serviceId]: _, ...rest } = state.items;
      return { ...state, items: rest };
    }
    case "CLEAR_CART":
      return { items: {} };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: {} });
  const { toast } = useToast();

  const addToCart = (serviceId: number) => {
    dispatch({ type: "ADD_ITEM", serviceId });
    toast({
      title: "Service added to cart",
      description: "The service has been added to your cart"
    });
  };

  const removeFromCart = (serviceId: number) => {
    dispatch({ type: "REMOVE_ITEM", serviceId });
    toast({
      title: "Service removed from cart",
      description: "The service has been removed from your cart"
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart"
    });
  };

  return (
    <CartContext.Provider value={{ state, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
