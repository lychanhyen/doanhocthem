import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Errform from './Errform';

function Update() {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        pass: "",
        phone: "",
        address: "",
        level: 0,
        avatar: ""
    });
    const [avt, setavt] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState("");
    const [errs, setErrs] = useState({});

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("auth"));
        if (data) {
            setInputs({
                name: data.name || "",
                email: data.email || "",
                pass: "",                      
                phone: data.phone || "",
                address: data.address || "",
                level: data.level || 0,      
                avatar: data.avatar || ""
            });
            setAvatarPreview(data.avatar || "");
        }
    }, []);

    function handleInputs(e) {
        const { name, value } = e.target;
        setInputs(state => ({ ...state, [name]: value }));
    }

    function handleFile(e) {
        const file = e.target.files[0];
        setavt(file);
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => setAvatarPreview(reader.result);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errSubmit = {};
        let flag = true;

        if (!inputs.name.trim()) {
            errSubmit.name = "Vui lòng nhập tên mới!";
            flag = false;
        }
        if (inputs.pass && inputs.pass.length < 6) {
            errSubmit.pass = "Mật khẩu phải có ít nhất 6 ký tự";
            flag = false;
        }

        if (!inputs.phone.trim()) {
            errSubmit.phone = "Vui lòng nhập số điện thoại mới";
            flag = false;
        }

        if (!inputs.address.trim()) {
            errSubmit.address = "Vui lòng nhập địa chỉ mới!";
            flag = false;
        }
        if (!avt && !avatarPreview) {
            errSubmit.avt = "Vui lòng chọn ảnh đại diện";
            flag = false;
        } else if (avt) {
            const validImageTypes = ["png", "jpg", "jpeg"];
            const fileExtension = avt.name.split(".").pop().toLowerCase();
            if (!validImageTypes.includes(fileExtension)) {
                errSubmit.avt = "File tải lên phải là hình ảnh (png, jpg, jpeg)";
                flag = false;
            } else if (avt.size > 1024 * 1024) {
                errSubmit.avt = "Kích thước hình ảnh phải <= 1MB";
                flag = false;
            }
        }

        if (!flag) {
            setErrs(errSubmit);
            return;
        }
        const user = JSON.parse(localStorage.getItem("auth") || "{}");
        const Id = user.id;
        const token = localStorage.getItem("token");

        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json'
            }
        };
        const load = {
            name: inputs.name,
            email: inputs.email,
            phone: inputs.phone,
            address: inputs.address,
            avatar: avatarPreview,
            level: inputs.level
        };
        if (inputs.pass) {
            load.password = inputs.pass;
        }

        axios.post(`http://localhost/laravel8/public/api/user/update/${Id}`, load, config)
            .then(response => {
                if (response.data.errors) {
                    setErrs(response.data.errors);
                } else {
                    alert("Cập nhật thông tin thành công!");
                    localStorage.setItem(
                        "auth",
                        JSON.stringify(response.data.Auth || response.data.auth || load)
                    );
                }
            })
            .catch(error => {
               console.log(error);
            });
    };
    return (
        <>
        <Errform errs={errs} />
        <div className="container">
            <div className="row">
                 <div className="signup-form">
                     <div className="col-sm-4 ">
                        <h2>Update User!</h2>
                        <form onSubmit={handleSubmit}>
                         <input type="text" placeholder="Họ và tên" name="name" value={inputs.name} onChange={handleInputs}/>
                         <input type="email" placeholder="Email Address" name="email" value={inputs.email} onChange={handleInputs} readOnly />
                         <input type="password" placeholder="Mật khẩu" name="pass" value={inputs.pass} onChange={handleInputs}/>
                         <input type="text" placeholder="Số điện thoại" name="phone" value={inputs.phone} onChange={handleInputs}/>
                         <input type="text" placeholder="Địa chỉ" name="address" value={inputs.address} onChange={handleInputs}/>
                         <input type="file" placeholder="Ảnh đại diện" name="avt" onChange={handleFile}/>
                         <button type="submit" className="btn btn-default">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Update;