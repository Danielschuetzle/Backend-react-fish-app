# 🐠 Fish Shop App 🐠

This is a simple fish shop web application built using Next.js, Mongoose, MongoDB, and styled-components. The project also utilizes the SWR library for data fetching, caching, and state management.

## 🚀 Getting Started

1. Clone the repository:
   \`
   git clone https://github.com/danielschuetzle/backend-react-fish-app.git
   \`

2. Navigate into the directory and install the dependencies:
   \`
   cd fish-shop-app
   npm install
   \`

3. Add a `.env.local` file in the root of your project to add the connection string to your MongoDB database:
   \`
   MONGODB_URI=mongodb://localhost:27017/fish-shop
   \`

4. Start the development server:
   \`
   npm run dev
   \`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Features

- List of products fetched from a MongoDB database
- Individual product detail pages
- Form to add new products to the database

## 📚 Tech Stack

- Next.js
- MongoDB
- Mongoose
- SWR
- styled-components
