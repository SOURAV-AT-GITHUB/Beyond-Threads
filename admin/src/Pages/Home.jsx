import { useSelector } from "react-redux";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
export default function Home() {
  const { name } = useSelector((store) => store.auth);
  const orders = [
    {
      id: 2456,
      customersName: "Customer Name",
      customersEmail: "customersmail@gmail.com",
      customersMobile: "+91 1234567890",
      orderValue: 1750.5,
      status: {
        isDelivered: new Date(),
        isCanceled: null,
        isPending: null,
      },
    },
    {
      id: 2674,
      customersName: "Customer Name 2",
      customersEmail: "customersmail2@gmail.com",
      customersMobile: "+91 9874563210",
      orderValue: 2050.5,
      status: {
        isDelivered: null,
        isCanceled: null,
        isPending: true,
      },
    },
    {
      id: 2156,
      customersName: "Customer Name 3",
      customersEmail: "customersmail3@gmail.com",
      customersMobile: "+91 8745632109",
      orderValue: 1250.5,
      status: {
        isDelivered: null,
        isCanceled: true,
        isPending: null,
      },
    },
    {
      id: 2446,
      customersName: "Customer Name 4",
      customersEmail: "customersmail4@gmail.com",
      customersMobile: "+91 7654130890",
      orderValue: 2750.5,
      status: {
        isDelivered: new Date(),
        isCanceled: null,
        isPending: null,
      },
    },
  ];
  return (
    <main className="p-6 flex flex-col gap-5 bg-gray-100 min-h-[90vh]">
      <h3 className="text-3xl font-semibold text-center text-primary">
        Welcom {name || "Admin"}!
      </h3>
      <div className="flex flex-col gap-4">
        <p className="text-3xl font-medium">Dashboard</p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center">
          <div className="flex items-center gap-2 p-2 rounded-lg shadow-md border border-slate-200 w-full max-w-[250px] bg-white">
            <div className="p-2 bg-green-300 rounded-full">
              <div className="bg-green-600 text-white rounded-full h-full p-3">
                <CurrencyRupeeIcon fontSize="large" />
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Total Sales</p>
              <p className="text-xl font-medium">₹ 41675.38</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg shadow-md border border-slate-200 w-full max-w-[250px] bg-white">
            <div className="p-2 bg-blue-300 rounded-full">
              <div className="bg-blue-600 text-white rounded-full h-full p-3">
                <ShoppingCartIcon fontSize="large" />
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Total Orders</p>
              <p className="text-xl font-medium">267</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg shadow-md border border-slate-200 w-full max-w-[250px] bg-white">
            <div className="p-2 bg-orange-300 rounded-full">
              <div className="bg-orange-600 text-white rounded-full h-full p-3">
                <InventoryIcon fontSize="large" />
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Total Products</p>
              <p className="text-xl font-medium">137</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 bg-white p-4 rounded-lg">
          <p className="text-xl font-medium">Latest Orders</p>
          <div className="overflow-x-auto p-2">
            <table className="table-auto w-full text-nowrap">
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="p-2">{order.id}</td>
                    <td className="p-2 font-medium">{order.customersName}</td>
                    <td className="p-2">{order.customersEmail}</td>
                    <td className="p-2 font-medium">
                      ₹{order.orderValue.toFixed(2)}
                    </td>
                    <td className="p-2">
                      <p
                        className={`text-sm font-medium py-1 px-2 rounded-full text-center ${
                          order.status.isDelivered
                            ? "bg-green-200 text-green-600"
                            : order.status.isPending
                            ? "bg-yellow-200 text-yellow-600"
                            : "bg-red-200 text-red-600"
                        }`}
                      >
                        {order.status.isDelivered
                          ? "Delivered"
                          : order.status.isPending
                          ? "Pending"
                          : order.status.isCanceled
                          ? "Canceled"
                          : "Unknown"}
                      </p>
                    </td>
                    <td className="p-2">{order.customersMobile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
