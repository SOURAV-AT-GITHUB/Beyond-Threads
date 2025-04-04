import blackCart from "/Images/cart-black.svg";
import redCart from "/Images/cart-red.svg";
export default function AddToBagButton() {
  return (
    <div className="flex w-full h-[50px] border border-primary group/cart-button">
      <p className="h-full w-3/4 bg-primary text-white flex items-center justify-center px-4">
        Add To Bag
      </p>
      <div className="w-1/4 overflow-hidden h-full">
        <div className="w-[200%] bg-white flex -translate-x-2/4 group-hover/cart-button:-translate-x-0 transition-transform ease-in-out duration-300">
          <div className="px-2 w-full h-[50px] p-3 flex justify-center">
            <img src={redCart} alt="" className="h-full " />
          </div>
          <div className={`px-2 w-full h-[50px] p-3 flex justify-center`}>
            <img src={blackCart} alt="" className="h-full " />
          </div>
        </div>
      </div>
    </div>
  );
}
