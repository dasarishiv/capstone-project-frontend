import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import URL from "../urlConfig";
import { IconButton } from "../components/IconButton";
import { PrintCount } from "../components/ProductList";
import { action } from "../redux/slices/cartSlice";

function Loading() {
  return (
    <div className="my-9 group inline-flex items-center justify-center py-4 px-4 text-sm font-semibold w-screen text-blue-700">
      <svg
        className="motion-reduce:hidden animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600"
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
      <span>Loading...</span>
    </div>
  );
}
function ProductDetails() {
  let { id } = useParams();
  const cartProducts = useSelector((store) => {
    return store.cartReducer.cartProducts;
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const handleAddProduct = (product) => {
    dispatch(action.addToCart(product));
  };

  const handleDeleteProduct = (product) => {
    dispatch(action.deleteFromCart(product));
  };

  useEffect(() => {
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
    getProduct();
  }, []);

  return product ? (
    <main className="py-8 max-w-7xl mx-auto">
      {loading && <Loading />}
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
            {product.averageRating}{" "}
            <span className="text-slate-400 font-normal">
              ({product.reviews?.length})
            </span>
          </span>
        </dd>
      </dl>

      <div className="mt-4 flex justify-center gap-2 items-center">
        <h3 className="text-blue-600 text-xl mr-2">Add to Cart ::</h3>
        <IconButton
          size="lg"
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
        {
          <span className="text-5xl text-slate-800">
            <PrintCount
              cartProducts={cartProducts}
              id={product.id}
            ></PrintCount>
          </span>
        }
        <IconButton
          size="lg"
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
      </div>
    </main>
  ) : null;
}

export default ProductDetails;
