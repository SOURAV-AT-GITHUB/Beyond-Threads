import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login";
import Footer from "./components/Footer";
import Product from "./Pages/Product";
import CategoryWiseProducts from "./Pages/CategoryWiseProducts";
import AboutPage from "./Pages/AboutPage";
import Payment from "./Pages/Payment";
import NotFound from "./Pages/NotFound";
import NotFoundRedirect from './Pages/NotFoundRedirect'
import MyOrders from "./Pages/MyOrders";
function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/login" && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/category/:sub_category" element={<CategoryWiseProducts />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/payment" element={<Payment/>} />
        <Route path="/my-orders" element={<MyOrders/>} />
        <Route path="/404" element={<NotFound/>} />
        <Route path="*" element={<NotFoundRedirect/>} />

      </Routes>
      {location.pathname !== "/login" && <Footer />}
    </>
  );
}

export default App;
