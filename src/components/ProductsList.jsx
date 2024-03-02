import PropTypes from "prop-types";
import React from "react";
import Product from "./Product";

export default function ProductsList({ products, onAddProductToBuy, onRemoveProduct }) {
  return (
    <>
      <h2>Products</h2>
      <div className="products row">
        {products.map((p, i) => (
          <Product key={i} product={p} onAddProductToBuy={onAddProductToBuy} onRemoveProduct={onRemoveProduct}></Product>
        ))}
      </div>
    </>
  );
}

ProductsList.propTypes = {
  products: PropTypes.array.isRequired,
  onAddProductToBuy: PropTypes.func.isRequired,
  onRemoveProduct: PropTypes.func.isRequired,
};
