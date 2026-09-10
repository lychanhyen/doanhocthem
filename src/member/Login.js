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

  function handleInputs(e) {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs(state => ({ ...state, [nameInput]: value }));
  }

  function handleSubmit(e) {
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
    } else {
      const data = {
        email: inputs.email,
        password: inputs.password,
        level: 0
      };

      axios.post('http://localhost/laravel8/public/api/login', data)
        .then(response => {
          if (response.data.errors) {
            setErrs(response.data.errors);
          } else {
            console.log("Dữ liệu login API:", response.data);

            const userObj = response.data.auth || response.data.Auth || response.data.user;

            if (response.data.token) {
              localStorage.setItem('token', response.data.token);
            }

            if (userObj) {
             
              localStorage.setItem('auth', JSON.stringify(userObj));
              
              if (handleLogin) {
                handleLogin(userObj);
              }
            }

            localStorage.setItem("ktraLog", JSON.stringify(true));
            navigate('/');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
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
          <button type="submit" className="btn btn-default">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;