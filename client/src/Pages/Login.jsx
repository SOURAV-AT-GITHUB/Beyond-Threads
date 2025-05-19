import { useState, useEffect } from "react";
import banner1 from "/Images/Homepage/about/banner-p-1.jpg";
import banner2 from "/Images/Homepage/about/banner-p-2.jpg";
import banner3 from "/Images/Homepage/about/banner-p-3.jpg";
import banner4 from "/Images/Homepage/about/banner-p-4.jpg";
import { auth, provider, signInWithPopup } from "../firebase";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import logo from "/Images/logo.svg";
import googleLogo from "/Images/google.png";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
export default function Login() {
  const { idToken, userLoading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  async function handleLogin() {
    setIsLoading(true);
    if (error) setError(null);
    try {
      await signInWithPopup(auth, provider);
      await axios.post(`${BACKEND_URL}/client/login`, {
        idToken,
      });
      //eslint-disable-next-line
    } catch (error) {
      setError("Login failed");
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    if (idToken) navigate("/");
    //eslint-disable-next-line
  }, [idToken]);
  return (
    <main className="h-screen w-full bg-white p-4">
      <div className="relative grid grid-cols-4 h-full">
        <img src={banner1} alt="" className="h-full w-full object-cover" />
        <img src={banner2} alt="" className="h-full w-full object-cover" />
        <img src={banner3} alt="" className="h-full w-full object-cover" />
        <img src={banner4} alt="" className="h-full w-full object-cover" />
        <div className="absolute top-0 left-0 h-full w-full bg-[#00000045] flex items-center justify-center">
          {/* <form action="" className="bg-white p-12 w-[500px] max-w-full flex flex-col items-center gap-10">
          <h3 className="text-5xl">LOGIN</h3>
          <div className="flex flex-col gap-4 w-full">
          <div className="w-full">
            <p className="font-light text-lg mb-1 tracking-widest">EMAIL</p>
            <input type="text" placeholder="" required className="border-2 border-slate-400 focus:border-slate-500 w-full h-[60px] pl-2"/>
          </div>
          <div className="w-full" >
            <p className="font-light text-lg mb-1 tracking-widest">PASSWORD</p>
            <input type="password" placeholder="" required className="border-2 border-slate-400 focus:border-slate-500 w-full h-[60px] pl-2"/>
          </div>
          </div>
          <div className="w-full flex flex-col items-center gap-4 ">
            <button type="submit" className="bg-primary text-white w-full h-[60px] cursor-pointer">SIGN IN</button>
            <p>Create account</p>
          </div>
        </form> */}
          <div className="bg-white p-12 w-[95%] max-w-md flex flex-col items-center gap-10">
            <img src={logo} alt="" className="max-w-xs " />
            {idToken ? (
              <p className="text-xl sm:text-3xl text-slate-600 p-3 border border-slate-300 rounded-lg cursor-progress">
                Signing In...
              </p>
            ) : (
              <button
                onClick={handleLogin}
                disabled={isLoading || userLoading}
                className="flex items-center gap-6 p-2 border border-slate-300 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-progress"
              >
                <p className="sm:text-2xl text-slate-600">
                  Sign In with Google
                </p>
                <img src={googleLogo} alt="" className="w-10 sm:w-12" />
              </button>
            )}
            {error && <p className="text-red-500 ">{error}</p>}
            <NavLink to="/">
              <p className="text-primary underline">Explore Beyond Threads</p>
            </NavLink>
          </div>
        </div>
      </div>
    </main>
  );
}
