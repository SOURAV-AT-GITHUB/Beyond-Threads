import ArrowButton from "../../../components/ArrowButton";

export default function Newsletter() {
  return (
    <section id="newsletter" className="relative p-8">
      <h3 className="text-[8.5rem] font-extralight tracking-[5rem] text-headings text-center opacity-75">
        SUBSCRIBE
      </h3>
      <div className="flex flex-col w-3/4 m-auto ">
        <p className="text-2xl text-white">Subscribe To Our Newsletter</p>
        <div className="flex justify-between items-end border-b-4 border-white w-full py-2">
            <input type="text" placeholder="Enter your Email" className="text-6xl text-white font-light placeholder:text-white outline-none"/>
            <ArrowButton style={3} text="Send Mail"/>
        </div>
      </div>
    </section>
  );
}
