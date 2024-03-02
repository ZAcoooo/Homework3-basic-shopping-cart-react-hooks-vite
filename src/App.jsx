import "./App.css";
import React, { useState, useEffect } from "react";

import ProductsList from "./components/ProductsList.jsx";
import ShoppingCart from "./components/ShoppingCart.jsx";
import CreateProductForm from "./components/CreateProductForm.jsx";

import { myFirebase } from "./models/MyFirebase.jsx";

export default function App() {
  const [products, setProducts] = useState([]);

  const [productsToBuy, setProductsToBuy] = useState([]);


  // help generate unique id
  const generateUniqueProductId = () => {
    let maxId = 0;
    products.forEach((product) => {
      if (product.id > maxId) {
        maxId = product.id;
      }
    });
    return maxId + 1;
  };

  // help generate unique id
  const generateUniqueProductToBuyId = () => {
    let maxId = 0;
    productsToBuy.forEach((item) => {
      if (item.id > maxId) {
        maxId = item.id;
      }
    });
    return maxId + 1;
  };

  const onAddProduct = async ({name, price, image}) => {
    try {
      const id = generateUniqueProductId();
      await myFirebase.addProduct({id, name, price, image});
      const updatedProducts = await myFirebase.getProducts();
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const onAddProductToBuy = async (product) => {
    try {
      const id = generateUniqueProductToBuyId();
      await myFirebase.addProductsToBuy({id, product});
      const updatedProductsToBuy = await myFirebase.getProductsToBuy();
      setProductsToBuy(updatedProductsToBuy);
    } catch (error) {
      console.error("Error adding productToBuy:", error);
    }
  };

  const onRemoveProduct = async (productId) => {
    try {
      await myFirebase.deleteProduct(productId);
      const updatedProducts = await myFirebase.getProducts();
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
    setProducts(products.filter((product) => product.id !== productId));
  };

  const onRemoveProductToBuy = async (productToBuyId) => {
    try {
      await myFirebase.deleteProductToBuy(productToBuyId);
      const updatedProductsToBuy = await myFirebase.getProductsToBuy();
      setProductsToBuy(updatedProductsToBuy);
    } catch (error) {
      console.error("Error deleting productToBuy: ", error);
    }
    setProductsToBuy(productsToBuy.filter((productToBuy) => productToBuy.id !== productToBuyId));
  };

  // const onRemoveProductToBuy = (productToBuyId) => {
  //   setProductsToBuy(productsToBuy.filter((productToBuy) => productToBuy.id !== productToBuyId));
  // };

  useEffect( () => {
    const getProducts = async () => {
      const products = await myFirebase.getProducts();
      setProducts(products);
    };
    getProducts();
    const getProductsToBuy = async () => {
      const productsToBuy = await myFirebase.getProductsToBuy();
      setProductsToBuy(productsToBuy);
      console.log(productsToBuy);
    };
    getProductsToBuy();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <h1>Basic Shopping Site</h1>

          <ProductsList products={products} onAddProductToBuy={onAddProductToBuy} onRemoveProduct={onRemoveProduct}/>

          <CreateProductForm onAddProduct={onAddProduct}/>
        </div>
        <div className="col-4">
          <h2>Shopping Cart</h2>
          <ShoppingCart productsToBuy={productsToBuy} onRemoveProductToBuy={onRemoveProductToBuy} />
        </div>
      </div>
    </div>
  );
}
