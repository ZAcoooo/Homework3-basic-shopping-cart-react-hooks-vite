import PropTypes from "prop-types";

import Product from "./Product";

export default function ProductsList({ products, onAddCart }) {
  return (
    <>
      <h2>Products</h2>
      <div className="products row">
        {products.map((p, i) => (
          <Product key={i} product={p} onAddCard={onAddCart}></Product>
        ))}
      </div>
    </>
  );
}

ProductsList.propTypes = {
  products: PropTypes.array.isRequired,
  onAddCart: PropTypes.func.isRequired,
};
