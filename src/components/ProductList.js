// src/components/ProductList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      console.log(response.data.data);
      setProducts(response.data.data);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoader(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="container">
      <h2>Product List</h2>
      <ul>
        {loader ? (
          <loader></loader>
        ) : (
          <>
              <li>
                <div className="pname">Name</div>
                <div className="pprice">Price</div>
                <div className="descrip">Description</div>
                <div className="heditbutton">Edit</div>
                <div className="hdeletebutton">Delete</div>
              </li>
            {products?.map((product) => (
              <li key={product.product_id}>
                <div className="pname">{product.name} </div>
                <div className="pprice">{product.price} </div>
                <div className="descrip">{product.description} </div>
                <Link to={`/update/${product.product_id}`}>
                  <button className="editbutton">Edit</button>
                </Link>
                <button
                  onClick={() => handleDelete(product.product_id)}
                  className="deletebutton"
                >
                  Delete
                </button>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default ProductList;
