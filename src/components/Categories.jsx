import { useEffect, useState } from "react";
import { usePaginationContext } from "../contexts/PaginationContext";

function Categories(props) {
  const { categories, setCurrCategory } = props;
  const [selectedCatogory, setSelectedCatogory] = useState("All categories");

  const { setPageNum } = usePaginationContext();

  useEffect(() => {
    setSelectedCatogory(selectedCatogory);
    setCurrCategory(selectedCatogory);
    setPageNum(1);
  }, [selectedCatogory, setCurrCategory, setPageNum]);

  return (
    <div className="flex items-center gap-x-5 justify-end">
      <button
        className={`capitalize rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-blue-200 hover:text-slate-800 ${
          selectedCatogory === "All categories"
            ? "bg-blue-500 text-slate-100"
            : ""
        }`}
        onClick={() => {
          setSelectedCatogory("All categories");
        }}
      >
        All categories
      </button>
      {categories.map((category) => {
        const isActive = selectedCatogory === category;
        return (
          <button
            key={category}
            className={`capitalize rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-blue-200 hover:text-slate-800 ${
              isActive ? "bg-blue-500 text-slate-100" : ""
            }`}
            onClick={() => {
              setSelectedCatogory(category);
            }}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

export default Categories;
