import React, { useState, useRef } from "react";
import axios from "axios";
import URL from "../../urlConfig";
// import "./product.css";

export function Product() {
  const name = useRef(null);
  const description = useRef(null);
  const price = useRef(null);
  const categories = useRef(null);
  const discount = useRef(null);
  const stock = useRef(null);
  const brand = useRef(null);
  const imgName = useRef(null);

  const image = useRef(null);

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  //   console.log("Location", location);

  const handleSubmit = async (e) => {
    console.log("submit");

    e.preventDefault();
    const productDetails = new FormData(e.target);
    // console.log("data", data);
    // console.log("name", name.current.value);
    // console.log("desc", desc.current.value);
    // console.log("image", image.current.value);
    const uploadedImg = productDetails.get("image");
    const config = {
      withCredentials: true,
      headers: { "content-type": "multipart/form-data" }
    };

    if (uploadedImg.size) {
      const img = new Image();
      const objectUrl = window.URL.createObjectURL(productDetails.get("image"));
      // img.onload = function () {
      //   productDetails["imgWidth"] = this.width;
      //   productDetails["imgHeight"] = this.height;
      //   window.URL.revokeObjectURL(objectUrl);
      // };
      img.src = objectUrl;
      await img.decode();
      productDetails.append("imgWidth", img.width);
      productDetails.append("imgHeight", img.height);
    }

    const res = await axios.post(URL.GET_PRODUCTS_URL, productDetails, config);

    // setLoading(true);
    // const userDetails = { email, password };
    // const res = await axios.post(URL.LOGIN_URL, userDetails, {
    //   withCredentials: true
    // });
    // console.log("response from login", res);
    // setLoading(false);
    // setEmail("");
    // setPassword("");
    // setErrMsg("");
    // setAuthenticatedUser(res.data.user);
    // // navigate("/");
    // navigate(location.state?.from?.pathname || "/");
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="signinscreen">
      <div className="container">
        <div className="innerContainer">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px"
              // backgroundColor: 'red',
            }}
          >
            <p>Product Information</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                name="name"
                required
                ref={name}
              />
            </div>
            <div>
              <label htmlFor="description">description</label>
              <input
                type="text"
                id="description"
                placeholder="description"
                name="description"
                required
                ref={description}
              />
            </div>
            <div>
              <label htmlFor="price">price</label>
              <input
                type="number"
                id="price"
                placeholder="price"
                name="price"
                required
                min={1}
                ref={price}
              />
            </div>
            <div>
              <label htmlFor="categories">categories</label>
              <input
                type="text"
                id="categories"
                placeholder="'electronics','stationery','clothing','furniture'"
                name="categories"
                required
                ref={categories}
              />
            </div>
            <div>
              <label htmlFor="discount">discount</label>
              <input
                type="number"
                id="discount"
                placeholder="discount"
                name="discount"
                ref={discount}
              />
            </div>
            <div>
              <label htmlFor="stock">stock</label>
              <input
                type="number"
                id="stock"
                placeholder="stock"
                name="stock"
                ref={stock}
                required
              />
            </div>
            <div>
              <label htmlFor="brand">brand</label>
              <input
                type="text"
                id="brand"
                placeholder="brand"
                name="brand"
                required
                ref={brand}
              />
            </div>

            <div>
              <label htmlFor="imgName">Image Title</label>
              <input
                type="text"
                id="imgName"
                placeholder="imgName"
                name="imgName"
                ref={imgName}
              />
            </div>
            <div>
              <label htmlFor="image">Upload Image</label>
              <input
                type="file"
                id="image"
                name="image"
                ref={image}
                accept="image/jpeg, image/jpg, image/png"
              />
            </div>
            <div>
              <input type="submit" value="Submit" />
              <br />
              <div className={errMsg ? "errContainer" : ""}>{errMsg}</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
