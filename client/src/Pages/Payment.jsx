import { useState } from "react";
import upiIcon from "/Images/payment/upi.svg";
import rupayIcon from "/Images/payment/rupay.svg";
import mastercardIcon from "/Images/payment/mastercard.svg";
import visaIcon from "/Images/payment/visa.svg";
import cardIcon from "/Images/payment/card.svg";
import ArrowButton from "../components/ArrowButton";
import { formatPrice } from "../utils/formatPrice";
import { NavLink } from "react-router-dom";
export default function Payment() {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const cart = [
    {
      title: "Badami Saree in Silk",
      price: 1950.0,
      image:
        "https://s3-alpha-sig.figma.com/img/41ad/0309/abb9857c729cde1b2c6d34a583706da6?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=j4r2FoGKYo319NFItD4z0IxbF2mRIIXJQvli1bw4BiFm2WKB5nii2ksbsdig3-FOU4NNVXTRBWa9h2m7ZqkXuMSneRzKf2PuyH4FcKRL0y1GNG7cgkIN98AodXEK20BWp0FNQmwXdqWnsy9CGxfRPTP8xnBdYWL9NW6V7z7FUEB-hMJCHdeqXzf-~Nan66vrPsh~d6jLhAxPGYcBvnfIKqs6DwpJ67ls~0Wil61hmJ~DgyHPNwi2BGBerivHZfdlIsVkD7FYRYiM8CtnCtofOCtonsD5ssDz0iQO8A6bEiGTDvNr03ADoFADl~KBItUFNYqi3RB-iGG3ri7psnxyoA__",
      quantity: 2,
    },
  ];
  return (
    <main className="flex max-h-[83vh]">
      <section className="w-2/4 p-20 bg-secondary overflow-y-auto hide-scrollbar">
        <form action="" className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-xl">Contact</p>
            <input
              type="email"
              placeholder="Email"
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
              placeholder="Country/Region"
              className="w-full p-2 border"
            />
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-2 border"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-2 border"
              />
            </div>
            <input
              type="text"
              placeholder="Address"
              className="w-full p-2 border"
            />
            <input
              type="text"
              placeholder="Apartment, Building No, etc."
              className="w-full p-2 border"
            />
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="City"
                className="w-full p-2 border"
              />
              <input
                type="text"
                placeholder="State"
                className="w-full p-2 border"
              />
              <input
                type="text"
                placeholder="Pincode"
                className="w-full p-2 border"
              />
            </div>
            <input
              type="text"
              placeholder="Contact Number"
              className="w-full p-2 border"
            />
            <div className="flex gap-2">
              <input type="checkbox" name="" id="" />
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
            <div
              className={`w-full  ${
                selectedPayment === "COD" ? "max-h-60" : "max-h-[45px]"
              } overflow-hidden transition-[max-height] ease-in-out duration-500`}
            >
              <div
                className={`text-slate-600 font-light p-2 border ${
                  selectedPayment === "COD"
                    ? "border-primary bg-[#ebd4cc]"
                    : "border-headings rounded-b-xl"
                }`}
              >
                <div className="flex items-center gap-1">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      value={"COD"}
                      checked={selectedPayment === "COD"}
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
                selectedPayment === "COD"
                  ? "border-[3px] border-red-500"
                  : "border border-gray-400"
              }
              bg-transparent
              peer-checked:border-[3px] peer-checked:border-red-500
              transition-all duration-200
            `}
                    />
                  </label>
                  <p>Cash on Delivery(COD)</p>
                </div>
              </div>
              <div className="border border-t-0 rounded-b-xl border-headings flex flex-col gap-2 items-center p-4">
                <p className="text-slate-500 font-light text-center ">
                  After clicking “Pay now”, you will be redirected to Razorpay
                  Secure (UPI, Cards, Wallets, NetBanking) to complete your
                  purchase securely.
                </p>
              </div>
            </div>
          </div>
          <hr className="text-headings my-4" />
          <button type="submit">
            <ArrowButton style={2} text="Complete Order" />
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

      <section className="w-2/4 p-20 bg-white overflow-y-auto hide-scrollbar  flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          {cart.map((product, index) => (
            <div className="flex justify-between items-center">
              <div key={index} className="flex items-center gap-2">
                <div className="relative">
                  <img
                    src={product.image}
                    alt=""
                    className="max-h-[150px] w-[150px] object-cover object-center rounded-lg"
                  />
                  <p className="absolute top-0 -right-2 py-1 px-2 bg-primary text-white text-xs rounded-full">
                    {product.quantity}
                  </p>
                </div>
                <p className="text-lg">{product.title}</p>
              </div>
              <p className="text-lg">
                ₹ {formatPrice(product.price * product.quantity)}
              </p>
            </div>
          ))}
        </div>

        <div className="p-2 rounded-md bg-secondary">
          <p className="underline-offset-6">
            <NavLink to="/login" className="text-blue-400 underline">Log in</NavLink> to your account or{" "}
            <NavLink to="/login" className="text-blue-400 underline">Sign Up</NavLink> to get daily
            product update.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="font-light">Subtotal</p>
            <p className="font-medium text-lg">
              ₹{" "}
              {formatPrice(
                cart.reduce(
                  (acc, current) => acc + current.price * current.quantity,
                  0
                )
              )}
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
          <p>
            ₹{" "}
            {formatPrice(
              cart.reduce(
                (acc, current) => acc + current.price * current.quantity,
                0
              )
            )}
          </p>
        </div>
      </section>
    </main>
  );
}
