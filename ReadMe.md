<main style="padding:10px; height:fit-content; line-height:1;border-radius:20px; width:100%">
<h1 style="text-align:center; color:red">E-Commerce Platform - Corner Market</h1>

<h2 style="padding:10px ;color: black; background-color:white; height:fit-content; line-height:2; text-align:center;border-radius:20px">
This is a simple e-commerce application that allows users to browse and purchase various fresh products such as fruits, vegetables, fish, and dairy etc.
 Users can view categories of products, access discounts and offers, add items to the cart, and proceed to checkout</h2>

<div style=" height:fit-content; line-height:2;border-radius:10px; font-weight:600; max-width:500px;">

<h2 style="font-weight:700;">Table of Contents</h2>

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
</div>

## Project Overview

This project is an e-commerce platform that offers a variety of fresh products directly from local suppliers. Customers can select products, view available discounts, and proceed to checkout. The application supports multiple payment and collection methods like credit card, cash on delivery, and self-collection. The checkout process calculates the final price based on product discounts and delivery options.

## Features

-   **Product Categories**: Displays categories such as Fish, Dairy, Fruits, and Vegetables.
-   **Discounts & Offers**: Special discounts applied to certain products.
-   **Cart & Checkout**: Users can add products to their cart, view the cart summary, and choose a payment method.
-   **Responsive Design**: Fully responsive and optimized for both mobile and desktop devices.
-   **Authentication**: Secure user authentication and token management.
-   **Order Management**: Users can place orders with different payment and delivery options.
-   **Receipts Generation**: Automatically generates a detailed receipt for each order, including business info, customer details, product list, delivery fees, and discounts
    -   ![Website Receipts Preview]()

-   **Information Included**: The receipt includes:
    -   Business Information (name, address, contact details)
    -   Customer’s Name and Order Information
    -   List of Products (with name, quantity, and price)
    -   Delivery Fee (if applicable)
    -   Discounts Applied
    -   Total Amount Due
-   **Export Options**: Users can download PDF File directly from the receipts page

    -   ![PDF Receipt Preview]()

-   **Real-Time Updates with Socket.IO**: The platform uses **Socket.IO** for real-time updates, providing a seamless experience for users.
    -   **Order Status Updates**: Customers are instantly notified about changes in their order status (e.g., "Order Processed", "Out for Delivery").
    -   **Discount Alerts**: Users can get instant notifications on newly available discounts and offers.
    -   **Socket.IO Client**: The frontend is connected to the backend through **Socket.IO** client, ensuring that the user interface stays up-to-date without needing to refresh the page
    -   **Admin/Moderator Order Notifications**: Admin or moderator users receive real-time notifications about new orders, allowing them to process and manage them efficiently.

## Technologies

### 🖥️ Frontend

-   **Framework:**: React 19

-   **Build Tool**: Vite

-   **Routing**: React Router DOM v7

-   **State Management**:

    -   `useState`, `useContextApi`
    -   Real-time updates via **Socket.IO Client** for instant notifications (e.g., order updates, discounts, etc.)

-   **Styling & UI:**
    -   **Bootstrap v5**
    -   **React Bootstrap**
    -   **MUI (Material UI)**
    -   **MUI Joy UI (beta)**
    -   **Emotion (@emotion/react, @emotion/styled)**
    -   **Font Awesome (React)**
    -   **React Toastify**
    -   **CSS**
-   **API Communication:**
    -   **Axios** (for API requests)
-   **Form Handling & Validation:**
    -   **Formik**
    -   **Yup**

## 🧪 Development & Tooling

-   **TypeScript**
-   **Vite**
-   **ESLint**
-   **React Refresh**
-   **Database:** MongoDB Atlas (via Mongoose)

## 🛠️ Backend

-   **Framework:** Express.js
-   **Runtime:** Node.js
-   **Database:** MongoDB Atlas (via Mongoose)

## 🔌 Real-time Communication

-   **WebSockets:** Powered by **Socket.IO** for real-time communication. Enables features like:
    -   Live order status updates
    -   Real-time notifications for admins/moderators when new orders are placed
    -   Discount announcements pushed to connected clients

## 🌐 Environment Configuration

