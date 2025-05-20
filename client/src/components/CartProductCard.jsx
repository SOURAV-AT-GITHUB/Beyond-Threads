import { formatPrice } from "../utils/formatPrice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ADD_OR_UPDATE_ITEM, REMOVE_SINGLE_ITEM } from "../Store/actionTypes";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import deleteIcon from "/Images/delete.png";
import { useNavigate } from "react-router-dom";
import couponTagIcon from "/Images/coupon-tag.png";
export default function CartProductCard({ product, totalDiscount }) {
  const { idToken } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function removeItem(product) {
    try {
      await axios.delete(`${BACKEND_URL}/client/cart`, {
        headers: { Authorization: `Bearer ${idToken}` },
        data: { product_id: product.id },
      });
      dispatch({ type: REMOVE_SINGLE_ITEM, payload: product });
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
    }
  }

  async function updateQuantity(isIncrease, product) {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/client/cart`,
        {
          product_id: product.id,
          quantity: isIncrease ? product.quantity + 1 : product.quantity - 1,
        },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
      dispatch({
        type: ADD_OR_UPDATE_ITEM,
        payload: response.data,
      });
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
    }
  }
  return (
    <div className="flex gap-4">
      <img
        src={`${BACKEND_URL}/uploads/${product.image}`}
        alt=""
        className="h-[200px] w-[225px] object-cover object-top"
      />
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-medium text-lg">{product.name}</p>
          {totalDiscount>0 ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4 tracking-wide">
                <p>₹{(product.price - product.discount).toFixed(2)}</p>
                <p className="line-through text-primary">
                  ₹{formatPrice(product.price)}
                </p>
              </div>
              <div className="flex items-center gap-1 text-primary text-sm">
                <img src={couponTagIcon} alt="" className="w-7 h-7" />
                <p>₹{product.discount}</p>
              </div>
            </div>
          ) : (
            <p className="text-2xl font-light">
              ₹ {formatPrice(product.price)}
            </p>
          )}
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="flex gap-1">
            <button
              disabled={product.quantity <= 1}
              onClick={() => updateQuantity(false, product)}
              className="border border-primary text-2xl px-5 py-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <p className="bg-white text-xl px-5 py-1">{product.quantity}</p>
            <button
              onClick={() => updateQuantity(true, product)}
              className="text-white bg-primary text-2xl px-5 py-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeItem(product)}
            className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img
              src={deleteIcon}
              alt=""
              className="w-7 hover:scale-125 transition-transform ease-in-out duration-300"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
