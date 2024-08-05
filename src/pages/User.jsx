import React, { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useAuth } from "../contexts/AuthProvider";
import { Loading } from "../components/Loading";
import URL from "../urlConfig";

function User() {
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const { authenticatedUser } = useAuth();
  console.log("authenticatedUser", authenticatedUser);

  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState(null);
  useEffect(() => {
    if (!authenticatedUser) {
      navigate("/signin");
    }
  }, [authenticatedUser]);
  const role = authenticatedUser?.role;

  const getDetails = async () => {
    setLoading(true);
    try {
      let url = `${URL.BOOKING_URL}`;
      if (authenticatedUser?.role !== "admin") {
        url = `${URL.BOOKING_URL}/user/${authenticatedUser._id}`;
      }
      const bookingsData = await axios.get(url, {
        withCredentials: true
      });
      setBookings(bookingsData?.data?.data);

      console.log("bookings", bookingsData);
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
      <h1 className="mt-5 text-5xl font-medium text-slate-900 capitalize">
        User Profile
      </h1>
      <ul role="list" className="mx-auto bg-white p-2">
        {authenticatedUser &&
          Object.keys(authenticatedUser).map((key) => {
            if (key === "_id") return null;
            const value = authenticatedUser[key];
            return (
              <li
                key={key}
                className="group/item relative flex items-center justify-between rounded-xl p-4 px-0"
              >
                <div className="flex gap-4">
                  <div className="w-full text-sm leading-6">
                    <span
                      href="#"
                      className="font-semibold text-slate-900 capitalize"
                    >
                      <span
                        className="absolute inset-0 rounded-xl"
                        aria-hidden="true"
                      ></span>
                      {key}:
                    </span>
                    <div className="text-slate-500">{value}</div>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>

      <h3 className="mt-5 mb-4 text-2xl font-medium text-slate-900 capitalize">
        Booking History
      </h3>
      {loading && <Loading />}
      {errMsg?.length > 0 && (
        <div className="bg-amber-200 text-red-500 font-medium text-sm px-2 py-1 rounded-sm">
          {errMsg}
        </div>
      )}
      <table className="min-w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-medium text-slate-900"
            >
              Booking Id
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-medium text-slate-900"
            >
              Booking Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-medium text-slate-900"
            >
              Booking amount (in ₹)
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-medium text-slate-900"
            >
              Product
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-medium text-slate-900"
            >
              Status
            </th>
            {role === "admin" && (
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-slate-900"
              >
                User
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {bookings?.map((booking) => (
            <tr key={booking._id} className="odd:bg-white even:bg-slate-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                {booking._id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                {new Date(booking.bookedAt).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                {booking.priceAtBooking}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                {booking?.product && (
                  <NavLink
                    className="text-blue-600 text-sm hover:underline"
                    to={`/product/${booking.product._id}`}
                  >
                    {booking.product.name}
                  </NavLink>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                {booking.status}
              </td>
              {role === "admin" && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {booking?.user?.name}
                </td>
              )}
            </tr>
          ))}
          {bookings?.length === 0 && (
            <tr>
              <td
                colSpan="5"
                className="px-6 py-4 whitespace-nowrap text-sm text-slate-600"
              >
                No Bookings data found!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}

export default User;
