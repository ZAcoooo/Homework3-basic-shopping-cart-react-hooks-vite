import PropTypes from "prop-types";
import React from "react";


export default function ShoppingCart({ productsToBuy, onRemoveProductToBuy }) {
  const onRemove = (productId) => {
    onRemoveProductToBuy(productId);
  };
  const renderProductToBuy = (productToBuy, index) => 
    <li key={index}>
      {productToBuy.product.name} ${productToBuy.product.price} 
      <button className="btn btn-sm btn-outline-danger" 
        onClick={() => onRemove(productToBuy.id)}> - </button>
    </li>;
  return (
    <div>
      <ul>{productsToBuy.map(renderProductToBuy)}</ul>
      Total : ${productsToBuy.reduce( (prevTotal, productToBuy) => prevTotal + productToBuy.product.price, 0 )}
    </div>
  );
}

ShoppingCart.propTypes = {
  productsToBuy: PropTypes.array.isRequired,
  onRemoveProductToBuy: PropTypes.func.isRequired,
};