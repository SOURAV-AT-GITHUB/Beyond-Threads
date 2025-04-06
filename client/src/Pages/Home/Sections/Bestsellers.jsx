import diamondBullet from "/Images/diamond-bullet.svg";
import ArrowButton from "../../../components/ArrowButton";
import coverimage1 from "/Images/Homepage/bestsellers/cover-image-1.jpg";
import s1img1 from "/Images/Homepage/bestsellers/s1-img1.jpg";
import s1img2 from "/Images/Homepage/bestsellers/s1-img2.jpg";
import s1img3 from "/Images/Homepage/bestsellers/s1-img3.jpg";
import s1img4 from "/Images/Homepage/bestsellers/s1-img4.jpg";
import s1img5 from "/Images/Homepage/bestsellers/s1-img5.jpg";
import s1img6 from "/Images/Homepage/bestsellers/s1-img6.jpg";
import coverimage2 from "/Images/Homepage/bestsellers/cover-image-2.jpg";
import s2img1 from "/Images/Homepage/bestsellers/s2-img1.jpg";
import s2img2 from "/Images/Homepage/bestsellers/s2-img2.jpg";
import s2img3 from "/Images/Homepage/bestsellers/s2-img3.jpg";
import s2img4 from "/Images/Homepage/bestsellers/s2-img4.jpg";
import s2img5 from "/Images/Homepage/bestsellers/s2-img5.jpg";
import s2img6 from "/Images/Homepage/bestsellers/s2-img6.jpg";
import AddToBagButton from "../../../components/AddToBagButton";
import { formatPrice } from "../../../utils/formatPrice";
export default function Bestsellers() {
  const section1 = [
    {
      title: "Vennai Vellai Kanchipuram Silk Saree",
      price: 3150.0,
      image: s1img1,
    },
    {
      title: "Hruta Durgule Silk Saree",
      price: 2550.0,
      image: s1img2,
    },
    {
      title: "Red Butta Saree",
      price: 2950.0,
      image: s1img3,
    },
    {
      title: "Kanchipuram Silk",
      price: 2550.0,
      image: s1img4,
    },
    {
      title: "Exquisite Ajrakh Sindoori Saree",
      price: 4950.0,
      image: s1img5,
    },
    {
      title: "Eternal Elegance Banno Saree",
      price: 5950.0,
      image: s1img6,
    },
  ];
  const section2 = [
    {
      title: "Arched Grace Jharokha Silk Saree",
      price: 2950.0,
      image: s2img1,
    },
    {
      title: "Rajputana Jharokha Drape",
      price: 2950.0,
      image: s2img2,
    },
    {
      title: "Jharna Elegance Silk Saree",
      price: 2950.0,
      image: s2img3,
    },
    {
      title: "Heritage Jharokha Weave Saree",
      price: 2950.0,
      image: s2img4,
    },
    {
      title: "Timeless Jharokha Motif Saree",
      price: 2950.0,
      image: s2img5,
    },
    {
      title: "Mehfil Jharokha Handloom Saree",
      price: 2950.0,
      image: s2img6,
    },
  ];

  return (
    <section className="bg-dark">
      <p className="text-[7.25rem] font-light text-headings tracking-[4rem] w-full text-center">
        BESTSELLERS
      </p>

      <div className="flex justify-between border-2 border-headings p-8 px-20">
        <div className="flex items-center gap-2">
          <img src={diamondBullet} alt="" />
          <p className="text-white">Bestsellers</p>
        </div>
        <ArrowButton style={2} text="Explore All" />
      </div>

      <div className="flex gap-10 px-20 h-screen max-h-screen">
        <div className="relative overflow-hidden w-2/4 h-full">
          <div className="bestsellers-moving-image-wrapper w-full h-full">
            <img
              src={coverimage1}
              alt=""
              className=" min-w-screen h-full object-cover"
            />
          </div>
          <div className="absolute left-2/4 top-2/4 -translate-2/4 min-w-3/5 min-h-1/4 p-4 flex flex-col items-center justify-center gap-2 bg-primary text-white">
            <p className="text-2xl">Honoring the Essence of</p>
            <h4 className="text-7xl">Tradition</h4>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 w-2/4 text-white overflow-y-auto hide-scrollbar">
          {section1.map((item, index) => (
            <div key={index} className="flex flex-col gap-4 group h-[500px]">
              <div className="relative overflow-hidden h-[85%]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover group-hover:scale-115 transition-transform ease-in-out duration-300"
                />
                <button className="absolute w-full p-4 -bottom-20 group-hover:bottom-2 transition-all ease-in-out duration-300">
                  <AddToBagButton />
                </button>
              </div>
              <div className="flex flex-col h-[15%]">
                <p className="text-lg">{item.title}</p>
                <p className="text-lg font-light">
                  ₹ {formatPrice(item.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="text-headings my-14" />

      <div className="flex gap-10 px-20 h-screen max-h-screen">
        <div className="grid grid-cols-2 gap-4 w-2/4 text-white overflow-y-auto hide-scrollbar">
          {section2.map((item, index) => (
            <div key={index} className="flex flex-col gap-4 group h-[500px]">
              <div className="relative overflow-hidden h-[85%]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover group-hover:scale-115 transition-transform ease-in-out duration-300"
                />
                <button className="absolute w-full p-4 -bottom-20 group-hover:bottom-2 transition-all ease-in-out duration-300">
                  <AddToBagButton />
                </button>
              </div>
              <div className="flex flex-col h-[15%]">
                <p className="text-lg">{item.title}</p>
                <p className="text-lg font-light">
                  ₹ {formatPrice(item.price)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden w-2/4 h-full">
          <div className="bestsellers-moving-image-wrapper w-full h-full">
            <img
              src={coverimage2}
              alt=""
              className=" min-w-screen h-full object-cover"
            />
          </div>
          <div className="absolute left-2/4 top-2/4 -translate-2/4 min-w-4/5 min-h-1/4 p-4 flex flex-col items-center justify-center gap-2 bg-primary text-white">
            <p className="text-2xl">Reviving the Timeless Elegance of</p>
            <h4 className="text-7xl">Jharokhas</h4>
          </div>
        </div>
      </div>
    </section>
  );
}
