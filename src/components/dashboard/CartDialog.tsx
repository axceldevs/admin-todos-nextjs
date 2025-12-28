"use client";
import {
  addProductToCart,
  removeSingleItemFromCart,
} from "@/shopping-cart/actions/actions";
import { Cart } from "@/shopping-cart/data/cart";
import { formatCOP } from "@/shopping-cart/helpers/format-money";
import { useEffect, useMemo, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";

interface CartDialogProps {
  open: boolean;
  onClose: () => void;
  items?: Cart[];
}

export const CartDialog = ({ open, onClose, items = [] }: CartDialogProps) => {
  if (!open) return null;

  const [cartItems, setCartItems] = useState<Cart[]>([]);

  useEffect(() => {
    setCartItems(items);
  }, [items]);

  const increaseQuantity = (productId: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

    addProductToCart(productId);
  };

  const decreaseQuantity = (productId: string) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );

    removeSingleItemFromCart(productId);
  };

  const priceTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }, [cartItems]);

  const IVA_RATE = 0.19;

  const subtotal = priceTotal;
  const iva = useMemo(() => subtotal * IVA_RATE, [subtotal]);
  const total = useMemo(() => subtotal + iva, [subtotal, iva]);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute right-0 top-0 h-full w-1/2 bg-white shadow-xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h1 className="text-xl font-semibold">Carrito de compras</h1>
            <p className="text-sm text-gray-500">
              Revisa tus productos antes de pagar
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length > 0 ? (
            <ul className="space-y-4">
              {cartItems.map((item) => {
                const subtotal = item.product.price * item.quantity;
                return (
                  <li key={item.product.id} className="flex items-center gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />

                    <div className="flex-1">
                      <h2 className="font-medium">{item.product.name}</h2>
                      <p className="text-sm text-gray-500">
                        {formatCOP(item.product.price)} × {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        Subtotal: {formatCOP(subtotal)}
                      </p>
                    </div>

                    {/* Controles */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.product.id)}
                        className="w-8 h-8 rounded-full border hover:bg-gray-100"
                      >
                        −
                      </button>

                      <span className="w-6 text-center font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.product.id)}
                        className="w-8 h-8 rounded-full border hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <FiShoppingCart size={48} className="text-gray-300" />
              <p className="text-sm text-gray-500">Tu carrito está vacío</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {/* Footer */}
        <div className="p-4 border-t space-y-3">
          {/* Subtotal */}
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>{formatCOP(subtotal)}</span>
          </div>

          {/* IVA */}
          <div className="flex justify-between text-sm text-gray-600">
            <span>IVA (19%)</span>
            <span>{formatCOP(iva)}</span>
          </div>

          {/* Total */}
          <div className="border-t pt-3 flex justify-between items-center">
            <span className="text-lg font-medium">Total</span>
            <span className="text-lg font-semibold">{formatCOP(total)}</span>
          </div>

          <button className="w-full bg-black text-white py-3 rounded-lg mt-2">
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
};
