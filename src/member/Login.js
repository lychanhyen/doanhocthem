import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from 'axios';
import Errform from './Errform';

function Login() {
  const navigate = useNavigate();
  const { handleLogin } = useOutletContext();
  
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });
  
  const [errs, setErrs] = useState({});
  const [loading, setLoading] = useState(false);

  function handleInputs(e) {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs(state => ({ ...state, [nameInput]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let errSubmit = {};
    let flag = true;

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

    if (inputs.password === "") {
      errSubmit.password = "Vui lòng nhập mật khẩu";
      flag = false;
    }

    if (!flag) {
      setErrs(errSubmit);
      return;
    }

    setErrs({});
    setLoading(true);

    try {
      const res = await axios.post(
        'http://localhost/laravel8/public/api/login',
        {
          email: inputs.email,
          password: inputs.password
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      console.log("res:", res.data);

      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        let login=true;
        localStorage.setItem("ktraLog",JSON.stringify(login));
        if (res.data.auth) {
          localStorage.setItem('user', JSON.stringify(res.data.auth));
          handleLogin(res.data.auth);
        }
        
        alert("Đăng nhập thành công!");
        navigate('/');
      } else {
        alert("Đăng nhập thất bại!");
      }

    } catch (error) {
      console.error('Lỗi:', error);
      
      if (error.response) {
        if (error.response.status === 401) {
          alert("Email hoặc mật khẩu không đúng!");
        } else if (error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("Đăng nhập thất bại! Vui lòng thử lại.");
        }
      } else {
        alert("Không thể kết nối đến server.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Errform errs={errs} />
      <div className="login-form">
        <h2>Login to your account</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email Address" name="email" value={inputs.email} onChange={handleInputs} />
          <input type="password" placeholder="Password" name="password" value={inputs.password} onChange={handleInputs} />
          <span>
            <input type="checkbox" className="checkbox"/> 
            Keep me signed in 
          </span>
          <button type="submit" className="btn btn-default" disabled={loading}>
            {loading ? "Đang xử lý..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;