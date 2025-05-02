import { useEffect, useState } from "react";
import { formatPrice } from "../utils/formatPrice";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import axios from "axios";
import ProductCard from "../components/ProductCard";
export default function CategoryWiseProducts() {
  //Constants for filters
  const priceRanges = [
    { low: 1000, high: 1999 },
    { low: 2000, high: 2999 },
    { low: 3000, high: 4999 },
    { low: 5000, high: 6999 },
    { low: 7000, high: 9999 },
  ];
  const fabrics = [
    "Arcylic",
    "Artificial Silk",
    "Brocade",
    "Chanderi",
    "Chanderi Silk",
    "Cutton",
    "Handloom Cottom",
    "Handloom Mul; with Zari",
    "Polyester",
    "Silk",
    "Silk Cotton",
    "Vicose",
    "Viscose Blend",
    "Vicose Georgette",
  ];
  const colours = [
    "#f5f5f5",
    "#000000",
    "#00ff6f",
    "#f89f18",
    "#142688",
    "#097a44",
    "#d3ff00",
    "#5500fe",
    "#4775ff",
    "#B3202A",
    "#5f5d61",
    "#ff00ce",
    "#fe0000",
    "#f5cf7a",
    "#13e114",
    "#9b177c",
  ];
  const patterns = [
    "Abstract",
    "Animal Print",
    "Border",
    "Floral",
    "Dhoop Chaon",
    "Floral Border",
    "Geometric",
    "Solid",
    "Strips",
    "Tie Dye",
    "Tri Colour",
    "Temple Border",
    "Zari",
    "Zari Border",
  ];
  //Filters updatings functions
  function handlePriceChange(event, index) {
    const isChecked = event.target.checked;
    const newParams = new URLSearchParams(searchParams);

    const selectedRanges = [...priceRanges]
      .map((range, i) => {
        const isThisChecked =
          i === index
            ? isChecked
            : searchParams.get("minPrice") <= range.low &&
              searchParams.get("maxPrice") >= range.high;
        return isThisChecked ? range : null;
      })
      .filter(Boolean);

    if (selectedRanges.length === 0) {
      newParams.delete("minPrice");
      newParams.delete("maxPrice");
    } else {
      const min = Math.min(...selectedRanges.map((r) => r.low));
      const max = Math.max(...selectedRanges.map((r) => r.high));
      newParams.set("minPrice", min.toString());
      newParams.set("maxPrice", max.toString());
    }

    setSearchParams(newParams);
  }
  function handleFabricsChange(isChecked, fabric) {
    const selectedFabrics = searchParams.getAll("fabrics");
    const newParams = new URLSearchParams(searchParams);
    const updatedFabrics = selectedFabrics.filter((f) => f !== fabric);

    if (!isChecked) {
      updatedFabrics.push(fabric);
    }
    newParams.delete("fabrics");
    updatedFabrics.forEach((f) => newParams.append("fabrics", f));
    setSearchParams(newParams);
  }
  function handleColorsChange(isSelected, color) {
    const selectedColors = searchParams.getAll("colors");
    const newParams = new URLSearchParams(searchParams);
    const updatedColors = selectedColors.filter((c) => c !== color);
    if (!isSelected) {
      updatedColors.push(color);
    }
    newParams.delete("colors");
    updatedColors.forEach((c) => newParams.append("colors", c));
    setSearchParams(newParams);
    console.log("here");
  }
  function handlePatternsChange(isChecked, pattern) {
    const selectedPatterns = searchParams.getAll("patterns");
    const newParams = new URLSearchParams(searchParams);
    const updatedPatterns = selectedPatterns.filter((p) => p !== pattern);
    if (!isChecked) {
      updatedPatterns.push(pattern);
    }
    newParams.delete("patterns");
    updatedPatterns.forEach((p) => newParams.append("patterns", p));
    setSearchParams(newParams);
  }
  //filter expansion states
  const [availabilityExpanded, setAvaiabilityExpanded] = useState(false);
  const [priceExpanded, setPriceExpanded] = useState(false);
  const [fabricExpanded, setFabricExpanded] = useState(false);
  const [colourExpanded, setColourExpanded] = useState(false);
  const [patternsExpanded, setPatternsExpanded] = useState(false);

  //params and query hooks
  const { sub_category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  //Other states and hooks
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  //data fetching functions in useeffect
  useEffect(() => {
    async function getData() {
      try {
        let URL = `${BACKEND_URL}/products?sub_category=${sub_category}`;
        if (searchParams.size) URL += `&${searchParams}`;
        console.log(URL);
        const response = await axios.get(URL);
        setProducts(response.data);
        //eslint-disable-next-line
      } catch (error) {
        navigate("/404");
      }
    }
    getData();
  }, [searchParams, sub_category, navigate]);
  return (
    <main className="bg-secondary">
      <p className="uppercase text-[7.5rem] font-light text-headings tracking-[2.25rem] w-full text-center">
        {sub_category.split("-").join(" ")}
      </p>
      <div className="flex gap-4 px-20 py-10 border-y border-headings max-h-[110vh]">
        <div className="w-1/4 flex flex-col gap-2 overflow-y-scroll red-scrollbar pr-2">
          <p className="text-center font-medium">Filter By</p>
          {/*Availability */}
          <div>
            <div className="flex items-center justify-between">
              <p className="font-light">Availability</p>
              <button
                onClick={() => setAvaiabilityExpanded((prev) => !prev)}
                className="font-medium text-xl"
              >
                {availabilityExpanded ? "-" : "+"}
              </button>
            </div>
            <div
              className={`flex items-center gap-3 text-lg ${
                availabilityExpanded
                  ? "h-auto opacity-100 pt-4"
                  : "h-0 opacity-0 overflow-hidden"
              } transition-all ease-linear duration-300`}
            >
              <input
                type="checkbox"
                checked={searchParams.get("instock") === "true"}
                onChange={() => {
                  const newParams = new URLSearchParams(searchParams);
                  const isChecked = searchParams.get("instock") === "true";
                  if (isChecked) {
                    newParams.delete("instock");
                  } else {
                    newParams.set("instock", "true");
                  }

                  setSearchParams(newParams);
                }}
                className=" accent-primary h-5 w-5"
              />
              <p className="font-light">In stock only</p>
            </div>
          </div>

          <hr className="" />
          {/*Price */}
          <div>
            <div className="flex items-center justify-between">
              <p className="font-light">Price</p>
              <button
                onClick={() => setPriceExpanded((prev) => !prev)}
                className="font-medium text-xl"
              >
                {priceExpanded ? "-" : "+"}
              </button>
            </div>
            <div
              className={`flex flex-col gap-1 text-lg ${
                priceExpanded
                  ? "h-auto opacity-100 pt-4"
                  : "h-0 opacity-0 overflow-hidden"
              } transition-all ease-linear duration-300`}
            >
              {priceRanges.map((range, index) => {
                const min = Number(searchParams.get("minPrice"));
                const max = Number(searchParams.get("maxPrice"));
                const isChecked = min <= range.low && max >= range.high;

                return (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => handlePriceChange(e, index)}
                      className="accent-primary h-5 w-5"
                    />
                    <p className="font-light">
                      ₹ {formatPrice(range.low)} - {formatPrice(range.high)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <hr className="" />
          {/*Fabric */}
          <div>
            <div className="flex  items-center justify-between">
              <p className="font-light">Fabric</p>
              <button
                onClick={() => setFabricExpanded((prev) => !prev)}
                className="font-medium text-xl"
              >
                {fabricExpanded ? "-" : "+"}
              </button>
            </div>
            <div
              className={`flex flex-col gap-1 text-lg ${
                fabricExpanded
                  ? "h-auto opacity-100 pt-4"
                  : "h-0 opacity-0 overflow-hidden"
              } transition-all ease-linear duration-300`}
            >
              {fabrics.map((fabric, index) => {
                const selectedFabrics = searchParams.getAll("fabrics");
                const isChecked = selectedFabrics.includes(fabric);
                return (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleFabricsChange(isChecked, fabric)}
                      className=" accent-primary h-5 w-5"
                    />
                    <p className="font-light">{fabric}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <hr className="" />
          {/*Colours */}
          <div>
            <div className="flex  items-center justify-between">
              <p className="font-light">Colour</p>
              <button
                onClick={() => setColourExpanded((prev) => !prev)}
                className="font-medium text-xl"
              >
                {colourExpanded ? "-" : "+"}
              </button>
            </div>
            <div
              className={`grid grid-cols-8 gap-x-2 gap-y-2 px-3 ${
                colourExpanded
                  ? "h-auto opacity-100 py-4"
                  : "h-0 opacity-0 overflow-hidden"
              } transition-all ease-linear duration-300`}
            >
              {colours.map((color, index) => {
                const selectedColors = searchParams.getAll("colors");
                const isSelected = selectedColors.includes(color);
                return (
                  <div
                    key={index}
                    style={{ height: "30px", padding: "2px" }}
                    className={`border-2  ${
                      isSelected ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <div
                      onClick={() => handleColorsChange(isSelected, color)}
                      style={{
                        height: "100%",
                        width: "100%",
                        backgroundColor: color,
                      }}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>

          <hr className="" />
          {/*Patterns */}
          <div>
            <div className="flex  items-center justify-between">
              <p className="font-light">Patterns</p>
              <button
                onClick={() => setPatternsExpanded((prev) => !prev)}
                className="font-medium text-xl"
              >
                {patternsExpanded ? "-" : "+"}
              </button>
            </div>
            <div
              className={`flex flex-col gap-1 ${
                patternsExpanded
                  ? "h-auto opacity-100 pt-4"
                  : "h-0 opacity-0 overflow-hidden"
              } transition-all ease-linear duration-300`}
            >
              {patterns.map((pattern, index) => {
                const selectedPatterns = searchParams.getAll("patterns");
                const isChecked = selectedPatterns.includes(pattern);
                return (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handlePatternsChange(isChecked, pattern)}
                      className=" accent-primary h-5 w-5"
                    />
                    <p className="font-light">{pattern}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <hr className="" />
        </div>

        <div className="w-3/4 grid grid-cols-3 gap-4 overflow-y-auto hide-scrollbar">
          {(products ? products : Array.from({ length: 6 })).map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
