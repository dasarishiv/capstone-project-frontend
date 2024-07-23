// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route, Navigate } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import User from "./pages/User";
import PaginationProvider from "./contexts/PaginationContext";
import { AuthProvider } from "./contexts/AuthProvider";
import { RequireAuth } from "./components/RequireAuth";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Product } from "./pages/Product";
import { Chat } from "./components/Chat";

function App() {
  return (
    <AuthProvider>
      <PaginationProvider>
        <h1 className="text-center text-3xl font-bold underline bg-sky-500 text-white hover:bg-sky-700 cursor-pointer">
          Project Title
        </h1>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route element={<RequireAuth />}>
            <Route path="/cart" element={<Cart></Cart>}></Route>
            <Route path="/createProduct" element={<Product />}></Route>
          </Route>

          <Route
            path="/product/:id"
            element={<ProductDetails></ProductDetails>}
          ></Route>
          <Route path="/user" element={<User></User>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/home" element={<Navigate to="/"></Navigate>}></Route>
          <Route path="*" element={<PageNotFound></PageNotFound>}>
            {" "}
          </Route>
        </Routes>
      </PaginationProvider>
      <Chat></Chat>
      <video id="videoPlayer" controls>
        <source
          src="http://localhost:3100/api/videos/sample"
          type="video/mp4"
        />
      </video>
    </AuthProvider>
  );
}

export default App;
