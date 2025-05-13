import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import SideNavbar from "./components/SideNavbar";
import Products from "./Pages/Products/Products";
import Menswear from "./Pages/Products/Menswear";
import Womenswear from "./Pages/Products/Womenswear";
import Decor from "./Pages/Products/Decor";
import Orders from "./Pages/Orders";
import Login from "./Pages/Login";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_ALERT } from "./Store/actionTypes";
import AddProduct from "./Pages/Products/AddProduct";
import { useEffect } from "react";
import ProductSections from "./Pages/ProductSections";

function App() {
  const { pathname } = useLocation();
  const alert = useSelector((store) => store.alert);
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const closeAlert = () => dispatch({ type: CLOSE_ALERT });
  useEffect(() => {
    if (!token) return navigate("/login");
  }, [token]);
  return (
    <>
      {pathname !== "/login" && <Navbar />}
      <div className="flex">
        {pathname !== "/login" && (
          <div className="relative w-1/6 hidden md1:block">
            <SideNavbar />
          </div>
        )}
        <div
          className={` ${
            pathname === "/login" ? "w-full" : "w-full md1:w-5/6"
          }`}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />}>
              <Route path="men" element={<Menswear />} />
              <Route path="women" element={<Womenswear />} />
              <Route path="decor" element={<Decor />} />
              <Route path="add" element={<AddProduct />} />
            </Route>
            <Route
              path="/sections/new-arrivals"
              element={
                <ProductSections
                  section={{ name: "New Arrivals", slug: "new-arrivals" }}
                />
              }
            />
            <Route path="/orders" element={<Orders />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
      <Snackbar
        open={alert.open}
        onClose={closeAlert}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={alert.severity}>{alert.message}</Alert>
      </Snackbar>
    </>
  );
}

export default App;
