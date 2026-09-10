import React, { useState } from 'react';
import axios from 'axios';

function Cmt(props) {
    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState("");

    function handleComment(e) {
        setComment(e.target.value);
    }

    function handlePost(e) {
        e.preventDefault();

        const checkLog = localStorage.getItem("ktraLog");
        const isLoggedIn = checkLog === "true" || checkLog === true || JSON.parse(checkLog) === true;

        if (!isLoggedIn) {
            alert("Vui lòng đăng nhập để bình luận!");
            return;
        }

        if (!comment.trim()) {
            setErrors("Vui lòng nhập bình luận!");
            return;
        }

        setErrors("");

        const userData = JSON.parse(localStorage.getItem("auth"));
        const token = localStorage.getItem("token");

        if (!userData) {
            alert("Vui lòng đăng nhập lại!");
            return;
        }

        let url = `http://localhost/laravel8/public/api/blog/comment/` + props.idBlog;

        let config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            }
        };

        const formData = new FormData();
        formData.append('id_blog', props.idBlog);
        formData.append('id_user', userData.id);
        formData.append('id_comment', props.idComment ? props.idComment : 0);
        formData.append('comment', comment);
        formData.append('image_user', userData.avatar || userData.image || userData.image_user || '');
        formData.append('name_user', userData.name || '');

        axios.post(url, formData, config)
            .then(response => {
                if (response.data.errors) {
                    if (typeof response.data.errors === 'object') {
                        const error = Object.values(response.data.errors).flat().join(', ');
                        setErrors(error);
                    } else {
                        setErrors(response.data.errors);
                    }
                } else {
                    if (props.getCmt) {
                        props.getCmt(response.data.data);
                    }
                    setComment("");
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <div className="replay-box" id="comment-box">
            <div className="row">
                <div className="col-sm-12">
                    <h2>Leave a replay</h2>
                    {errors && <p style={{ color: 'red' }}>{errors}</p>}
                    <div className="text-area">
                        <div className="blank-arrow">
                            <label>Your Name</label>
                        </div>
                        <span>*</span>
                        <textarea 
                            name="message" 
                            rows={11} 
                            value={comment} 
                            onChange={handleComment} 
                        />
                        <button 
                            type="button" 
                            className="btn btn-primary" 
                            onClick={handlePost}
                        >
                            Post comment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cmt;