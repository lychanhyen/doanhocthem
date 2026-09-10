import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
function Blog() {
  const [post,setPost]= useState([]);
  useEffect(()=>{
    axios.get("http://localhost/laravel8/public/api/blog")
    .then(res=>{
      setPost(res.data.blog.data)
    })
    .catch(err=>console.log(err))
  },[])
  function renderPost(){
    if(post.length>0){
      return post.map((item,index)=>(
     <div className="single-blog-post" key={item.id}>
              <h3>{item.title}</h3>
              <div className="post-meta">
                <ul>
                  <li><i className="fa fa-user" /> {}</li>
                  <li><i className="fa fa-clock-o" /> {new Date(item.created_at).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'})}</li>
                  <li><i className="fa fa-calendar" />{new Date(item.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}</li>
                </ul>
                <span>
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star-half-o" />
                </span>
              </div>
              <a href>
                <img src={`http://localhost/laravel8/public/upload/Blog/image/${item.image}`} />
              </a>
              <p>{item.description}</p>
              <Link className="btn btn-primary" to={`blog-detail/${item.id}`}>Read More</Link>
            </div>
            ))
        }
        return <p>...</p>;
        } 
      
    return(
        <div>
        <div className="col-sm-9">
          <div className="blog-post-area">
            <h2 className="title text-center">Latest From our Blog</h2>
            {renderPost()}
            <div className="pagination-area">
              <ul className="pagination">
                <li><a href className="active">1</a></li>
                <li><a href>2</a></li>
                <li><a href>3</a></li>
                <li><a href><i className="fa fa-angle-double-right" /></a></li>
              </ul>
            </div>
          </div>
        </div>
</div>
    )
}   
export default Blog;    