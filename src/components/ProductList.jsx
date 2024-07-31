import { NavLink } from "react-router-dom";
import { Loading } from "./Loading";
import { PrintCount } from "./PrintCount";

function ProductList(props) {
  const { productList } = props;

  if (productList?.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <h6 className="text-2xl">No Products Found</h6>
      </div>
    );
  }

  return (
    <section className="flex gap-6 flex-wrap justify-center">
      {productList == null ? (
        <Loading />
      ) : (
        <>
          {productList.map((product) => {
            return (
              <article
                key={product._id}
                className="py-8 px-6 ring-1 ring-black/5 shadow-lg rounded-lg w-80"
              >
                <div className="max-w-4xl mx-auto grid grid-cols-1">
                  <div className="relative p-3 col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/75 via-black/0">
                    <h3 className="mt-1 text-lg font-semibold text-white capitalize">
                      <NavLink
                        className="text-gray-50 hover:underline"
                        to={`/product/${product._id}`}
                      >
                        {product.name}
                      </NavLink>
                    </h3>
                  </div>
                  <div className="grid gap-4 col-start-1 col-end-3 row-start-1">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-60 object-cover rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  <ul className="col-start-1 flex flex-wrap gap-2 pt-4 text-sm text-sky-600 *:rounded-full *:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5 capitalize">
                    {product.categories.map((category) => {
                      return <li key={category}>{category}</li>;
                    })}
                  </ul>
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

                      <span className="text-slate-950 ml-2 text-2xl">
                        ₹ {product.price}
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
                    <dt className="sr-only">more details</dt>
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

                      <NavLink
                        className="text-blue-600 text-sm hover:underline"
                        to={`/product/${product._id}`}
                      >
                        Details
                      </NavLink>
                    </dd>
                  </dl>
                  <div className="col-start-1 flex flex-wrap gap-2 pt-4 text-sm text-sky-600">
                    <span>
                      Brand:{" "}
                      <span className="rounded-full text-black border border-sky-100 bg-orange-300 px-2 py-0.5 capitalize">
                        {product.brand}
                      </span>
                    </span>
                  </div>

                  <p className="mt-4 text-sm col-start-1 min-h-5">
                    {product.sortDescription || product.description}
                  </p>

                  <div className="mt-4 col-start-1 self-center flex items-center justify-center gap-2 flex-wrap">
                    <PrintCount product={product} />
                  </div>
                </div>
              </article>
            );
          })}
        </>
      )}
    </section>
  );
}

export default ProductList;
