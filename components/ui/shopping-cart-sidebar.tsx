'use client';

import { useCart } from '@/context/cart-context';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';

export function ShoppingCartSidebar() {
  const {
    isOpen,
    setIsOpen,
    items,
    removeItem,
    updateItemQuantity,
    totalPrice,
    totalItems,
    clearCart
  } = useCart();

  const handleQuantityChange = (id: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      updateItemQuantity(id, newQuantity);
    } else {
      removeItem(id);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex flex-col bg-black/80 backdrop-blur-lg text-white border-gray-800">
        <SheetHeader>
          <SheetTitle className="text-white text-2xl font-bold">Ваша Корзина ({totalItems})</SheetTitle>
        </SheetHeader>
        {items.length > 0 ? (
          <>
            <ScrollArea className="flex-grow my-4 pr-4">
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-2 rounded-lg bg-gray-900/50">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-grow">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-400 text-sm">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleQuantityChange(item.id, item.quantity, -1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleQuantityChange(item.id, item.quantity, 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-5 w-5 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="flex flex-col gap-4 mt-auto pt-4 border-t border-gray-800">
                <div className="flex justify-between items-center text-xl font-bold">
                    <span>Итого:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">Оформить заказ</Button>
                <Button size="lg" variant="outline" className="w-full" onClick={clearCart}>Очистить корзину</Button>
            </SheetFooter>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center">
            <p className="text-2xl font-semibold">Ваша корзина пуста</p>
            <p className="text-gray-400 mt-2">Добавьте товары, чтобы они появились здесь.</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
