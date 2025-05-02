import diamondBullet from "/Images/diamond-bullet.svg";
import ArrowButton from "../../../components/ArrowButton";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../../components/ProductCard";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export default function NewArrivals() {
  const [data, setData] = useState(null);
  const [isError, setError] = useState(false);
  async function handleAddToCart(event, product) {
    event.stopPropagation();
    event.preventDefault();
    //Add to cart logic
  }
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/products?sub_category=new-arrival&limit=4`
        );
        setData(response.data);
        setError(null);
      } catch (error) {
        setData(null);
        setError(error.response?.data.message || error.message);
      }
    }
    getData();
  }, []);
  return (
    <section className="bg-secondary">
      <p className="text-[7.25rem] font-light text-headings tracking-[4rem] w-full text-center">
        NEW ARRIVALS
      </p>

      <div className="flex justify-between border-2 border-headings p-8 px-20">
        <div className="flex items-center gap-2">
          <img src={diamondBullet} alt="" />
          <p>New Arrivals</p>
        </div>
        <NavLink to="/category/new-arrival">
          <ArrowButton style={2} text="Explore All" />
        </NavLink>
      </div>
      {isError ? (
        <div className="flex items-center justify-center text-primary text-2xl min-h-[200px]">
          {isError}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 p-20 pt-0 h-[75vh] ">
          {(data ? data : Array.from({ length: 4 })).map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
      )}
    </section>
  );
}
