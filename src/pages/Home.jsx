import React, { useState, useEffect } from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import axios from "axios";
import URL from "../urlConfig";
import ProductList from "../components/ProductList";
import Categories from "../components/Categories";
import basicOps from "../utility/basicOps";
import { usePaginationContext } from "../contexts/PaginationContext";
import { IconButton } from "../components/IconButton";

function Home() {
  // preserver -> pagination
  /***single source of truth for all the products***/
  const [products, setProducts] = useState([]);
  /************ all the categories -> a product**********/
  const [categories, setCategories] = useState([]);
  /**********Action***********/
  /*********************** state ->term with which you want to filter the product list*****************************/
  const [searchTerm, setSearchTerm] = useState("");
  /**************************sort : 0 : unsorted , 1: incresing order , -1 : decreasing order ************************************/
  const [sortDir, setsortDir] = useState(0);
  /**************************** currcategory : category group you result **********************************/
  const [currCategory, setCurrCategory] = useState("All categories");
  // page num and page size
  const { pageSize, pageNum, setPageNum, setPageSize } = usePaginationContext();
  /****************get all the products*********************/
  useEffect(() => {
    (async function () {
      // const resp = await fetch(`https://fakestoreapi.com/products`)
      // console.log(resp);
      // const anotherResp = await fetch("/api/product");

      // const productData = await resp.json();
      const productData = await axios.get(URL.GET_PRODUCTS_URL);
      const productArr = productData.data.data;
      const productList = productArr.map((product) => {
        return {
          id: product._id,
          title: product.name,
          image: `${URL.GET_IMAGE_URL}${product?.images[0]?.url}`,
          ...product
        };
      });
      console.log("products", productData);
      setProducts(productList);
    })();
  }, []);

  /**************getting all the categroies ********************/
  useEffect(() => {
    (async function () {
      // const resp = await fetch(`https://fakestoreapi.com/products/categories`)
      // const categoriesData = await resp.json();
      const categoriesData = await axios.get(URL.GET_CATEGORIES);
      console.log("categories", categoriesData);
      setCategories(categoriesData.data.data);
    })();
  }, []);
  const object = basicOps(
    products,
    searchTerm,
    sortDir,
    currCategory,
    pageNum,
    pageSize
  );
  const filteredSortedgroupByArr = object.filteredSortedgroupByArr;
  const totalPages = object.totalPages;
  return (
    <>
      {/* header */}
      <section className="p-6 min-h-16 bg-slate-50">
        <div className="max-w-prose flex justify-items-center items-center mx-auto mb-3">
          <div className="group relative flex-1 pr-1">
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              />
            </svg>
            <input
              className="min-h-14 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
              type="text"
              aria-label="Filter products..."
              placeholder="Filter products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPageNum(1);
              }}
            ></input>
          </div>

          <div className="icons_container flex gap-1 justify-center items-center flex-col">
            <IconButton
              onClick={() => {
                setsortDir(1);
                setPageNum(1);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 18.75 7.5-7.5 7.5 7.5"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 7.5-7.5 7.5 7.5"
              />
            </IconButton>

            <IconButton
              onClick={() => {
                setsortDir(-1);
                setPageNum(1);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
              />
            </IconButton>
          </div>
        </div>

        <Categories
          categories={categories}
          setCurrCategory={setCurrCategory}
        ></Categories>
      </section>

      {/* main area  */}
      <main className="p-6">
        {filteredSortedgroupByArr?.length === 0 ? (
          <div className="flex justify-center items-center">
            <h6 className="text-2xl">No Products Found</h6>
          </div>
        ) : (
          <>
            {/* products will be there */}
            <ProductList productList={filteredSortedgroupByArr}></ProductList>
            {/* pagination */}
            <div className="pagination mt-6">
              {pageNum != 1 && (
                <IconButton
                  onClick={() => {
                    if (pageNum == 1) return;
                    setPageNum((pageNum) => pageNum - 1);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </IconButton>
              )}

              <div className="pagenum text-slate-900 bg-slate-100">
                {pageNum}
              </div>
              {pageNum != totalPages && (
                <IconButton
                  onClick={() => {
                    if (pageNum == totalPages) return;
                    setPageNum((pageNum) => pageNum + 1);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </IconButton>
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default Home;

/***
 * 1. Steps/
 *  - INtial Data
 *  a. Searching
 *  b. Sorting
 *  c. Categorization
 *  d. Pagination
 *  e. Render the Results
 *
 * 2. Data
 *      1. Products
 *      2. Categories
 *
 *
 * **/
