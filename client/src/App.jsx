import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login";
import Footer from "./components/Footer";
import Product from "./Pages/Product";
import TrendingSarees from "./Pages/TrendingSarees";
import AboutPage from "./Pages/AboutPage";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/login" && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<Product />} />
        <Route path="/trending-sarees" element={<TrendingSarees />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      {location.pathname !== "/login" && <Footer />}
    </>
  );
}

export default App;
