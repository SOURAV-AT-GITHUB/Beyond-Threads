import { useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import axios from "axios";
import { useDispatch } from "react-redux";
import { OPEN_ALERT } from "../../Store/actionTypes";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
export default function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [warning, setWarning] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      setWarning("You can only upload up to 5 images.");
      setImages([]);
      setPreviews([]);
      return;
    }

    setWarning("");
    setImages(files);

    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(filePreviews);
  };
  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    let category = "";
    for (const element of event.target.elements) {
      if (!element.name || element.name === "images") continue;
      else if (element.name === "blouse_piece") {
        formData.append(element.name, element.checked);
      } else {
        if (element.name === "category") category = element.value.toLowerCase();
        formData.append(element.name, element.value.trim());
      }
    }
    for (let image of images) {
      formData.append("images", image);
    }
    try {
      await axios.post(`${BACKEND_URL}/products`, formData);
      dispatch({
        type: OPEN_ALERT,
        payload: { message: "Product added", severity: "success" },
      });
      navigate(`/products/${category}`);
    } catch (error) {
      dispatch({
        type: OPEN_ALERT,
        payload: {
          message: error.response?.data.message || error.message,
          severity: "error",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <main className="flex flex-col gap-4">
      <p className="text-center text-xl font-medium">Add Product</p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-3 "
      >
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full">
          <input
            type="text"
            name="name"
            placeholder="Enter Product Name"
            required
            className="p-2 border border-slate-400 rounded-lg"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            required
            className="p-2 border border-slate-400 rounded-lg"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            required
            className="p-2 border border-slate-400 rounded-lg"
          />
          <input
            type="text"
            name="color_name"
            placeholder="Color Name"
            required
            className="p-2 border border-slate-400 rounded-lg"
          />
          <input
            type="text"
            name="color_codes"
            placeholder="Color Codes"
            required
            className="p-2 border border-slate-400 rounded-lg"
          />
          <input
            type="text"
            name="pattern"
            placeholder="Pattern"
            required
            className="p-2 border border-slate-400 rounded-lg"
          />
          <input
            type="text"
            name="care"
            placeholder="Care"
            required
            className="p-2 border border-slate-400 rounded-lg"
          />
          <select
            required
            name="category"
            className="p-2 border border-slate-400 rounded-lg"
          >
            <option value="">Select Category</option>
            <option value="Women">Women</option>
            <option value="Men">Men</option>
            <option value="Decor">Decor</option>
          </select>
          <input
            type="text"
            name="sub_category"
            placeholder="Sub Category"
            required
            className="p-2 border border-slate-400 rounded-lg"
          />
          <input
            type="text"
            name="product_type"
            placeholder="Product Type"
            required
            className="p-2 border border-slate-400 rounded-lg"
          />
          <input
            type="text"
            name="length"
            placeholder="Product Length"
            required
            className="p-2 border border-slate-400 rounded-lg"
          />
          <div className="flex items-center gap-2 p-2 border border-slate-400 rounded-lg">
            <input
              type="checkbox"
              name="blouse_piece"
              id=""
              className="h-[20px] w-[20px]"
            />
            <p>Blouse piece</p>
          </div>
          <input
            type="text"
            name="fabric"
            placeholder="Fabric"
            required
            className="p-2 border border-slate-400 rounded-lg"
          />
          <input
            type="text"
            name="blouse"
            placeholder="Blouse"
            required
            className="p-2 border border-slate-400 rounded-lg"
          />
          <input
            type="text"
            name="disclaimer"
            placeholder="Disclaimer"
            required
            className="p-2 border border-slate-400 rounded-lg"
          />
          <input
            type="text"
            name="sku"
            placeholder="SKU"
            required
            className="p-2 border border-slate-400 rounded-lg"
          />
          <input
            type="text"
            name="what_you_will_receive"
            placeholder="What will you receive"
            required
            className="p-2 border border-slate-400 rounded-lg"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            required
            className="p-2 border border-slate-400 rounded-lg"
          />
          <input
            type="text"
            name="note"
            placeholder="Note"
            required
            className="p-2 border border-slate-400 rounded-lg"
          />
          <div>
            <input
              type="file"
              multiple
              accept="image/*"
              name="images"
              onChange={handleImageChange}
              className="p-2 border border-slate-400 rounded-lg"
            />
            {warning && <p className="text-sm text-red-500">{warning}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="text-xl py-2 px-4 bg-primary hover:bg-red-700 text-white rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          disabled={Boolean(warning) || isSubmitting}
        >
          {isSubmitting ? <CircularProgress color="" /> : <p>Add Product</p>}
        </button>
      </form>
      {previews[0] && (
        <div>
          <p className="text-lg my-2">Image Previews</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {previews.map((src, id) => (
              <img
                key={id}
                src={src}
                loading="lazy"
                alt=""
                className="w-full object-contain"
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
