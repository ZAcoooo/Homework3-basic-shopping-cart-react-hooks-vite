# Homework3-basic-shopping-cart-react-hooks-vite
Homework 3 for CS 5010


## ChatGPT
Using ChatGPT 3.5:

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




