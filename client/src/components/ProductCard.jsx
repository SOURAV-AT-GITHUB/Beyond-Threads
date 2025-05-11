import { Fragment, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
import AddToBagButton from "./AddToBagButton";
import { Skeleton } from "@mui/material";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { ADD_OR_UPDATE_ITEM, USER_LOGOUT } from "../Store/actionTypes";
export default function ProductCard({ product = null, color = null }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((store) => store.token);
  const [isLoading, setIsLoading] = useState(false);
  async function handleAddToCart(event) {
    event.stopPropagation();
    event.preventDefault();
    if (!token) return navigate("/login");
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/client/cart`,
        { product_id: product.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      dispatch({ type: ADD_OR_UPDATE_ITEM, payload: response.data });
    } catch (error) {
      if (error.status === 401) {
        dispatch({ type: USER_LOGOUT });
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <NavLink to={product ? `/product/${product.id}` : null}>
      <div className=" group h-full min-h-[400px] max-h-[500px] flex flex-col gap-3 overflow-hidden">
        {product ? (
          <div className="relative h-[80%] overflow-hidden">
            <img
              src={product.images[0]}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover group-hover:scale-115 transition-transform ease-in-out duration-300"
            />
            <button
              onClick={(e) => handleAddToCart(e, product)}
              disabled={isLoading}
              className="absolute w-full p-4 -bottom-20 group-hover:bottom-0 transition-all ease-in-out duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-pointer"
            >
              <AddToBagButton isLoading={isLoading} />
            </button>
          </div>
        ) : (
          <Skeleton sx={{ height: "100%" }} />
        )}
        <div className="h-[20%] flex flex-col">
          {product ? (
            <Fragment>
              <p
                className={`${
                  color === "white" ? "text-white" : "text-black"
                } line-clamp-2`}
              >
                {product.name}
              </p>
              <p
                className={`${
                  color === "white" ? "text-white" : "text-slate-500"
                }`}
              >
                ₹ {formatPrice(product.price)}
              </p>
            </Fragment>
          ) : (
            <Fragment>
              <Skeleton className="!h-full"></Skeleton>
              <Skeleton className="!h-full"></Skeleton>
            </Fragment>
          )}
        </div>
      </div>
    </NavLink>
  );
}
