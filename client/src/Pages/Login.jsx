import banner1 from "/Images/Homepage/about/banner-p-1.jpg";
import banner2 from "/Images/Homepage/about/banner-p-2.jpg";
import banner3 from "/Images/Homepage/about/banner-p-3.jpg";
import banner4 from "/Images/Homepage/about/banner-p-4.jpg";
export default function Login() {
  return (
    <main className="h-screen w-full bg-white p-4">
      <div className="relative grid grid-cols-4 h-full">
      <img src={banner1} alt="" className="h-full w-full object-cover" />
      <img src={banner2} alt="" className="h-full w-full object-cover" />
      <img src={banner3} alt="" className="h-full w-full object-cover" />
      <img src={banner4} alt="" className="h-full w-full object-cover" />
      <div className="absolute top-0 left-0 h-full w-full bg-[#00000045] flex items-center justify-center">
        <form action="" className="bg-white p-12 w-[500px] max-w-full flex flex-col items-center gap-10">
          <h3 className="text-5xl">LOGIN</h3>
          <div className="flex flex-col gap-4 w-full">
          <div className="w-full">
            <p className="font-light text-lg mb-1 tracking-widest">EMAIL</p>
            <input type="text" placeholder="" required className="border-2 border-slate-400 focus:border-slate-500 w-full h-[60px] pl-2"/>
          </div>
          <div className="w-full" >
            <p className="font-light text-lg mb-1 tracking-widest">PASSWORD</p>
            <input type="password" placeholder="" required className="border-2 border-slate-400 focus:border-slate-500 w-full h-[60px] pl-2"/>
          </div>
          </div>
          <div className="w-full flex flex-col items-center gap-4 ">
            <button type="submit" className="bg-primary text-white w-full h-[60px] cursor-pointer">SIGN IN</button>
            <p>Create account</p>
          </div>
        </form>
      </div>
      </div>
    </main>
  );
}
