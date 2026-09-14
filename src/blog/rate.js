import { useState,useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import axios from 'axios';
function Rate(props) {
  const [rating, setRating] = useState(0);
  useEffect(()=>{
    if(props.idBlog){
        axios.get(`http://localhost/laravel8/public/api/blog/rate/` + props.idBlog)
        .then(response =>{
            const data=response.data.data;
            if(Array.isArray(data)&&data.length>0){
                const tongdiem=data.reduce((sum,item)=>sum+Number(item.rate),0);
                setRating(tongdiem/data.length);
            }
        })
        .catch(error =>{console.log(error)});
    }    
  },[props.idBlog]);
  const handleRating = (rate) => {
    const checkLog=localStorage.getItem("ktralog");
    const isLoggedIn = checkLog === "true";
    if(!isLoggedIn){
        alert("VUi long dang nhap de danh gia");
        return;
    }
    const userData=JSON.parse(localStorage.getItem("auth"));
    const token=localStorage.getItem("token");
    if(!userData){
        alert("VUi long dang nhap lai!");
        return;
    }
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
     };
    const data={
        blog_id: props.idBlog,
        user_id: userData.id,
        rate: rate
    };
    axios.post(`http://localhost/laravel8/public/api/blog/rate/` + props.idBlog,data,config)
    .then(response=>{
        if(response.data.error){
            alert("Danh gia that bai vui long thu lai");
        }else{
            setRating(rate);
            alert("Danh gia thanh cong")
        }
    })
    .catch(error=>{console.log(error)});
  };
  return (
    <div>
      <Rating
        onClick={handleRating}
        initialValue={rating}
        size={35}
        transition
        fillColor="gold"
        emptyColor="gray"
      />
    
    </div>
  );
}
export default Rate;