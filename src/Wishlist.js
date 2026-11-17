import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { WishlistContext } from "./WishlistContext"; 
function Wishlist() {
  const { wishlistIds, removeFromWishlist } = useContext(WishlistContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/laravel8/public/api/product")
      .then((res) => setProducts(res.data.data || []))
      .catch((err) => console.log("API Error:", err));
  }, []);

  const getFirstImage = (imageJson) => {
    if (!imageJson) return "";
    try {
      const parsed = typeof imageJson === "string" ? JSON.parse(imageJson) : imageJson;
      if (Array.isArray(parsed)) return parsed[0] || "";
      if (typeof parsed === "string") return parsed;
      return "";
    } catch {
      return typeof imageJson === "string" ? imageJson : "";
    }
  };

  const wishlistProducts = products.filter((p) =>
    wishlistIds.some((id) => id.toString() === p.id.toString())
  );

  if (wishlistProducts.length === 0) {
    return (
      <div className="col-sm-9 padding-right">
        <h2 className="title text-center">Wishlist</h2>
        <p className="text-center">Chưa có sản phẩm yêu thích nào.</p>
      </div>
    );
  }

  return (
    <div className="col-sm-9 padding-right">
      <h2 className="title text-center">Wishlist ({wishlistProducts.length})</h2>
      <div className="features_items">
        {wishlistProducts.map((item) => {
          const imageName = getFirstImage(item.image);
          return (
            <div className="col-sm-4" key={item.id}>
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img
                      src={`http://localhost/laravel8/public/upload/product/${item.id_user}/${imageName}`}
                      alt={item.name}
                    />
                    <h2>{item.price}$</h2>
                    <p>{item.name}</p>
                    <button
                      className="btn btn-default add-to-cart"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <i className="fa fa-trash" /> Remove
                    </button>
                  </div>
                </div>
                <div className="choose">
                  <ul className="nav nav-pills nav-justified">
                    <li>
                      <Link to={`/productdetail/${item.id}`}>More</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Wishlist;