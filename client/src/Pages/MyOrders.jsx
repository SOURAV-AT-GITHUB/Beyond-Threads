import { useEffect } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../utils/formatDate";
import { formatPrice } from "../utils/formatPrice";
import { NavLink, useNavigate } from "react-router-dom";
import ArrowButton from "../components/ArrowButton";
import Skeleton from "@mui/material/Skeleton";
import { getMyOrders } from "../Store/actions";
export default function MyOrders() {
  const { idToken, userLoading } = useSelector((store) => store.auth);
  const { isOrdersLoading, myOrders, isOrdersError } = useSelector(
    (store) => store.myOrders
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userLoading && !idToken) navigate("/login");
    else if (idToken) dispatch(getMyOrders(idToken));
    //eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [idToken, userLoading]);
  return (
    <main className="p-10 flex flex-col items-center gap-5">
      <h4 className="text-center text-2xl font-medium">My Orders</h4>
      <div className="flex flex-col gap-10 w-full max-w-3xl">
        {isOrdersLoading || userLoading ? (
          <div className="flex flex-col gap-2">
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
          </div>
        ) : myOrders ? (
          myOrders.map((order, index) => (
            <div
              key={index}
              className="flex flex-col border border-headings rounded-xl overflow-hidden"
            >
              <div className="flex items-center justify-evenly gap-6 border-b bg-primary text-white p-2">
                <div>
                  <p>ORDER PLACED</p>
                  <p>{formatDate(order.date)}</p>
                </div>
                <div>
                  <p>TOTAL</p>
                  <p>₹ {formatPrice(order.final_amount / 100)}</p>
                </div>
                <div>
                  <p>SHIP TO</p>
                  <p>{`${order.address.first_name} ${order.address.last_name}`}</p>
                </div>
                <div>
                  <p>Status</p>
                  <p className="capitalize">{order.status}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 p-1">
                {order.order_items.map((order_item, index) => (
                  <div key={index} className="flex">
                    <div className=" max-h-[100px] max-w-[100px]">
                      <img
                        src={`${BACKEND_URL}/uploads/${order_item.image}`}
                        alt=""
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p>{order_item.name}</p>
                      <p>Quantity : {order_item.quantity}</p>
                      <p>Price : ₹ {formatPrice(order_item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p className="text-xl font-medium">
              {isOrdersError || "Something went wrong"}
            </p>
            <NavLink to="/">
              <ArrowButton style={2} text="Continue Shopping" />
            </NavLink>
          </div>
        )}
      </div>
    </main>
  );
}
