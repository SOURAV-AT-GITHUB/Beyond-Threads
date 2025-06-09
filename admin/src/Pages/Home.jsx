import { useDispatch, useSelector } from "react-redux";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import DescriptionIcon from "@mui/icons-material/Description";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { Fragment, useEffect, useState } from "react";
import { loadDashboard } from "../Store/actions";
import { CircularProgress, Skeleton } from "@mui/material";
import {
  formatDate,
  formatPrice,
  formatTime,
} from "../utils/formatterFunctions";
import RefreshIcon from "@mui/icons-material/Refresh";
import { NavLink } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { ADMIN_LOGOUT, OPEN_ALERT } from "../Store/actionTypes";
export default function Home() {
  const dispatch = useDispatch();
  const { name, token } = useSelector((store) => store.auth);
  const {
    isDashboardLoading,
    isDashboardError,
    details,
    latest_orders,
    fetched_at,
  } = useSelector((store) => store.dashboard);
  const [refresh, setRefresh] = useState(false);
  const refreshDashboard = () => setRefresh(true);
  useEffect(() => {
    const fiveMinutesInMillis = 5 * 60 * 1000; // 5 minutes in milliseconds

    if (
      token &&
      (!fetched_at ||
        Date.now() - fetched_at >= fiveMinutesInMillis ||
        isDashboardError)
    ) {
      dispatch(loadDashboard(token));
    }
    //eslint-disable-next-line
  }, [token, fetched_at]);
  useEffect(() => {
    if (token && refresh) {
      dispatch(loadDashboard(token));
    }
    setRefresh(false);
    //eslint-disable-next-line
  }, [refresh]);
  //Download users list
  const [isDownloading, setIsDownloading] = useState(false);
  async function downloadUsersList() {
    setIsDownloading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/admin/export-users`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users-list.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      if (error.status === 401) {
        dispatch({ type: ADMIN_LOGOUT });
        dispatch({
          type: OPEN_ALERT,
          payload: {
            message: "Please login again.",
            severity: "error",
          },
        });
      } else {
        dispatch({
          type: OPEN_ALERT,
          payload: {
            message: error.message,
            severity: "error",
          },
        });
      }
    } finally {
      setIsDownloading(false);
    }
  }
  return (
    <main className="p-6 flex flex-col gap-5 bg-gray-100 min-h-[90vh]">
      <h3 className="text-3xl font-semibold text-center text-primary">
        Welcom {name || "Admin"}!
      </h3>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <p className="text-3xl font-medium">Dashboard</p>
          <button
            onClick={refreshDashboard}
            className="flex items-center gap-3 bg-primary text-white p-2 rounded-lg text-lg"
          >
            {isDashboardLoading ? (
              <Fragment>
                <p>Refreshing</p>
                <CircularProgress color="" size={"1.75rem"} />
              </Fragment>
            ) : (
              <Fragment>
                <p>Refresh Dashboard</p> <RefreshIcon />
              </Fragment>
            )}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-center">
          <div className="flex items-center gap-2 p-2 rounded-lg shadow-md border border-slate-200 w-full bg-white">
            <div className="p-2 bg-green-300 rounded-full">
              <div className="bg-green-600 text-white rounded-full h-full p-3">
                <CurrencyRupeeIcon fontSize="large" />
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Total Sales</p>
              {isDashboardLoading ? (
                <Skeleton sx={{ width: "100px", margin: "5px" }} />
              ) : (
                <p className="text-xl font-medium">
                  {isDashboardError ? (
                    <span className="text-sm text-red-500">
                      {isDashboardError}
                    </span>
                  ) : (
                    `₹ ${formatPrice(details.total_sales / 100)}`
                  )}
                </p>
              )}
            </div>
          </div>
          <NavLink to="/orders">
            <div className="flex items-center gap-2 p-2 rounded-lg shadow-md border border-slate-200 w-full bg-white">
              <div className="p-2 bg-blue-300 rounded-full">
                <div className="bg-blue-600 text-white rounded-full h-full p-3">
                  <ShoppingCartIcon fontSize="large" />
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Orders</p>
                {isDashboardLoading ? (
                  <Skeleton sx={{ width: "100px", margin: "5px" }} />
                ) : (
                  <p className="text-xl font-medium">
                    {isDashboardError ? (
                      <span className="text-sm text-red-500">
                        {isDashboardError}
                      </span>
                    ) : (
                      details.total_orders
                    )}
                  </p>
                )}
              </div>
            </div>
          </NavLink>
          <NavLink to="/orders?status=confirmed">
            <div className="flex items-center gap-2 p-2 rounded-lg shadow-md border border-slate-200 w-full bg-white">
              <div className="p-2 bg-yellow-300 rounded-full">
                <div className="bg-yellow-600 text-white rounded-full h-full p-3">
                  <PendingActionsIcon fontSize="large" />
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Yet To Dispatch</p>
                {isDashboardLoading ? (
                  <Skeleton sx={{ width: "100px", margin: "5px" }} />
                ) : (
                  <p className="text-xl font-medium">
                    {isDashboardError ? (
                      <span className="text-sm text-red-500">
                        {isDashboardError}
                      </span>
                    ) : (
                      details.yet_to_dispatch
                    )}
                  </p>
                )}
              </div>
            </div>
          </NavLink>
          <div className="flex items-center gap-2 p-2 rounded-lg shadow-md border border-slate-200 w-full bg-white">
            <div className="p-2 bg-orange-300 rounded-full">
              <div className="bg-orange-600 text-white rounded-full h-full p-3">
                <InventoryIcon fontSize="large" />
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Total Products</p>
              {isDashboardLoading ? (
                <Skeleton sx={{ width: "100px", margin: "5px" }} />
              ) : (
                <p className="text-xl font-medium">
                  {isDashboardError ? (
                    <span className="text-sm text-red-500">
                      {isDashboardError}
                    </span>
                  ) : (
                    details.total_products
                  )}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={downloadUsersList}
            disabled={isDownloading}
            className="flex items-center gap-2 p-2 rounded-lg shadow-md border border-slate-200 w-full bg-white cursor-pointer disabled:cursor-progress disabled:opacity-60"
          >
            <div className="p-2 bg-green-300 rounded-full">
              <div className="bg-green-600 text-white rounded-full h-full p-3">
                {isDownloading ? (
                  <CircularProgress sx={{ color: "white" }} />
                ) : (
                  <DescriptionIcon fontSize="large" />
                )}
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Customer List</p>
              <p className="text-xl font-medium">Download</p>
            </div>
          </button>
        </div>
        <div className="flex flex-col gap-2 bg-white p-4 rounded-lg">
          <p className="text-xl font-medium">Latest Orders</p>
          <div className="overflow-x-auto p-2">
            {isDashboardError ? (
              <p className="text-center text-red-500 text-2xl">
                {isDashboardError}
              </p>
            ) : (
              <Fragment>
                <table className="table-auto w-full text-nowrap">
                  <tbody>
                    {(isDashboardLoading
                      ? Array.from({ length: 5 })
                      : latest_orders
                    ).map((order, index) => (
                      <tr key={index}>
                        <td className="p-2">
                          {order ? order.id : <Skeleton />}
                        </td>
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
                </table>{" "}
                <p className="text-white bg-primary rounded-md p-2 my-4 w-fit m-auto">
                  <NavLink to="/orders" className="flex items-center gap-2">
                    <span>Show All Orders </span> <EastIcon />
                  </NavLink>
                </p>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
