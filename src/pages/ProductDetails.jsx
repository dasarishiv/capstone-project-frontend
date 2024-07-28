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

function ProductDetails() {
  let { id } = useParams();
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const { authenticatedUser } = useAuth();
  console.log("authenticatedUser", authenticatedUser);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);

  const handleDeleteProduct = async () => {
    try {
      setLoading(true);
      await axios.delete(`${URL.GET_PRODUCTS_URL}/${id}`, {
        withCredentials: true
      });
      navigate("/");
    } catch (error) {
      console.log("error", error);
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong";
      setErrMsg(message);
    }
  };
  const getProduct = async () => {
    setLoading(true);
    try {
      const productData = await axios.get(`${URL.GET_PRODUCTS_URL}/${id}`);
      // const productArr = productData.data.data;

      setProduct({
        ...productData.data.data,
        image: `${URL.GET_IMAGE_URL}${productData.data.data?.images[0]?.url}`
      });
      console.log("product", productData);
    } catch (error) {
      console.log("error", error);
    }
    setLoading(false);
  };

  const handleOnRate = () => {
    getProduct();
  };
  useEffect(() => {
    getProduct();
  }, []);

  const isAuthorized =
    authenticatedUser?.role === "admin" || authenticatedUser?.role === "seller";
  return product ? (
    <main className="py-8 max-w-7xl mx-auto">
      {loading && <Loading />}
      {errMsg?.length > 0 && (
        <div className="bg-amber-200 text-red-500 font-medium text-sm px-2 py-1 rounded-sm">
          {errMsg}
        </div>
      )}
      {isAuthorized && (
        <div className="flex justify-end gap-2 items-center mb-5">
          <IconButton onClick={handleDeleteProduct}>
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
              clipRule="evenodd"
            />
          </IconButton>
        </div>
      )}
      <div className="relative pt-full bg-white rounded-lg shadow-lg overflow-hidden h-60">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-none object-top"
          decoding="async"
          loading="lazy"
        />
      </div>

      <h1 className="mt-5 text-5xl font-medium text-slate-900 capitalize">
        {product.name}
      </h1>
      <ul className="flex flex-wrap gap-2 pt-4 text-sm text-sky-600 *:rounded-full *:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5 capitalize">
        {product.categories.map((category) => {
          return <li key={category}>{category}</li>;
        })}
      </ul>
      <p className="mt-4 text-lg">{product.description}</p>

      <dl className="mt-4 text-xs font-medium flex items-center row-start-2">
        <dt className="sr-only">Price</dt>
        <dd className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <span className="text-slate-950 ml-2 text-5xl">
            $ {product.price}
          </span>
        </dd>
        <dt className="sr-only">Rating</dt>
        <dd className="text-indigo-600 flex items-center">
          <svg
            width="2"
            height="2"
            aria-hidden="true"
            fill="currentColor"
            className="mx-3 text-slate-300"
          >
            <circle cx="1" cy="1" r="1" />
          </svg>
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
          <span>
            {Math.round(product.averageRating)}{" "}
            <span className="text-slate-400 font-normal">
              ({product.reviews?.length})
            </span>
          </span>
        </dd>
      </dl>

      <div className="mt-4 flex justify-center gap-2 items-center">
        <h3 className="text-blue-600 text-xl mr-2">Add to Cart ::</h3>
        {product && (
          <>
            <PrintCount
              product={product}
              iconSize="lg"
              numberClass="text-5xl"
            />
          </>
        )}
      </div>
      <Reviews product={product} onRate={handleOnRate} />
    </main>
  ) : null;
}

export default ProductDetails;
