import ArrowButton from "../../../components/ArrowButton";
import heroimage from "/Images/Homepage/hero-image.png";

export default function HeroSection() {
  return (
    <section className="relative flex justify-end gap-20 pl-20  max-h-[86vh] bg-primary text-white overflow-hidden">
      <div className="w-3/5 flex flex-col gap-5 self-center">
        <h3 className="text-[3.5rem] leading-tight">
          Celebrate Elegance, Redefined – Discover Sarees for Every Occasion
        </h3>
        <p className="text-lg tracking-wider">
          Discover timeless sarees crafted with love, blending tradition and
          modernity to suit every occasion.
        </p>
        <button className="w-fit">
          <ArrowButton style={1} text="Explore Your Style" />
        </button>
      </div>
      <div className="-scale-x-100 w-2/5">
        <img
          src={heroimage}
          alt=""
          className="h-full w-full scale-105 object-cover object-top"
        />
      </div>
    </section>
  );
}
