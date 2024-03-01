import PropTypes from "prop-types";

export default function Product({ product, onAddCart }) {
  return (
    <div className="col-4">
      <div className="card ">
        <img src={product.image} alt={product.name} />
        {product.name}
        <button className="btn btn-outline-primary btn-sm" onClick={onAddCart(product.name)}>Add to Cart</button>
      </div>
    </div>
  );
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  onAddCart: PropTypes.func.isRequired,
};
