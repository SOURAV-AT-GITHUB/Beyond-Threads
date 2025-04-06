import AddToBagButton from "../components/AddToBagButton";
import freeShippingIcon from "/Images/Product/free-shipping.svg";
import calendarIcon from "/Images/Product/calendar.svg";
import truckIcon from "/Images/Product/truck.svg";
import rupeeIcon from "/Images/Product/rupee.svg";
import diamondBullet from "/Images/diamond-bullet.svg";
import ArrowButton from "../components/ArrowButton";
import { useState } from "react";
import { formatPrice } from "../utils/formatPrice";
export default function Product() {
  const img1 =
    "https://s3-alpha-sig.figma.com/img/819b/8de3/eef6ca2fa3e175c98c6e60f15642856c?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=S5GFopt-Eph8gqsq5acay18Pn7OU4D9Q1SCht5kBbK3XsHnct3jM7qRL5YNq0eAbakAoqnxitXZGkiG-86bxSZdlQcDpGi93tPY6Irwc-5aAyAvZ2VejIQmkhvqmC6E8vbhxXa8sH5ypPi~wJN6BuTb1WvYYvkblBh0TN~PZQerpEyEGkk31D9cQVQ2OXd90o7QoVyvZwi-kmJpymuviscSu2eXmGxFDC5gx05ZQpu7vjkf-aoZiUiogKad6h-7A2ZU~0OHmR66CO72UtuFmCTu~NfMR9zTmebF450jeM0wqlMZN7pv~r-w1g-HbC9cigZk6RVJznE3DZfdBd-j~OA__";
  const img2 =
    "https://s3-alpha-sig.figma.com/img/7ff6/3ec0/f802cacc9c1e312ac16f0b7b66722e6b?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=i3Yc0Wa63vhrpbwy3BPSumE746Hjal94EXcA8jWkrwPfpWU9cTaLV9Z4rIj9E04~9csCg70sCUEJj9n9Zau6GoMCN-XV9YECDGLe~D7KcBAiYD79uTNTc80JACdEnJ7BbA09Jzhpr-qGuDD87tHdJnr91-GJst9ju7yTDtPD-6SEtcC4swlIJUMdc3qfdWxel0Wh~7bS-l0aIpalRNhBBJ7gJLdOCgldfKwfB-6GyvnwEQeWHAk9NbxAKXXA2Mx5KqTEPW8~rGT7a5iwGp05u6NwS2f-ZvU12XNER88cTYPVQbub1PUcykEjKTrpOTBSfr~qetrwF40loB-EQh6q6g__";
  const img3 =
    "https://s3-alpha-sig.figma.com/img/e098/6d65/303675c809f89a8093b5c4226601c473?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=NnAzNSFHDH8Qp-~brORGJaaCAxmV4jR-01uSguiNK6ziepE60eKrhddfi6v7o6aJ2iIQgil5VwhwojEFOvesyOuJSOhqoI2FLDIDcDry95UsLys~XGOgCmaWN~~jd9U0IjhLlVB-iiNL0GvprKQkdaYFl7ZCIAApFaHoFGJTysS-kWTFmyqCM5Pcy4jmNNJWwt9GfqpKKoNON6LB6~JoUDB8~qzHvK2JLaO2uAOfSUjOAAfSfHIYPj4O9i9HQG0~TCOXkvAlevEXNyqZOLD9mpDfImoXq2BHtWdrlQafPdt4IggoS5cfFvWwCmvL1YAeFBC-aIfgU3xoU49fNLxOOw__";
  const img4 =
    "https://s3-alpha-sig.figma.com/img/2202/eb14/bdd4aac5b419bb118474e03d6fd7c5f8?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gqOFVeVF2WM9-jEPwdwQZP5v6F9ZFvZzlBnOZv6QYg~F2g8PjPxynI~3UzTKtKy3~kRvTHMlBbniueTA7tKZAHq2nMgld6LqGQQhM0GOto0DJT1-QG-mFuql-Kg~mNa8AzUxzKzGRTzu2jagOqJlsKrkEIyx-I4dQEE1b5IoLTYle5GxoBfAdZvvLbzBTNOYfBS9q6USVeo8Ya7C8B1B2o8h-aJaSRESf4e7K8R9LQtXHoW1qJEcebQWgrzYEtzji88iSgZNl6lG8K0NZ3bLH80fCpdnL7IQHPzql8oN9kiJBFtHnrnnZMtcDvfkmKo5QiijxChRP7Rjpc~5fvDTYg__";
  const product = {
    title:
      "Pure Handloom Gachi Tussar Black Printed Silk Saree with Zari Border",
    price: 6990.0,
    image:
      "https://s3-alpha-sig.figma.com/img/94c5/4032/f1079e48e572882edabbee2481a9c6eb?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=S42ChOTP33exMKXXfyhUwmiIbZMAtnaby7gFazXuyE3knIrumHM9ht83cRyAAo7OwcNRmjx0OhGp995vP3rfPqM6wTxpFX~-n~EZE4SBt1LX6trs3~thm6pDf1DNmOmGY-T94jwl3IMkrY-ve94~eMsZ33XC4-Tg6SiVjJ0xfBExIIqOFXCFZmN0vlI8nQBH5RJCMmC9oLH2fXr2VYo2MofCQpaRmNwXicPt-FnkE7AtmIK8u3q6gQ~x1K2ek0pmCZwc-~kJ3Vac5FmStVo313Zlt8K2wNxLgCxFFhFaGKPHxESi3Qd8F-oK177ZYe27ZTDrrzGiLIyxSOYC0WkEUw__",
    images: [img1, img2, img3, img4],
    details: {
      type: "Saree",
      Length: "5.50 m (550 cm) ; Width: 1.143 m (114.3 cm)",
      blousePiece: "No",
      fabric: "Cotton",
      colour: "Off White",
      washCare: "Dry Wash",
      blouse: "The model is wearing XS size blouse called Ubhavi",
      disclaimer:
        "The pictures are clicked in daylight. Colour may vary slightly from the image due to the screen brightness",
      sku: "SUTACOT280",
      whatYouWillReceive: "1 Saree",
    },
    description:
      "These glorious drapes are made from Tussar silk, a material known for its lightweight feel and delicate sheen. These sarees are a true celebration of craftsmanship and culture, making them perfect for casual wear, office wear, and traditional events. Pair them with delicate jewelry pieces to achieve that gorgeous ensemble.",
  };
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
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [returnExchangeExpanded, setReturnExchangeExpanded] = useState(false);
  const [manufacturingInfoExpanded, setManufacturingInfoExpanded] =
    useState(false);
  return (
    <main>
      <section className="flex gap-10 max-h-[80vh] bg-secondary px-20 py-4">
        <div className="w-2/4 flex gap-2 max-h-full ">
          <div className="flex flex-col gap-2 max-h-full w-1/4 overflow-hidden">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={product.title}
                className="object-cover h-1/4 w-full "
              />
            ))}
          </div>
          <img
            src={product.image}
            alt=""
            className="w-3/4 h-full object-cover"
          />
        </div>

        <div className="w-2/4 flex flex-col gap-4 overflow-y-auto hide-scrollbar">
          <h3 className="text-4xl font-medium">{product.title}</h3>
          <p className="text-3xl font-light">₹ {formatPrice(product.price)}</p>
          <p>(inclusive of all taxes)</p>
          <p>
            <b>Please Note:</b> All accessories shown and the blouse worn in the
            video are for styling purposes only. The actual product color may
            vary slightly due to brightness and camera quality differences
            across devices.
          </p>
          <AddToBagButton />
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
              <p>Care : Dry clean only</p>
            </div>
          </div>
          <hr className="text-slate-400" />
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
                {product.details.type}
              </p>
              <p>
                <span className="font-semibold">Length:</span>{" "}
                {product.details.Length}
              </p>
              <p>
                <span className="font-semibold">Blouse Piece:</span>{" "}
                {product.details.blousePiece}
              </p>
              <p>
                <span className="font-semibold">Fabric:</span>{" "}
                {product.details.fabric}
              </p>
              <p>
                <span className="font-semibold">Colour:</span>{" "}
                {product.details.colour}
              </p>
              <p>
                <span className="font-semibold">Wash Care:</span>{" "}
                {product.details.washCare}
              </p>
              <p>
                <span className="font-semibold">Blouse:</span>{" "}
                {product.details.blouse}
              </p>
              <p>
                <span className="font-semibold">Disclaimer:</span>{" "}
                {product.details.disclaimer}
              </p>
              <p>
                <span className="font-semibold">SKU:</span>{" "}
                {product.details.sku}
              </p>
              <p>
                <span className="font-semibold">What You Will Receive:</span>{" "}
                {product.details.whatYouWillReceive}
              </p>
            </div>
          </div>
          <hr className="text-slate-400" />
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
          <hr className="text-slate-400" />
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
                We offer a hassle-free 10 days returns and exchange for products
                bought at MRP. Only exchange requests will be accepted for
                products bought during sales or at discounted prices.
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
                  hours of receiving the products. Please do share the image or
                  video highlighting your concern. For all such queries, please
                  write to us at{" "}
                  <a
                    className=" underline"
                    href="mailto:support@beyondthreads.in"
                  >
                    support@beyondthreads.in
                  </a>
                </li>
                <li>
                  If you wish to exchange a product, a store credit/credit note
                  will be issued, which you can use to place a fresh order
                  online. Please note that credit note/store credit cannot be
                  encashed, and cannot be used for offline purchases.
                </li>
              </ul>
            </div>
          </div>
          <hr className="text-slate-400" />
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
                <span className="font-semibold">Country of Origin:</span> India
              </p>
              <p>
                <span className="font-semibold">Packed By:</span> Beyond Threads
                Pvt. Ltd.
              </p>
            </div>
          </div>
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
          {sililarProducts.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 max-h-[450px]">
              <div className="relative overflow-hidden group">
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  className="object-cover w-full group-hover:scale-115 transition-all ease-in-out duration-300"
                />
                <div className="absolute w-full p-4 -bottom-20 group-hover:bottom-0 transition-all ease-in-out duration-300">
                  <AddToBagButton />
                </div>
              </div>
              <div className="text-xl">
                <p className="font-medium">{item.title}</p>
                <p className="font-light">₹ {formatPrice(item.price)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
