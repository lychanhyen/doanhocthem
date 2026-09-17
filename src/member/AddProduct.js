import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios';
import Errform from './Errform';
function AddProduct(){
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
        sale: 0    
    });
    const [files, setFiles] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost/laravel8/public/api/category-brand')
        .then(response => {
            if(response.data){
                setCategories(response.data.category);
                setBrands(response.data.brand);
            }
        })
        .catch(err => console.log(err));
    },[])
    function handleInputs(e){
        const nameInput=e.target.name;
        const value♣=e.target.value;
        setInputs(state =>({...state,[nameInput]:value}));
    }
    function handleFile(e){
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
    }
    function handleSubmit(e){
        e.preventDefault();
        let errSubmit={};
        let flag=true;
        if(!inputs.name){
            errSubmit.name="Vui long nhap ten san pham";
            flag=false;
        }
        if(!inputs.price){
            errSubmit.price="Vui long dien gia tien";
            flag=false;
        }
        if(!inputs.category){
            errSubmit.category="Vui long chon danh muc hang";
            flag=false;
        }
        if(!inputs.brand){
            errSubmit.brand="Vui long chon thuong hieu";
            flag=false;
        }
        if(!inputs.company){
            errSubmit="Vui long dien ten cong ty";
            flag=false;
        }
        if(!inputs.detail){
            errSubmit="Vui long mo ta san pham";
            flag=false;
        }
        if (files.length === 0) {
            errSubmit.files = "Vui lòng chọn ít nhất 1 hình ảnh!";
            flag = false;
        } else if (files.length > 3) {
            errSubmit.files = "Chỉ được upload tối đa 3 hình ảnh!";
            flag = false;
        } else {
            const validTypes = ["png", "jpg", "jpeg", "PNG", "JPG"];
            files.forEach(file => {
                const ext = file.name.split('.').pop().toLowerCase();
                if (!validTypes.includes(ext)) {
                    errSubmit.files = "File phải có định dạng hình ảnh (png, jpg, jpeg)!";
                    flag = false;
                }
                if (file.size > 1024 * 1024) {
                    errSubmit.files = "Mỗi hình ảnh phải có dung lượng <= 1MB!";
                    flag = false;
                }
            });
        }
        if(!flag){
            setErrs(errSubmit);
        } else {
            const token = localStorage.getItem("token");
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
            formData.append('sale', inputs.status === "0" || inputs.status === 0 ? inputs.sale : 0);
            Object.keys(files).map((item,i)=>{
                formData.append("file[]",files[item])
            });
            axios.post('http://localhost/laravel8/public/api/user/product/add', formData, config)
            .then(response=>{
                if(response.data.errors){
                    setErrs(response.data.errors);
                } else {
                    alert("Them san pham thanh cong")
                }
            })
            .catch(err => console.log(err));
        }
    }
    return(<div className="col-sm-9 padding-right">
            <div className="signup-form">
                <h2>Create product!</h2>
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
                    <input type="file" name="file" multiple onChange={handleFile} />
                    <textarea name="detail" placeholder="Detail" rows="5" value={inputs.detail} onChange={handleInputs}></textarea>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        </div>
    )
}
export default AddProduct;