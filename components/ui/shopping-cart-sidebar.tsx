"use client";

import { useCart, CartItem } from '@/context/cart-context';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { X, Plus, Minus } from "lucide-react";

export const ShoppingCartSidebar = () => {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6 pt-6">
          <SheetTitle>Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto">
            <ScrollArea className="h-full">
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-6">
                        <p className="text-muted-foreground">Your cart is empty.</p>
                        <Button variant="outline" className="mt-4" onClick={() => setIsCartOpen(false)}>
                            Continue Shopping
                        </Button>
                    </div>
                ) : (
                    <div className="pr-6">
                        {cartItems.map((item: CartItem) => (
                        <div key={item.id} className="flex items-center space-x-4 py-4 px-6 border-b">
                            <div className="relative h-16 w-16 overflow-hidden rounded">
                            <Image
                                src={item.image || "https://placehold.co/64x64/222/fff?text=?"}
                                alt={item.name}
                                fill
                                style={{objectFit:"cover"}}
                            />
                            </div>
                            <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                            <div className="flex items-center space-x-2 mt-2">
                                <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                    <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                 <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                    <Plus className="h-3 w-3" />
                                </Button>
                            </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        ))}
                    </div>
                )}
            </ScrollArea>
        </div>
        
        {cartItems.length > 0 && (
          <SheetFooter className="p-6 border-t bg-background/95 backdrop-blur-sm">
            <div className="w-full space-y-4">
                 <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
                <Button className="w-full">Proceed to Checkout</Button>
                <Button variant="outline" className="w-full" onClick={clearCart}>Clear Cart</Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