-   **dotenv** handles environment-specific settings such as database URIs and API keys.
-   Supports separate configs for development and production environments.

## 🔐 Security

-   **Helmet:** Secures HTTP headers to prevent common attacks (XSS, clickjacking, etc.)
-   **express-rate-limit:** Implements IP-based rate limiting to prevent abuse and DDoS attacks.

## 🔑 Authentication & Authorization

-   **jsonwebtoken:** Used for generating and verifying JWTs for secure login and access control.
-   **bcryptjs:** Securely hashes user passwords before storing them in the database.

## 🧾 Validation

-   **Joi:** Schema-based validation for incoming request data across all endpoints.

## 📋 Logging

-   Custom middleware logs server activity.
-   Logs are persisted in files to assist with debugging, auditing, and monitoring.

## 🌍 CORS

-   **CORS middleware:** Enables safe cross-origin resource sharing between frontend and backend apps.

## 🧱 Routing Structure

-   Modular, RESTful API structure for clean separation of concerns:
    -   `/api/users`: Authentication, user profiles
    -   `/api/products`: Product management
    -   `/api/orders`: Order placement and tracking
    -   `/api/carts`: Cart operations
    -   `/api/discounts`: Promotional offers and discounts

## 🛠️ Tooling & Debugging

-   **chalk:** Adds color-coded output to terminal logs
-   **express-list-routes:** Logs all available routes during development
-   **cross-env:** Cross-platform `.env` variable support (Windows/macOS/Linux)

---

## 🚧 Rate Limiting

-   Rate limits requests from a single IP to prevent brute force attacks and reduce server overload using **express-rate-limit**.

## 🔐 Security Features

-   Enhanced protection through **Helmet**
-   Limits abusive requests through **rate-limiting**

## 📡 Real-time Notifications with Socket.IO

-   **Admins/Moderators** receive instant push notifications when:
    -   A new order is placed
    -   Order status updates occur
    -   New discounts go live
-   No page refresh required; client stays in sync in real time

## 📘 Logging System

-   All important backend events are recorded
-   Logs are written to a file for long-term monitoring and debugging

## 📁 Modular Routes

-   Backend follows a **modular structure** for clean code organization and scalability.

## 🗃️ MongoDB + Mongoose

-   **Mongoose** manages MongoDB collections and schemas
-   Simplifies database operations and validation

## 📋 Route Listing in Dev Mode

-   In **development**, routes are printed in the console using **express-list-routes** to assist with debugging and mapping API endpoints.

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

# Server

-   The Express server listens on a port, and depending on the environment, it will either run in development or production mode, adjusting its behavior accordingly.

---

# Setup

### Ensure you have the following prerequisites installed

