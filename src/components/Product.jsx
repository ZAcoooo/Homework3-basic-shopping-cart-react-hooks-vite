import PropTypes from "prop-types";
import React from "react";

export default function Product({ product, onAddProductToBuy, onRemoveProduct }) {
  const onAdd = () => {
    onAddProductToBuy(product);
  };
  const onRemove = (product) => {
    onRemoveProduct(product.id);
  };
  return (
    <div className="col-3 mb-2">
      <div className="card ">
        <img src={product.image} alt={product.name} />
        {product.name} ${product.price}
        <button className="btn btn-outline-primary btn-sm" onClick={onAdd}>Add to Cart</button>
        <button className="btn btn-outline-primary btn-sm" onClick={() => onRemove(product)}>Delete</button>
      </div>
    </div>
  );
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  onAddProductToBuy: PropTypes.func.isRequired,
  onRemoveProduct: PropTypes.func.isRequired,
};
