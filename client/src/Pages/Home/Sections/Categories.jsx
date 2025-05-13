import ArrowButton from "../../../components/ArrowButton";
import diamondBullet from "/Images/diamond-bullet.svg";
import womenswearImage from "/Images/Homepage/categories/womenswear.jpg";
import menswearImage from "/Images/Homepage/categories/menswear.png";
import accessoriesImage from "/Images/Homepage/categories/accessories.png";
import homedecorImage from "/Images/Homepage/categories/homedecor.png";
export default function Categories() {
  return (
    <section className="bg-secondary">
      <p className="text-[9rem] font-light text-headings tracking-[4rem] w-full text-center">
        CATEGORIES
      </p>

      <div className="flex justify-between border-2 border-headings p-8 px-20">
        <div className="flex items-center gap-2">
          <img src={diamondBullet} alt="" />
          <p>Categories</p>
        </div>

        <ArrowButton style={2} text="Explore All" />
      </div>
      <div className="grid grid-cols-2 grid-rows-3 gap-2 px-20 text-white max-h-[60vh]">
        <div className="relative flex row-span-3 ">
          <img
            src={womenswearImage}
            alt=""
            className="w-full h-full object-cover "
          />
          <div className="absolute w-full h-full top-0 left-0 flex flex-col gap-2 justify-end p-4 ">
            <p>Womenswear</p>
            <p>Timeless fashion that inspires confidence and elegance.</p>
            <button className="w-fit">
              <ArrowButton style={1} text="Explore Collcetion" />
            </button>
          </div>
        </div>

        <div className="flex justify-between bg-[#ed474b] overflow-hidden group">
          <div className="flex flex-col justify-end p-2 gap-2">
            <p className="text-3xl">Menswear</p>
            <p>Classic and modern style for the refined men.</p>
          </div>
          <div className="w-2/5 h-full ">
            <img
              src={menswearImage}
              alt=""
              className=" object-cover scale-135  group-hover:scale-115 transition-transform ease-in-out duration-300"
            />
          </div>
        </div>

        <div className="flex justify-between bg-[#bd282c] overflow-hidden group">
          <div className="flex flex-col justify-end p-2 gap-2">
            <p className="text-3xl">Accessories</p>
            <p>Complete your look with must-have luxury accents.</p>
          </div>
          <div className="w-2/5 h-full ">
            <img
              src={accessoriesImage}
              alt=""
              className="w-full h-full rotate-45 object-cover scale-80 mt-4 group-hover:scale-60 transition-transform ease-in-out duration-300"
            />
          </div>
        </div>

        <div className="flex justify-between bg-[#f36f72] overflow-hidden group">
          <div className="flex flex-col justify-end p-2 gap-2">
            <p className="text-3xl">Home Decors</p>
            <p>Convert your home to luxury ones.</p>
          </div>
          <div className="w-2/5 h-full ">
            <img
              src={homedecorImage}
              alt=""
              className="w-full h-full object-cover scale-70 group-hover:scale-60 transition-transform ease-in-out duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
