import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogDetail from './blog/BlogDetail';
import Blog from './blog/Blog';
import UserIndex from './member/index';
import Update from './member/Update';
import AddProduct from './member/AddProduct';
import MyProduct from './member/MyProduct';
import EditProduct from './member/EditProduct';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>  
          <Route index element={<Blog />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog-detail/:id" element={<BlogDetail />} />
          <Route path="Login-Register" element={<UserIndex />} />
          <Route path="account" element={<Update />} />
          <Route path="account/update" element={<Update />} />
          <Route path="account/addproduct" element={<AddProduct />} />
          <Route path="account/product" element={<MyProduct />} />
          <Route path="account/edit/:id" element={<EditProduct />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
