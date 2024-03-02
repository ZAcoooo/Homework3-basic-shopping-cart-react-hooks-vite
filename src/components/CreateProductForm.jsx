import React, { useRef } from "react";
import PropTypes from "prop-types";

export default function CreateProductForm({ onAddProduct }) {
  const nameRef = useRef();
  const priceRef = useRef();

  const onAddProductHelper = (e) => {
    e.preventDefault();
    const productName = nameRef.current.value;
    const productPrice = +priceRef.current.value;
    if (productName.trim() !== "" && !isNaN(productPrice)) {
      onAddProduct({
        name: nameRef.current.value,
        price: +priceRef.current.value,
        image: "https://via.placeholder.com/150"
      });
      nameRef.current.value = "";
      priceRef.current.value = "";
    } else {
      alert("Please enter a valid name and price.");
    }
  };
  return (
    <div>
      <h2>Create Product</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            ref={nameRef}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            placeholder="Enter price"
            ref={priceRef}
            required
          />
        </div>
        <button className="btn btn-primary" onClick={onAddProductHelper}>
          Add Product
        </button>
      </form>
    </div>
  );
}

CreateProductForm.propTypes = {
  onAddProduct: PropTypes.func.isRequired,
};