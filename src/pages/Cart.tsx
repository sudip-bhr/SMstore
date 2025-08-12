import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Minus, Plus, Trash } from "lucide-react";
import CheckoutModal from "./CheckoutModal";

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeItem, clearCart } = useCart();
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
        <p className="mb-6 text-gray-600">Looks like you haven’t added any products yet.</p>
        <Button asChild>
          <Link to="/products">Shop Now</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="flex items-center gap-3">
                    <img src={item.images[0]} alt={item.title} className="w-16 h-16 object-cover rounded" />
                    {item.title}
                  </TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Input type="number" value={item.quantity} readOnly className="w-16 text-center" />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" className="text-red-600 hover:text-red-700" onClick={() => removeItem(item._id)}>
                      <Trash className="w-5 h-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 md:hidden">
          {cart.map((item) => (
            <Card key={item._id}>
              <CardHeader className="flex flex-row items-center gap-4">
                <img src={item.images[0]} alt={item.title} className="w-20 h-20 object-cover rounded" />
                <div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
                </div>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input type="number" value={item.quantity} readOnly className="w-16 text-center" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => removeItem(item._id)}
                >
                  <Trash className="w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <aside className="mt-8 md:w-96 bg-gray-50 rounded-lg p-6 shadow-md h-fit ml-auto">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <Button className="w-full" onClick={() => setCheckoutOpen(true)}>
            Proceed to Checkout
          </Button>
          <Button variant="outline" className="mt-3 w-full text-red-600" onClick={clearCart}>
            Clear Cart
          </Button>
        </aside>
      </main>

      <CheckoutModal
        open={isCheckoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        subtotal={subtotal}
        clearCart={clearCart}
      />
    </>
  );
};

export default Cart;











