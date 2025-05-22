import logo from "/Images/logo.svg";
import whiteLogo from "/Images/logo-white.svg";
import searchIconWhite from "/Images/search-white.svg";
import searchIconBlack from "/Images/search-black.svg";
import bagIconWhite from "/Images/bag-white.svg";
import bagIconBlack from "/Images/bag-black.svg";
import womenCover from "/Images/Homepage/trending-now/img5.jpg";
import menCover from "/Images/nav-men-cover.jpg";
import { Fragment, useState } from "react";
import ArrowButton from "./ArrowButton";
import { NavLink } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import closeIcon from "/Images/close.svg";
import { formatPrice } from "../utils/formatPrice";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import CartProductCard from "./CartProductCard";
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
  const { idToken, userLoading } = useSelector((store) => store.auth);
  const { isCartLoading, cartProducts, finalPrice, subTotal } =
    useSelector((store) => store.cart);

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
          {/*if user is logged in */}
          {idToken ? (
            <div className="flex flex-col justify-between h-full w-full">
              <div className="h-[5%] flex flex-col gap-2 py-2">
                <div className=" flex justify-between px-4">
                  <h4 className="text-3xl font-light">Cart</h4>
                  <button
                    onClick={() => setOpenCart(false)}
                    className="cursor-pointer"
                  >
                    <img src={closeIcon} alt="" />
                  </button>
                </div>
              </div>
              {/* <hr className="text-headings " /> */}
              {isCartLoading || userLoading ? (
                <div className="p-8 h-[70%] flex flex-col gap-4 overflow-y-hidden">
                  <Skeleton sx={{ height: "30%" }} />
                  <Skeleton sx={{ height: "30%" }} />
                  <Skeleton sx={{ height: "30%" }} />
                </div>
              ) : cartProducts[0] ? (
                <div className="h-[70%] overflow-y-scroll red-scrollbar flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    {subTotal >= 7000 ? (
                      <div className="flex flex-col gap-2">
                        <p className="w-full bg-primary text-white text-center py-px">
                          You have unlocked{" "}
                          <span className="text-lg font-medium">SAVE500</span>
                        </p>
                        <div className=" w-full h-2 px-4">
                          <div className="bg-primary h-full rounded-full"></div>
                        </div>
                      </div>
                    ) : subTotal >= 5000 && subTotal < 7000 ? (
                      <div className="flex flex-col gap-2">
                        <div className="w-full bg-primary text-white flex items-center justify-center gap-2">
                          <p>SHOP ₹{7000 - subTotal} more and save extra</p>{" "}
                          <p className="text-xl font-medium">₹200</p>
                        </div>
                        <div className="w-full h-3 px-4">
                          <div className="w-full h-full rounded-full bg-headings overflow-hidden ">
                            <div
                              style={{
                                width: `${Math.floor(
                                  (subTotal / 7000) * 100
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
                          <p>SHOP ₹{5000 - subTotal} more and save extra</p>{" "}
                          <p className="text-xl font-medium">₹300</p>
                        </div>
                        <div className="w-full h-3 px-4">
                          <div className="w-full h-full rounded-full bg-headings overflow-hidden ">
                            <div
                              style={{
                                width: `${Math.floor(
                                  (subTotal / 5000) * 100
                                )}%`,
                              }}
                              className="h-full bg-primary"
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex flex-col gap-4">
                    {cartProducts.map((product, index) => (
                      <CartProductCard
                        key={index}
                        product={product}
                        totalDiscount={subTotal - finalPrice}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-[70%] flex flex-col gap-2 items-center ">
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
              {cartProducts[0] && (
                <Fragment>
                  <hr className="text-headings" />
                  <div className="h-[20%] py-1 px-6 flex flex-col gap-2">
                    {subTotal - finalPrice > 0 && (
                      <div>
                        <p>
                          SAVED{" "}
                          <span className="text-green-600">
                            ₹{subTotal - finalPrice}
                          </span>{" "}
                          USING COUPONS
                        </p>
                      </div>
                    )}
                    <div className="flex justify-between gap-6 text-2xl">
                      <p>Total Cart Value</p>
                      <p className="text-primary">
                        ₹ {formatPrice(finalPrice)}
                      </p>
                    </div>
                    <hr className="text-headings" />
                    {/* <p>
                  Free Shipping on Domestic Orders above Rs 1,950 | COD
                  Available
                </p> */}

                    <NavLink to="/payment" onClick={() => setOpenCart(false)}>
                      <ArrowButton style={2} text="Go For Cehckout" />
                    </NavLink>
                  </div>
                </Fragment>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-2 items-center p-4 justify-between h-full w-full">
              {/*If user not logged in yet*/}
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
