// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, query, where } from "firebase/firestore";

function MyFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyADl_3dYW12wRsZd0xcpUrxyMAp6gi99x0",
    authDomain: "shoppingcart-195af.firebaseapp.com",
    projectId: "shoppingcart-195af",
    storageBucket: "shoppingcart-195af.appspot.com",
    messagingSenderId: "303517493327",
    appId: "1:303517493327:web:bd2075de6bb545547ce23a",
    measurementId: "G-BMQN5V39DD",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const me = {};

  me.getProducts = async() => {
    const productsRef = collection(db, "Products");
    return (await getDocs(productsRef)).docs.map((d) => d.data()).sort((a, b) => a.id - b.id);
  };

  me.getProductsToBuy = async() => {
    const productsToBuyRef = collection(db, "ProductsToBuy");
    return (await getDocs(productsToBuyRef)).docs.map((d) => d.data()).sort((a, b) => a.id - b.id);
  };

  me.addProduct = async (product) => {
    try {
      const productsRef = collection(db, "Products");
      await addDoc(productsRef, product);
      console.log("Product added successfully!");
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  me.addProductsToBuy = async(productToBuy) => {
    try {
      const productsToBuyRef = collection(db, "ProductsToBuy");
      await addDoc(productsToBuyRef, productToBuy);
      console.log("ProductToBuy added successfully!");
    } catch (error) {
      console.error("Error adding productsToBuy: ", error);
    }
  };

  me.deleteProduct = async (productId) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "Products"), where("id", "==", productId))
      );
  
      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
          console.log("Product deleted successfully!");
        });
      } else {
        console.log("No product found with ID:", productId);
      }
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  me.deleteProductToBuy = async (productToBuyId) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "ProductsToBuy"), where("id", "==", productToBuyId))
      );
  
      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
          console.log("ProductToBuy deleted successfully!");
        });
      } else {
        console.log("No productToBuy found with ID:", productToBuyId);
      }
    } catch (error) {
      console.error("Error deleting productToBuy: ", error);
    }
  };

  return me;
}

export const myFirebase = new MyFirebase();