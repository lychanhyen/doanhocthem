import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cmt from './cmt';
import ListCmt from './ListCmt';
import TestImage from './TestImage';
import Rate from './rate';
function BlogDetail() {
    let params = useParams();
    const [data, setData] = useState(null);    
    const [comment, setComment] = useState([]);
    const [idComment, setIdComment] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost/laravel8/public/api/blog/detail/${params.id}`)
            .then(response => {
                setData(response.data.data);
                setComment(response.data.data.comment || []);
            })
            .catch(error => console.log(error));
    }, [params.id]);

   function getCmt(newCmtList) {
        if (Array.isArray(newCmtList)) {
            setComment(newCmtList);
        } else {
            setComment(prev => [...prev, newCmtList]);
        }
    }

    function getReplyId(id) {
        setIdComment(id);
    }

    function renderDetail() {
        if (data) {
            return (
                <div className="single-blog-post">
                    <h3>{data.title}</h3>
                    <div className="post-meta">
                        <ul>
                            <li><i className="fa fa-user" /></li>
                            <li><i className="fa fa-clock-o" /> {new Date(data.created_at).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</li>
                            <li><i className="fa fa-calendar" />{new Date(data.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            })}</li>
                        </ul>
                    </div>
                    <a href="#">
                        <img src={`http://localhost/laravel8/public/upload/Blog/image/${data.image}`} alt="" />
                    </a>
                    <p>{data.description}</p>
                </div>
            );
        }
    }

    return (
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

           <Rate idBlog={params.id}/>

            <div className="socials-share">
                <a href="#"><img src="images/blog/socials.png" alt="" /></a>
            </div>

            <ListCmt listComment={comment} getReplyId={getReplyId} />

            <Cmt idBlog={params.id} idComment={idComment} getCmt={getCmt} />
        </div>
    );
}

export default BlogDetail;