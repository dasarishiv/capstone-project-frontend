import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IconButton } from "./IconButton";
import { action } from "../redux/slices/cartSlice";
import { useAuth } from "../contexts/AuthProvider";
import { loadScript } from "../utility/basicOps";
import URL from "../urlConfig";

export function PrintCount({
  product,
  iconSize = "",
  numberClass = "text-xl"
}) {
  const { _id, price = 0 } = product;
  const { authenticatedUser } = useAuth();
  const navigate = useNavigate();
  const cartProducts = useSelector((store) => {
    return store.cartReducer.cartProducts;
  });
  let quanitity = 0;
  for (let i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i]._id == _id) {
      quanitity = cartProducts[i].indQuantity;
    }
  }
  const totalAmount = price * quanitity;

  const dispatch = useDispatch();

  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddProduct = (product) => {
    dispatch(action.addToCart(product));
  };

  const handleDeleteProduct = (product) => {
    dispatch(action.deleteFromCart(product));
  };
  const handleBuyNow = async () => {
    try {
      setErrMsg("");
      setLoading(true);
      const razorScript = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js",
        "razorpay-script"
      );

      if (!razorScript) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const orderDetails = await axios.post(
        `${URL.BOOKING_URL}/${_id}`,
        { priceAtBooking: totalAmount },
        {
          withCredentials: true
        }
      );

      console.log("orderDetails", orderDetails);

      const { amount, currency, orderKey, companyName, id, receipt } =
        orderDetails?.data?.order || {};

      const options = {
        key: orderKey, // Enter the Key ID generated from the Dashboard
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency,
        name: companyName,
        description: `${product.name}_receipt_transaction_id_${receipt}`,
        image: "",
        order_id: id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        // callback_url: "http://localhost:3000/verify",
        // notes: {
        //   address: "Razorpay Corporate Office",
        // },
        handler: async function (response) {
          await dispatch(action.removeFromCart(product));
          // console.log("payment response::", response);
          navigate(`/booking/${receipt}`);

          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
        },
        theme: {
          color: "#3399cc"
        }
      };
      console.log("options", options);
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong";

      setErrMsg(message);
    }
    setLoading(false);
  };

  return (
    <>
      <IconButton
        size={iconSize}
        onClick={() => {
          handleAddProduct(product);
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </IconButton>
      <span className={`text-slate-800 ${numberClass}`}>{quanitity}</span>
      <IconButton
        size={iconSize}
        onClick={() => {
          handleDeleteProduct(product);
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </IconButton>
      {quanitity > 0 && authenticatedUser && (
        <>
          <button
            className="disabled:opacity-50 group inline-flex items-center justify-center rounded-full py-1 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600"
            type="submit"
            color="blue"
            onClick={handleBuyNow}
            disabled={loading}
          >
            {!loading && <span>Buy Now (₹ {totalAmount})</span>}
            {loading && (
              <>
                <svg
                  className="motion-reduce:hidden animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Processing...</span>
              </>
            )}
          </button>
        </>
      )}
      {errMsg?.length > 0 && (
        <div className="bg-amber-200 text-red-500 font-medium text-sm px-2 py-1 rounded-sm w-full">
          {errMsg}
        </div>
      )}
    </>
  );
}
