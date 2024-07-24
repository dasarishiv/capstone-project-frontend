import { Link, NavLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
function NavBar() {
  const quantity = useSelector((store) => {
    return store.cartReducer.cartQuantity;
  });
  return (
    <>
      <header className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="relative z-50 flex justify-between">
            <div className="flex items-center md:gap-x-12">
              <Link aria-label="Home" to="/">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 109 40"
                  className="h-10 w-auto"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 20c0 11.046 8.954 20 20 20s20-8.954 20-20S31.046 0 20 0 0 8.954 0 20Zm20 16c-7.264 0-13.321-5.163-14.704-12.02C4.97 22.358 6.343 21 8 21h24c1.657 0 3.031 1.357 2.704 2.98C33.32 30.838 27.264 36 20 36Z"
                    fill="#2563EB"
                  ></path>
                  <text
                    style={{ marginLeft: "10px" }}
                    xml:space="preserve"
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
              <div className="hidden md:flex md:gap-x-6">
                <NavLink
                  activeClassName="bg-slate-100"
                  className="main-nav-item"
                  to="/user"
                >
                  User
                </NavLink>

                <NavLink
                  activeClassName="bg-slate-100"
                  className="main-nav-item"
                  to="/createProduct"
                >
                  Create Product
                </NavLink>
              </div>
            </div>

            <div className="flex items-center gap-x-5 md:gap-x-8">
              <NavLink
                activeClassName="bg-slate-100"
                className="main-nav-item px-5"
                to="/cart"
              >
                <div className="cart_container">
                  <ShoppingCartIcon></ShoppingCartIcon>
                  <div className="cart_quantity">{quantity}</div>
                </div>
              </NavLink>
              <div className="hidden md:block">
                <NavLink
                  activeClassName="bg-slate-100"
                  className="main-nav-item"
                  to="/login"
                >
                  Sign in
                </NavLink>
              </div>

              <NavLink
                className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600"
                color="blue"
                variant="solid"
                to="/signup"
              >
                Signup
              </NavLink>

              <div className="-mr-1 md:hidden">
                <div data-headlessui-state="">
                  <button
                    className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
                    aria-label="Toggle Navigation"
                    type="button"
                    aria-expanded="false"
                    data-headlessui-state=""
                    id="headlessui-popover-button-:R5v6fja:"
                  >
                    <svg
                      aria-hidden="true"
                      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path
                        d="M0 1H14M0 7H14M0 13H14"
                        className="origin-center transition"
                      ></path>
                      <path
                        d="M2 2L12 12M12 2L2 12"
                        className="origin-center transition scale-90 opacity-0"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div
                  hidden=""
                  style={{
                    position: "fixed",
                    top: "1px",
                    left: "1px",
                    width: "1px",
                    height: "0",
                    padding: "0",
                    margin: "-1px",
                    overflow: "hidden",
                    clip: "rect(0, 0, 0, 0)",
                    whiteSpace: "nowrap",
                    borderWidth: "0",
                    display: "none"
                  }}
                ></div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default NavBar;
