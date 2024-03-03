# Homework3-basic-shopping-cart-react-hooks-vite
Homework 3 for CS 5010
Building a basic shopping cart application with functionalities such as showing all products, adding new products, deleting products, adding to cart, and deleting from cart.

Project deploy hosting URL: https://shoppingcart-195af.web.app

Project demo video URL: https://www.youtube.com/watch?v=9mQUMC8c6KM

## Method
This project is developed using React and Vite. Firebase is used for managing the application's data, and Bootstrap is utilized for styling. 

### Project Structure
In App.jsx file, we have the main functionality functions. In CreateProductForm.jsx file, I write a form about creating a new product. In Product.jsx file, I create product card for each product and create add and delete buttons for each product. In ShoppingCart.jsx file, I create a shopping cart functionality and add remove button for each product in the cart.

### Firebase Integration
Firebase Firestore is used to store and manage product data. The `MyFirebase.jsx` file contains methods for fetching products from the database, adding new products, and deleting products.

### Pagination Implementation
In ProductsList.jsx file, I create the pagination over the products. I create variables to store the number of products per page, last index of product in current page, first index of product in current page, an array to contain the products in the current page, and the number of total pages needed. I use disabled to disable the functionality of the page jump and use a function to set the current page number. After setting the current page number, it will re-render the component to display another page products.

### ChatGPT Integration
During development, ChatGPT 3.5 was used to assist with solving specific challenges, such as deleting products based on a specific field value in Firebase Firestore. The tool provided guidance on querying Firestore to find and delete documents based on a given field.

#### Example ChatGPT Interaction

1. Prompt:
how to delete the item with the specific id, id is not the primary key, it is a field. help me rewrite the code, i need to make sure that i will delete the data in the db by the field. my code is not working, since id in product is not the primary key
```me.deleteProduct = async (productId) => {
    try {
        const productDoc = doc(db, "Products", productId);
        await deleteDoc(productDoc);
        console.log("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product: ", error);
      }
    };
```
1. Response: If you want to delete a document based on a field other than the primary key in Firestore, you'll need to perform a query to find the document with that specific field value and then delete it. Here's how you can rewrite your code to achieve this:

    ```me.deleteProduct = async (productId) => {
    try {
        // Query Firestore to find the document with the specific field value
        const querySnapshot = await getDocs(
        query(collection(db, "Products"), where("id", "==", productId))
        );

        // Check if the document exists
        if (!querySnapshot.empty) {
        // Since there could be multiple documents with the same field value,
        // we'll loop through the results and delete each document
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
    ```
    We first perform a query to find documents where the field "id" matches the provided productId.
    If there are documents found, we loop through each document and delete it using its reference.
    If no documents are found, we log a message indicating that no product was found with the specified ID.
    Make sure to import necessary functions like getDocs, query, collection, where, and deleteDoc from the Firestore SDK in your code.

- What I learned: if we want to delete the date in the normal way, we should know the document ID of this data. However, if we just know the field of the data, we can use query and where to help us find the data that meets the requirement.




