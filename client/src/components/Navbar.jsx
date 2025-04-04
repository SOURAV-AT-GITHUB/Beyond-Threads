import logo from "/Images/logo.svg";
import whiteLogo from "/Images/logo-white.svg";
import searchIconWhite from "/Images/search-white.svg";
import searchIconBlack from "/Images/search-black.svg";
import bagIconWhite from "/Images/bag-white.svg";
import bagIconBlack from "/Images/bag-black.svg";
import womenCover from "/Images/Homepage/trending-now/img5.jpg";
import menCover from "/Images/nav-men-cover.jpg";
import { useState } from "react";
import ArrowButton from "./ArrowButton";
import { NavLink } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import closeIcon from "/Images/close.svg";
import { formatPrice } from "../utils/formatPrice";
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
  const cartData = [
    {
      title: "Badami Saree in Silk",
      price: 1950.00,
      image:
        "https://s3-alpha-sig.figma.com/img/41ad/0309/abb9857c729cde1b2c6d34a583706da6?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=j4r2FoGKYo319NFItD4z0IxbF2mRIIXJQvli1bw4BiFm2WKB5nii2ksbsdig3-FOU4NNVXTRBWa9h2m7ZqkXuMSneRzKf2PuyH4FcKRL0y1GNG7cgkIN98AodXEK20BWp0FNQmwXdqWnsy9CGxfRPTP8xnBdYWL9NW6V7z7FUEB-hMJCHdeqXzf-~Nan66vrPsh~d6jLhAxPGYcBvnfIKqs6DwpJ67ls~0Wil61hmJ~DgyHPNwi2BGBerivHZfdlIsVkD7FYRYiM8CtnCtofOCtonsD5ssDz0iQO8A6bEiGTDvNr03ADoFADl~KBItUFNYqi3RB-iGG3ri7psnxyoA__",
      quantity: 2,
    },
  ];
  return (
    <nav className="w-full h-[14vh] grid grid-cols-4 items-center bg-primary px-20">
      <ul
        className="relative flex gap-4 col-span-2"
        onMouseLeave={() => setIsHovering(null)}
      >
        <div
          className={`absolute z-1 -top-10 -left-20  bg-white  ${
            isHovering ? "w-[98.8vw] h-[68vh] py-6" : "h-0 w-0"
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
            }`}
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
            }`}
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
      <NavLink to="/">
        <img
          src={isHovering ? logo : whiteLogo}
          alt="Beyond Threads"
          className="h-full max-w-[15vw] z-1"
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
        <div className="bg-secondary flex flex-col justify-between h-full w-screen max-w-[600px]">
          <div className="h-1/8 flex justify-between p-5">
            <h4 className="text-5xl font-light">Cart</h4>
            <button onClick={()=>setOpenCart(false)}>
              <img src={closeIcon} alt="" />
            </button>
          </div>
          <hr  className="text-headings"/>
          <div className="p-8 h-5/8 overflow-y-scroll red-scrollbar flex flex-col gap-4">
            {cartData.map((product, index) => (
              <div key={index} className="flex gap-4">
                <img
                  src={product.image}
                  alt=""
                  className="max-h-[225px] w-[175px] object-cover object-top"
                />
                <div className="flex flex-col justify-between">
                  <div className="flex flex-col gap-2">
                    <p className="font-medium text-lg">{product.title}</p>
                    <p className="text-2xl font-light">₹ {formatPrice(product.price)}</p>
                  </div>
                  <div className="flex gap-1">
                    <button className='border border-primary text-2xl px-5 py-1'>-</button>
                    <p className="bg-white text-xl px-5 py-1">{product.quantity}</p>
                    <button className="text-white bg-primary text-2xl px-5 py-1">+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr  className="text-headings"/>
          <div className="h-2/8 py-5 px-8 flex flex-col gap-3">
            <div className="flex justify-between text-3xl">
              <p>Total Cart Value</p>
              <p className="text-primary">₹ {formatPrice(cartData.reduce((acc,current)=>acc+(current.price*current.quantity),0))}</p>
            </div>
            <hr className="text-headings"/>
              <p>Free Shipping on Domestic Orders above Rs 1,950 | COD Available</p>
            <ArrowButton style={2} text="Go For Cehckout"/>
          </div>
        </div>
      </Drawer>
    </nav>
  );
}
