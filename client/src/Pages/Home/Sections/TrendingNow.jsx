import { useEffect, useState } from "react";
import ArrowButton from "../../../components/ArrowButton";
import diamondBullet from "/Images/diamond-bullet.svg";
import img1 from "/Images/Homepage/trending-now/img1.jpg";
import img2 from "/Images/Homepage/trending-now/img2.jpg";
import img3 from "/Images/Homepage/trending-now/img3.jpg";
import img4 from "/Images/Homepage/trending-now/img4.jpg";
import img5 from "/Images/Homepage/trending-now/img5.jpg";
import AddToBagButton from "../../../components/AddToBagButton";
import { formatPrice } from "../../../utils/formatPrice";
export default function TrendingNow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const products = [
    {
      title: "Rajwadi Red Patola Handloom Saree",
      price: 3150.00,
      image: img1,
    },
    {
      title: "Madhura Magenta Banarasi Silk Saree",
      price: 3150.00,
      image: img2,
    },
    {
      title: "Neelanjana Blue Mysore Silk Saree",
      price: 3150.00,
      image: img3,
    },
    {
      title: "Chandrika White Chanderi Cotton Saree",
      price: 3150.00,
      image: img4,
    },
    {
      title: "Kesariya Gold Kanchipuram Bridal Saree",
      price: 3150.00,
      image: img5,
    },
  ];
  useEffect(() => {
    let timeout;
    timeout = setTimeout(() => {
      setActiveIndex((prev) => {
        if (activeIndex >= products.length - 1) return 0;
        else return prev + 1;
      });
    }, 3000);
    return () => clearTimeout(timeout);
  }, [activeIndex]);
  return (
    <section className="bg-secondary">
      <p className="text-[7.5rem] font-light text-headings tracking-[3rem] w-full text-center">
        TRENDING NOW
      </p>

      <div className="flex justify-between border-2 border-headings p-8 px-20">
        <div className="flex items-center gap-2">
          <img src={diamondBullet} alt="" />
          <p>Trending Now</p>
        </div>
        <ArrowButton style={2} text="Explore All" />
      </div>
      <div className="flex min-h-[65vh] px-20 border-b-2 border-headings">
        <div className="w-2/3 z-1 min-h-full relative bg-slate-100">
          {products.map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt={item.title}
              className={`absolute top-0 left-0 -z-1 h-full w-full object-cover ${
                activeIndex === index ? "opacity-100" : "opacity-0"
              } transition-opacity ease-in-out duration-500`}
            />
          ))}
          <div className="dimmed-bg flex justify-between items-end w-full h-full z-1 text-white p-10">
            <div className="flex flex-col gap-3">
              <h4 className="text-3xl">Hot Picks Just For You</h4>
              <ArrowButton style={1} text="Explore More" />
            </div>
            <p className="text-xl ">
              {String(activeIndex + 1).padStart(2, "0")}/
              {String(products.length).padStart(2, "0")}
            </p>
          </div>
        </div>
        <div className="w-1/3 overflow-hidden border-r-2 border-headings">
          <div
            style={{
              height: products.length * 100,
              transform: `translateY(-${activeIndex * 100}%)`,
              transition: "transform ease-in-out 500ms",
            }}
          >
            {products.map((item, index) => (
              <div key={index} className="flex flex-col h-full group">
                <div className="relative overflow-hidden h-[85%]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute w-2/3 left-2/4 -translate-x-2/4 p-4 -bottom-20 group-hover:bottom-0 transition-all ease-in-out duration-300">
                    <AddToBagButton />
                  </div>
                </div>
                <div className="h-[15%] p-3 flex flex-col gap-1">
                  <p className="text-lg font-medium">{item.title}</p>
                  <p>₹ {formatPrice(item.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
