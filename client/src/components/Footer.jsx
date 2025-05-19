import logo from "/Images/logo.svg";
import facebookIcon from "/Images/facebook.svg";
import instagramIcon from "/Images/instagram.svg";
import twitterIcon from "/Images/twitter.svg";
import { NavLink } from "react-router-dom";
export default function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <footer className="bg-secondary">
      <section className="grid grid-cols-5 gap-20 py-12 px-20">
        <div className="col-span-2 w-10/12 flex flex-col gap-3 ">
          <NavLink to="/" onClick={scrollToTop}>
            <img src={logo} alt="" />
          </NavLink>
          <p>
            Beyond Threads brings you handcrafted sarees that celebrate
            tradition, culture, and timeless elegance, connecting you to India's
            rich heritage.
          </p>
        </div>
        <div className="justify-self-end">
          <p className="my-2">Quick Links</p>
          <ul>
            <li onClick={scrollToTop}>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>Fabric</li>
            <li onClick={scrollToTop}>
              <NavLink to="/about">About Us</NavLink>
            </li>
            <li>Contact Us</li>
            <li onClick={scrollToTop}>
              <NavLink to="/my-orders">My Orders</NavLink>
            </li>
          </ul>
        </div>
        <div className="justify-self-end">
          <p className="my-2">Legal</p>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div className="justify-self-end">
          <p className="my-2">Contact</p>
          <ul>
            <li>Email : support@beyondthreads.in</li>
            <li>Phone : +91 95996 68605</li>
          </ul>
        </div>
      </section>
      <hr className="text-headings" />
      <section className="px-20 py-6 flex justify-between">
        <p>2024 © Beyond Threads. All rights reserved.</p>
        <div className="flex gap-4">
          <img src={facebookIcon} alt="facebook" />
          <img src={instagramIcon} alt="instagram" />
          <img src={twitterIcon} alt="twitter" />
        </div>
      </section>
    </footer>
  );
}
