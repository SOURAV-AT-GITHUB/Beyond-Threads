import logo from "/Images/logo.svg";
import whiteLogo from "/Images/logo-white.svg";
import searchIconWhite from "/Images/search-white.svg";
import searchIconBlack from "/Images/search-black.svg";
import bagIconWhite from "/Images/bag-white.svg";
import bagIconBlack from "/Images/bag-black.svg";
import womenCover from "/Images/Homepage/trending-now/img5.jpg";
import menCover from "/Images/nav-men-cover.jpg";
import { useEffect, useState } from "react";
import ArrowButton from "./ArrowButton";
import { NavLink, useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import closeIcon from "/Images/close.svg";
import { formatPrice } from "../utils/formatPrice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  UPDATE_CART,
  ADD_OR_UPDATE_ITEM,
  REMOVE_SINGLE_ITEM,
  USER_LOGOUT,
} from "../Store/actionTypes";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import deleteIcon from "/Images/delete.png";
export default function Navbar() {
  const navWomen = [
    {
      title: "Shop by Fabric",
      categories: [
        "Mulmul",
        "Viscose",
        "Linen",
        "Cotton Acrylic",
        "Silk",
        "Cotton",
        "Organza",
      ],
    },
    {
      title: "Shop by Category",
      categories: ["Saree", "Blouse", "Kurta Set", "Dupatta", "Jewellery"],
    },
    {
      title: "Shop by Technique",
      categories: [
        "Handloom",
        "Ruffles",
        "Embroidery",
        "Hand block/Screen Print",
        "Batik",
        "Jamdani",
        "Mul Kesh",
        "Hand Painted",
      ],
    },
  ];
  const navMen = [
    {
      title: "Shop by Fabric",
      categories: [
        "Mulmul",
        "Khadi",
        "Linen",
        "Cotton Acrylic",
        "Silk",
        "Cotton",
        "Organza",
      ],
    },
    {
      title: "Shop by Category",
      categories: ["Shirts", "Kurta Pajamas", "Trousers"],
    },
    // {
    //   title: "Shop by Technique",
    //   categories: [
    //     "Handloom",
    //     "Ruffles",
    //     "Embroidery",
    //     "Hand block/Screen Print",
    //     "Batik",
    //     "Jamdani",
    //     "Mul Kesh",
    //     "Hand Painted",
    //   ],
    // },
  ];
  const [isHovering, setIsHovering] = useState(null);
  const [openCart, setOpenCart] = useState(false);
  const token = useSelector((store) => store.token);
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    async function getCartData() {
      try {
        const response = await axios.get(`${BACKEND_URL}/client/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (Array.isArray(response.data) && response.data.length > 0) {
          dispatch({ type: UPDATE_CART, payload: response.data });
        }
      } catch (error) {
        // console.log(error);
        if (error.status === 401) {
          dispatch({ type: USER_LOGOUT });
          navigate("/login");
        }
      }
    }
    if (token) getCartData();
  }, [token, dispatch, navigate]);
  async function removeItem(product) {
    try {
      await axios.delete(`${BACKEND_URL}/client/cart`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { product_id: product.id },
      });
      dispatch({ type: REMOVE_SINGLE_ITEM, payload: product });
    } catch (error) {
      if (error.status === 401) {
        dispatch({ type: USER_LOGOUT });
        navigate("/login");
      }
    }
  }

  async function updateQuantity(isIncrease, product) {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/client/cart`,
        {
          product_id: product.id,
          quantity: isIncrease ? product.quantity + 1 : product.quantity - 1,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch({
        type: ADD_OR_UPDATE_ITEM,
        payload: response.data,
      });
    } catch (error) {
      if (error.status === 401) {
        dispatch({ type: USER_LOGOUT });
        navigate("/login");
      }
    }
  }
  return (
    <nav className="w-full h-[14vh] grid grid-cols-4 items-center bg-primary px-20">
      <ul
        className="relative flex gap-4 col-span-2"
        onMouseLeave={() => setIsHovering(null)}
      >
        <div
          className={`absolute z-1 -top-10 -left-20  bg-white  ${
            isHovering ? "w-[99vw] h-[68vh] py-6" : "h-0 w-0"
          } transition-all ease-in-out duration-600`}
        ></div>
        <li
          className={` relative  group/nav-women z-1`}
          onMouseEnter={() => setIsHovering("women")}
          // onMouseLeave={() => setIsHovering(null)}
        >
          <p
            className={` ${
              isHovering ? "text-black font-normal" : "text-white font-light"
            } hover:underline`}
          >
            Women
          </p>
          <div
            className={`${
              isHovering === "women" ? "scale-100" : "scale-0"
            } transition-all ease-in-out duration-200 absolute -left-20 top-16 bg-[#ffffff6d] w-[98.8vw]  grid grid-cols-5 gap-14 px-20 py-6`}
          >
            {navWomen.map((column, index) => (
              <div key={index}>
                <p className="w-full pb-1 border-b border-slate-400">
                  {column.title}
                </p>
                <ul className="flex flex-col gap-2 mt-4">
                  {column.categories.map((item) => (
                    <li key={item} className="font-light">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="col-span-2 relative m-6">
              <img src={womenCover} alt="new arrival" />
              <div className="absolute w-full h-2/4 left-0 bottom-0 dimmed-bg flex items-center justify-center">
                <ArrowButton style={3} text="Explore Collection" />
              </div>
            </div>
          </div>
        </li>

        <li
          className={` relative group/nav-men z-1`}
          onMouseEnter={() => setIsHovering("men")}
          // onMouseLeave={() => setIsHovering(null)}
        >
          <p
            className={`${
              isHovering ? "text-black font-normal" : "text-white font-light"
            } hover:underline`}
          >
            Men
          </p>
          <div
            className={`${
              isHovering === "men" ? "scale-100" : "scale-0"
            } transition-all ease-in-out duration-200 absolute -left-38 top-16 bg-[#ffffff6d] w-[98.8vw]  grid grid-cols-5 gap-14 px-20 py-6`}
          >
            {navMen.map((column, index) => (
              <div key={index}>
                <p className="w-full pb-1 border-b border-slate-400">
                  {column.title}
                </p>
                <ul className="flex flex-col gap-2 mt-4">
                  {column.categories.map((item) => (
                    <li key={item} className="font-light">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="empty"></div>
            <div className="col-span-2 relative m-6">
              <img src={menCover} alt="new arrival men" />
              <div className="absolute w-full h-2/4 left-0 bottom-0 dimmed-bg flex items-center justify-center">
                <ArrowButton style={3} text="Explore Collection" />
              </div>
            </div>
          </div>
        </li>
        <li className=" z-1">
          <p
            className={`${
              isHovering ? "text-black font-normal" : "text-white font-light"
            }`}
          >
            Accessories
          </p>
        </li>
        <li className=" z-1">
          <p
            className={`${
              isHovering ? "text-black font-normal" : "text-white font-light"
            }`}
          >
            Home Decors
          </p>
        </li>
        <li className=" z-1">
          <p
            className={`${
              isHovering ? "text-black font-normal" : "text-white font-light"
            }`}
          >
            Sale
          </p>
        </li>
      </ul>
      <NavLink to="/" className="z-1">
        <img
          src={isHovering ? logo : whiteLogo}
          alt="Beyond Threads"
          className="h-full max-w-[15vw]"
        />
      </NavLink>
      <div className="flex gap-5 items-center justify-self-end ">
        <img
          src={isHovering ? searchIconBlack : searchIconWhite}
          alt="search"
          className="w-8 z-1"
        />
        <img
          src={isHovering ? bagIconBlack : bagIconWhite}
          alt="bag"
          className="w-8 z-1 cursor-pointer"
          onClick={() => setOpenCart(true)}
        />
      </div>

      <Drawer open={openCart} onClose={() => setOpenCart(false)} anchor="right">
        <div className="bg-secondary h-full w-full min-w-2xs max-w-[600px]">
          {token ? (
            <div className="flex flex-col justify-between h-full w-full">
              <div className="h-[10%] flex flex-col gap-2 py-2">
                <div className=" flex justify-between px-4">
                  <h4 className="text-3xl font-light">Cart</h4>
                  <button
                    onClick={() => setOpenCart(false)}
                    className="cursor-pointer"
                  >
                    <img src={closeIcon} alt="" />
                  </button>
                </div>
                {cart.products[0] && (
                  <div className="flex flex-col gap-2">
                    {cart.finalPrice >= 7000 ? (
                      <div className="flex flex-col gap-2">
                        <p className="w-full bg-primary text-white text-center py-px">
                          You have unlocked{" "}
                          <span className="text-lg font-medium">SAVE500</span>
                        </p>
                        <div className=" w-full h-2 px-4">
                          <div className="bg-primary h-full rounded-full"></div>
                        </div>
                      </div>
                    ) : cart.finalPrice >= 5000 && cart.finalPrice < 7000 ? (
                      <div className="flex flex-col gap-2">
                        <div className="w-full bg-primary text-white flex items-center justify-center gap-2">
                          <p>
                            SHOP ₹{7000 - cart.finalPrice} more and save extra
                          </p>{" "}
                          <p className="text-xl font-medium">₹500</p>
                        </div>
                        <div className="w-full h-3 px-4">
                          <div className="w-full h-full rounded-full bg-headings overflow-hidden ">
                            <div
                              style={{
                                width: `${Math.floor(
                                  (cart.finalPrice / 7000) * 100
                                )}%`,
                              }}
                              className="h-full bg-primary"
                            ></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                      <div className="w-full bg-primary text-white flex items-center justify-center gap-2">
                        <p>
                          SHOP ₹{5000 - cart.finalPrice} more and save extra
                        </p>{" "}
                        <p className="text-xl font-medium">₹300</p>
                      </div>
                      <div className="w-full h-3 px-4">
                        <div className="w-full h-full rounded-full bg-headings overflow-hidden ">
                          <div
                            style={{
                              width: `${Math.floor(
                                (cart.finalPrice / 5000) * 100
                              )}%`,
                            }}
                            className="h-full bg-primary"
                          ></div>
                        </div>
                      </div>
                    </div>
                    )}
                  </div>
                )}
              </div>
              {/* <hr className="text-headings " /> */}
              {cart.products[0] ? (
                <div className="p-8 h-[65%] overflow-y-scroll red-scrollbar flex flex-col gap-4">
                  {cart.products.map((product, index) => (
                    <div key={index} className="flex gap-4">
                      <img
                        src={product.image}
                        alt=""
                        className="h-[200px] w-[225px] object-cover object-top"
                      />
                      <div className="flex flex-col justify-between">
                        <div className="flex flex-col gap-2">
                          <p className="font-medium text-lg">{product.name}</p>
                          <p className="text-2xl font-light">
                            ₹ {formatPrice(product.price)}
                          </p>
                        </div>
                        <div className="flex justify-between items-center gap-4">
                          <div className="flex gap-1">
                            <button
                              disabled={product.quantity <= 1}
                              onClick={() => updateQuantity(false, product)}
                              className="border border-primary text-2xl px-5 py-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              -
                            </button>
                            <p className="bg-white text-xl px-5 py-1">
                              {product.quantity}
                            </p>
                            <button
                              onClick={() => updateQuantity(true, product)}
                              className="text-white bg-primary text-2xl px-5 py-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(product)}
                            className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <img
                              src={deleteIcon}
                              alt=""
                              className="w-7 hover:scale-125 transition-transform ease-in-out duration-300"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-[65%] flex flex-col gap-2 items-center justify-center">
                  <p className="text-center text-xl">Your cart is empty</p>
                  <NavLink to="/">
                    <button
                      onClick={() => setOpenCart(false)}
                      className="bg-primary text-white px-4 py-2 text-xl cursor-pointer"
                    >
                      Continue Shopping
                    </button>
                  </NavLink>
                </div>
              )}
              <hr className="text-headings" />
              <div className="h-[20%] py-5 px-8 flex flex-col justify-end  gap-3">
                <div className="flex justify-between gap-6 text-3xl">
                  <p>Total Cart Value</p>
                  <p className="text-primary">
                    ₹ {formatPrice(cart.finalPrice)}
                  </p>
                </div>
                <hr className="text-headings" />
                {/* <p>
                  Free Shipping on Domestic Orders above Rs 1,950 | COD
                  Available
                </p> */}
                {cart.products[0] && (
                  <NavLink to="/payment" onClick={() => setOpenCart(false)}>
                    <ArrowButton style={2} text="Go For Cehckout" />
                  </NavLink>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 items-center p-4 justify-between h-full w-full">
              <div className="flex justify-between items-center w-full">
                <p className="text-4xl font-light">Cart</p>
                <button
                  onClick={() => setOpenCart(false)}
                  className="cursor-pointer"
                >
                  <img src={closeIcon} alt="" />
                </button>
              </div>
              <p className="text-2xl">
                <NavLink to="/login" className="text-primary underline">
                  Login
                </NavLink>{" "}
                to view your cart
              </p>
              <NavLink
                to="/login"
                className="w-full bg-primary text-white text-center py-2 text-xl"
              >
                LOGIN
              </NavLink>
            </div>
          )}
        </div>
      </Drawer>
    </nav>
  );
}
