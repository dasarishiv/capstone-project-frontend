import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import URL from "../../urlConfig";
import { useAuth } from "../../contexts/AuthProvider";

export function Signup() {
  const { setAuthenticatedUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    const form = e.target;
    try {
      if (form.checkValidity()) {
        setLoading(true);
        const userDetails = { name, email, password, confirmPassword, phone };
        const res = await axios.post(URL.SIGNUP_URL, userDetails);
        // console.log("response from signup", res);

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPhoneNumber("");
        setErrMsg("");
        setAuthenticatedUser(res.data.user);
        navigate(location.state?.from?.pathname || "/");
        // navigate("/signin");
      }
    } catch (error) {
      const {
        response: {
          data: { message }
        }
      } = error;
      // console.log("error", error);
      setErrMsg(message);
    }
    setLoading(false);
  };

  return (
    <div className="relative z-10 flex flex-1 flex-col bg-white px-4 py-10">
      <main className="mx-auto w-full max-w-md">
        <h1 className="mt-20 text-lg font-semibold text-gray-900">
          Get started with your email
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Already registered?
          <Link
            className="font-medium text-blue-600 hover:underline mx-1"
            to="/login"
          >
            Sign in
          </Link>
          to your account.
        </p>
        <form
          action="#"
          className="mt-10 grid grid-cols-1 gap-y-3"
          onSubmit={handleSubmit}
        >
          <div className="col-span-full">
            <label
              htmlFor=":S1:"
              className="mb-3 block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id=":S1:"
              autoComplete="given-name"
              required
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              type="text"
              name="name"
              placeholder="Your name.."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-span-full">
            <label
              htmlFor=":S3:"
              className="mb-3 block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id=":S3:"
              autoComplete="email"
              required
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              type="email"
              name="email"
              placeholder="Your email.."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-span-full">
            <label
              htmlFor=":S4:"
              className="mb-3 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id=":S4:"
              autoComplete="new-password"
              required
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              type="password"
              name="password"
              placeholder="Your Password.."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-span-full">
            <label
              htmlFor=":S6:"
              className="mb-3 block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id=":S6:"
              autoComplete="new-password"
              required
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              type="password"
              name="confirmPassword"
              placeholder="Your ConfirmPassword.."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="col-span-full">
            <label
              htmlFor=":S7:"
              className="mb-3 block text-sm font-medium text-gray-700"
            >
              Contact Number
            </label>
            <input
              id=":S7:"
              autoComplete="new-password"
              required
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              type="number"
              name="phone"
              placeholder="Your Contact Number.."
              value={phone}
              maxLength={10}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          {/* <div className="col-span-full">
              <label
                htmlFor=":S5:"
                className="mb-3 block text-sm font-medium text-gray-700"
              >
                How did you hear about us?
              </label>
              <select
                id=":S5:"
                name="referral_source"
                className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm pr-8"
              >
                <option>AltaVista search</option>
                <option>Super Bowl commercial</option>
                <option>Our route 34 city bus ad</option>
                <option>The “Never Use This” podcast</option>
              </select>
            </div> */}
          {errMsg?.length > 0 && (
            <div className="bg-amber-200 text-red-500 font-medium text-sm px-2 py-1 rounded-sm">
              {errMsg}
            </div>
          )}
          <div className="col-span-full mt-4">
            <button
              className="group inline-flex items-center justify-center rounded-full p-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600 w-full"
              type="submit"
              color="blue"
              disabled={loading}
            >
              {!loading && (
                <span>
                  Sign up <span aria-hidden="true">→</span>
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
