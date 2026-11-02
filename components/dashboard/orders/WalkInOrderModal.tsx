"use client";

import React, { useState } from "react";
import { Store } from "lucide-react";
import { Order, StockItem } from "@/types/dashboard";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";

interface WalkInOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stockItems: StockItem[];
  onCreateOrder: (order: Omit<Order, "id" | "orderNumber" | "createdAt" | "isDeleted">) => void;
}

export function WalkInOrderModal({ open, onOpenChange, stockItems, onCreateOrder }: WalkInOrderModalProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<Order["paymentMethod"]>("Cash");
  const [facility, setFacility] = useState("Phnom Penh BKK1 Flagship");
  const [selectedSku, setSelectedSku] = useState(stockItems[0]?.sku || "");
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState<Order["items"]>([]);

  const handleAddItem = () => {
    const stockItem = stockItems.find((s) => s.sku === selectedSku);
    if (!stockItem) return;

    const newItem = {
      id: `item-${Date.now()}`,
      productId: stockItem.id,
      productName: stockItem.productName,
      sku: stockItem.sku,
      quantity: Number(quantity),
      unitPrice: stockItem.sellingPrice,
      totalPrice: stockItem.sellingPrice * Number(quantity),
    };

    setCartItems((prev) => [...prev, newItem]);
    setQuantity(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || cartItems.length === 0) return;

    const totalAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

    onCreateOrder({
      customerName,
      customerEmail: customerEmail || `${customerName.toLowerCase().replace(/\s+/g, ".")}@guest.luxe.com`,
      customerPhone,
      orderType: "walk-in",
      items: cartItems,
      totalAmount,
      paymentMethod,
      status: "completed",
      facilityName: facility,
    });

    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
    setCartItems([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="max-w-xl">
      <DialogHeader>
        <div className="flex items-center gap-2">
          <Store className="text-[#c5a880]" size={20} />
          <div>
            <DialogTitle>Create Walk-in POS Order</DialogTitle>
            <DialogDescription>
              Process a direct boutique client order with real-time stock lookup
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4 py-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Customer Full Name *"
            required
            placeholder="e.g. Jean-Luc Fontane"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <Input
            label="Contact Phone"
            placeholder="+855 12 000 000"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Boutique Location"
            value={facility}
            onChange={(e) => setFacility(e.target.value)}
          >
            <option value="Phnom Penh BKK1 Flagship">Phnom Penh BKK1 Flagship</option>
            <option value="Riverside Luxury Atelier">Riverside Luxury Atelier</option>
            <option value="Siem Reap Heritage Boutique">Siem Reap Heritage Boutique</option>
          </Select>

          <Select
            label="Payment Method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as Order["paymentMethod"])}
          >
            <option value="Cash">Cash (Counter POS)</option>
            <option value="Bakong KHQR">Bakong KHQR Instant</option>
            <option value="Credit Card">Credit Card (Visa/Mastercard)</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </Select>
        </div>

        {/* Add Item to order */}
        <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 space-y-3">
          <div className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
            Add Products to Order
          </div>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-7">
              <Select
                value={selectedSku}
                onChange={(e) => setSelectedSku(e.target.value)}
              >
                {stockItems
                  .filter((s) => !s.isDeleted && s.currentStock > 0)
                  .map((item) => (
                    <option key={item.sku} value={item.sku}>
                      {item.productName} ({formatCurrency(item.sellingPrice)}) - {item.currentStock} in stock
                    </option>
                  ))}
              </Select>
            </div>
            <div className="col-span-2">
              <Input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
            <div className="col-span-3">
              <Button
                type="button"
                variant="secondary"
                className="w-full text-xs"
                onClick={handleAddItem}
              >
                Add Item
              </Button>
            </div>
          </div>

          {/* Current cart items */}
          {cartItems.length > 0 && (
            <div className="divide-y divide-neutral-200 dark:divide-neutral-800 text-xs">
              {cartItems.map((item, index) => (
                <div key={index} className="py-2 flex items-center justify-between">
                  <div>
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                      {item.productName}
                    </span>
                    <span className="text-neutral-400 ml-2">
                      x{item.quantity} @ {formatCurrency(item.unitPrice)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {formatCurrency(item.totalPrice)}
                    </span>
                    <button
                      type="button"
                      onClick={() => setCartItems((prev) => prev.filter((_, i) => i !== index))}
                      className="text-rose-500 hover:text-rose-700 p-1"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
              <div className="pt-2 flex justify-between font-bold text-sm text-neutral-900 dark:text-neutral-100">
                <span>Grand Total:</span>
                <span>
                  {formatCurrency(cartItems.reduce((sum, item) => sum + item.totalPrice, 0))}
                </span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="gold"
            size="sm"
            disabled={!customerName || cartItems.length === 0}
          >
            Confirm & Print Receipt
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
