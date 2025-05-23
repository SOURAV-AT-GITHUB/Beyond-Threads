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
import NotFoundRedirect from "./Pages/NotFoundRedirect";
import MyOrders from "./Pages/MyOrders";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCartData, getMyOrders } from "./Store/actions";
function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { idToken, userLoading } = useSelector((store) => store.auth);
  useEffect(() => {
    if (idToken) {
      dispatch(getMyOrders(idToken));
      dispatch(getCartData(idToken));
    }
  }, [idToken, userLoading, dispatch]);
  return (
    <>
      {location.pathname !== "/login" && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<Product />} />
        <Route
          path="/category/new-arrivals"
          element={
            <CategoryWiseProducts
              category={{ name: "New Arrivals", slug: "new-arrivals" }}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFoundRedirect />} />
      </Routes>
      {location.pathname !== "/login" && <Footer />}
    </>
  );
}

export default App;
