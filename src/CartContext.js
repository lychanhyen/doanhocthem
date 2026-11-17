import React from "react";
import { useState, useEffect, useRef } from "react";
import { getCart, setCart, subscribeCart } from "./cartStorage";
export const CartContext = React.createContext();
export function CartProvider({ children }) {
  const [cart, setCartState] = useState(getCart());
  const isUpdatingFromRedux = useRef(false);
  useEffect(function () {
    const unsubscribe = subscribeCart(function (e) {
      if (e.detail && e.detail.source === 'context') return;
      isUpdatingFromRedux.current = true;
      setCartState(getCart());
    });
    return unsubscribe;
  }, []);
  useEffect(function () {
    isUpdatingFromRedux.current = false;
  }, [cart]);
  const addToCart = (product, quantity = 1) => {
    const existing = cart.find((i) => i.id.toString() === product.id.toString());
    let newCart;
    if (existing) {
      newCart = cart.map((i) =>
        i.id.toString() === product.id.toString()
          ? { ...i, quantity: (i.quantity || 1) + quantity }
          : i
      );
    } else {
      newCart = [...cart, { ...product, quantity }];
    }
    setCartState(newCart);
    setCart(newCart, 'context');
  };
  const updateQuantity = (id, delta) => {
    const newCart = cart.map((item) => {
      if (item.id.toString() === id.toString()) {
        const newQty = (item.quantity || 1) + delta;
        return { ...item, quantity: newQty < 1 ? 1 : newQty };
      }
      return item;
    });
    setCartState(newCart);
    setCart(newCart, 'context');
  };
  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id.toString() !== id.toString());
    setCartState(newCart);
    setCart(newCart, 'context');
  };
  const clearCart = () => {
    setCartState([]);
    setCart([], 'context');
  };
  const toltalitem = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, toltalitem }}
    >
      {children}
    </CartContext.Provider>
  );
}