import React, { useState, useEffect } from "react";
export const WishlistContext = React.createContext();
export function WishlistProvider({ children }) {
  const [wishlistIds, setWishlistIds] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistIds(data);
  }, []);
  const addToWishlist = (id) => {
    setWishlistIds((prev) => {
      const exists = prev.some((item) => item.toString() === id.toString());
      if (exists) return prev;
      const newWishlist = [...prev, id];
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      return newWishlist;
    });
  };
  const removeFromWishlist = (id) => {
    setWishlistIds((prev) => {
      const newWishlist = prev.filter((item) => item.toString() !== id.toString());
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      return newWishlist;
    });
  };
  const isInWishlist = (id) => {
    return wishlistIds.some((item) => item.toString() === id.toString());
  };
  const toltalitem = wishlistIds.length;
  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toltalitem
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}