import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
import AddToBagButton from "./AddToBagButton";
import { Skeleton } from "@mui/material";
export default function ProductCard({ product = null, color = null }) {
  async function handleAddToCart(event) {
    event.stopPropagation();
    event.preventDefault();
    //Add to cart logic
  }

  return (
    <NavLink to={product ? `/product/${product.id}` : null}>
      <div className=" group h-full min-h-[400px] max-h-[500px] flex flex-col gap-3 overflow-hidden">
        {product ? (
          <div className="relative h-[85%] overflow-hidden">
            <img
              src={product.images[0]}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover group-hover:scale-115 transition-transform ease-in-out duration-300"
            />
            <button
              onClick={(e) => handleAddToCart(e, product)}
              className="absolute w-full p-4 -bottom-20 group-hover:bottom-0 transition-all ease-in-out duration-300"
            >
              <AddToBagButton />
            </button>
          </div>
        ) : (
          <Skeleton sx={{ height: "100%" }} />
        )}
        <div className="h-[15%] flex flex-col">
          {product ? (
            <Fragment>
              <p
                className={`${color === "white" ? "text-white" : "text-black"}`}
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
