"use client";

import { useEffect, useState } from "react";
import { CartDialog } from "./CartDialog";
import { CiShoppingCart } from "react-icons/ci";
import Link from "next/link";
import { Cart } from "@/shopping-cart/data/cart";
import { useRouter } from "next/navigation";

interface CartPageProps {
  items: Cart[];
  totalItems: number;
}

export const CartPage = ({ items, totalItems }: CartPageProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      router.refresh();
    }
  }, [open, router]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 flex h-10 items-center justify-center rounded-xl border border-gray-200/60 bg-gray-100 active:bg-gray-200"
      >
        {totalItems > 0 && (
          <span className="text-sm transition-all pr-1 pl-1 text-white bg-blue-400 rounded-l text-center justify-center font-bold">
            {totalItems}
          </span>
        )}
        <CiShoppingCart size={25} />
      </button>
      <CartDialog open={open} items={items} onClose={() => setOpen(false)} />
    </>
  );
};
