import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";
import type { CartItem } from "../context/CartContext";
import { toast } from "sonner";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  subtotal: number;
  clearCart: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ open, onClose, cart, subtotal, clearCart }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    const serviceID = "service_1gu2x03";
    const templateID = "template_rgj4v1k"; // admin template
    const publicKey = "OUE99KDakT-SxRtjI";

    const orderDetails = cart
      .map((item) => `${item.title} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`)
      .join("\n");

    try {
      await emailjs.send(
        serviceID,
        templateID,
        {
          customer_name: name,
          customer_email: email,
          customer_phone: phone,
          customer_address: address,
          order_summary: orderDetails,
          order_total: subtotal.toFixed(2),
        },
        publicKey
      );

      clearCart();
      onClose();
      toast("Order placed! Admin will be notified.");
    } catch (error) {
      console.error("Email send failed:", error);
      toast("Failed to send order email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="backdrop-blur-lg max-w-lg">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>

        <div className="mt-4">
          <p className="font-semibold mb-2">Order Summary</p>
          <ul className="text-sm text-gray-600 max-h-32 overflow-y-auto">
            {cart.map((item) => (
              <li key={item._id}>
                {item.title} x {item.quantity} — ${(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="mt-2 font-bold">Total: ${subtotal.toFixed(2)}</p>
        </div>

        <Button onClick={handleCheckout} disabled={loading} className="w-full mt-4">
          {loading ? "Placing Order..." : "Confirm Order"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;






