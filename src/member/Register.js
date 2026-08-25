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
    const [loading, setLoading] = useState(false);

    function handleInputs(e) {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({ ...state, [nameInput]: value }));
    }

    function handleFile(e) {
        const files = e.target.files[0];
        setavt(files);
        console.log(files);
        if (files) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(files);
        }
    }

    const handleSubmit = async (e) => {
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
            return;
        } else {

        setErrs({});
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('name', inputs.name);
            formData.append('email', inputs.email);
            formData.append('password', inputs.pass);
            formData.append('phone', inputs.phone);
            formData.append('address', inputs.address);
            formData.append('level', 0);
            formData.append('avatar', avt);

            const res = await axios.post(
                'http://localhost/laravel8/public/api/register',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            console.log('Response từ server:', res.data);
            alert('Đăng ký thành công!');
            setInputs({
                name: '',
                email: '',
                pass: '',
                phone: '',
                address: '',
                level: 0,
                avatar: ''
            });
            setavt(null);
            setAvatarPreview("");
        } catch (error) {
            console.error('Lỗi:', error);
            if (error.response && error.response.data.errors) {
                const serverErrors = {};
                const errors = error.response.data.errors;
                if (errors.name) serverErrors.name = errors.name[0];
                if (errors.email) serverErrors.email = errors.email[0];
                if (errors.password) serverErrors.pass = errors.password[0];
                if (errors.phone) serverErrors.phone = errors.phone[0];
                if (errors.address) serverErrors.address = errors.address[0];
                if (errors.avatar) serverErrors.avt = errors.avatar[0];
                setErrs(serverErrors);
            } else {
                alert('Đăng ký thất bại! Vui lòng thử lại.');
            }
        } finally {
            setLoading(false);
        }
    };
    }

    return (
        <>
            <Errform errs={errs} />
            
					<div class="signup-form">
						<h2>New User Signup!</h2>
						<form onSubmit={handleSubmit}>
							<input type="text" placeholder="Họ và tên" name="name" value={inputs.name} onChange={handleInputs}/>
                            <input type="email" placeholder="Email Address" name="email" value={inputs.email} onChange={handleInputs} />
                            <input type="password" placeholder="Mật khẩu" name="pass" value={inputs.pass} onChange={handleInputs}/>
                            <input type="text" placeholder="Số điện thoại" name="phone" value={inputs.phone} onChange={handleInputs}/>
                            <input type="text" placeholder="Địa chỉ" name="address" value={inputs.address} onChange={handleInputs}/>
                            <input type="file" placeholder="Ảnh đại diện" name="avt" onChange={handleFile}/>
							<button type="submit" class="btn btn-default">Signup</button>
						</form>
					</div>
				
        </>
    );
};

export default Register;