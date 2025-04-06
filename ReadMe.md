<h1>E-Commerce Platform - Corner Market</h1>

This is a simple e-commerce application that allows users to browse and purchase various fresh products such as fruits, vegetables, fish, and dairy. Users can view categories of products, access discounts and offers, add items to the cart, and proceed to checkout.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies](#technologies)
4. [File Structure](#file-structure)
5. [Setup](#setup)
6. [Usage](#usage)
7. [Components Overview](#components-overview)
8. [Services](#services)
9. [API Integration](#api-integration)
10. [License](#license)
11. [How to Contribute](#how-to-contribute)

---

## Project Overview

This project is an e-commerce platform that offers a variety of fresh products directly from local suppliers. Customers can select products, view available discounts, and proceed to checkout. The application supports multiple payment and collection methods like credit card, cash on delivery, and self-collection. The checkout process calculates the final price based on product discounts and delivery options.

---

## Features

-   **Product Categories**: Displays categories such as Fish, Dairy, Fruits, and Vegetables.
-   **Discounts & Offers**: Special discounts applied to certain products.
-   **Cart & Checkout**: Users can add products to their cart, view the cart summary, and choose a payment method.
-   **Responsive Design**: Fully responsive and optimized for both mobile and desktop devices.
-   **Authentication**: Secure user authentication and token management.
-   **Order Management**: Users can place orders with different payment and delivery options.

---

# Technologies

## Frontend

-   **Frontend**: React, vite, React Router
-   **State Management**: React's `useState`, `useContextApi` `useEffect`, Formik, Yup
-   **Styling**: Bootstrap, React bootstrap, React toastify
-   **API Communication**: Axios or Fetch (for API requests)
-   **Form Validation**: Yup with Formik
-   **Routing**: React Router DOM

## Backend

-   **Backend Framework:** Express.js
-   **Database:** MongoDB (via Mongoose)-(Atlas)
-   **Environment Variables:** dotenv (configures environment-specific variables)
-   **Security:** Helmet (for HTTP header security)
-   **Rate Limiting:** express-rate-limit (limits the number of requests per IP)
-   **Logging:** Custom Logger Middleware (with logToFile function)
-   **CORS:** CORS (Cross-Origin Resource Sharing) for handling cross-origin requests
-   **Routes:** Modular route handling for Products, Users, Carts, Orders, Discounts

## API Endpoints

-   **/api/users:** User-related API routes
-   **/api/carts:** Cart-related API routes
-   **/api/orders:** Order-related API routes
-   **/api/products:** Product-related API routes
-   **/api/discounts:** Discount and Offer-related API routes

## Development Tools

-   Chalk (for colored terminal output)
-   express-list-routes (for listing all routes)

## Key Features

-   **Environment Configuration**
    -   Based on the environment (production or development), different .env files are loaded to set up environment-specific configurations (e.g., DB connection, API keys).

# Rate Limiting

-   Implemented with the express-rate-limit middleware to limit the number of requests an IP can make within a 24-hour window. This helps prevent abuse and reduces the risk of DDoS attacks.

# Security

-   Using helmet middleware to enhance the security of HTTP headers and prevent common vulnerabilities like Cross-Site Scripting (XSS), clickjacking, etc.

# Logging

-   Custom logger middleware captures logs and writes them to a file for persistence and auditing.

# Modular Routes:

-   Routes are organized by resources (products, users, carts, orders, discounts), improving scalability and maintainability.

# CORS

-   CORS middleware ensures that the server can accept requests from different domains, facilitating smooth integration between the frontend and backend.

# MongoDB with Mongoose

-   Mongoose is used to handle database connections and schema definitions for MongoDB, making data interactions more seamless and easier to manage.

# Route Listing in Development Mode

-   In development mode, all routes in the Express app are logged to the console using the express-list-routes package, providing an overview of available routes.

# Server

-   The Express server listens on a port, and depending on the environment, it will either run in development or production mode, adjusting its behavior accordingly.

---

## Setup

Ensure you have the following prerequisites installed

-   **Node.js** (v20.18.x or higher): [Download Node.js](https://nodejs.org/)
-   **npm**: Node Package Manager (automatically installed with Node.js)
-   **MongoDB And Create Database**: If using a local database, install [MongoDB Compass](https://www.mongodb.com/try/download/community) And Create Database with the name `fruit-store` (or use MongoDB Atlas On port 8201).

-   **Postman/Insomnia**: For API testing, download
    -   [Postman](https://www.postman.com/downloads/) or [Insomnia](https://insomnia.rest/download).

## Installation

**Clone the repository**

```bash
https://github.com/Anismhamid/full-stack-web-project.git
```

**Move to the root file `full-stack-web-project` if nedded.**

```bash
cd full-stack-web-project
```

**Install dependencies from root file `full-stack-web-project`**

```bash
npm install
```

# Run and install the application

**Development mode**

```bash
npm run start:dev
```

-   This will start the development Client on http://localhost:5173
-   This will start the development Server on http://localhost:8209

---

**Production mode**

```bash
npm run start:prod
```

-   This will start the development Client on http://localhost:http://localhost:4173/
-   This will start the development Server on http://localhost:8201

## Features

1. **Browse Categories:** Visit pages like Fish, Dairy, Fruits, etc., to explore products.

2. **View Discounts and Offers:** Check out products on discount with real-time updates.

3. **Add to Cart:** Add your favorite items to the shopping cart.

4. **Proceed to Checkout:** Fill in your delivery and payment details and place an order.

5. **Checkout Flow**
   The checkout process starts after the user has added products to the cart.

6. During checkout, the user selects the payment method (credit card or cash on delivery) and delivery method (delivery or self-collection).

    - Once all information is provided, the user confirms the order and is redirected to the order confirmation page.

## Components Overview

1. Fish

    - Displays the fish products available for purchase.
    - It uses the ProductCategory component to fetch and render the fish-related products.

2. Dairy

    - Displays dairy products available for purchase.
    - Similar to the Fish component, it uses the ProductCategory component to render products in this category.

3. Discounts and Offers

    - Fetches and displays products currently on sale.
    - Displays a list of discounted products, showing the discount percentage, and allows users to click and view more details.

4. Contact

    - Displays the company’s contact information, including email, phone, and address. It provides a form for users to get in touch with customer service.

5. Cart

    - Manages the shopping cart, allowing users to view, update, and delete items from the cart.

6. Checkout

    - Handles the checkout process.
    - Users can select their preferred payment method, delivery method, and finalize the order.
    - The component calculates the total amount, applying any discounts or delivery fees.

## Services

1.  cart

    -   Contains functions for fetching and updating the cart. The primary function is getCartItems, which retrieves the cart data from the backend.

2.  productsServices

    -   Contains functions for interacting with the products API.
    -   The getProductsInDiscount function retrieves discounted products.

3.  orders
    -   Handles placing orders. The postOrder function sends order details to the backend.

## API Integration

1. Cart API

    - **GET /cart/items:** Fetches the current items in the cart.
    - **POST /order:** Sends the order data (including products, payment method, and collection method) to the server for processing.

2. Products API

    - **GET /products/discounts:** Fetches products that are currently on sale.

3. Order API
    - **POST /orders:** Submits the order and processes the checkout details.

## License

# This project is licensed under the MIT License - see the LICENSE file for details.

## How to Contribute

If you'd like to contribute to this project, feel free to fork the repository, make your changes, and submit a pull request. Contributions are welcome! Be sure to follow the coding style and include tests for any new features.
