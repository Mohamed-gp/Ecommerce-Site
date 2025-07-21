# SwiftBuy E-commerce MERN Website

Welcome to SwiftBuy, an e-commerce website built using the MERN stack. This project aims to provide a seamless shopping experience for users, with a wide range of products and intuitive navigation.

## 🌐 Live Demo

- **Frontend**: https://swiftbuy.production-server.tech
- **Backend API**: https://swiftbuy1.production-server.tech/api
- **Health Check**: https://swiftbuy1.production-server.tech/health

## Features

- **User authentication:** Sign up, log in, and manage your account securely.
- **Product catalog:** Browse through a diverse range of products, organized into categories for easy navigation.
- **Product search:** Find specific products using keywords or filters.
- **Shopping cart:** Add products to your cart, update quantities, and proceed to checkout.
- **Payment integration:** Securely process payments using popular payment gateways.
- **Order tracking:** Monitor the status of your orders and receive updates.
- **User reviews and ratings:** Share your feedback and read reviews from other customers.
- **Admin dashboard:** Manage products, orders, and user accounts efficiently.
- **Demo admin restrictions:** Special demo admin account with limited permissions for demonstration purposes.

## 🚀 Deployment

For production deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Start (Development)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/swiftbuy.git
   cd swiftbuy
   ```

2. **Backend Setup:**

   ```bash
   cd back-end
   npm install
   cp .env.example .env
   # Fill in your environment variables
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd front-end
   npm install
   cp .env.example .env
   # Fill in your environment variables
   npm run dev
   ```

## Technologies Used

- **MongoDB:** Database for storing product and user information.
- **Express.js:** Backend framework for handling server-side logic and API endpoints.
- **React:** Frontend library for building the user interface.
- **Node.js:** JavaScript runtime environment for executing server-side code.
- **TypeScript:** Type-safe JavaScript for better development experience.
- **Redux Toolkit:** State management library for managing application state.
- **Tailwind CSS:** Utility-first CSS framework for responsive and modern UI design.
- **Vite:** Fast build tool and development server.
- **Cloudinary:** Image hosting and management.
- **Stripe:** Payment processing.
- **Firebase:** Authentication and additional services.

## 📁 Project Structure

```
SwiftBuy/
├── back-end/          # Express.js backend API
│   ├── controllers/   # Route controllers
│   ├── models/        # MongoDB models
│   ├── routes/        # API routes
│   ├── middlewares/   # Custom middlewares
│   └── utils/         # Utility functions
├── front-end/         # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── redux/       # State management
│   │   └── utils/       # Utility functions
│   └── public/        # Static assets
└── DEPLOYMENT.md      # Production deployment guide
```

## 🔐 Demo Accounts

**Admin User (Demo - Limited Permissions):**

- Email: admin@admin.com
- Password: admin@admin.com

**Regular User:**

- Email: user@demo.com
- Password: user@demo.com

> **Note:** The demo admin account has restricted permissions and cannot perform destructive operations like deleting products or modifying critical settings.

## 🤝 Contributing

We welcome contributions from the open-source community. If you would like to contribute to SwiftBuy, please follow our [contribution guidelines](CONTRIBUTING.md).

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 📞 Support

If you encounter any issues or have any questions, please reach out to me on LinkedIn or open an issue on GitHub.

## 📊 Features Overview

### For Customers:

- Browse products with advanced filtering and search
- Add items to cart and wishlist
- Secure checkout with Stripe integration
- Order tracking and history
- Product reviews and ratings
- User profile management

### For Admins:

- Product management (CRUD operations)
- Category management
- Order management and status updates
- User management
- Analytics dashboard
- Coupon and discount management

### For Demo Admin:

- View-only access to most admin features
- Cannot perform destructive operations
- Ideal for showcasing admin capabilities safely
