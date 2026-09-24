import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Errform from './Errform';
function EditProduct() {
    const params = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [errs, setErrs] = useState({});
    const [inputs, setInputs] = useState({
        name: '',
        price: '',
        category: '',
        brand: '',
        company: '',
        detail: '',
        status: 1,
        sale: 0,
        id_user: '',
        oldImages: [],
        avatarCheckBox: [],
        files: []
    });
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("auth") || "{}");
        const token = userData?.user?.auth_token || localStorage.getItem("token");
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json'
            }
        };
        axios.get('http://localhost/laravel8/public/api/category-brand')
            .then(response => {
                if (response.data) {
                    setCategories(response.data.category || []);
                    setBrands(response.data.brand || []);
                }
            })
            .catch(error => console.log(error));
        axios.get(`http://localhost/laravel8/public/api/user/product/${params.id}`, config)
            .then(response => {
                const data = response.data.data;
                if (data) {
                    let parsedImages = [];
                    if (data.image) {
                        try {
                            const parsed = typeof data.image === 'string' ? JSON.parse(data.image) : data.image;
                            if (Array.isArray(parsed)) {
                                parsedImages = parsed;
                            } else if (typeof parsed === 'object' && parsed !== null) {
                                parsedImages = Object.values(parsed);
                            }
                        } catch (e) {
                            parsedImages = [];
                        }
                    }
                    setInputs(state => ({
                        ...state,
                        name: data.name || '',
                        price: data.price || '',
                        category: data.id_category || data.category || '',
                        brand: data.id_brand || data.brand || '',
                        company: data.company_profile || data.company || '',
                        detail: data.detail || '',
                        status: data.status ?? 1,
                        sale: data.sale || 0,
                        id_user: data.id_user || data.user_id || '',
                        oldImages: parsedImages,
                        avatarCheckBox: [],
                        files: []
                    }));
                }
            })
            .catch(error => console.log(error));
    }, [params.id]);
    function handleInputs(e) {
        const { name, type, files, value } = e.target;
        if (type === 'file') {
            const selectedFiles = Array.from(files);
            setInputs(state => ({ ...state, files: selectedFiles }));
        } else {
            setInputs(state => ({ ...state, [name]: value }));
        }
    }
    function handleCheckboxChange(e) {
        const imageName = e.target.value;
        const isChecked = e.target.checked;
        setInputs(state => {
            let updatedCheckBox = [...state.avatarCheckBox];
            if (isChecked) {
                if (!updatedCheckBox.includes(imageName)) {
                    updatedCheckBox.push(imageName);
                }
            } else {
                updatedCheckBox = updatedCheckBox.filter(img => img !== imageName);
            }
            return { ...state, avatarCheckBox: updatedCheckBox };
        });
    }
    function handleSubmit(e) {
        e.preventDefault();
        let errSubmit = {};
        let flag = true;
        if (!inputs.name) {
            errSubmit.name = "Vui long nhap ten san pham";
            flag = false;
        }
        if (!inputs.price) {
            errSubmit.price = "Vui long dien gia tien";
            flag = false;
        }
        if (!inputs.category) {
            errSubmit.category = "Vui long chon danh muc hang";
            flag = false;
        }
        if (!inputs.brand) {
            errSubmit.brand = "Vui long chon thuong hieu";
            flag = false;
        }
        if (!inputs.company) {
            errSubmit.company = "Vui long dien ten cong ty";
            flag = false;
        }
        if (!inputs.detail) {
            errSubmit.detail = "Vui long mo ta san pham";
            flag = false;
        }
        const remainingOldCount = inputs.oldImages.length - inputs.avatarCheckBox.length;
        const totalImages = remainingOldCount + inputs.files.length;
        if (totalImages > 3) {
            errSubmit.files = "Tong so anh khong duoc lon hon 3!";
            flag = false;
        }
        if (inputs.files.length > 0) {
            const validTypes = ["png", "jpg", "jpeg", "PNG", "JPG"];
            inputs.files.forEach(file => {
                const ext = file.name.split('.').pop().toLowerCase();
                if (!validTypes.includes(ext)) {
                    errSubmit.files = "File phai co dinh dang (png, jpg, jpeg)!";
                    flag = false;
                }
                if (file.size > 1024 * 1024) {
                    errSubmit.files = "Dung luong anh phai <= 1MB!";
                    flag = false;
                }
            });
        }
        if (!flag) {
            setErrs(errSubmit);
        } else {
            setErrs({});
            const userData = JSON.parse(localStorage.getItem("auth") || "{}");
            const token = userData?.user?.auth_token || localStorage.getItem("token");
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            };
            let formData = new FormData();
            formData.append('name', inputs.name);
            formData.append('price', inputs.price);
            formData.append('category', inputs.category);
            formData.append('brand', inputs.brand);
            formData.append('company', inputs.company);
            formData.append('detail', inputs.detail);
            formData.append('status', inputs.status);
            formData.append('sale', (inputs.status === "0" || inputs.status === 0) ? inputs.sale : 0);
            inputs.avatarCheckBox.forEach(imgName => {
                formData.append('avatarCheckBox[]', imgName);
            });
            inputs.files.forEach(file => {
                formData.append('file[]', file);
            });
            axios.post(`http://localhost/laravel8/public/api/user/product/update/${params.id}`, formData, config)
                .then(response => {
                    if (response.data.errors) {
                        setErrs(response.data.errors);
                    } else {
                        alert("Cập nhật sản phẩm thành công!");
                        navigate('/account/product');
                    }
                })
                .catch(err => console.log(err));
        }
    }
    return (
        <div className="col-sm-9 padding-right">
            <div className="signup-form">
                <h2>Edit Product</h2>
                <Errform errs={errs} />
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input type="text" name="name" placeholder="Name" value={inputs.name} onChange={handleInputs} />
                    <input type="number" name="price" placeholder="Price" value={inputs.price} onChange={handleInputs} />
                    <select name="category" value={inputs.category} onChange={handleInputs}>
                        <option value="">Please choose category</option>
                        {categories.map(item => (<option key={item.id} value={item.id}>{item.category}</option>))}
                    </select>
                    <select name="brand" value={inputs.brand} onChange={handleInputs}>
                        <option value="">Please choose brand</option>
                        {brands.map(item => (<option key={item.id} value={item.id}>{item.brand}</option>))}
                    </select>
                    <select name="status" value={inputs.status} onChange={handleInputs}>
                        <option value={1}>New</option>
                        <option value={0}>Sale</option>
                    </select>
                    {(inputs.status === "0" || inputs.status === 0) && (
                        <input type="number" name="sale" placeholder="0" value={inputs.sale} onChange={handleInputs} />
                    )}
                    <input type="text" name="company" placeholder="Company profile" value={inputs.company} onChange={handleInputs} />
                    <input type="file" name="files" multiple onChange={handleInputs} />
                    {inputs.oldImages.length > 0 && (
                        <div style={{ marginTop: '15px', marginBottom: '15px' }}>
                            <p><strong>Chon anh de xoa:</strong></p>
                            <ul style={{ display: 'flex', listStyle: 'none', padding: 0, gap: '15px' }}>
                                {inputs.oldImages.map((imgName, index) => (
                                    <li key={index} style={{ textAlign: 'center' }}>
                                        <img
                                            src={`http://localhost/laravel8/public/upload/product/${inputs.id_user}/${imgName}`}
                                            alt={`product-${index}`}
                                            style={{ width: '80px', height: '80px', objectFit: 'cover', display: 'block', marginBottom: '5px' }}
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/80'; }}
                                        />
                                        <input
                                            type="checkbox"
                                            value={imgName}
                                            checked={inputs.avatarCheckBox.includes(imgName)}
                                            onChange={handleCheckboxChange}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <textarea name="detail" placeholder="Detail" rows="5" value={inputs.detail} onChange={handleInputs}></textarea>
                    <button type="submit" className="btn btn-default">Save</button>
                </form>
            </div>
        </div>
    );
}
export default EditProduct;