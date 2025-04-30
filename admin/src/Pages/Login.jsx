import { useEffect, useState } from "react";
import banner1 from "../assets/Images/Login/banner-p-1.jpg";
import banner2 from "../assets/Images/Login/banner-p-2.jpg";
import banner3 from "../assets/Images/Login/banner-p-3.jpg";
import banner4 from "../assets/Images/Login/banner-p-4.jpg";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { OPEN_ALERT, ADMIN_LOGIN } from "../Store/actionTypes";
export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleLogin(event) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const email = event.target[0].value;
      const password = event.target[1].value;
      const response = await axios.post(`${BACKEND_URL}/admin/login`, {
        email,
        password,
      });
      dispatch({ type: ADMIN_LOGIN, payload: response.data });
      dispatch({
        type: OPEN_ALERT,
        payload: { message: "Login Success!", severity: "success" },
      });
      console.log(response)
    } catch (error) {
      dispatch({
        type: OPEN_ALERT,
        payload: {
          message:
            error.response?.data.message || error.message || "Login Failed!",
          severity: "error",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);
  return (
    <div className="w-screen h-screen relative flex bg-white p-4 ">
      <div className="relative flex blur-[2px]">
        <img src={banner1} alt="" className="w-1/4 h-full object-cover" />
        <img src={banner2} alt="" className="w-1/4 h-full object-cover" />
        <img src={banner3} alt="" className="w-1/4 h-full object-cover" />
        <img src={banner4} alt="" className="w-1/4 h-full object-cover" />
      </div>
      <div className="z-10 absolute w-full h-full left-0 top-0 bg-[#00000065]  flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="p-6 bg-white rounded-lg flex flex-col gap-4 w-[90%] max-w-md"
        >
          <h4 className="text-4xl font-semibold text-primary text-center">
            ADMIN LOGIN
          </h4>
          <div className="relative z-1 border border-headings rounded-md">
            <input
              required
              type="email"
              name="email"
              placeholder=" "
              className="z-1 outline-none p-4 peer w-full"
            />
            <label
              htmlFor="email"
              className="text-lg text-headings bg-white -z-1 absolute left-2/4 -translate-x-2/4 top-3 peer-focus:-top-3 peer-not-placeholder-shown:-top-3 transition-all duration-300 ease-in-out"
            >
              Enter Email
            </label>
          </div>
          <div className="relative z-1 border border-headings rounded-md">
            <input
              required
              type="password"
              name="password"
              placeholder=" "
              className="z-1 outline-none p-4 peer w-full"
            />
            <label
              htmlFor="password"
              className="text-lg text-headings bg-white -z-1 absolute left-2/4 -translate-x-2/4 top-3 peer-focus:-top-3 peer-not-placeholder-shown:-top-3 transition-all duration-300 ease-in-out"
            >
              Enter Password
            </label>
          </div>
          <button type="submit" className="bg-primary text-white text-2xl py-3">
            {isSubmitting ? <CircularProgress color="" /> : <p>LOGIN</p>}
          </button>
        </form>
      </div>
    </div>
  );
}
