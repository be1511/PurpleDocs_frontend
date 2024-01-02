// src/components/ProductForm.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Spin, message} from 'antd';

const ProductForm = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({ name: '', price: 0, description: '' });
  const [loadings, setLoadings] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const successAdd = () => {
    messageApi.open({
      type: 'success',
      content: 'Product added sucessfully',
    });
  };

  const successUpdate = () => {
    messageApi.open({
      type: 'success',
      content: 'Product update sucessfully',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'This is an error message',
    });
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadings(true);
    try {
      let response;
      if (id) {
        response = await axios.put(`http://localhost:5000/products/${id}`, product);
        if(response?.data){successUpdate();}
      } else {
        response = await axios.post('http://localhost:5000/products', product);
        if(response?.data){successAdd();}
      }
      setLoadings(false);
      
    } catch (error) {
      console.error('Error submitting product:', error);
      setLoadings(false);
      error();
    }
   
  };

  const handleChangeName = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleChangePrice = (e) => {
    setProduct({ ...product, price: parseFloat(e.target.value) });
  };

  const handleChangeDescr = (e) => {
    setProduct({ ...product, description: e.target.value });
  };

  // "name": "Football",
  // "price": 326,
  // "description": "Football color red-blue"

  return (
    <div className="container">
      {contextHolder}
      <h2>{id ? 'Update Product' : 'Create Product'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="name"
          defaultValue={product.name}
          value={product.name}
          onChange={handleChangeName}
          required
        />
        <label>Price:</label>
        <input
          type="number"
          name="price"
          defaultValue={product.price}
          value={product.price}
          onChange={handleChangePrice}
          required
        />
        <label>Description:</label>
        <input
          type="text"
          name="description"
          defaultValue={product.description}
          value={product.description}
          onChange={handleChangeDescr}
          required
        />
        <button type="submit">{loadings ? <Spin /> : <>{id ? 'Update' : 'Create'}</>}</button>
        {/* <Button type="submit" size="small" loading>
        {id ? 'Update' : 'Create'}
        </Button> */}
      </form>
    </div>
  );
};

export default ProductForm;
