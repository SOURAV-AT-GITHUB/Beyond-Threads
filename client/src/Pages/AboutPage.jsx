import React, { useState } from "react";
import About from "./Home/Sections/About";
import leftArrow from "/Images/left-arrow-black.svg";
import rightArrow from "/Images/right-arrow-white.svg";
import diamondBullet from "/Images/diamond-bullet.svg";
import img1 from "/Images/Homepage/categories/womenswear.jpg";
import img2 from "/Images/Homepage/bestsellers/s1-img1.jpg";
import img3 from "/Images/Homepage/bestsellers/s1-img2.jpg";
import quotes from "/Images/quotes.svg";
export default function AboutPage() {
  const testimonials = [
    {
      image: img1,
      name: "Kajal Kashyup",
      text: "I am absolutely in love with my purchase! The saree's quality is exceptional, and the intricate detailing is even more beautiful in person. Beyond Threads truly brings elegance and tradition to life. Fast delivery and great customer service—can’t wait to shop again!",
    },
    {
      image: img2,
      name: "Kajal Kashyup",
      text: "I am absolutely in love with my purchase! The saree's quality is exceptional, and the intricate detailing is even more beautiful in person. Beyond Threads truly brings elegance and tradition to life. Fast delivery and great customer service—can’t wait to shop again!",
    },
    {
      image: img3,
      name: "Kajal Kashyup",
      text: "I am absolutely in love with my purchase! The saree's quality is exceptional, and the intricate detailing is even more beautiful in person. Beyond Threads truly brings elegance and tradition to life. Fast delivery and great customer service—can’t wait to shop again!",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  console.log(activeIndex);
  function nextSlide(){
    setActiveIndex((prev) => {
      if (prev === testimonials.length - 1) return 0;
      else return prev + 1;
    });
  }
  function prevSlide(){
    setActiveIndex((prev) => {
      if (prev === 0) return testimonials.length-1;
      else return prev - 1;
    });
  }
  return (
    <main>
      <About />

      <section className="bg-secondary">
        <h3 className="w-full text-headings text-9xl font-light tracking-[3.25rem] text-center border-y-2 py-2 border-headings">
          TESTIMONIALS
        </h3>
        <div className="relative h-[450px] w-full">
          <div className="h-2/5 p-8 w-full flex items-center">
            <div className="z-10 flex justify-between items-center w-6/10 m-auto mr-0 px-10">
              <div className="flex items-center gap-2">
                <img src={diamondBullet} alt="" />
                <p className="text-lg">Client Reviews</p>
              </div>
              <div className="flex gap-2 ">
                <button onClick={prevSlide} className="border border-primary py-4  px-2">
                  <img src={leftArrow} alt="previous testimonial" />
                </button>
                <button onClick={nextSlide} className="bg-primary py-4  px-2">
                  <img
                   
                    src={rightArrow}
                    alt="next testimonial"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="h-3/5 bg-dark w-full"></div>
          <div className="absolute h-full w-11/12 overflow-hidden right-0 top-0 px-10">
            <div
              className="flex gap-30"
              style={{
                width: `${testimonials.length * 100}%`,
                transform: `translateX(-${(100/testimonials.length)*activeIndex}%)`,
                transition: "all ease-in-out 300ms",
              }}
            >
              {testimonials.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-20 "
                  style={{ width: `${100 / testimonials.length}%` }}
                >
                  <div className="flex flex-col gap-2 w-1/3">
                    <img
                      src={item.image}
                      alt=""
                      className="h-full object-cover object-top max-h-[375px]"
                    />
                    <p className="text-white text-center text-lg">
                      {item.name}
                    </p>
                  </div>
                  <div className="w-2/3 self-end">
                    <div className="flex flex-col gap-3 ">
                      <img src={quotes} alt="" className="max-h-[40px] w-fit" />
                      <p className="text-white text-lg">{item.text}</p>
                    </div>
                  </div>{" "}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
