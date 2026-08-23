import React from 'react';
import {Link} from 'react-router-dom'; 
function Header(){
    return(
        <header id="header">{/*header*/}  
  <div className="header_top">{/*header_top*/}
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <div className="contactinfo">
            <ul className="nav nav-pills">
              <li><a href><i className="fa fa-phone" /> +2 95 01 88 821</a></li>
              <li><a href><i className="fa fa-envelope" /> info@domain.com</a></li>
            </ul>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="social-icons pull-right">
            <ul className="nav navbar-nav">
              <li><a href><i className="fa fa-facebook" /></a></li>
              <li><a href><i className="fa fa-twitter" /></a></li>
              <li><a href><i className="fa fa-linkedin" /></a></li>
              <li><a href><i className="fa fa-dribbble" /></a></li>
              <li><a href><i className="fa fa-google-plus" /></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>{/*/header_top*/}
  <div className="header-middle">{/*header-middle*/}
    <div className="container">
      <div className="row">
        <div className="col-md-4 clearfix">
          <div className="logo pull-left">
            <a href="index.html"><img src="images/home/logo.png" alt="" /></a>
          </div>
          <div className="btn-group pull-right clearfix">
            <div className="btn-group">
              <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                USA
                <span className="caret" />
              </button>
              <ul className="dropdown-menu">
                <li><a href>Canada</a></li>
                <li><a href>UK</a></li>
              </ul>
            </div>
            <div className="btn-group">
              <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                DOLLAR
                <span className="caret" />
              </button>
              <ul className="dropdown-menu">
                <li><a href>Canadian Dollar</a></li>
                <li><a href>Pound</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-8 clearfix">
          <div className="shop-menu clearfix pull-right">
            <ul className="nav navbar-nav">
              <li><a href><i className="fa fa-user" /> Account</a></li>
              <li><a href><i className="fa fa-star" /> Wishlist</a></li>
              <li><a href="checkout.html"><i className="fa fa-crosshairs" /> Checkout</a></li>
              <li><a href="cart.html"><i className="fa fa-shopping-cart" /> Cart</a></li>
<Link to='/member/Register' ><li><a><i className="fa fa-lock" /> Login</a></li></Link>
            </ul>
          </div>
        </div>  
      </div>
    </div>
  </div>{/*/header-middle*/}
  <div className="header-bottom">{/*header-bottom*/}
    <div className="container">
      <div className="row">
        <div className="col-sm-9">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
          </div>
          <div className="mainmenu pull-left">
            <ul className="nav navbar-nav collapse navbar-collapse">
              <li><a href="index.html">Home</a></li>
              <li className="dropdown"><a href="#">Shop<i className="fa fa-angle-down" /></a>
                <ul role="menu" className="sub-menu">
                  <li><a href="shop.html">Products</a></li>
                  <li><a href="product-details.html">Product Details</a></li> 
                  <li><a href="checkout.html">Checkout</a></li> 
                  <li><a href="cart.html">Cart</a></li> 
                  <li><a href="login.html">Login</a></li> 
                </ul>
              </li> 
              <li className="dropdown"><a href="#" className="active">Blog<i className="fa fa-angle-down" /></a>
                <ul role="menu" className="sub-menu">
                  <li><a href="blog.html" className="active">Blog List</a></li>
                  <li><a href="blog-single.html">Blog Single</a></li>
                </ul>
              </li> 
              <li><a href="404.html">404</a></li>
              <li><a href="contact-us.html">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="search_box pull-right">
            <input type="text" placeholder="Search" />
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
    
    )
}
export default Header;