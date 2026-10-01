import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
function ProductDetail(){
    let {id}=useParams();
    const [product,setProduct]=useState(null);
    const [mainImg,setMainImg]=useState("");
    useEffect(() => {
    axios.get("http://localhost/laravel8/public/api/product")
      .then(res => {
        const list = res.data.data || [];
        const found = list.find(item => item.id === parseInt(id));
        setProduct(found || null);
        if (found) {
          const imgs = getAllImages(found.image);
          setMainImg(imgs[0]);
        }
      })
      .catch(err => console.log(err));
}, [id]);
    const getFirstImage=(imageJson)=>{
        if(!imageJson) return "";
        try{
            const parsedImages=typeof imageJson==="string"?JSON.parse(imageJson):imageJson;
            return Array.isArray(parsedImages)?parsedImages[0]:parsedImages[0];
        } catch(error){
            console.log(error);
            return "";
        }
    }
    const getAllImages=(imageJson)=>{
        if(!imageJson) return [];
        try{
            const parsedImages=typeof imageJson==="string"?JSON.parse(imageJson):imageJson;
            return Array.isArray(parsedImages)?parsedImages:[parsedImages];
        } catch(error){
            console.log(error);
            return [];
        }
    }
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
            slidesToSlide: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
            slidesToSlide: 1
        }
    } 
    function renderProductDetail(){
        if(!product){
            return <p>...</p>;
        }
        const images=getAllImages(product.image);
        return(
            <div className="col-sm-9 padding-right">
                <div className="product-details">
                    <div className="col-sm-5">
                    <div className="view-product">
                        <img
                            src={`http://localhost/laravel8/public/upload/product/${product.id_user}/${mainImg}`}
                            alt={product.name}
                        />
                        </div>
                        {images.length > 0 && (
                          <Carousel
                            responsive={responsive}
                            arrows={true}
                            infinite={false}
                            autoPlay={false}
                            showDots={false}
                            containerClass="carousel-container"
                            itemClass="carousel-item-padding-10-px"
                          >
                            {images.map((img, index) => (
                              <div key={index} style={{ padding: "5px" }}>
                                <img
                                  src={`http://localhost/laravel8/public/upload/product/${product.id_user}/${img}`}
                                  alt={`${product.name}-${index}`}
                                  onClick={() => setMainImg(img)} 
                                  style={{
                                    width: "100%",
                                    height: "80px",
                                    objectFit: "cover",
                                    cursor: "pointer",
                                    border: mainImg === img ? "2px solid #FE980F" : "1px solid #ddd"
                                  }}
                                />
                              </div>
                            ))}
                          </Carousel>
                        )}
                      </div>            
                      <div className="col-sm-7">
                        <div className="product-information">
                          <img src="images/product-details/rating.png" alt="" />
                          <h2>{product.name}</h2>
                          <p>Web ID: {product.id}</p>
                          <img src="images/product-details/share.png" className="share img-responsive" alt="" />
                          <span>
                            <span>{product.price}$</span>
                            <label>Quantity:</label>
                            <input type="text" defaultValue={1} />
                            <button type="button" className="btn btn-fefault cart">
                              <i className="fa fa-shopping-cart" />
                              Add to cart
                            </button>
                          </span>
                          <p><b>Availability:</b> In Stock</p>
                          <p><b>Condition:</b> New</p>
                          <p><b>Brand:</b> {product.id_user}</p>
                          <Link to="/">← Back to Home</Link>
                        </div>
                      </div>
                    </div>
                  </div>
        )
    }
    return (
    <div>
      <section>
        <div className="container">
          <div className="row">
            {renderProductDetail()}
          </div>
        </div>
      </section>
    </div>
  )

}
export default ProductDetail;