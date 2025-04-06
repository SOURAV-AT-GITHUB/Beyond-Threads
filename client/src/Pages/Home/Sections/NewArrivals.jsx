import diamondBullet from "/Images/diamond-bullet.svg";
import ArrowButton from "../../../components/ArrowButton";
import img1 from "/Images/Homepage/new-arrivals/img1.jpg";
import img2 from "/Images/Homepage/new-arrivals/img2.jpg";
import img3 from "/Images/Homepage/new-arrivals/img3.jpg";
import img4 from "/Images/Homepage/new-arrivals/img4.jpg";
import AddToBagButton from "../../../components/AddToBagButton";
import {formatPrice} from '../../../utils/formatPrice'
export default function NewArrivals() {
  const newArrivals = [
    { title: "Pure Gold Necklace", image: img1, price: 67950.00 },
    {
      title: "Pure Handloom Gachi Tussar Saree",
      image: img2,
      price: 6990.00,
    },
    { title: "Plain Cotton Formal Shirt", image: img3, price: "2,950.00" },
    {
      title: "3pcs/set Minimalist Abstract Flower Vase",
      image: img4,
      price: 2499.00,
    },
  ];
  return (
    <section className="bg-secondary">
      <p className="text-[7.25rem] font-light text-headings tracking-[4rem] w-full text-center">
        NEW ARRIVALS
      </p>

      <div className="flex justify-between border-2 border-headings p-8 px-20">
        <div className="flex items-center gap-2">
          <img src={diamondBullet} alt="" />
          <p>New Arrivals</p>
        </div>
        <ArrowButton style={2} text="Explore All" />
      </div>
      <div className="grid grid-cols-4 gap-4 p-20 pt-0 h-[75vh]">
        {newArrivals.map((item,index)=>(
          <div key={index} className=" group h-full flex flex-col gap-3 overflow-hidden">
          <div className="relative h-[85%] overflow-hidden">
            <img
              src={item.image}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover group-hover:scale-115 transition-transform ease-in-out duration-300"
            />
            <div className="absolute w-full p-4 -bottom-20 group-hover:bottom-0 transition-all ease-in-out duration-300">
            <AddToBagButton/>
            </div>
          </div>
          <div className="h-[15%] flex flex-col">
            <p>{item.title}</p>
            <p className="text-slate-500">₹ {formatPrice(item.price)}</p>
          </div>
        </div>
        ))}

      </div>
    </section>
  );
}
