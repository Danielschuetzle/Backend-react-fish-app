import dbConnect from "../../../db/connect";
import Product from "../../../db/models/Product";

export default async function handler(request, response) {

  // Connect to the database
  await dbConnect();

  // Check if the HTTP method is 'GET'
  if (request.method === "GET") {
    // Find all products in the database
    const products = await Product.find();
    // Return a response with status 200 and the products
    return response.status(200).json(products);
  }
  
  // Check if the HTTP method is 'POST'
  else if (request.method === "POST") {
    // Use a try...catch block to handle potential errors
    try {
      // Extract product data from the request body
      const productData = request.body;
      // Create a new product in the database with the product data
      const product = await Product.create(productData);
      // If successful, return a response with status 201 and a success message
      return response.status(201).json({ status: "Product created." });
    } catch (error) {
      // Log any errors to the console
      console.error(error);
      // If an error occurred, return a response with status 400 and the error message
      return response.status(400).json({ error: error.message });
    }
  } 
  // For any other HTTP method, return a response with status 405 (Method Not Allowed)
  else {
    response.setHeader("Allow", ["GET", "POST"]);
    return response.status(405).json({ error: `Method ${request.method} Not Allowed` });
  }
}
