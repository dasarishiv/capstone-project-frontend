import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import URL from "../urlConfig";
import { IconButton } from "../components/IconButton";
import { PrintCount } from "../components/PrintCount";
import { Loading } from "../components/Loading";
import { action } from "../redux/slices/cartSlice";
import { useAuth } from "../contexts/AuthProvider";
import { Reviews } from "../components/Reviews";

function BookingStatus() {
  let { id } = useParams();
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const { authenticatedUser } = useAuth();
  console.log("authenticatedUser", authenticatedUser);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(null);

  const getDetails = async () => {
    setLoading(true);
    try {
      const bookingStatus = await axios.get(`${URL.BOOKING_URL}/${id}`, {
        withCredentials: true
      });
      setBooking(bookingStatus?.data?.data);

      console.log("bookingStatus", bookingStatus);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong";
      setErrMsg(message);
    }

    setLoading(false);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <main className="py-8 max-w-7xl mx-auto">
      <h1 className="mb-5 text-5xl font-medium text-slate-900 capitalize">
        Booking Status
      </h1>
      {loading && <Loading />}
      {errMsg?.length > 0 && (
        <div className="bg-amber-200 text-red-500 font-medium text-sm px-2 py-1 rounded-sm">
          {errMsg}
        </div>
      )}
      {booking && (
        <>
          <div className="text-xl bg-green-300 text-green-900 font-medium px-2 py-1 rounded-lg mt-2">
            Booking Status::{" "}
            <span className="font-bold capitalize">{booking.status}</span>
          </div>
          <div className="text-xl text-gray-900 font-medium px-2 py-1 mt-2">
            Payment OrderId ::{" "}
            <span className="font-bold">{booking.paymentOrderId}</span>
          </div>
          <div className="text-xl text-gray-900 font-medium px-2 py-1 mt-2">
            Total Amount ::{" "}
            <span className="font-bold">₹ {booking.priceAtBooking}</span>
          </div>
          <div className="text-xl text-gray-900 font-medium px-2 py-1 mt-2">
            Product ::{" "}
            <NavLink
              className="text-gray-900 underline"
              to={`/product/${booking.product._id}`}
            >
              {booking.product.name}
            </NavLink>
          </div>
          <div className="text-gray-900 font-medium text-xl px-2 py-1 mt-2">
            Product Price ::{" "}
            <span className="font-bold">₹ {booking.product.price}</span>
          </div>
        </>
      )}
    </main>
  );
}

export default BookingStatus;
