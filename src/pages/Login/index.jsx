import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import URL from "../../urlConfig";
import { useAuth } from "../../contexts/AuthProvider";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { authenticatedUser, setAuthenticatedUser } = useAuth();
  const location = useLocation();

  //   console.log("Location", location);

  const handleSubmit = async (e) => {
    setErrMsg("");
    e.preventDefault();
    // e.stopImmediatePropagation();

    try {
      const form = e.target;
      const userDetails = { email, password };
      if (form.checkValidity() && email && password) {
        setLoading(true);
        const res = await axios.post(URL.LOGIN_URL, userDetails, {
          withCredentials: true
        });
        console.log("response from login", res);
        setLoading(false);
        setEmail("");
        setPassword("");
        setErrMsg("");
        setAuthenticatedUser(res.data.user);
        // navigate("/");
        navigate(location.state?.from?.pathname || "/");
      }
    } catch (error) {
      setAuthenticatedUser(null);
      setErrMsg(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="relative  flex flex-1 flex-col px-4 py-10">
      <main className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
        <h1 className="mt-20 text-lg font-semibold text-gray-900">
          Sign in to your account
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Don’t have an account?
          <a
            className="font-medium text-blue-600 hover:underline mx-1"
            href="/signup"
          >
            Sign up
          </a>
        </p>
        <form
          action="#"
          className="mt-10 grid grid-cols-1 gap-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor=":S1:"
              className="mb-3 block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id=":S1:"
              autoComplete="email"
              required
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 invalid:border-red-500"
              placeholder="Enter your email"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor=":S2:"
              className="mb-3 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id=":S2:"
              autoComplete="current-password"
              required
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 invalid:border-red-500"
              placeholder="Enter your password"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
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
              {!loading && (
                <span>
                  Sign in <span aria-hidden="true">→</span>
                </span>
              )}
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
      </main>
    </div>
  );
}
