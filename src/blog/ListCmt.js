import React from 'react';

function ListCmt(props) {
    const baseUrl = "http://localhost/laravel8/public/upload/user/avatar/";

    function handleReply(id) {
        if (props.getReplyId) {
            props.getReplyId(id);
        }
    }

    function formatTime(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? '' : date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }

    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? '' : date.toLocaleDateString('en-GB'); 
    }

    function getAvatarUrl(item) {
        const imageName = item.image_user || item.image || item.avatar;
        if (!imageName) {
            return "https://via.placeholder.com/100"; 
        }
        return baseUrl + imageName;
    }

    function renderComment() {
        if (!props.listComment || props.listComment.length === 0) return null;

        const parentComments = props.listComment.filter(
            cmt => String(cmt.id_comment) === "0"
        );

        return parentComments.map((parent) => {
        
            const childComments = props.listComment.filter(
                child => String(child.id_comment) === String(parent.id)
            );

            return (
                <React.Fragment key={parent.id}>

                    <li className="media">
                        <a className="pull-left" href="#">
                            <img 
                                className="media-object" 
                                 src={getAvatarUrl(parent)}
                                alt={parent.name_user || "avatar"}
                                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                            />
                        </a>
                        <div className="media-body">
                            <ul className="sinlge-post-meta">
                                <li><i className="fa fa-user" /> {parent.name_user}</li>
                                <li><i className="fa fa-clock-o" /> {formatTime(parent.created_at)}</li>
                                <li><i className="fa fa-calendar" /> {formatDate(parent.created_at)}</li>
                            </ul>
                            <p>{parent.comment}</p>
                            <a className="btn btn-primary" onClick={() => handleReply(parent.id)} href="#comment-box">
                                <i className="fa fa-reply" /> Replay
                            </a>
                        </div>
                    </li>

                
                    {childComments.map((child) => (
                        <li className="media second-media" key={child.id}>
                            <a className="pull-left" href="#">
                                <img 
                                    className="media-object" 
                                    src={getAvatarUrl(child)} 
                                    alt={child.name_user || "avatar"} 
                                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                />
                            </a>
                            <div className="media-body">
                                <ul className="sinlge-post-meta">
                                    <li><i className="fa fa-user" /> {child.name_user}</li>
                                    <li><i className="fa fa-clock-o" /> {formatTime(child.created_at)}</li>
                                    <li><i className="fa fa-calendar" /> {formatDate(child.created_at)}</li>
                                </ul>
                                <p>{child.comment}</p>
                                <a className="btn btn-primary" onClick={() => handleReply(parent.id)} href="#comment-box">
                                    <i className="fa fa-reply" /> Replay
                                </a>
                            </div>
                        </li>
                    ))}
                </React.Fragment>
            );
        });
    }

    return (
        <div className="response-area">
            <h2>{props.listComment ? props.listComment.length : 0} RESPONSES</h2>
            <ul className="media-list">
                {renderComment()}
            </ul>
        </div>
    );
}

export default ListCmt;