import { Link, NavLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { useAuth } from "../contexts/AuthProvider";

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
  const { authenticatedUser, setAuthenticatedUser } = useAuth();
  console.log("authenticatedUser", authenticatedUser);
  const quantity = useSelector((store) => {
    return store.cartReducer.cartQuantity;
  });
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
                <div className="cart_container">
                  <ShoppingCartIcon></ShoppingCartIcon>
                  <div className="cart_quantity">{quantity}</div>
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
