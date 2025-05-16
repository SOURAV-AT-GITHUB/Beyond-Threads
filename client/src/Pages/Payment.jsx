import { useState } from "react";
import upiIcon from "/Images/payment/upi.svg";
import rupayIcon from "/Images/payment/rupay.svg";
import mastercardIcon from "/Images/payment/mastercard.svg";
import visaIcon from "/Images/payment/visa.svg";
import cardIcon from "/Images/payment/card.svg";
import ArrowButton from "../components/ArrowButton";
import { formatPrice } from "../utils/formatPrice";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { UPDATE_CART } from "../Store/actionTypes";
import { Fragment } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export default function Payment() {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const cart = useSelector((store) => store.cart);
  const { idToken } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pincode, setPincode] = useState("");
  const [mobile, setMobile] = useState("");

  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setPincode(value);
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobile(value);
  };
  const [isSubmitting, setIsSubmiting] = useState(false);
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  const handlePayment = async (event) => {
    event.preventDefault();
    const deliveryInfo = {};
    for (let element of event.target) {
      if (!element.name) continue;
      else if (element.name === "save_address")
        deliveryInfo[element.name] = element.checked;
      else deliveryInfo[element.name] = element.value;
    }
    setIsSubmiting(true);
    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        alert("Something went wrong. Please try again.");
        return;
      }
      const { data: orderData } = await axios.post(
        `${BACKEND_URL}/client/cart/create-order`,
        deliveryInfo,
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
      console.log(orderData);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.id,
        prefill: {
          name: `${deliveryInfo.first_name} ${deliveryInfo.last_name}`,
          email: deliveryInfo.email,
          contact: deliveryInfo.contact,
        },
        handler: async function (response) {
          setIsSubmiting(true);
          try {
            const orderResponse = await axios.post(
              `${BACKEND_URL}/client/cart/verify-payment`,
              { ...response, ...deliveryInfo, amount: orderData.amount },
              { headers: { Authorization: `Bearer ${idToken}` } }
            );
            alert(orderResponse.data.message || "Order placed.");
            dispatch({ type: UPDATE_CART, payload: [] });
            navigate("/my-orders");
          } catch (error) {
            alert(
              error.response?.data.message ||
                "Something went wrong, please try again."
            );
          } finally {
            setIsSubmiting(false);
          }
        },
        theme: { color: "#ec3237" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert(error.response?.data.message || "Payment failed");
    } finally {
      setIsSubmiting(false);
    }
  };
  useEffect(() => {
    if (!idToken) return navigate("/login");
  }, [idToken]);
  return (
    <main className="flex max-h-[83vh]">
      <section className="w-2/4 p-20 bg-secondary overflow-y-auto hide-scrollbar">
        <form onSubmit={handlePayment} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-xl">Contact</p>
            <input
              name="email"
              type="email"
              placeholder="Email"
              minLength={5}
              required
              className="w-full p-2 border"
            />
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <p className="text-xl">Delivery</p>
              <p className="font-light">
                This will also be used as your billing address for this order.
              </p>
            </div>
            <input
              type="text"
              name="country"
              value={"India"}
              readOnly
              placeholder="Country/Region"
              className="w-full p-2 border cursor-not-allowed"
            />
            <div className="flex gap-4">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                required
                className="w-full p-2 border"
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                required
                className="w-full p-2 border"
              />
            </div>
            <input
              type="text"
              name="address_1"
              placeholder="Address"
              required
              className="w-full p-2 border"
            />
            <input
              type="text"
              name="address_2"
              placeholder="Apartment, Building No, etc."
              required
              className="w-full p-2 border"
            />
            <div className="flex gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                required
                className="w-full p-2 border"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                required
                className="w-full p-2 border"
              />
              <input
                type="text"
                value={pincode}
                onChange={handlePincodeChange}
                minLength={6}
                maxLength={6}
                inputMode="numeric"
                name="pincode"
                placeholder="Pincode"
                required
                className="w-full p-2 border"
              />
            </div>
            <input
              type="text"
              value={mobile}
              onChange={handleMobileChange}
              minLength={10}
              maxLength={10}
              inputMode="numeric"
              name="contact"
              placeholder="Contact Number"
              required
              className="w-full p-2 border"
            />
            <div className="flex gap-2">
              <input type="checkbox" name="save_address" id="" />
              <p>Save this information for next time</p>
            </div>
          </div>
          <div>
            <p className="text-xl">Payment</p>
            <p className="font-light pb-2">
              Your payment method’s billing address must match the shipping
              address. All transactions are secure and encrypted.
            </p>

            <div
              className={`w-full  ${
                selectedPayment === "Razorpay" ? "max-h-60" : "max-h-[45px]"
              } overflow-hidden transition-[max-height] ease-in-out duration-500`}
            >
              <div
                className={`text-slate-600 font-light p-2 border   rounded-t-xl ${
                  selectedPayment === "Razorpay"
                    ? "border-primary bg-[#ebd4cc]"
                    : "border-headings border-b-0"
                }`}
              >
                <div className="flex justify-between ">
                  <div className="flex items-center gap-1">
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        value={"Razorpay"}
                        checked={selectedPayment === "Razorpay"}
                        onChange={(e) => {
                          setSelectedPayment(e.target.value);
                          window.scrollTo({ top: 0 });
                        }}
                        className=" sr-only peer"
                      />
                      <div
                        className={`
              w-[10px] h-[10px] rounded-full
              border
              ${
                selectedPayment === "Razorpay"
                  ? "border-[3px] border-red-500"
                  : "border border-gray-400"
              }
              bg-transparent
              peer-checked:border-[3px] peer-checked:border-red-500
              transition-all duration-200
            `}
                      />
                    </label>
                    <p>Razorpay Secure (UPI, Cards, Wallets, NetBanking)</p>
                  </div>
                  <div className="flex gap-2">
                    <img src={upiIcon} alt="" />
                    <img src={rupayIcon} alt="" />
                    <img src={mastercardIcon} alt="" />
                    <img src={visaIcon} alt="" />
                  </div>
                </div>
              </div>
              <div className="border-x border-headings flex flex-col gap-2 items-center p-4">
                <img src={cardIcon} alt="" />
                <p className="text-slate-500 font-light text-center ">
                  After clicking “Pay now”, you will be redirected to Razorpay
                  Secure (UPI, Cards, Wallets, NetBanking) to complete your
                  purchase securely.
                </p>
              </div>
            </div>

            <div
              className={`w-full  ${
                selectedPayment === "Cashfree" ? "max-h-60" : "max-h-[45px]"
              } overflow-hidden transition-[max-height] ease-in-out duration-500`}
            >
              <div
                className={`text-slate-600 font-light p-2 border ${
                  selectedPayment === "Cashfree"
                    ? "border-primary bg-[#ebd4cc]"
                    : "border-headings border-b-0"
                }`}
              >
                <div className="flex justify-between">
                  <div className="flex items-center gap-1">
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        value={"Cashfree"}
                        checked={selectedPayment === "Cashfree"}
                        onChange={(e) => {
                          setSelectedPayment(e.target.value);
                          window.scrollTo({ top: 0 });
                        }}
                        className=" sr-only peer"
                      />
                      <div
                        className={`
              w-[10px] h-[10px] rounded-full
              border
              ${
                selectedPayment === "Cashfree"
                  ? "border-[3px] border-red-500"
                  : "border border-gray-400"
              }
              bg-transparent
              peer-checked:border-[3px] peer-checked:border-red-500
              transition-all duration-200
            `}
                      />
                    </label>
                    <p>Cashfree Payment (UPI, Cards, Wallets, NetBanking)</p>
                  </div>
                  <div className="flex gap-2">
                    <img src={upiIcon} alt="" />
                    <img src={rupayIcon} alt="" />
                    <img src={mastercardIcon} alt="" />
                    <img src={visaIcon} alt="" />
                  </div>
                </div>
              </div>
              <div className="border-x border-headings flex flex-col gap-2 items-center p-4">
                <img src={cardIcon} alt="" />
                <p className="text-slate-500 font-light text-center ">
                  After clicking “Pay now”, you will be redirected to Razorpay
                  Secure (UPI, Cards, Wallets, NetBanking) to complete your
                  purchase securely.
                </p>
              </div>
            </div>
            <div className={`w-full cursor-not-allowed opacity-60`}>
              <div
                className={`text-slate-600 font-light p-2 border  "border-primary bg-[#ebd4cc]"
                    border-headings rounded-b-xl
                `}
              >
                <div className="flex items-center gap-1">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      disabled
                      // value={"COD"}
                      // checked={selectedPayment === "COD"}
                      // onChange={(e) => {
                      //   setSelectedPayment(e.target.value);
                      //   window.scrollTo({ top: 0 });
                      // }}
                      className=" sr-only peer"
                    />
                    <div
                      className={`w-[10px] h-[10px] rounded-full border border-gray-400 bg-transparent cursor-not-allowed`}
                    />
                  </label>
                  <p>Cash on Delivery(COD) - Not available.</p>
                </div>
              </div>
              {/* <div className="border border-t-0 rounded-b-xl border-headings flex flex-col gap-2 items-center p-4">
                <p className="text-slate-500 font-light text-center ">
                  After clicking “Pay now”, you will be redirected to Razorpay
                  Secure (UPI, Cards, Wallets, NetBanking) to complete your
                  purchase securely.
                </p>
              </div> */}
            </div>
          </div>
          <hr className="text-headings my-4" />
          <button
            type="submit"
            disabled={
              !idToken || !selectedPayment || !cart.products[0] || isSubmitting
            }
            className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowButton
              style={2}
              text="Complete Order"
              isLoading={isSubmitting}
            />
          </button>
          <div className="flex justify-center gap-10">
            <p className="text-blue-400 font-light underline">Refun Policy</p>
            <p className="text-blue-400 font-light underline">
              Shipping Policy
            </p>
            <p className="text-blue-400 font-light underline">Privacy Policy</p>
            <p className="text-blue-400 font-light underline">
              Terms & Conditions
            </p>
          </div>
        </form>
      </section>

      <section className="w-2/4 p-20 bg-white overflow-y-auto hide-scrollbar  flex flex-col gap-6 h-full">
        <div className="flex flex-col gap-4">
          {cart.products[0] ? (
            cart.products.map((product, index) => (
              <div
                key={index}
                className="flex justify-between items-center gap-4"
              >
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <img
                      src={`${BACKEND_URL}/uploads/${product.image}`}
                      alt=""
                      className="max-h-[150px] w-[150px] object-cover object-center rounded-lg"
                    />
                    <p className="absolute top-0 -right-2 py-1 px-2 bg-primary text-white text-xs rounded-full">
                      {product.quantity}
                    </p>
                  </div>
                  <p className="line-clamp-2">{product.name}</p>
                </div>
                <p className="text-lg text-nowrap">
                  ₹ {formatPrice(product.price * product.quantity)}
                </p>
              </div>
            ))
          ) : (
            <Fragment>
              <p className="text-3xl text-center">Your Cart is Empty</p>
              <NavLink to="/">
                <ArrowButton style={2} text="Continue Shopping" />
              </NavLink>
            </Fragment>
          )}
        </div>

        {!idToken && (
          <div className="p-2 rounded-md bg-secondary">
            <p className="underline-offset-6">
              <NavLink to="/login" className="text-blue-400 underline">
                Log in
              </NavLink>{" "}
              to your account or{" "}
              <NavLink to="/login" className="text-blue-400 underline">
                Sign Up
              </NavLink>{" "}
              to get daily product update.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="font-light">Subtotal</p>
            <p className="font-medium text-lg">
              ₹ {formatPrice(cart.finalPrice)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-light">Shipping</p>
            <p className="text-lg">FREE</p>
          </div>
        </div>

        <hr />

        <div className="flex justify-between text-3xl">
          <p>Total</p>
          <p>₹ {formatPrice(cart.finalPrice)}</p>
        </div>
      </section>
    </main>
  );
}
