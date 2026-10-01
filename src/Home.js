import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function Home() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios.get("http://localhost/laravel8/public/api/product")
      .then(res => {
        setProduct(res.data.data || []);
      })
      .catch(err => console.log("API Error:", err));
  }, []);
  const getFirstImage = (imageJson) => {
    if (!imageJson) return '';
    try {
      const parsedImages = typeof imageJson === 'string' 
        ? JSON.parse(imageJson) 
        : imageJson;
      if (Array.isArray(parsedImages)) return parsedImages[0] || '';
      if (typeof parsedImages === 'string') return parsedImages;
      return '';
    } catch (error) {
      return typeof imageJson === 'string' ? imageJson : '';
    }
  };
  function renderProduct() {
    if (!product || product.length === 0) {
      return <p>...</p>;
    }
    return product.map((item) => {
      const imageName = getFirstImage(item.image);
      return (
        <div className="col-sm-4">
      <div className="product-image-wrapper">
        <div className="single-products">
          <div className="productinfo text-center">
            <img src={`http://localhost/laravel8/public/upload/product/${item.id_user}/${imageName}`} alt={item.name}/>
            <h2>{item.price}$</h2>
            <p>{item.name}</p>
            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
          </div>
        </div>
        <div className="choose">
          <ul className="nav nav-pills nav-justified">
            <li><a href="#"><i className="fa fa-plus-square" />Add to wishlist</a></li>
            <li><Link to={`productdetail/${item.id}`}>More</Link> </li>
          </ul>
        </div>
      </div>
    </div>
      );
    });
  }
  return (
    <div>
      <section>
        <div className="container">
          <div className="row">
           <div className="col-sm-9 padding-right">
            <div className="features_items">{/*features_items*/}
             <h2 className="title text-center">Features Items</h2>
             {renderProduct()}
            </div>{/*features_items*/}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Home;