-   **Node.js** (v20.18.x or higher): [Download Node.js](https://nodejs.org/)
-   **npm**: Node Package Manager (automatically installed with Node.js)
-   **MongoDB And Create Database**: If using a local database, install [MongoDB Compass](https://www.mongodb.com/try/download/community) And Create Database with the name `fruit-store` (or use MongoDB Atlas On port 8201).

-   **Postman/Insomnia**: For API testing, download
    -   [Postman](https://www.postman.com/downloads/) or [Insomnia](https://insomnia.rest/download).

# Installation

### **Clone the repository**

```bash
https://github.com/Anismhamid/full-stack-web-project.git
```

### **Navigate to the project folder** `full-stack-web-project` if nedded

```bash
cd full-stack-web-project
```

### **Install dependencies from root folder** `full-stack-web-project`

```bash
npm install
```

# Run the application

### **Development mode**

```bash
npm run start:dev
```

### **The application will run in development mode on:**

-   Client : http://localhost:5173

-   Server : http://localhost:8209

---

### **Production mode**

```bash
npm run start:prod
```

### **The application will run in production mode on:**

-   Client : http://localhost:4173

-   Server : http://localhost:8201

---

## File structure

```bash
full-stack-web-project/
├── client/                          # React frontend
│   ├── public/                      # Static assets (e.g., images, fonts)
│   ├── src/                         # Source code
│   │   ├── assets/                  # Images, fonts, etc.
│   │   │   └── fonts/               # Fonts (if any)
│   │   ├── atoms/                   # Atomic (small) reusable components
│   │   │   ├── toasts/              # Toast-related components (e.g., SocketToast, Toast)
│   │   │   │   └── SocketToast.tsx
│   │   │   ├── modals/              # Modal components (e.g., AddProductModal, LoginModal)
│   │   │   │   └── AddProductModal.tsx
│   │   │   ├── loader/              # Loader components (e.g., Spinner, Progress)
│   │   │   │   └── Loader.tsx
│   │   │   ├── userMenu/            # User Menu components
│   │   │   │   └── AccountMenu.tsx
│   │   │   ├── buttons/             # Button components (optional if needed)
│   │   │   ├── NavigationButtons.tsx
│   │   │   └── RemoveFromCart.tsx
│   │   ├── FontAwesome/             # Font Awesome icons setup
│   │   ├── components/              # Main React components (e.g., pages, complex UI elements)
│   │   ├── context/                 # React context providers
│   │   ├── helpers/                 # Utility/helper functions
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── interfaces/              # TypeScript interfaces
│   │   ├── routes/                  # Route definitions
│   │   ├── services/                # API and logic services
│   │   ├── App.tsx                  # Main app component
│   │   ├── index.css                # Global CSS
│   │   ├── main.tsx                 # Entry point
│   │   └── vite-env.d.ts            # Vite environment typing
│   ├── .env                         # Dev environment variables
│   ├── .env.production              # Production environment variables
│   ├── README.md                    # Frontend-specific readme
│   ├── eslint.config.js             # ESLint configuration
│   ├── index.html                   # HTML template
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.app.json            # TypeScript app config
│   ├── tsconfig.json                # Global TypeScript config
│   ├── tsconfig.node.json           # Node-specific TypeScript config
│   └── vite.config.ts               # Vite build configuration
├── server/                         # Express backend
│   ├── access/                      # Authentication/Authorization related code (optional)
│   │   └── .log                     # Access logs (if needed)
│   ├── logs/                        # Application logs
│   │   └── app.log                  # Application runtime logs
│   ├── controllers/                 # Route controllers (e.g., orders)
│   │   ├── orderController.ts       # Example controller
│   ├── middlewares/                 # Auth, logger, etc.
│   │   ├── auth/                    # Auth middleware
│   │   └── logger.ts                # Logger middleware
│   ├── models/                      # Mongoose schemas/models
│   │   ├── Cart.ts                  # Cart model
│   │   ├── Order.ts                 # Order model
│   │   ├── Product.ts               # Product model
│   │   ├── Receipt.ts               # Receipt model
│   │   └── User.ts                  # User model
│   ├── routes/                      # API route definitions
│   │   ├── carts.ts                 # Cart routes
│   │   ├── discountAndOffers.ts     # Discount routes
│   │   ├── orders.ts                # Order routes
│   │   ├── products.ts              # Product routes
│   │   ├── receipt.ts               # Receipt routes
│   │   └── users.ts                 # User routes
│   ├── schema/                      # Validation schemas (e.g., Joi validation)
│   │   ├── orderSchema.ts           # Order validation schema
│   │   └── productSchema.ts         # Product validation schema
│   ├── socket/                      # Socket-related logic
│   │   └── orderSocket.ts           # Order socket logic
│   ├── .env                         # Environment variables for backend
│   ├── .env.production              # Production environment variables
│   ├── package-lock.json
│   ├── package.json
│   └── README.md                    # Backend-specific documentation
├── .gitattributes                   # Git ignore file
├── .gitignore                   # Git ignore file
├── package-lock.json                    # Root-level dependencies (e.g., concurrently for frontend & backend)
├── package.json                    # Root-level dependencies (e.g., concurrently for frontend & backend)
└── README.md                       # Root-level project documentation

```

## 🧩 Components Overview

All category-based components reuse the `ProductCategory` component to dynamically fetch and display items for their respective categories.

---

### 🥭 Fruit

-   Displays fruit products such as apples, bananas, oranges, etc.
-   Uses the reusable `ProductCategory` component for display.

### 🥦 Vegetable

-   Renders vegetable items like cucumbers, tomatoes, carrots, etc.
-   Uses the reusable `ProductCategory` component for display.

### 🐟 Fish

-   Shows a variety of fresh fish available for purchase.
-   Uses the reusable `ProductCategory` component for display.

### 🧀 Dairy

-   Lists dairy products including milk, cheese, yogurt, and more.
-   Uses the reusable `ProductCategory` component for display.

### 🍖 Meat

-   Displays meat products like chicken, beef, and lamb.
-   Uses the reusable `ProductCategory` component for display.

### 🌶️ Spices

-   Contains spice products like turmeric, cumin, pepper, etc.
-   Uses the reusable `ProductCategory` component for display.

### 🍞 Bakery

-   Renders bakery items such as bread, pastries, and cakes.
-   Uses the reusable `ProductCategory` component for display.

### 🧃 Beverages

-   Displays beverage items like juices, soft drinks, and more.
-   Uses the reusable `ProductCategory` component for display.

### 🧊 Frozen

-   Lists frozen food products available in the store.
-   Uses the reusable `ProductCategory` component for display.

### 🍪 Snacks

-   Renders snack products including chips, cookies, and packaged goods.
-   Uses the reusable `ProductCategory` component for display.

### 💸 Discounts and Offers

-   Displays discounted items currently on sale.
-   Shows discount percentage and product details.
-   Uses the reusable `ProductCategory` component for display.

---

### 🛒 Cart

-   Allows users to manage their shopping cart:
    -   Add, update, or remove products
    -   View cart summary
    -   Continue to checkout

### 📦 Checkout

-   Handles the complete checkout flow:
    -   Choose delivery and payment methods
    -   Apply discounts
    -   Calculates total cost including delivery fees and discounts

### 🧾 Receipt

-   Displays a detailed receipt for completed orders.
-   Includes:
    -   Business information
    -   Customer name and order details
    -   Product breakdown (name, quantity, price)
    -   Delivery fees (if applicable)
    -   Discounts applied
    -   Final total amount
-   Provides an option to **download the receipt as a PDF**.

### 📞 Contact

-   Shows company contact details (email, phone, address).
-   Includes a contact form for customer inquiries.

### ℹ️ About

-   Shares details about the company's mission, services, and values.
-   Helps customers understand the brand better.

---

# ⚙️ Frontend Services

All services are responsible for handling data communication with the backend API using `axios`. They manage logic such as sending, receiving, and processing data across features like users, orders, products, and carts.

---

## 🛒 Cart Service

Handles operations related to user carts:

-   `addToCart()` – Add a product to the user's cart
-   `getCartItems()` – Fetch all items currently in the user's cart
-   `DeleteCartItems()` – Remove a specific product from the cart by name

---

## 📦 Orders Service

Responsible for order placement and management:

-   `postOrder()` – Submit a new order
-   `getUserOrders()` – Retrieve all orders placed by a specific user
-   `getAllOrders()` – Fetch all orders (admin access)
-   `getOrderByOrderNumber()` – Get details of a specific order by its number
-   `patchStatus()` – Update the status of an order (e.g., "Processing", "Delivered")

---

## 🧺 Products Service

Handles all product-related operations:

-   `getAllProducts()` – Fetch all available products
-   `getProductsByCategory()` – Get products filtered by category name
-   `getProductByspicificName()` – Get a single product by name
-   `createNewProduct()` – Add a new product (Admin/Moderator only)
-   `updateProduct()` – Update an existing product by name
-   `deleteProduct()` – Remove a product by name (Admin/Moderator only)
-   `getProductsInDiscount()` – Fetch limited discounted products (up to 6)

---

## 👤 Users Service

Handles all user account operations:

-   `registerNewUser()` – Register a new user account
-   `loginUser()` – Log in and receive a JWT token
-   `getAllUsers()` – Admin route to retrieve all users
-   `getUserById()` – Fetch specific user details by ID
-   `patchUserRole()` – Update a user's role (admin/moderator/Client)

---

## 🧾 Receipts Service

Manages order receipt history and data:

-   `getUserReceiptsById()` – Get all receipts associated with a user
-   `getUsersReceipts()` – Admin route to retrieve all receipts across users (Admin/Moderator Only)

### Have questions, ideas, or want to collaborate?

-   Feel free to reach out at: [anesmhamed1@gmail.com](mailto:anesmhamed1@gmail.com)
</main>
