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
  function nextSlide() {
    setActiveIndex((prev) => {
      if (prev === testimonials.length - 1) return 0;
      else return prev + 1;
    });
  }
  function prevSlide() {
    setActiveIndex((prev) => {
      if (prev === 0) return testimonials.length - 1;
      else return prev - 1;
    });
  }
  return (
    <main>
      {/* <About /> */}
      <section className="flex items-center gap-20 p-20">
        <div className="space-y-4">
          <p className="text-5xl font-medium">About Beyond Threads</p>
          <p>
            𝐀𝐛𝐨𝐮𝐭 𝐔𝐬 𝐁𝐞𝐲𝐨𝐧𝐝 𝐓𝐡𝐫𝐞𝐚𝐝𝐬 – 𝐓𝐡𝐞 𝐋𝐢𝐭𝐭𝐥𝐞 𝐈𝐧𝐝𝐢𝐚 𝐢𝐬 𝐚 𝐛𝐨𝐮𝐭𝐢𝐪𝐮𝐞 𝐥𝐚𝐛𝐞𝐥 𝐭𝐡𝐚𝐭
            𝐜𝐞𝐥𝐞𝐛𝐫𝐚𝐭𝐞𝐬 𝐈𝐧𝐝𝐢𝐚’𝐬 𝐫𝐢𝐜𝐡 𝐚𝐫𝐭𝐢𝐬𝐚𝐧𝐚𝐥 𝐥𝐞𝐠𝐚𝐜𝐲 𝐭𝐡𝐫𝐨𝐮𝐠𝐡 𝐭𝐢𝐦𝐞𝐥𝐞𝐬𝐬 𝐟𝐚𝐬𝐡𝐢𝐨𝐧
            𝐚𝐧𝐝 𝐭𝐡𝐨𝐮𝐠𝐡𝐭𝐟𝐮𝐥 𝐝𝐞𝐬𝐢𝐠𝐧. 𝐅𝐨𝐮𝐧𝐝𝐞𝐝 𝐛𝐲 𝐒𝐮𝐦𝐚𝐧 𝐁𝐡𝐚𝐭𝐭𝐚𝐜𝐡𝐚𝐫𝐲𝐚, 𝐭𝐡𝐞 𝐛𝐫𝐚𝐧𝐝
            𝐛𝐫𝐢𝐧𝐠𝐬 𝐭𝐨𝐠𝐞𝐭𝐡𝐞𝐫 𝐡𝐚𝐧𝐝𝐰𝐨𝐯𝐞𝐧 𝐬𝐚𝐫𝐞𝐞𝐬 𝐟𝐫𝐨𝐦 𝐬𝐢𝐱𝐭𝐞𝐞𝐧 𝐬𝐭𝐚𝐭𝐞𝐬, 𝐚𝐥𝐨𝐧𝐠𝐬𝐢𝐝𝐞
            𝐜𝐮𝐫𝐚𝐭𝐞𝐝 𝐜𝐨𝐥𝐥𝐞𝐜𝐭𝐢𝐨𝐧𝐬 𝐨𝐟 𝐡𝐚𝐧𝐝𝐜𝐫𝐚𝐟𝐭𝐞𝐝 𝐚𝐩𝐩𝐚𝐫𝐞𝐥, 𝐣𝐞𝐰𝐞𝐥𝐥𝐞𝐫𝐲, 𝐝𝐞𝐜𝐨𝐫, 𝐚𝐧𝐝
            𝐩𝐨𝐭𝐭𝐞𝐫𝐲.
          </p>
          <p>
            𝐖𝐡𝐚𝐭 𝐛𝐞𝐠𝐚𝐧 𝐚𝐬 𝐚 𝐩𝐞𝐫𝐬𝐨𝐧𝐚𝐥 𝐩𝐚𝐬𝐬𝐢𝐨𝐧 𝐡𝐚𝐬 𝐠𝐫𝐨𝐰𝐧 𝐢𝐧𝐭𝐨 𝐚 𝐭𝐫𝐮𝐬𝐭𝐞𝐝
            𝐝𝐞𝐬𝐭𝐢𝐧𝐚𝐭𝐢𝐨𝐧 𝐟𝐨𝐫 𝐭𝐡𝐨𝐬𝐞 𝐰𝐡𝐨 𝐯𝐚𝐥𝐮𝐞 𝐚𝐮𝐭𝐡𝐞𝐧𝐭𝐢𝐜𝐢𝐭𝐲, 𝐜𝐫𝐚𝐟𝐭𝐬𝐦𝐚𝐧𝐬𝐡𝐢𝐩, 𝐚𝐧𝐝
            𝐜𝐮𝐥𝐭𝐮𝐫𝐚𝐥 𝐜𝐨𝐧𝐧𝐞𝐜𝐭𝐢𝐨𝐧. 𝐎𝐮𝐫 𝐨𝐟𝐟𝐞𝐫𝐢𝐧𝐠𝐬 𝐢𝐧𝐜𝐥𝐮𝐝𝐞 𝐞𝐥𝐞𝐠𝐚𝐧𝐭 𝐬𝐚𝐥𝐰𝐚𝐫-𝐤𝐮𝐫𝐭𝐢𝐬,
            𝐡𝐚𝐧𝐝-𝐩𝐫𝐢𝐧𝐭𝐞𝐝 𝐭𝐨𝐩𝐬, 𝐛𝐥𝐮𝐞 𝐩𝐨𝐭𝐭𝐞𝐫𝐲 𝐢𝐭𝐞𝐦𝐬, 𝐚𝐫𝐭𝐢𝐟𝐢𝐜𝐢𝐚𝐥 𝐡𝐚𝐧𝐝𝐰𝐨𝐯𝐞𝐧
            𝐣𝐞𝐰𝐞𝐥𝐥𝐞𝐫𝐲, 𝐚𝐧𝐝 𝐦𝐞𝐧’𝐬 𝐤𝐮𝐫𝐭𝐚𝐬 𝐚𝐧𝐝 𝐬𝐡𝐢𝐫𝐭𝐬—𝐞𝐚𝐜𝐡 𝐩𝐢𝐞𝐜𝐞 𝐭𝐞𝐥𝐥𝐢𝐧𝐠 𝐚 𝐬𝐭𝐨𝐫𝐲 𝐨𝐟
            𝐡𝐞𝐫𝐢𝐭𝐚𝐠𝐞 𝐚𝐧𝐝 𝐚𝐫𝐭𝐢𝐬𝐭𝐫𝐲.
          </p>

          <p>
            𝐀𝐭 𝐁𝐞𝐲𝐨𝐧𝐝 𝐓𝐡𝐫𝐞𝐚𝐝𝐬, 𝐰𝐞 𝐝𝐨𝐧’𝐭 𝐣𝐮𝐬𝐭 𝐬𝐨𝐮𝐫𝐜𝐞 — 𝐰𝐞
            𝐜𝐨-𝐜𝐫𝐞𝐚𝐭𝐞 𝐚𝐧𝐝 𝐜𝐮𝐫𝐚𝐭𝐞 𝐨𝐮𝐫 𝐜𝐨𝐥𝐥𝐞𝐜𝐭𝐢𝐨𝐧𝐬 𝐢𝐧 𝐜𝐥𝐨𝐬𝐞 𝐜𝐨𝐥𝐥𝐚𝐛𝐨𝐫𝐚𝐭𝐢𝐨𝐧 𝐰𝐢𝐭𝐡
            𝐬𝐤𝐢𝐥𝐥𝐞𝐝 𝐚𝐫𝐭𝐢𝐬𝐚𝐧𝐬 𝐟𝐫𝐨𝐦 𝐚𝐜𝐫𝐨𝐬𝐬 𝐈𝐧𝐝𝐢𝐚. 𝐑𝐨𝐨𝐭𝐞𝐝 𝐢𝐧 𝐭𝐫𝐚𝐝𝐢𝐭𝐢𝐨𝐧 𝐚𝐧𝐝 𝐫𝐞𝐟𝐢𝐧𝐞𝐝
            𝐟𝐨𝐫 𝐜𝐨𝐧𝐭𝐞𝐦𝐩𝐨𝐫𝐚𝐫𝐲 𝐭𝐚𝐬𝐭𝐞𝐬, 𝐞𝐯𝐞𝐫𝐲 𝐩𝐢𝐞𝐜𝐞 𝐫𝐞𝐟𝐥𝐞𝐜𝐭𝐬 𝐨𝐮𝐫 𝐜𝐨𝐦𝐦𝐢𝐭𝐦𝐞𝐧𝐭 𝐭𝐨
            𝐞𝐭𝐡𝐢𝐜𝐚𝐥 𝐜𝐫𝐚𝐟𝐭𝐬𝐦𝐚𝐧𝐬𝐡𝐢𝐩, 𝐬𝐥𝐨𝐰 𝐟𝐚𝐬𝐡𝐢𝐨𝐧, 𝐚𝐧𝐝 𝐬𝐨𝐮𝐥𝐟𝐮𝐥 𝐥𝐢𝐯𝐢𝐧𝐠. 𝐌𝐨𝐫𝐞 𝐭𝐡𝐚𝐧 𝐚
            𝐛𝐫𝐚𝐧𝐝, 𝐰𝐞 𝐚𝐫𝐞 𝐚 𝐜𝐞𝐥𝐞𝐛𝐫𝐚𝐭𝐢𝐨𝐧 𝐨𝐟 𝐈𝐧𝐝𝐢𝐚’𝐬 𝐥𝐢𝐯𝐢𝐧𝐠 𝐜𝐫𝐚𝐟𝐭𝐬 𝐚𝐧𝐝 𝐭𝐡𝐞 𝐩𝐞𝐨𝐩𝐥𝐞
            𝐰𝐡𝐨 𝐤𝐞𝐞𝐩 𝐭𝐡𝐞𝐦 𝐚𝐥𝐢𝐯𝐞.
          </p>
        </div>
        <div>
          <img
            src="https://sayalirajadhyakshasarees.com/cdn/shop/files/SHRU8819.jpg?crop=center&height=2000&v=1683890362&width=2000"
            alt=""
          />
        </div>
      </section>

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
                <button
                  onClick={prevSlide}
                  className="border border-primary py-4  px-2"
                >
                  <img src={leftArrow} alt="previous testimonial" />
                </button>
                <button onClick={nextSlide} className="bg-primary py-4  px-2">
                  <img src={rightArrow} alt="next testimonial" />
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
                transform: `translateX(-${
                  (100 / testimonials.length) * activeIndex
                }%)`,
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
