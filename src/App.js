import React, { useState, useEffect } from 'react';
import './App.css';
import { Outlet } from "react-router-dom";
import Header from './component/layout/Header';
import Footer from './component/layout/Footer';
import MenuLeft from './component/layout/MenuLeft';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUserInfo(JSON.parse(userData));
    }
  }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUserInfo(userData);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserInfo(null);
  };

  return (
    <div className="App">
      <Header 
        isLoggedIn={isLoggedIn} 
        userInfo={userInfo} 
        onLogout={handleLogout} 
      />
      <section>
        <div className="container">
          <div className="row">
            <MenuLeft />    
            <Outlet context={{ handleLogin }} />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default App;