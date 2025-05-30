# SwiftBuy E-commerce Deployment Guide

## 🚀 Production Deployment Configuration

### Backend Deployment (https://swiftbuy1.production-server.tech)

#### 1. Environment Setup

- Copy `.env.production` to `.env` and fill in your actual values:
  ```bash
  cp .env.production .env
  ```

#### 2. Required Environment Variables

```bash
NODE_ENV=production
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
CORS_ORIGIN=https://swiftbuy.production-server.tech
DEMO_ADMIN_ID=66f16f6ae8f6650bf25c28d3
```

#### 3. Build and Deploy

```bash
cd back-end
npm install
npm run build
npm start
```

#### 4. Health Check

- Endpoint: `https://swiftbuy1.production-server.tech/health`
- Should return server status and uptime

---

### Frontend Deployment (https://swiftbuy.production-server.tech)

#### 1. Environment Setup

- Copy `.env.production` to `.env` and fill in your actual values:
  ```bash
  cp .env.production .env
  ```

#### 2. Required Environment Variables

```bash
VITE_ENV=production
VITE_API_URL=https://swiftbuy1.production-server.tech/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

#### 3. Build and Deploy

```bash
cd front-end
npm install
npm run build:production
```

#### 4. Deploy Built Files

- Upload the contents of `front-end/dist/` to your web server
- Configure your web server to serve the `index.html` for all routes (SPA routing)

---

## 🔒 Demo Admin Features

### Demo Admin Restrictions Implemented:

- **Product Management**: Demo admin cannot create, edit, or delete products
- **Category Management**: Cannot create or delete categories
- **User Management**: Cannot modify user roles or delete users
- **Admin Management**: Cannot add or remove admin users
- **Comments**: Cannot delete comments
- **Orders**: Cannot modify order status

### Demo Admin UI Features:

- Warning banner on admin pages
- Disabled buttons with "(Demo)" labels
- Informative alerts when attempting restricted actions
- Clear messaging about demo limitations

---

## 🌐 Production URLs

- **Frontend**: https://swiftbuy.production-server.tech
- **Backend API**: https://swiftbuy1.production-server.tech/api
- **Health Check**: https://swiftbuy1.production-server.tech/health

---

## 🔧 Server Configuration

### Nginx Configuration (if using Nginx)

```nginx
# Frontend (swiftbuy.production-server.tech)
server {
    listen 80;
    server_name swiftbuy.production-server.tech;
    root /path/to/frontend/dist;
    index index.html;

    # Handle SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}

# Backend (swiftbuy1.production-server.tech)
server {
    listen 80;
    server_name swiftbuy1.production-server.tech;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## ✅ Pre-Deployment Checklist

### Backend:

- [ ] Environment variables configured
- [ ] MongoDB connection string updated
- [ ] Cloudinary credentials set
- [ ] Stripe keys configured
- [ ] JWT secret set
- [ ] CORS origins configured
- [ ] Build completed successfully
- [ ] Health endpoint responding

### Frontend:

- [ ] Environment variables configured
- [ ] API URL pointing to production backend
- [ ] Firebase configuration updated
- [ ] Stripe publishable key set
- [ ] Build completed successfully
- [ ] Static files uploaded to server

### Demo Admin:

- [ ] Demo admin middleware working
- [ ] UI restrictions in place
- [ ] Warning messages displayed
- [ ] Critical operations blocked

---

## 🚨 Important Notes

1. **Demo Admin ID**: The demo admin user ID `66f16f6ae8f6650bf25c28d3` is hardcoded for restrictions
2. **CORS**: Backend is configured to accept requests from the production frontend URL
3. **Environment**: Make sure `NODE_ENV=production` for backend and `VITE_ENV=production` for frontend
4. **SSL**: Consider setting up SSL certificates for HTTPS (recommended for production)
5. **Database**: Ensure MongoDB is accessible from your production server
6. **File Uploads**: Cloudinary is configured for image uploads

---

## 🔍 Troubleshooting

### Common Issues:

1. **CORS Errors**: Check that frontend URL is in backend's allowed origins
2. **API Connection**: Verify backend URL in frontend environment variables
3. **Build Errors**: Ensure all dependencies are installed
4. **Demo Admin**: Verify user ID matches in both frontend and backend
5. **Environment Variables**: Double-check all required variables are set

### Health Checks:

- Backend: `curl https://swiftbuy1.production-server.tech/health`
- Frontend: Check browser console for errors
- Demo Admin: Test with demo admin account for restrictions

---

## 📋 Deployment Steps Summary

1. **Prepare Environment Files**

   - Backend: Configure `.env` with production values
   - Frontend: Configure `.env` with production API URL

2. **Build Applications**

   - Backend: `npm run build`
   - Frontend: `npm run build:production`

3. **Deploy to Servers**

   - Backend: Upload and run on `swiftbuy1.production-server.tech`
   - Frontend: Upload dist files to `swiftbuy.production-server.tech`

4. **Verify Deployment**

   - Test health endpoint
   - Verify frontend loads correctly
   - Test demo admin restrictions

5. **Monitor and Maintain**
   - Set up logging and monitoring
   - Regular security updates
   - Database backups
