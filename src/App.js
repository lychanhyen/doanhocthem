import logo from './logo.svg';
import './App.css';
import Blog from './Blog';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from './component/layout/Header';
import Footer from './component/layout/Footer';
import MenuLeft from './component/layout/MenuLeft';
import BlogDetail from './BlogDetail';
function App() {
  return (
    <div className="App">
      <Header />
      <section>
        <div className="container">
         <div className="row">
          <MenuLeft />    
          <Outlet />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default App;
