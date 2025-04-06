import React, { useState } from "react";
const img1 =
  "https://s3-alpha-sig.figma.com/img/7439/edbf/19ade5afe542d62ec22991c29c849f22?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=eDcaFZUbnepZ2Euoyq2nqNX-n7dMjOmuqABTm8sUMEbTKG6uEYd6qf8XW3Tl-8Z0gcCcH7HDybEgXOvCIBGRiM8wtA21pPc3qxWsRt6eGSlcEhcE6deoX-mMgVFjSn3xKA4qDUZZRitGtVmbaW29b1l0QNskB0AAPlHpSasHu1JPk2Bf17XTUkpJdKVTWhrEBU-X8LgYe7TudeQM~dwKMpVdFxUgA70vtE4BuTHQ-HS2vEjnkHJZbv1xZaU~b6OkdugzfwUct4D0ROXezVvSTqbbJmZ9QL9lufg0KwLS8rCM5Jc~IpAS0hZfeBC6P9LsjM7cY3wNDrN7HdpaIC1bnw__";
import img2 from "/Images/Homepage/new-arrivals/img2.jpg";
import img3 from "/Images/Homepage/categories/womensware.jpg";
import img4 from "/Images/Homepage/bestsellers/s1-img1.jpg";
import img5 from "/Images/Homepage/bestsellers/s1-img2.jpg";
const img6 =
  "https://s3-alpha-sig.figma.com/img/eff7/4a3b/2cd3e50435d2b644ee92dc3769c2505d?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Mc9mdZsSlUqi0nqrXT50~NMYDtjDFnjvCRIxoHYmpxZy5u0ONAdlyuAmyGa0JrEPBCBkQ132Q0ylx6kLjnE2tT5xvSNsdy5dJTuFhe-~dDGFc8bheNZgIOSy8hSzj4IizSLjF4M0r5vaLdqiLryPqvK8oyCNBWoYJcT3-7SD8j2VjXWUlmH7Xv5OxsDpcd7A1UauL3swUNf66BbWW4wuuPaSNMxQ5XPha8jp1ZgnLLhs1jfBh1qwPRhvzMnww5BU9S29bX-j5~Ntub7C8BsPSW4YTvBH3NvBd8P95OWeG-sD-xYO80iMEyUnngG4RCd8qdGxSEXGacaTBWVHC7n-ZA__";
