import PropTypes from "prop-types"



export default function ShoppingCart({ productsToBuy }) {
  const renderProductToBuy = (product, i) => 
  <div key={i} className="col-4"> 
    <div className="card">
    {product.name}
    </div> 
  </div>;
  return <div className="products row">{productsToBuy.map(renderProductToBuy)}</div>;
}

ShoppingCart.propTypes = {
    productsToBuy: PropTypes.array.isRequired,
};