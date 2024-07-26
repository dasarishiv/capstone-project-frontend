import { Link, NavLink, useNavigate } from "react-router-dom";

import axios from "axios";
import { useSelector } from "react-redux";
import { useAuth } from "../contexts/AuthProvider";
import URL from "../urlConfig";

export function Logo() {
  return (
    <Link aria-label="Home" to="/">
      <svg aria-hidden="true" viewBox="0 0 109 40" className="h-10 w-auto">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 20c0 11.046 8.954 20 20 20s20-8.954 20-20S31.046 0 20 0 0 8.954 0 20Zm20 16c-7.264 0-13.321-5.163-14.704-12.02C4.97 22.358 6.343 21 8 21h24c1.657 0 3.031 1.357 2.704 2.98C33.32 30.838 27.264 36 20 36Z"
          fill="#2563EB"
        ></path>
        <text
          style={{ marginLeft: "10px" }}
          xmlSpace="preserve"
          textAnchor="start"
          fontSize="23"
          y="28"
          x="43"
          strokeWidth="0"
          stroke="#000"
          fill="#000000"
        >
          E-
          <tspan fill="#2563EB" stroke="green">
            Cap
          </tspan>
          !
        </text>
      </svg>
    </Link>
  );
}
function NavBar() {
  const navigate = useNavigate();
  const { authenticatedUser, setAuthenticatedUser } = useAuth();
  const quantity = useSelector((store) => {
    return store.cartReducer.cartQuantity;
  });

  const logout = async () => {
    try {
      await axios.get(URL.LOGOUT_URL, {
        withCredentials: true
      });
      setAuthenticatedUser(null);
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };
  return (
    <>
      <header className="main-header py-4">
        <div className="mx-auto max-w-7xl px-4">
          <nav className="relative z-50 flex justify-between">
            <div className="flex items-center gap-x-12">
              <Logo />
              <div className="flex gap-x-6">
                <NavLink className="main-nav-item" to="/user">
                  User
                </NavLink>

                <NavLink className="main-nav-item" to="/createProduct">
                  Create Product
                </NavLink>
              </div>
            </div>

            <div className="flex items-center gap-x-8">
              <NavLink className="main-nav-item px-5" to="/cart">
                <div className="cart_container flex flex-row items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-blue-800"
                  >
                    <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                  </svg>

                  <div className="text-blue-800 font-bold ml-1 text-md">
                    {quantity}
                  </div>
                </div>
              </NavLink>
              {!authenticatedUser ? (
                <>
                  <NavLink className="main-nav-item" to="/signin">
                    Sign in
                  </NavLink>

                  <NavLink
                    className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600"
                    color="blue"
                    variant="solid"
                    to="/signup"
                  >
                    Signup
                  </NavLink>
                </>
              ) : (
                <>
                  <button
                    title="LOG OUT"
                    onClick={() => {
                      setAuthenticatedUser(null);
                      logout();
                    }}
                    className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600"
                  >
                    {authenticatedUser.name}

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default NavBar;
