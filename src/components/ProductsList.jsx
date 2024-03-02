import PropTypes from "prop-types";
import React, { useState } from "react";
import Product from "./Product";

export default function ProductsList({ products, onAddProductToBuy, onRemoveProduct }) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;
  const last = currentPage * productsPerPage;
  const first = last - productsPerPage;
  const currentProducts = products.slice(first, last);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = (pageNum) => {
    if (pageNum > 0 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <h2>Products</h2>
      <div className="products row">
        {currentProducts.map((p, i) => (
          <Product key={i} product={p} onAddProductToBuy={onAddProductToBuy} onRemoveProduct={onRemoveProduct}></Product>
        ))}
      </div>

      <div className="mt-4"></div>

      <nav aria-label="product navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>
        Previous
            </a>
          </li>
          {pageNumbers.map((pageNum) => (
            <li key={pageNum} className={`page-item ${currentPage === pageNum ? "disabled" : ""}`}>
              <a className="page-link" href="#" onClick={() => paginate(pageNum)}>{pageNum}</a>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>
        Next
            </a>
          </li>
        </ul>
      </nav>

    </>
  );
}

ProductsList.propTypes = {
  products: PropTypes.array.isRequired,
  onAddProductToBuy: PropTypes.func.isRequired,
  onRemoveProduct: PropTypes.func.isRequired,
};
