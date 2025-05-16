import AddToBagButton from "../components/AddToBagButton";
import freeShippingIcon from "/Images/Product/free-shipping.svg";
import calendarIcon from "/Images/Product/calendar.svg";
import truckIcon from "/Images/Product/truck.svg";
import rupeeIcon from "/Images/Product/rupee.svg";
import diamondBullet from "/Images/diamond-bullet.svg";
import ArrowButton from "../components/ArrowButton";
import { Fragment, useEffect, useState } from "react";
import { formatPrice } from "../utils/formatPrice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ADD_OR_UPDATE_ITEM } from "../Store/actionTypes";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export default function Product() {
  const sililarProducts = [
    {
      image:
        "https://s3-alpha-sig.figma.com/img/7439/edbf/19ade5afe542d62ec22991c29c849f22?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=eDcaFZUbnepZ2Euoyq2nqNX-n7dMjOmuqABTm8sUMEbTKG6uEYd6qf8XW3Tl-8Z0gcCcH7HDybEgXOvCIBGRiM8wtA21pPc3qxWsRt6eGSlcEhcE6deoX-mMgVFjSn3xKA4qDUZZRitGtVmbaW29b1l0QNskB0AAPlHpSasHu1JPk2Bf17XTUkpJdKVTWhrEBU-X8LgYe7TudeQM~dwKMpVdFxUgA70vtE4BuTHQ-HS2vEjnkHJZbv1xZaU~b6OkdugzfwUct4D0ROXezVvSTqbbJmZ9QL9lufg0KwLS8rCM5Jc~IpAS0hZfeBC6P9LsjM7cY3wNDrN7HdpaIC1bnw__",
      title: "Red Butta Saree in Silk",
      price: 2950.0,
    },
    {
      image:
        "https://s3-alpha-sig.figma.com/img/eff7/4a3b/2cd3e50435d2b644ee92dc3769c2505d?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Mc9mdZsSlUqi0nqrXT50~NMYDtjDFnjvCRIxoHYmpxZy5u0ONAdlyuAmyGa0JrEPBCBkQ132Q0ylx6kLjnE2tT5xvSNsdy5dJTuFhe-~dDGFc8bheNZgIOSy8hSzj4IizSLjF4M0r5vaLdqiLryPqvK8oyCNBWoYJcT3-7SD8j2VjXWUlmH7Xv5OxsDpcd7A1UauL3swUNf66BbWW4wuuPaSNMxQ5XPha8jp1ZgnLLhs1jfBh1qwPRhvzMnww5BU9S29bX-j5~Ntub7C8BsPSW4YTvBH3NvBd8P95OWeG-sD-xYO80iMEyUnngG4RCd8qdGxSEXGacaTBWVHC7n-ZA__",
      title: "Pink Butta Saree in Silk",
      price: 2950.0,
    },
    {
      image:
        "https://s3-alpha-sig.figma.com/img/b4b5/d61a/c39e3e77c3fa78a7d0db5cc400cc6dc1?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XI01H2kG2Rpaux4jZKJ6k~cTU6Y~QrT9cgPRXyHBcQvba8B0qDZr5xHoOLOuVWHw6sVnGjxUvBXKWnGX5~ojyBCVj~OlsLzOaWL8jt0pwtDKfWbRZVwizgidxHDtCWDfmjWSfM1B0u58ZqFCJXlQtmVrOEqwaZiQFwtU4kSXH4blYFeCohFrXLERMv9yqqVSwBKej4F3tf26jXbruWPcJMHp-dDAijo274TkNHmqmqQXjSUwvuYmfqUdrEQ87~Mkd~ayqqE~8Dc6gYt4WsoiLSemEmjXP4HTxHiJ7xLMi5gh7d~2G-AcJdcgwSzPdWPV5jVc0JKpKJbNhY9Mkn8QTA__",
      title: "Yellow Saree in Silk",
      price: 2499.0,
    },
  ];
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [returnExchangeExpanded, setReturnExchangeExpanded] = useState(false);
  const [manufacturingInfoExpanded, setManufacturingInfoExpanded] =
    useState(false);
  const dispatch = useDispatch();
  const { idToken } = useSelector((store) => store.auth);
  const [isLoading, setIsLoading] = useState(false);
  async function handleAddToCart() {
    if (!idToken) return navigate("/login");
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/client/cart`,
        { product_id: product.id },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
      dispatch({ type: ADD_OR_UPDATE_ITEM, payload: response.data });
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`${BACKEND_URL}/products/${id}`);
        setProduct(response.data);
        //eslint-disable-next-line
      } catch (error) {
        navigate("/404");
      }
    }
    getData();
  }, [id]);

  return (
    <main>
      <section className="flex gap-10 max-h-[80vh] bg-secondary px-20 py-4">
        <div className="w-2/4 flex gap-2 max-h-full ">
          <div className="flex flex-col gap-2 max-h-full w-1/4 px-1 overflow-y-auto red-scrollbar">
            {(product ? product.images : Array.from({ length: 4 })).map(
              (src, index) =>
                src ? (
                  <img
                    key={index}
                    src={`${BACKEND_URL}/uploads/${src}`}
                    alt={product.name}
                    className={`object-cover h-1/4 w-full cursor-pointer border-2 ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ) : (
                  <Skeleton key={index} className="!h-1/4 w-full" />
                )
            )}
          </div>
          {product?.images[0] ? (
            <img
              src={`${BACKEND_URL}/uploads/${product.images[selectedImage]}`}
              alt=""
              className="w-3/4 h-full object-cover"
            />
          ) : (
            <Skeleton className="!w-3/4 !h-full" />
          )}
        </div>

        <div className="w-2/4 flex flex-col gap-4 overflow-y-auto hide-scrollbar">
          {product ? (
            <h3 className="text-4xl font-medium">{product.name}</h3>
          ) : (
            <Skeleton
              animation="wave"
              variant="text"
              sx={{
                minHeight: "50px",
              }}
            />
          )}
          {product ? (
            <Fragment>
              <p className="text-3xl font-light">
                ₹ {formatPrice(product.price)}
              </p>
              <p>(inclusive of all taxes)</p>
            </Fragment>
          ) : (
            <Skeleton sx={{ width: "120px", minHeight: "50px" }} />
          )}
          {product ? (
            <p>
              <b>Please Note:</b> {product.note}
            </p>
          ) : (
            <Skeleton sx={{ minHeight: "120px" }} />
          )}
          {product ? (
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <AddToBagButton isLoading={isLoading} />
            </button>
          ) : (
            <Skeleton sx={{ minHeight: "50px" }} />
          )}
          {product ? (
            <div className="bg-white p-4 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <img src={freeShippingIcon} alt="" />
                <p>Free shipping on domestic orders above Rs. 1,950</p>
              </div>
              <div className="flex items-center gap-2">
                <img src={calendarIcon} alt="" />
                <p>2-7 days delivery within India</p>
              </div>
              <div className="flex items-center gap-2">
                <img src={truckIcon} alt="" />
                <p>Hassle-free 10 days return & exchange</p>
              </div>
              <div className="flex items-center gap-2">
                <img src={rupeeIcon} alt="" />
                <p>Care : {product.care}</p>
              </div>
            </div>
          ) : (
            <Skeleton sx={{ minHeight: "150px" }} />
          )}
          <hr className="text-slate-400" />
          {product ? (
            <div>
              <div className="flex justify-between text-xl">
                <p>Details</p>
                <button
                  onClick={() => setDetailsExpanded((prev) => !prev)}
                  className="text-primary cursor-pointer"
                >
                  {detailsExpanded ? "-" : "+"}
                </button>
              </div>
              <div
                className={`flex flex-col gap-1 text-lg ${
                  detailsExpanded
                    ? "h-auto opacity-100 pt-4"
                    : "h-0 opacity-0 overflow-hidden"
                } transition-all ease-linear duration-500`}
              >
                <p>
                  <span className="font-semibold">Product Type:</span>{" "}
                  {product.type}
                </p>
                <p>
                  <span className="font-semibold">Length:</span>{" "}
                  {product.length}
                </p>
                <p>
                  <span className="font-semibold">Blouse Piece:</span>{" "}
                  {product.blouse_piece ? "Yes" : "No"}
                </p>
                <p>
                  <span className="font-semibold">Fabric:</span>{" "}
                  {product.fabric}
                </p>
                <p>
                  <span className="font-semibold">Colour:</span>{" "}
                  {product.color_name}
                </p>
                <p>
                  <span className="font-semibold">Wash Care:</span>{" "}
                  {product.care}
                </p>
                <p>
                  <span className="font-semibold">Blouse:</span>{" "}
                  {product.blouse}
                </p>
                <p>
                  <span className="font-semibold">Disclaimer:</span>{" "}
                  {product.disclaimer}
                </p>
                <p>
                  <span className="font-semibold">SKU:</span> {product.sku}
                </p>
                <p>
                  <span className="font-semibold">What You Will Receive:</span>{" "}
                  {product.what_you_will_receive}
                </p>
              </div>
            </div>
          ) : (
            <Skeleton sx={{ minHeight: "50px" }} />
          )}
          <hr className="text-slate-400" />
          {product ? (
            <div>
              <div className="flex justify-between text-xl">
                <p>Description</p>
                <button
                  onClick={() => setDescriptionExpanded((prev) => !prev)}
                  className="text-primary cursor-pointer"
                >
                  {descriptionExpanded ? "-" : "+"}
                </button>
              </div>
              <div
                className={`flex flex-col gap-1 ${
                  descriptionExpanded
                    ? "h-auto opacity-100 pt-4"
                    : "h-0 opacity-0 overflow-hidden"
                } transition-all ease-linear duration-500`}
              >
                <p>{product.description}</p>
              </div>
            </div>
          ) : (
            <Skeleton sx={{ minHeight: "50px" }} />
          )}
          <hr className="text-slate-400" />
          {product ? (
            <div>
              <div className="flex justify-between text-xl">
                <p className="text-xl">Return & Exchange Policy</p>
                <button
                  onClick={() => setReturnExchangeExpanded((prev) => !prev)}
                  className="text-primary cursor-pointer"
                >
                  {returnExchangeExpanded ? "-" : "+"}
                </button>
              </div>
              <div
                className={`flex flex-col gap-4 font-light ${
                  returnExchangeExpanded
                    ? "h-auto opacity-100 pt-4"
                    : "h-0 opacity-0 overflow-hidden"
                } transition-all ease-linear duration-500`}
              >
                <p>Discount code Return and Exchange Policy</p>
                <div>
                  <p>1. Gift card will be issued for the returned product.</p>
                  <p>2. Only size exchange variant will be applicable.</p>
                </div>
                <p>
                  We offer a hassle-free 10 days returns and exchange for
                  products bought at MRP. Only exchange requests will be
                  accepted for products bought during sales or at discounted
                  prices.
                </p>
                <ul className="list-disc pl-5 flex flex-col gap-1">
                  <li>
                    Refunds for prepaid orders will directly be initiated to the
                    source account. For COD orders, you will receive a Cashgram
                    link via SMS/email, which you can use to redeem the refund.
                  </li>
                  <li>
                    Complaints regarding defective or incorrect products, and
                    incomplete orders issue should be raised with us within 48
                    hours of receiving the products. Please do share the image
                    or video highlighting your concern. For all such queries,
                    please write to us at{" "}
                    <a
                      className=" underline"
                      href="mailto:support@beyondthreads.in"
                    >
                      support@beyondthreads.in
                    </a>
                  </li>
                  <li>
                    If you wish to exchange a product, a store credit/credit
                    note will be issued, which you can use to place a fresh
                    order online. Please note that credit note/store credit
                    cannot be encashed, and cannot be used for offline
                    purchases.
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Skeleton sx={{ minHeight: "50px" }} />
          )}
          <hr className="text-slate-400" />
          {product ? (
            <div>
              <div className="flex justify-between text-xl">
                <p>Manufacturing Information</p>
                <button
                  onClick={() => setManufacturingInfoExpanded((prev) => !prev)}
                  className="text-primary cursor-pointer"
                >
                  {manufacturingInfoExpanded ? "-" : "+"}
                </button>
              </div>
              <div
                className={`flex flex-col gap-4 ${
                  manufacturingInfoExpanded
                    ? "h-auto opacity-100 pt-2"
                    : "h-0 opacity-0 overflow-hidden"
                } transition-all ease-linear duration-500`}
              >
                <p>
                  <span className="font-semibold">Country of Origin:</span>{" "}
                  India
                </p>
                <p>
                  <span className="font-semibold">Packed By:</span> Beyond
                  Threads Pvt. Ltd.
                </p>
              </div>
            </div>
          ) : (
            <Skeleton sx={{ minHeight: "50px" }} />
          )}
          <hr className="text-slate-400" />
        </div>
      </section>

      <div className="w-full bg-dark text-white text-center text-2xl font-light tracking-widest p-3">
        GOT QUESTIONS? WHATSAPP NOW!
      </div>

      <section className="bg-secondary">
        <h3 className="text-9xl text-headings tracking-[1rem] text-center font-light py-2">
          SIMILAR PRODUCTS
        </h3>
        <div className="flex justify-between border-2 border-headings p-4 px-20">
          <div className="flex items-center gap-2">
            <img src={diamondBullet} alt="" />
            <p>Similar Products</p>
          </div>
          <ArrowButton style={2} text="Explore All" />
        </div>
        <div className="grid grid-cols-4 gap-6 px-20 border-b-2 border-headings pb-16">
          {sililarProducts.map((product, index) => (
            <div key={index} className="flex flex-col gap-2 max-h-[450px]">
              <div className="relative overflow-hidden group">
                <img
                  src={product.image}
                  alt=""
                  loading="lazy"
                  className="object-cover w-full group-hover:scale-115 transition-all ease-in-out duration-300"
                />
                <div className="absolute w-full p-4 -bottom-20 group-hover:bottom-0 transition-all ease-in-out duration-300">
                  <AddToBagButton />
                </div>
              </div>
              <div className="text-xl">
                <p className="font-medium">{product.title}</p>
                <p className="font-light">₹ {formatPrice(product.price)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
