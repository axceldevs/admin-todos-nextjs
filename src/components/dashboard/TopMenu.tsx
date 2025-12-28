import {
  CiChat1,
  CiMenuBurger,
  CiSearch,
} from "react-icons/ci";

import { cookies } from "next/headers";
import { CartPage } from "@/components/dashboard/CartPage";
import { products } from "@/products/data/products";
import { Cart } from "@/shopping-cart/data/cart";

const getTotalItems = (cart: { [id: string]: number }) => {
  let items = 0;
  Object.values(cart).forEach((quantity) => {
    items += quantity;
  });
  return items;
};

const getItemsCart = (cart: { [id: string]: number }): Cart[] => {
  const itemCart: Cart[] = [];
  products.forEach((product) => {
    if (cart[product.id]) {
      itemCart.push({ product, quantity: cart[product.id] });
    }
  });
  return itemCart;
}

export const TopMenu = async () => {

  const cookieStore = await cookies();
  const cart = JSON.parse(cookieStore.get("cart")?.value || "{}") as {
    [id: string]: number;
  };

  const totalItems = getTotalItems(cart);

  const itemsCart = getItemsCart(cart);

  return (
    <div className="sticky top-0 z-10 h-16 border-b border-gray-200/60 bg-white">
      <div className="flex h-full items-center justify-between px-6 gap-4">
        {/* Título */}
        <h5 className="hidden text-2xl font-medium text-gray-600 lg:block">
          Dashboard
        </h5>

        {/* Menú hamburguesa */}
        <button className="lg:hidden flex items-center justify-center w-12 h-full border-r border-gray-200/60">
          <CiMenuBurger size={30} />
        </button>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          {/* Search desktop */}
          <div className="hidden md:block">
            <div className="relative flex items-center text-gray-400 focus-within:text-cyan-500">
              <span className="absolute left-4 flex h-6 items-center pr-3 border-r border-gray-200/60">
                <CiSearch />
              </span>
              <input
                type="search"
                placeholder="Search here"
                className="w-full rounded-xl border border-gray-300 py-2.5 pl-14 pr-4 text-sm text-gray-600 outline-none transition focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Search mobile */}
          <button className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200/60 bg-gray-100 active:bg-gray-200">
            <CiSearch />
          </button>

          {/* Chat */}
          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200/60 bg-gray-100 active:bg-gray-200">
            <CiChat1 size={25} />
          </button>

          {/* Notificaciones */}
          <CartPage totalItems={totalItems} items={itemsCart} />
        </div>
      </div>
    </div>
  );
};
