import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import URL from "../urlConfig";
import { useAuth } from "../contexts/AuthProvider";

export function Reviews({ product, onRate }) {
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { authenticatedUser, setAuthenticatedUser } = useAuth();
  const location = useLocation();
  const [reviews, setReviews] = useState([]);
  // console.log("product reviews", product);
  const { _id } = product ?? {};

  // reviews = reviews.reverse();

  useEffect(() => {
    const reviewRef = product?.reviews ?? [];
    setReviews(reviewRef.reverse());
  }, [product?.reviews]);

  const handleSubmit = async (e) => {
    setErrMsg("");
    e.preventDefault();
    // e.stopImmediatePropagation();

    try {
      const form = e.target;

      const ratingDetails = { rating, review };
      if (form.checkValidity() && rating !== null && review) {
        setLoading(true);
        console.log("ratingDetails", ratingDetails);

        const res = await axios.post(
          URL.REVIEW_URL + "/" + _id,
          ratingDetails,
          {
            withCredentials: true
          }
        );
        console.log("response from login", res);
        setLoading(false);
        form.reset();
        setRating("");
        setReview("");
        setErrMsg("");
        onRate?.();
      }
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
    <main className="mx-auto w-full">
      <h3 className="mt-20 text-lg font-semibold text-gray-900">
        Product Reviews
      </h3>
      {!authenticatedUser && (
        <p className="mt-2 text-sm text-gray-700">
          Please signup to add review
          <a
            className="font-medium text-blue-600 hover:underline mx-1"
            href="/signin"
          >
            Sign In
          </a>
        </p>
      )}
      {authenticatedUser && (
        <form action="#" className="mt-10 grid gap-y-4" onSubmit={handleSubmit}>
          <div className="col-span-full">
            <label
              htmlFor=":S1:"
              className="mb-3 block text-sm font-medium text-gray-700"
            >
              Rating
            </label>
            <select
              required
              value={rating}
              id=":S1:"
              name="rating"
              onChange={(e) => setRating(e.target.value)}
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm pr-8 invalid:border-red-500"
            >
              <option value="">---</option>
              <option value={0}>Rate 0</option>
              <option value={1}>Rate 1</option>
              <option value={2}>Rate 2</option>
              <option value={3}>Rate 3</option>
              <option value={4}>Rate 4</option>
              <option value={5}>Rate 5</option>
            </select>
          </div>
          <div>
            <label
              htmlFor=":S2:"
              className="mb-3 block text-sm font-medium text-gray-700"
            >
              Review
            </label>
            <textarea
              id=":S2:"
              required
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 invalid:border-red-500"
              placeholder="Enter your product review"
              name="review"
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
          {errMsg?.length > 0 && (
            <div className="bg-amber-200 text-red-500 font-medium text-sm px-2 py-1 rounded-sm">
              {errMsg}
            </div>
          )}
          <div>
            <button
              className="disabled:opacity-50 group inline-flex items-center justify-center rounded-full py-4 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600 w-full"
              type="submit"
              color="blue"
              disabled={loading}
            >
              {!loading && <span>Submit Review</span>}
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
          </div>
        </form>
      )}
      {reviews?.length > 0 && (
        <>
          {reviews.map((rev) => (
            <dl
              key={rev._id}
              className="mt-4 font-medium flex flex-col w-full border-b border-gray-200 pb-3"
            >
              <dt>Rating</dt>
              <dd className="text-indigo-600 flex items-center">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  aria-hidden="true"
                  className="mr-1 stroke-current"
                >
                  <path
                    d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-lg">{rev.rating}</span>
              </dd>
              <dt className="mt-2">Review Comments</dt>
              <dd className="text-gray-600 flex items-center">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  aria-hidden="true"
                  className="mr-1 stroke-current"
                >
                  <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
                  <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
                </svg>
                <span className="text-lg">{rev.review}</span>
              </dd>
            </dl>
          ))}
        </>
      )}
    </main>
  );
}
