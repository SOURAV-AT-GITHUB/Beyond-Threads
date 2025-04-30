import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { OPEN_ALERT } from "../../Store/actionTypes";
import { CircularProgress } from "@mui/material";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { formatPrice } from "../../utils/formatPrice";
export default function Womensware() {
  const [data, setData] = useState(null);
  const [isError, setError] = useState(null);
  const dispatch = useDispatch();
  async function getData() {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/products?category=Women`
      );
      console.log(response);
      setData(response.data);
      setError(null);
    } catch (error) {
      setData(null);
      setError(error.response?.data.message || error.message);
      dispatch({
        type: OPEN_ALERT,
        payload: {
          message: error.response?.data.message || error.message,
          severity: "error",
        },
      });
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <p className="font-medium text-lg">Products &gt; Womensware</p>
        <NavLink to="/products/add">
          <p className="text-lg py-2 px-4 bg-green-500 text-white rounded-lg">
            Add Product
          </p>
        </NavLink>
      </div>
      {data ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((product) => (
            <div
              key={product.id}
              className="flex flex-col border border-headings rounded-lg overflow-hidden"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="max-h-[400px] w-full object-cover"
              />
              <div className="p-2">
                <p>{product.name}</p>
                <p className="font-medium">₹ {formatPrice(product.price)}</p>
                <p>Stock - {product.stock}</p>
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center text-primary text-2xl">{isError}</div>
      ) : (
        <div className="flex justify-center items-center gap-4 ">
          <CircularProgress size="3rem" />
          <p className="text-2xl font-medium">Loading...</p>
        </div>
      )}
    </div>
  );
}
