import React from "react";
import ProductList from "../components/ProductList";
import { useSelector } from "react-redux";
function Cart() {
  const productList = useSelector((store) => {
    return store.cartReducer.cartProducts;
  });
  return (
    <main className="py-8 max-w-7xl mx-auto">
      <h1 className="mt-5 text-5xl font-medium text-slate-900 capitalize">
        Cart
      </h1>

      <ProductList productList={productList}></ProductList>
    </main>
  );
}

export default Cart;
