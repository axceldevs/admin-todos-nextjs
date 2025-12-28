"use client";

import { getCookie, hasCookie, setCookie } from "cookies-next";

export const getCookieCart = (): { [id: string]: number } => {
  if (hasCookie("cart")) {
    const cookieCart = JSON.parse((getCookie("cart") as string) ?? "{}");
    return cookieCart;
  }
  return {};
};

export const addProductToCart = (id: string): void => {
  console.log("Adding product to cart:", id);
  const cookieCart = getCookieCart();
  if (cookieCart[id]) {
    cookieCart[id] += 1;
  } else {
    cookieCart[id] = 1;
  }
  setCookie("cart", JSON.stringify(cookieCart));
};

export const removeProductFromCart = (id: string): void => {
  const cookieCart = getCookieCart();
  if (cookieCart[id]) {
    delete cookieCart[id];
  }
  setCookie("cart", JSON.stringify(cookieCart));
};

export const removeSingleItemFromCart = (id: string): void => {
  console.log("Removing single item from cart:", id);
  const cookieCart = getCookieCart();

  if (!cookieCart[id]) return;

  const itemQuantity = cookieCart[id] - 1;

  if (itemQuantity <= 0) {
    delete cookieCart[id];
  } else {
    cookieCart[id] = itemQuantity;
  }

  setCookie("cart", JSON.stringify(cookieCart));
};
