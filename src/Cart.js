import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function Cart() {
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(data);
    }, []);
    const syncCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };
    const getFirstImage = (imageJson) => {
        if (!imageJson) return '';
        try {
            const parsedImages = typeof imageJson === 'string' ? JSON.parse(imageJson) : imageJson;
            return Array.isArray(parsedImages) ? parsedImages[0] : parsedImages || '';
        } catch (error) {
            return typeof imageJson === 'string' ? imageJson : '';
        }
    };
    function handleIncrease(id) {
        const newCart = cart.map((item) =>
            item.id.toString() === id.toString()
                ? { ...item, quantity: (item.quantity || 1) + 1 }
                : item
        );
        syncCart(newCart);
    }
    function handleDecrease(id) {
        const newCart = cart.map((item) => {
            if (item.id.toString() === id.toString()) {
                if (item.quantity <= 1) {
                    alert("Số lượng không thể nhỏ hơn 1. Nếu muốn xóa, bấm nút X.");
                    return item;
                }
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        syncCart(newCart);
    }
    function handleDelete(id) {
        if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
        const newCart = cart.filter((item) => item.id.toString() !== id.toString());
        syncCart(newCart);
    }
    function tinhTotal() {
        let total = 0;
        cart.forEach((item) => {
            total += item.price * (item.quantity || 1);
        });
        return total;
    }
    function renderItem() {
        if (cart && cart.length > 0) {
            return cart.map((item) => {
                const imageName = getFirstImage(item?.image);
                const userId = item?.id_user;
                const imageUrl = userId 
                    ? `http://localhost/laravel8/public/upload/product/${userId}/${imageName}`
                    : `http://localhost/laravel8/public/upload/product/${imageName}`;
                const totalItem = item.price * (item.quantity || 1);
                return (
                    <tr key={item.id} data-id={item.id}>
                        <td className="cart_product">
                            <a href="#">
                                <img
                                    src={imageUrl}
                                    alt={item.name}
                                    style={{ width: '110px', height: '110px', objectFit: 'cover' }} 
                                    onError={(e) => { e.target.src = "https://via.placeholder.com/110"; }}
                                />
                            </a>
                        </td>
                        <td className="cart_description">
                            <h4><a href="#">{item.name}</a></h4>
                            <p>Web ID: {item.id}</p>
                        </td>
                        <td className="cart_price">
                            <p>${item.price}</p>
                        </td>
                        <td className="cart_quantity">
                            <div className="cart_quantity_button">
                                <a
                                    className="cart_quantity_up"
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleIncrease(item.id);
                                    }}
                                > + </a>
                                <input
                                    className="cart_quantity_input"
                                    type="text"
                                    value={item.quantity || 1}
                                    readOnly
                                    size="2"
                                />
                                <a
                                    className="cart_quantity_down"
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleDecrease(item.id);
                                    }}
                                > - </a>
                            </div>
                        </td>
                        <td className="cart_total">
                            <p className="cart_total_price">${totalItem}</p>
                        </td>
                        <td className="cart_delete">
                            <a
                                className="cart_quantity_delete"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleDelete(item.id);
                                }}
                            >
                                <i className="fa fa-times"></i>
                            </a>
                        </td>
                    </tr>
                );
            });
        } else {
            return (
                <tr>
                    <td colSpan="6" className="text-center" style={{ padding: '30px' }}>
                        Giỏ hàng trống. <Link to="/">Tiếp tục mua sắm</Link>
                    </td>
                </tr>
            );
        }
    }
    const subTotal = tinhTotal();
    const ecoTax = 2; 
    const shippingCost = 0; 
    const grandTotal = subTotal + ecoTax + shippingCost;
    return (
        <div>
            <section id="cart_items">
                <div className="container">
                    <div className="breadcrumbs">
                        <ol className="breadcrumb">
                            <li><Link to="/">Home</Link></li>
                            <li className="active">Shopping Cart</li>
                        </ol>
                    </div>
                    <div className="table-responsive cart_info">
                        <table className="table table-condensed">
                            <thead>
                                <tr className="cart_menu">
                                    <td className="image">Item</td>
                                    <td className="description"></td>
                                    <td className="price">Price</td>
                                    <td className="quantity">Quantity</td>
                                    <td className="total">Total</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {renderItem()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            {cart.length > 0 && (
                <section id="do_action">
                    <div className="container">
                        <div className="heading">
                            <h3>What would you like to do next?</h3>
                            <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="chose_area">
                                    <ul className="user_option">
                                        <li>
                                            <input type="checkbox" />
                                            <label>Use Coupon Code</label>
                                        </li>
                                        <li>
                                            <input type="checkbox" />
                                            <label>Use Gift Voucher</label>
                                        </li>
                                        <li>
                                            <input type="checkbox" />
                                            <label>Estimate Shipping & Taxes</label>
                                        </li>
                                    </ul>
                                    <ul className="user_info">
                                        <li className="single_field">
                                            <label>Country:</label>
                                            <select>
                                                <option>United States</option>
                                                <option>Bangladesh</option>
                                                <option>UK</option>
                                                <option>India</option>
                                                <option>Pakistan</option>
                                                <option>Canada</option>
                                                <option>Dubai</option>
                                            </select>
                                        </li>
                                        <li className="single_field">
                                            <label>Region / State:</label>
                                            <select>
                                                <option>Select</option>
                                                <option>Dhaka</option>
                                                <option>London</option>
                                                <option>Dillih</option>
                                                <option>Lahore</option>
                                                <option>Alaska</option>
                                                <option>Canada</option>
                                                <option>Dubai</option>
                                            </select>
                                        </li>
                                        <li className="single_field zip-field">
                                            <label>Zip Code:</label>
                                            <input type="text" />
                                        </li>
                                    </ul>
                                    <a className="btn btn-default update" href="#">Get Quotes</a>
                                    <a className="btn btn-default check_out" href="#">Continue</a>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="total_area">
                                    <ul>
                                        <li>Cart Sub Total <span>${subTotal}</span></li>
                                        <li>Eco Tax <span>${ecoTax}</span></li>
                                        <li>Shipping Cost <span>{shippingCost === 0 ? "Free" : `$${shippingCost}`}</span></li>
                                        <li>Total <span>${grandTotal}</span></li>
                                    </ul>
                                    <a className="btn btn-default update" href="#">Update</a>
                                    <Link className="btn btn-default check_out" to="/checkout">
                                        Check Out
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

export default Cart;