import img7 from "/Images/Homepage/bestsellers/s1-img3.jpg";
import img8 from "/Images/Homepage/bestsellers/s1-img4.jpg";
import img9 from "/Images/Homepage/bestsellers/s1-img6.jpg";
import img10 from "/Images/Homepage/bestsellers/s1-img5.jpg";
import img11 from "/Images/Homepage/bestsellers/s2-img1.jpg";
import img12 from "/Images/Homepage/bestsellers/s2-img2.jpg";
import img13 from "/Images/Homepage/bestsellers/s2-img3.jpg";
import img14 from "/Images/Homepage/bestsellers/s2-img5.jpg";
import img15 from "/Images/Homepage/bestsellers/s2-img4.jpg";
import img16 from "/Images/Homepage/bestsellers/s2-img6.jpg";
import AddToBagButton from "../components/AddToBagButton";
import { formatPrice } from "../utils/formatPrice";
export default function TrendingSarees() {
  const priceRanges = [
    "₹ 1,000.00 - ₹ 1,999.00",
    "₹ 2,000.00 - ₹ 2,999.00",
    "₹ 3,000.00 - ₹ 4,999.00",
    "₹ 5,000.00 - ₹ 6,999.00",
    "₹ 7,000.00 - ₹ 9,999.00",
  ];
  const fabrics = [
    "Arcylic",
    "Artificial Silk",
    "Brocade",
    "Chanderi",
    "Chanderi Silk",
    "Cutton",
    "Handloom Cottom",
    "Handloom Mul; with Zari",
    "Polyester",
    "Silk",
    "Silk Cotton",
    "Vicose",
    "Viscose Blend",
    "Vicose Georgette",
  ];
  const colours = [
    "#ffffff",
    "#000000",
    "#00ff6f",
    "#f89f18",
    "#142688",
    "#097a44",
    "#d3ff00",
    "#5500fe",
    "#4775ff",
    "#bd282c",
    "#5f5d61",
    "#ff00ce",
    "#fe0000",
    "#f5cf7a",
    "#13e114",
    "#9b177c",
  ];
  const patterns = [
    "Abstract",
    "Animal Print",
    "Border",
    "Floral",
    "Dhoop Chaon",
    "Floral Border",
    "Geometric",
    "Solid",
    "Strips",
    "Tie Dye",
    "Tri Colour",
    "Temple Border",
    "Zari",
    "Zari Border",
  ];
  const products = [
    {
      image: img1,
      title: "Red Butta Saree in Silk",
      price: 2950.00,
    },
    {
      image: img2,
      title: "Badami Saree in Silk",
      price: 1950.00,
    },
    {
      image: img3,
      title: "Yellow Saree in Silk",
      price: 2499.00,
    },
    {
      image: img4,
      title: "Vennai Vellai Kanchipuram Saree Silk",
      price: 2950.00,
    },
    {
      image: img5,
      title: "Hruta Durgule Saree Silk",
      price: 2550.00,
    },
    {
      image: img6,
      title: "Pink Butta Saree in Silk",
      price: 2950.00,
    },
    {
      image: img7,
      title: "Red Butta Saree",
      price: 2950.00,
    },
    {
      image: img8,
      title: "Kanchipuram Silk Saree",
      price: 2550.00,
    },
    {
      image: img9,
      title: "Eternal Elegance Banno Saree",
      price: 5950.00,
    },
    {
      image: img10,
      title: "Exquisite Ajrakh Sindoori Saree",
      price: 4950.00,
    },
    {
      image: img11,
      title: "Arched Grace Jharokha Saree Silk",
      price: 2950.00,
    },
    {
      image: img12,
      title: "Rajputana Jharokha Drape",
      price: 2950.00,
    },
    {
      image: img13,
      title: "Jharna Elegance Silk Saree",
      price: 2950.00,
    },
    {
      image: img14,
      title: "Timeless Jharokha Motif Saree",
      price: 2950.00,
    },
    {
      image: img15,
      title: "Heritage Jharokha Weave Saree",
      price: 2950.00,
    },
    {
      image: img16,
      title: "mehfil Jharokha Handloom Saree",
      price: 2950.00,
    },
  ];

  const [availabilityExpanded, setAvaiabilityExpanded] = useState(false);
  const [priceExpanded, setPriceExpanded] = useState(false);
  const [fabricExpanded, setFabricExpanded] = useState(false);
  const [colourExpanded, setColourExpanded] = useState(false);
  const [patternsExpanded, setPatternsExpanded] = useState(false);
  return (
    <main className="bg-secondary">
      <p className="text-[7.5rem] font-light text-headings tracking-[2.25rem] w-full text-center">
        TRENDING SAREES
      </p>
      <div className="flex gap-4 px-20 py-10 border-y border-headings max-h-[110vh]">
        <div className="w-1/4 flex flex-col gap-2 overflow-y-scroll red-scrollbar pr-2">
          <p className="text-center font-medium">Filter By</p>
          {/*Availability */}
          <div>
            <div className="flex items-center justify-between">
              <p className="font-light">Availability</p>
              <button
                onClick={() => setAvaiabilityExpanded((prev) => !prev)}
                className="font-medium text-xl"
              >
                {availabilityExpanded ? "-" : "+"}
              </button>
            </div>
            <div
              className={`flex items-center gap-3 text-lg ${
                availabilityExpanded
                  ? "h-auto opacity-100 pt-4"
                  : "h-0 opacity-0 overflow-hidden"
              } transition-all ease-linear duration-300`}
            >
              <input type="checkbox" className=" accent-primary h-5 w-5" />
              <p className="font-light">In stock only</p>
            </div>
          </div>

          <hr className="" />
          {/*Price */}
          <div>
            <div className="flex items-center justify-between">
              <p className="font-light">Price</p>
              <button
                onClick={() => setPriceExpanded((prev) => !prev)}
                className="font-medium text-xl"
              >
                {priceExpanded ? "-" : "+"}
              </button>
            </div>
            <div
              className={`flex flex-col gap-1 text-lg ${
                priceExpanded
                  ? "h-auto opacity-100 pt-4"
                  : "h-0 opacity-0 overflow-hidden"
              } transition-all ease-linear duration-300`}
            >
              {priceRanges.map((range, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input type="checkbox" className=" accent-primary h-5 w-5" />
                  <p className="font-light">{range}</p>
                </div>
              ))}
            </div>
          </div>

          <hr className="" />
          {/*Fabric */}
          <div>
            <div className="flex  items-center justify-between">
              <p className="font-light">Fabric</p>
              <button
                onClick={() => setFabricExpanded((prev) => !prev)}
                className="font-medium text-xl"
              >
                {fabricExpanded ? "-" : "+"}
              </button>
            </div>
            <div
              className={`flex flex-col gap-1 text-lg ${
                fabricExpanded
                  ? "h-auto opacity-100 pt-4"
                  : "h-0 opacity-0 overflow-hidden"
              } transition-all ease-linear duration-300`}
            >
              {fabrics.map((range, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input type="checkbox" className=" accent-primary h-5 w-5" />
                  <p className="font-light">{range}</p>
                </div>
              ))}
            </div>
          </div>

          <hr className="" />
          {/*Colours */}
          <div>
            <div className="flex  items-center justify-between">
              <p className="font-light">Colour</p>
              <button
                onClick={() => setColourExpanded((prev) => !prev)}
                className="font-medium text-xl"
              >
                {colourExpanded ? "-" : "+"}
              </button>
            </div>
            <div
              className={`grid grid-cols-8 gap-x-3 gap-y-2 px-3 text-lg ${
                colourExpanded
                  ? "h-auto opacity-100 py-4"
                  : "h-0 opacity-0 overflow-hidden"
              } transition-all ease-linear duration-300`}
            >
              {colours.map((color, index) => (
                <div
                  key={index}
                  style={{ height: "25px", backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>

          <hr className="" />
          {/*Patterns */}
          <div>
            <div className="flex  items-center justify-between">
              <p className="font-light">Patterns</p>
              <button
                onClick={() => setPatternsExpanded((prev) => !prev)}
                className="font-medium text-xl"
              >
                {patternsExpanded ? "-" : "+"}
              </button>
            </div>
            <div
              className={`flex flex-col gap-1 ${
                patternsExpanded
                  ? "h-auto opacity-100 pt-4"
                  : "h-0 opacity-0 overflow-hidden"
              } transition-all ease-linear duration-300`}
            >
              {patterns.map((range, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input type="checkbox" className=" accent-primary h-5 w-5" />
                  <p className="font-light">{range}</p>
                </div>
              ))}
            </div>
          </div>
          <hr className="" />
        </div>

        
        <div className="w-3/4 grid grid-cols-3 gap-4 overflow-y-auto hide-scrollbar">
          {products.map((item, index) => (
                      <div key={index} className="flex flex-col gap-2 max-h-[450px]">
                        <div className="relative overflow-hidden group">
                          <img
                            src={item.image}
                            alt=""
                            loading="lazy"
                            className="object-cover w-full group-hover:scale-115 transition-all ease-in-out duration-300"
                          />
                          <div className="absolute w-full p-4 -bottom-20 group-hover:bottom-0 transition-all ease-in-out duration-300">
                            <AddToBagButton />
                          </div>
                        </div>
                        <div className="text-lg">
                          <p className="font-medium">{item.title}</p>
                          <p className="font-light">₹ {formatPrice(item.price)}</p>
                        </div>
                      </div>
                    ))}
        </div>
      </div>
    </main>
  );
}
