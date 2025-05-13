import { useEffect } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import axios from "axios";
import { useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import { ADMIN_LOGOUT, OPEN_ALERT } from "../Store/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
export default function ProductSections({ section }) {
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  function handleError(error) {
    if (error.status === 401) {
      dispatch({ type: ADMIN_LOGOUT });
      dispatch({
        type: OPEN_ALERT,
        payload: {
          message: "Please Login again",
          severity: "warning",
        },
      });
    } else {
      dispatch({
        type: OPEN_ALERT,
        payload: {
          message: error.response?.data.message || error.message,
          severity: "error",
        },
      });
    }
  }
  //Section wise data
  const [{ isDataLoading, data, isDataError }, setData] = useState({
    isDataLoading: false,
    data: null,
    isDataError: null,
  });

  //Fetching section data
  useEffect(() => {
    async function getData() {
      setData({ isDataLoading: true, data: null, isDataError: null });
      try {
        const response = await axios.get(
          `${BACKEND_URL}/products/section/${section.slug}`
        );
        setData({
          data: response.data,
          isDataLoading: false,
          isDataError: null,
        });
      } catch (error) {
        setData({
          isDataLoading: false,
          data: null,
          isDataError: error.response?.data.message || error.message,
        });
      }
    }
    getData();
  }, [section.slug]);
  //Update position
  const [positionUpdating, setPositionUpdating] = useState(null);
  async function updatePosition(event, sp_id, p) {
    event.preventDefault();
    const position = Number(event.target[0].value);
    if (!position || position < 1) return alert("Invalid position");
    if (position === p) return alert(`Product is alreadt at position ${p}.`);
    setPositionUpdating(sp_id);
    try {
      await axios.patch(
        `${BACKEND_URL}/products/section/${sp_id}`,
        { position },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch({
        type: OPEN_ALERT,
        payload: { message: "Position updated", severity: "success" },
      });
      let temp = data.map((item) =>
        item.sp_id === sp_id ? { ...item, position } : item
      );
      temp.sort((a, b) => a.position - b.position);
      setData((prev) => ({ ...prev, data: temp }));
      event.target[0].value = "";
    } catch (error) {
      handleError(error);
    } finally {
      setPositionUpdating(null);
    }
  }
  //Remove product from section
  const [productRemoving, setProductRemoving] = useState(null);
  async function removeProduct(sp_id) {
    setProductRemoving(sp_id);
    try {
      await axios.delete(`${BACKEND_URL}/products/section/${sp_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const temp = data.filter((item) => item.sp_id !== sp_id);
      setData((prev) => ({ ...prev, data: temp }));
      if (allData) {
        let temp = allData.map((item) => {
          if (item.sp_id === sp_id) {
            delete item.position;
            delete item.sp_id;
            return item;
          } else return item;
        });
        setAllData((prev) => ({ ...prev, allData: temp }));
      }
      dispatch({
        type: OPEN_ALERT,
        payload: {
          message: `Product removed from ${section.name}`,
          severity: "success",
        },
      });
    } catch (error) {
      handleError(error);
    } finally {
      setProductRemoving(null);
    }
  }
  //All Products to add in the section
  const [{ isAllDataLoading, allData, isAllDataError }, setAllData] = useState({
    isAllDataLoading: false,
    allData: null,
    isAllDataError: null,
  });
  const [addProductDialogOpen, setAddProductDialogOpen] = useState(false);
  const openAddProductDialog = () => setAddProductDialogOpen(true);
  const closeAddProductDialog = () => setAddProductDialogOpen(false);
  const [addingProduct, setAddingProduct] = useState(null);
  useEffect(() => {
    async function loadAllProducts() {
      setAllData({
        isAllDataLoading: true,
        allData: null,
        isAllDataError: null,
      });
      try {
        const response = await axios.get(`${BACKEND_URL}/products`);
        let temp;
        if (data) {
          temp = response.data.map((item) => {
            let index = data.findIndex((product) => product.id === item.id);
            if (index !== -1) return data[index];
            else return item;
          });
        }

        setAllData({
          isAllDataLoading: false,
          allData: temp || response.data,
          isAllDataError: null,
        });
      } catch (error) {
        setAllData({
          isAllDataLoading: false,
          allData: null,
          isAllDataError: error.response?.data.message || error.emessage,
        });
      }
    }
    if (addProductDialogOpen && !allData) loadAllProducts();
  }, [addProductDialogOpen, allData, data]);
  async function addProductToSection(id) {
    let position = 1;
    if (data) {
      position = data[data.length - 1].position + 1;
    }
    setAddingProduct(id);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/products/section/${section.slug}`,
        {
          product_id: id,
          position,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch({
        type: OPEN_ALERT,
        payload: {
          message: `Product added to position ${position}`,
          severity: "success",
        },
      });
      let temp = allData.map((item) => {
        if (item.id === id) {
          setData((prev) => ({
            ...prev,
            data: prev.data
              ? [
                  ...prev.data,
                  { ...item, position, sp_id: response.data.sp_id },
                ]
              : [{ ...item, position, sp_id: response.data.sp_id }],
          }));
          return { ...item, position, sp_id: response.data.sp_id };
        } else return item;
      });
      setAllData((prev) => ({ ...prev, allData: temp }));
    } catch (error) {
      handleError(error);
    } finally {
      setAddingProduct(null);
    }
  }
  return (
    <main className="p-4">
      <div>
        <div className="flex flex-col sm:flex-row items-center sm:gap-4 mb-4">
          <p className="text-lg my-2">
            Section name : <b>{section.name}</b>
          </p>

          <button
            onClick={openAddProductDialog}
            className="bg-green-500 text-white py-1 px-2 rounded-md cursor-pointer"
          >
            Add Product to {section.name}
          </button>
        </div>
        {isDataLoading ? (
          <div className="flex flex-col gap-4">
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
          </div>
        ) : data ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {data.map((product, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 border border-headings rounded-sm"
              >
                <img
                  src={`${BACKEND_URL}/uploads/${product.image}`}
                  alt=""
                  className="h-[350px] object-cover"
                />
                <div className="flex flex-col gap-1 p-1">
                  <p className="line-clamp-2">{product.name}</p>
                  <p>
                    Current Position : <b>{product.position}</b>
                  </p>
                  <form
                    onSubmit={(event) =>
                      updatePosition(event, product.sp_id, product.position)
                    }
                    className="flex items-center gap-2"
                  >
                    <input
                      type="number"
                      required
                      placeholder="Update position"
                      className="w-1/2 border border-headings rounded-md p-2 pr-0"
                    />
                    <button
                      type="submit"
                      disabled={Boolean(typeof positionUpdating === "number")}
                      className=" w-1/2 bg-blue-500 text-white rounded-md p-2 cursor-pointer disabled:opacity-60 disabled:cursor-progress"
                    >
                      {positionUpdating === product.sp_id ? (
                        <CircularProgress color="" />
                      ) : (
                        <p>Update Poistion</p>
                      )}
                    </button>
                  </form>
                  <button
                    onClick={() => removeProduct(product.sp_id)}
                    disabled={Boolean(typeof productRemoving === "number")}
                    className="bg-primary text-white rounded-md py-1 cursor-pointer disabled:cursor-progress disabled:opacity-60"
                  >
                    {productRemoving === product.sp_id ? (
                      <CircularProgress color="" />
                    ) : (
                      <p>Remove from {section.name}</p>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5 text-2xl">
            <p className="text-primary font-medium">
              {isDataError || "Something went wrong"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-white rounded-lg py-1 px-3 cursor-pointer"
            >
              Reload
            </button>
          </div>
        )}
      </div>
      <Dialog open={addProductDialogOpen} onClose={closeAddProductDialog}>
        <div className="flex flex-col items-center gap-2 bg-white p-3 rounded-md min-w-2xs">
          <p className="text-lg my-2">
            Section name : <b>{section.name}</b>
          </p>
          {isAllDataLoading ? (
            <div className="flex flex-col gap-4">
              <Skeleton></Skeleton>
              <Skeleton></Skeleton>
              <Skeleton></Skeleton>
            </div>
          ) : allData ? (
            <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
              {allData.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between gap-4 items-center border border-headings p-2 rounded-lg"
                >
                  <div className="flex gap-1">
                    <div className=" max-w-[75px] max-h-[75px]">
                      <img
                        src={`${BACKEND_URL}/uploads/${product.image}`}
                        alt=""
                        className="h-full w-full  object-contain"
                      />
                    </div>
                    <p className="line-clamp-3">{product.name}</p>
                  </div>
                  <div>
                    {product.sp_id ? (
                      <p className="text-nowrap border border-headings rounded-md p-1">
                        At position {product.position}{" "}
                      </p>
                    ) : (
                      <button
                        onClick={() => addProductToSection(product.id)}
                        disabled={Boolean(typeof addingProduct === "number")}
                        className="bg-green-500 text-white rounded-md py-1 px-2 cursor-pointer disabled:opacity-60 disabled:cursor-progress"
                      >
                        {addingProduct === product.id ? (
                          <CircularProgress color="" />
                        ) : (
                          <p>Add To {section.name}</p>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-5 text-2xl">
              <p className="text-primary font-medium">
                {isAllDataError || "Something went wrong"}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-primary text-white rounded-lg py-1 px-3 cursor-pointer"
              >
                Reload
              </button>
            </div>
          )}
        </div>
      </Dialog>
    </main>
  );
}
