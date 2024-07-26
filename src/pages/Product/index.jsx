import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import URL from "../../urlConfig";
// import "./product.css";

export function Product() {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [categories, setCategories] = useState([]);
  //   console.log("Location", location);

  useEffect(() => {
    (async function () {
      const categoriesData = await axios.get(URL.GET_CATEGORIES);
      setCategories(categoriesData.data.data);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      if (!form.checkValidity()) {
        return;
      }
      setLoading(true);

      const productDetails = new FormData(form);

      const uploadedImg = productDetails.get("image");
      const config = {
        withCredentials: true,
        headers: { "content-type": "multipart/form-data" }
      };

      if (uploadedImg.size) {
        const img = new Image();
        const objectUrl = window.URL.createObjectURL(
          productDetails.get("image")
        );

        img.src = objectUrl;
        await img.decode();
        productDetails.append("imgWidth", img.width);
        productDetails.append("imgHeight", img.height);
      }

      await axios.post(URL.GET_PRODUCTS_URL, productDetails, config);
      form.reset();
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
    <div className="relative  flex flex-1 flex-col px-4 py-10">
      <main className="mx-auto w-full max-w-lg ">
        <h1 className="mt-20 text-lg font-semibold text-gray-900">
          Add Product
        </h1>

        <form
          action="#"
          className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6"
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
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 invalid:border-red-500"
              placeholder="Product Name"
              name="name"
              required
            />
          </div>
          <div className="col-span-full">
            <label
              htmlFor=":S3:"
              className="mb-3 block text-sm font-medium text-gray-700"
            >
              Sort Description
            </label>
            <input
              id=":S3:"
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 invalid:border-red-500"
              type="text"
              placeholder="Product sort description"
              name="sortDescription"
              required
            />
          </div>
          <div className="col-span-full">
            <label
              htmlFor=":S2:"
              className="mb-3 block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id=":S2:"
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 invalid:border-red-500"
              type="text"
              placeholder="Product description"
              name="description"
              required
            />
          </div>

          <div>
            <label
              htmlFor=":S4:"
              className="mb-3 block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              id=":S4:"
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 invalid:border-red-500"
              type="number"
              placeholder="price"
              name="price"
              required
              min={1}
            />
          </div>
          <div>
            <label
              htmlFor=":S7:"
              className="mb-3 block text-sm font-medium text-gray-700"
            >
              Discount
            </label>
            <input
              id=":S7:"
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 invalid:border-red-500"
              placeholder="discount"
              type="number"
              name="discount"
            />
          </div>

          <div className="col-span-full">
            <label
              htmlFor=":S6:"
              className="mb-3 block text-sm font-medium text-gray-700"
            >
              Categories:{" "}
              <span className="text-sm mb-2 text-gray-400">
                ({categories.join(", ")} only)
              </span>
            </label>

            <input
              id=":S6:"
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 invalid:border-red-500"
              placeholder={categories.join(", ")}
              type="text"
              name="categories"
              required
            />
          </div>

          <div>
            <label
              htmlFor=":S8:"
              className="mb-3 block text-sm font-medium text-gray-700"
            >
              Stock
            </label>
            <input
              id=":S8:"
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 invalid:border-red-500"
              placeholder="Stock"
              type="number"
              name="stock"
              required
            />
          </div>
          <div>
            <label
              htmlFor=":S9:"
              className="mb-3 block text-sm font-medium text-gray-700"
            >
              Brand
            </label>
            <input
              id=":S9:"
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 invalid:border-red-500"
              placeholder="Brand"
              type="text"
              name="brand"
              required
            />
          </div>
          <div className="col-span-full">
            <label
              htmlFor=":S11:"
              className="mb-3 block text-sm font-medium text-gray-700"
            >
              Image Name
            </label>
            <input
              id=":S10:"
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 invalid:border-red-500"
              placeholder="Image Name"
              type="text"
              name="imgName"
            />
          </div>
          <div className="col-span-full">
            <label
              htmlFor=":S11:"
              className="mb-3 block text-sm font-medium text-gray-700"
            >
              Choose Product Image
            </label>
            <input
              id=":S11:"
              className="block w-full text-sm text-gray-700
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-blue-700
      hover:file:bg-violet-100"
              placeholder="Image Name"
              type="file"
              name="image"
              accept="image/jpeg, image/jpg, image/png"
            />
          </div>

          {errMsg?.length > 0 && (
            <div className="col-span-full bg-amber-200 text-red-500 font-medium text-sm px-2 py-1 rounded-sm">
              {errMsg}
            </div>
          )}
          <div className="col-span-full">
            <button
              className="mt-5 disabled:opacity-50 group inline-flex items-center justify-center rounded-full py-4 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600 w-full"
              type="submit"
              color="blue"
              disabled={loading}
            >
              {!loading && <span>Add Product</span>}
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
                  <span>Adding...</span>
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
