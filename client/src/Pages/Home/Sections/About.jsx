import banner1 from "/Images/Homepage/about/banner-p-1.jpg";
import banner2 from "/Images/Homepage/about/banner-p-2.jpg";
import banner3 from "/Images/Homepage/about/banner-p-3.jpg";
import banner4 from "/Images/Homepage/about/banner-p-4.jpg";
export default function About() {
  const data = [
    {
      title: "Our Mission",
      text: "To celebrate Indian heritage by offering authentic, elegant sarees that connect tradition with modernity,while empowering artisans and promoting sustainability.",
    },
    {
      title: "Our Values",
      text: "Authenticity, craftsmanship, and sustainability define us. We honor tradition, empower artisans, and deliver timeless elegance with integrity and quality.",
    },
    {
      title: "Unique Offering",
      text: " At Beyond Threads, we offer authentic, handcrafted sarees that blend tradition with modern elegance, celebrating India's rich heritage.",
    },
  ];
  return (
    <section className="bg-secondary">
      <div className="px-20 py-8 flex flex-col gap-4">
        <h3 className="text-6xl font-light">
          Beyond Threads - The Little India
        </h3>
        <p>
          Celebrate the vibrant essence of Indian tradition with a curated
          collection of exquisite sarees, handcrafted to weave stories of
          culture, heritage, and elegance. Beyond Threads brings you timeless
          treasures that reflect the soul of Little India, where every drape
          tells a tale.
        </p>
      </div>
      <div className="flex px-20 py-4 max-h-screen">
        <div className=" bg-white p-3">
          <div className="relative w-full h-full grid grid-cols-4">
            <img src={banner1} alt="" className="h-full w-full object-cover" />
            <img src={banner2} alt="" className="h-full w-full object-cover" />
            <img src={banner3} alt="" className="h-full w-full object-cover" />
            <img src={banner4} alt="" className="h-full w-full object-cover" />
            <div className="absolute w-full h-full dimmed-bg left-0 top-0">
              <div className="relative h-full w-full flex flex-col items-center gap-20 overflow-y-auto hide-scrollbar">
                {data.map((item, index) => (
                  <div
                    key={index}
                    className="w-full min-h-full flex flex-col items-center justify-center"
                  >
                    <div className="max-w-[30%] min-h-[60%] p-5 bg-primary text-white flex flex-col items-center gap-3">
                      <p className="text-4xl font-light">{item.title}</p>
                      <div className="w-px h-2/5 bg-white"></div>
                      <p>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
