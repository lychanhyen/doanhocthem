import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
function BlogDetail(){
    let params=useParams();
    const [data, setData] = useState(null);    
    const [comment, setComment] = useState([]);
    const [idRely,setIdRely]=useState('');
    useEffect(()=>{
      axios.get(`http://localhost/laravel8/public/api/blog/detail/${params.id}`)
      .then(response=>{
        setData(response.data.data)
        setComment(response.data.data.comment)
      })
      .catch(error=>console.log(error))
    },[params.id])
    function renderDetail(){
      if(data){
        return (
          <div className="single-blog-post">
          <h3>{data.title}</h3>
              <div className="post-meta">
                <ul>
                  <li><i className="fa fa-user" /> {}</li>
                  <li><i className="fa fa-clock-o" /> {new Date(data.created_at).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'})}</li>
                  <li><i className="fa fa-calendar" />{new Date(data.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}</li>
                </ul>
                </div>
          <a href>
        <img src={`http://localhost/laravel8/public/upload/Blog/image/${data.image}`} alt="" />
         </a>
         <p>{data.description}</p>
          </div>
        )
      }
    }
    return(
        <div className="col-sm-9">
  <div className="blog-post-area">
    <h2 className="title text-center">Latest From our Blog</h2>
    <div className="single-blog-post">
      {renderDetail()}
      <div className="pager-area">
        <ul className="pager pull-right">
          <li><a href="#">Pre</a></li>
          <li><a href="#">Next</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div className="rating-area">
    <ul className="ratings">
      <li className="rate-this">Rate this item:</li>
      <li>
        <i className="fa fa-star color" />
        <i className="fa fa-star color" />
        <i className="fa fa-star color" />
        <i className="fa fa-star" />
        <i className="fa fa-star" />
      </li>
      <li className="color">(6 votes)</li>
    </ul>
    <ul className="tag">
      <li>TAG:</li>
      <li><a className="color" href>Pink <span>/</span></a></li>
      <li><a className="color" href>T-Shirt <span>/</span></a></li>
      <li><a className="color" href>Girls</a></li>
    </ul>
  </div>
  <div className="socials-share">
    <a href><img src="images/blog/socials.png" alt="" /></a>
  </div>
  <div className="response-area">
    <h2>3 RESPONSES</h2>
    <ul className="media-list">
      <li className="media">
        <a className="pull-left" href="#">
          <img className="media-object" src="images/blog/man-two.jpg" alt="" />
        </a>
      </li>
    </ul>					
  </div>
  <div className="replay-box">
    <div className="row">
      <div className="col-sm-12">
        <h2>Leave a replay</h2>
        <div className="text-area">
          <div className="blank-arrow">
            <label>Your Name</label>
          </div>
          <span>*</span>
          <textarea name="message" rows={11} defaultValue={""} />
          <a className="btn btn-primary" href>post comment</a>
        </div>
      </div>
    </div>
  </div>
</div>

    )
}
export default BlogDetail;