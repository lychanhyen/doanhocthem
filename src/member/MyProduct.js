import React from 'react';
import {useEffect,useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
function MyProduct(){
    const [products,setProducts]=useState(null);
    useEffect(()=>{
        const userData = JSON.parse(localStorage.getItem("auth") || "{}");
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        axios.get(`http://localhost/laravel8/public/api/user/my-product`, config)
            .then(response => {
                setProducts(response.data.data);
            })
            .catch(error => console.log(error));
    }, []);
    const getFirstImage = (imageJson) => {
        if (!imageJson) return '';
        try {
            const parsedImages = typeof imageJson === 'string' ? JSON.parse(imageJson) : imageJson;
            return Array.isArray(parsedImages) ? parsedImages[0] : parsedImages[0] || '';
        } catch (error) {
            console.error("Loi hinh anh:", error);
            return '';
        }
    };
    function renderItem(){
       if (products && Object.keys(products).length > 0) {
            const productList = Object.values(products).filter(item => item && typeof item === 'object' && item.id);
            return productList.map((item) => {
                const imageName = getFirstImage(item?.image);
                const userId = item?.id_user;
                return (
                    <tr key={item.id}>
                        <td>
                            <a>{item.id}</a>
                        </td>
                        <td className="cart_description">
                            <h4><a href="#">{item.name}</a></h4>
                        </td>
                        <td className="cart_product">
                            <a href="#"><img 
                                 src={`http://localhost/laravel8/public/upload/product/${userId}/${imageName}`} 
                                 alt={item.name} 
                                 style={{ width: '100px', height: '100px', objectFit: 'cover' }}/>
                            </a>
                        </td>
                        <td className="cart_price">
                            <p>${item.price}</p>
                        </td>
                        <td className="cart_total">
                            <Link to={`/account/edit/${item.id}`}>edit</Link>
                            <Link to={`/account/edit/${item.id}`}>delete</Link>
                        </td>
                    </tr>
                )
            })
        }
    }
    return(
         <div className="col-sm-9">
            <div className="table-responsive cart_info">
                <table className="table table-condensed">
                    <thead>
                        <tr className="cart_menu">
                            <td className="id">Id</td>
                            <td className="description">Name</td>
                            <td className="image">Image</td>
                            <td className="price">Price</td>
                            <td className="total">Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {renderItem()}
                    </tbody>
                </table>
            </div>
            <div className="pull-right" style={{ marginTop: '15px' }}>
                <Link to="/account/addproduct" className="btn btn-primary">
                    Add New
                </Link>
            </div>
        </div>
    )
}
export default MyProduct;