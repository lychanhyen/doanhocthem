import React from "react";
import axios from 'axios';
import Errform from './Errform';
import { useState } from 'react';

function Register() {
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        pass: '',
        phone: '',
        address: '',
        level: 0,
        avatar: ''
    });

    const [avt, setavt] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState("");
    const [errs, setErrs] = useState({});

    function handleInputs(e) {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({ ...state, [nameInput]: value }));
    }

    function handleFile(e) {
        const file = e.target.files[0];
        setavt(file);
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setAvatarPreview(reader.result);
            };
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errSubmit = {};
        let flag = true;
        if (inputs.name === "") {
            errSubmit.name = "Vui lòng nhập tên!";
            flag = false;
        }
        if (inputs.email === "") {
            errSubmit.email = "Vui lòng nhập email";
            flag = false;
        } else {
            const ktra = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!ktra.test(inputs.email)) {
                errSubmit.email = "Email không đúng định dạng!";
                flag = false;
            }
        }
        if (inputs.pass === "") {
            errSubmit.pass = "Vui lòng nhập mật khẩu";
            flag = false;
        } else if (inputs.pass.length < 6) {
            errSubmit.pass = "Mật khẩu phải có ít nhất 6 ký tự";
            flag = false;
        }
        if (inputs.phone === "" || !inputs.phone.trim()) {
            errSubmit.phone = "Vui lòng nhập số điện thoại";
            flag = false;
        }
        if (inputs.address === "") {
            errSubmit.address = "Vui lòng nhập địa chỉ!";
            flag = false;
        }
        if (!avt) {
            errSubmit.avt = "Vui lòng chọn ảnh đại diện";
            flag = false;
        } else {
            const validImageTypes = ["png", "jpg", "jpeg", "PNG", "JPG"];
            const fileExtension = avt.name.split(".").pop().toLowerCase();
            if (!validImageTypes.includes(fileExtension)) {
                errSubmit.avt = "File tải lên phải là hình ảnh";
                flag = false;
            }
            let getsize = avt.size;
            if (getsize > 1024 * 1024) {
                errSubmit.avt = "Kích thước hình ảnh phải <= 1MB";
                flag = false;
            }
        }
        if (!flag) {
            setErrs(errSubmit);
        } else {
            const data = {
                name: inputs.name,
                email: inputs.email,
                password: inputs.pass,
                phone: inputs.phone,
                address: inputs.address,
                avatar: avatarPreview,
                level: 0
            };
         axios.post('http://localhost/laravel8/public/api/register', data)
             .then(response => {
                 if (response.data.errors) {
                      setErrs(response.data.errors);
                 } else {
                    alert("Đăng ký thành công!");
                 }
              })
             .catch(error => {
                 if (error.response && error.response.data && error.response.data.errors) {
                      setErrs(error.response.data.errors);
                    }
                });
        }
    };
    return (
        <>
            <Errform errs={errs} />
            <div className="signup-form">
                <h2>New User Signup!</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Họ và tên" name="name" value={inputs.name} onChange={handleInputs}/>
                    <input type="email" placeholder="Email Address" name="email" value={inputs.email} onChange={handleInputs} />
                    <input type="password" placeholder="Mật khẩu" name="pass" value={inputs.pass} onChange={handleInputs}/>
                    <input type="text" placeholder="Số điện thoại" name="phone" value={inputs.phone} onChange={handleInputs}/>
                    <input type="text" placeholder="Địa chỉ" name="address" value={inputs.address} onChange={handleInputs}/>
                    <input type="file" placeholder="Ảnh đại diện" name="avt" onChange={handleFile}/>
                    <button type="submit" className="btn btn-default">Signup</button>
                </form>
            </div>
        </>
    );
}

export default Register;