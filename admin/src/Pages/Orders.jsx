import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllOrders } from "../Store/actions";
import {
  formatDate,
  formatPrice,
  formatTime,
} from "../utils/formatterFunctions";
import { CircularProgress, Skeleton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useSearchParams } from "react-router-dom";
export default function Orders() {
  const { isAllOrdersLoading, isAllOrdersError, allOrders, fetched_at } =
    useSelector((store) => store.allOrders);
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState((prev) => !prev);
  const refreshAllOrders = () => setRefresh(true);
  const [searchParams, setSearchParams] = useSearchParams();
  function handleFilterChange(event) {
    const status = event.target.value;
    const newParams = new URLSearchParams();
    if (status) {
      newParams.set("status", status);
    }
    setSearchParams(newParams);
  }
  console.log(searchParams);
  // useEffect(() => {
  //   const fiveMinutesInMillis = 5 * 60 * 1000; // 5 minutes in milliseconds

  //   if (
  //     token &&
  //     (!fetched_at || Date.now() - fetched_at >= fiveMinutesInMillis)
  //   ) {
  //     dispatch(loadAllOrders(token,searchParams));
  //   }
  //   //eslint-disable-next-line
  // }, [token, fetched_at]);
  useEffect(() => {
    dispatch(loadAllOrders(token, searchParams));
    //eslint-disable-next-line
  }, [token, refresh, searchParams]);
  return (
    <main className="p-6 flex flex-col gap-5 bg-gray-100 min-h-[90vh]">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <p className="text-3xl font-medium">Orders</p>
        <button
          onClick={refreshAllOrders}
          className="flex items-center gap-3 bg-primary text-white p-2 rounded-lg text-lg"
        >
          {isAllOrdersLoading ? (
            <Fragment>
              <p>Refreshing</p>
              <CircularProgress color="" size={"1.75rem"} />
            </Fragment>
          ) : (
            <Fragment>
              <p>Refresh Orders</p> <RefreshIcon />
            </Fragment>
          )}
        </button>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-lg font-medium">Filters</p>
        <select
          value={searchParams.get("status") || ""}
          onChange={handleFilterChange}
          className="bg-white boorder border-headings py-2 px-3 rounded-md outline-none"
        >
          <option value="">All</option>
          <option value="delivered">Delivered</option>
          <option value="confirmed">Not Dispatched</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>
      <div className="overflow-x-auto p-2 bg-white rounded-lg">
        {isAllOrdersError ? (
          <p className="text-center text-red-500 text-2xl">
            {isAllOrdersError}
          </p>
        ) : (
          <Fragment>
            <table className="table-auto w-full text-nowrap">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Total Amount</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                {(isAllOrdersLoading
                  ? Array.from({ length: 5 })
                  : allOrders
                ).map((order, index) => (
                  <tr key={index} className="border-b border-headings text-center">
                    <td className="p-2">{order ? order.id : <Skeleton />}</td>
                    <td className="p-2 font-medium">
                      {order ? order.user_name : <Skeleton />}
                    </td>
                    <td className="p-2">
                      {order ? order.email : <Skeleton />}
                    </td>
                    <td className="p-2 font-medium">
                      {order ? (
                        `₹ ${formatPrice(order.final_amount / 100)}`
                      ) : (
                        <Skeleton />
                      )}
                    </td>
                    <td className="p-2">
                      {order ? formatDate(order.created_at) : <Skeleton />}
                    </td>
                    <td className="p-2">
                      {order ? formatTime(order.created_at) : <Skeleton />}
                    </td>
                    <td className="p-2">
                      <p
                        className={`capitalize text-sm font-medium py-1 px-2 rounded-full text-center ${
                          order &&
                          (order.status === "delivered"
                            ? "bg-green-200 text-green-600"
                            : order.status === "dispatched"
                            ? "bg-yellow-200 text-yellow-600"
                            : order.status === "confirmed"
                            ? "bg-blue-200 text-blue-600"
                            : "bg-red-200 text-red-600")
                        }`}
                      >
                        {order ? order.status : <Skeleton />}
                      </p>
                    </td>

                    <td className="p-2">
                      {order ? "+91 " + order.contact : <Skeleton />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/*Load more for later */}
          </Fragment>
        )}
      </div>
    </main>
  );
}
