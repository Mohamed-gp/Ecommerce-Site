import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import AboutUs from "./pages/aboutus/AboutUs";
import NotFound from "./pages/not-found/NotFound";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import ProductInfo from "./pages/product-info/[id]/ProductInfo";
import { useEffect } from "react";
import { UseSelector, useSelector } from "react-redux";
import { IRootState } from "./redux/store";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductsEdit from "./pages/admin/AdminProductsEdit";
import AdminProductsAdd from "./pages/admin/AdminProductsAdd";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminAdmins from "./pages/admin/AdminAdmins";
import AdminSettings from "./pages/admin/AdminSettings";
import Store from "./pages/store/Store";
import Wishlist from "./pages/wishlist/Wishlist";
import OrderConfirmed from "./pages/order-confirmed/OrderConfirmed";
import AdminCoupons from "./pages/admin/AdminCoupons";

function App() {
  const { user } = useSelector((state: IRootState) => state.auth);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order/success" element={<OrderConfirmed />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route
          path={"/register"}
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/profile"
          element={!user ? <Navigate to="/" /> : <Profile />}
        />
        <Route path="/product/:id" element={<ProductInfo />} />
        <Route path="/admin">
          <Route
            path="dashboard"
            element={
              user?.role == "admin" ? <AdminDashboard /> : <Navigate to={"/"} />
            }
          />
          <Route
            path="products"
            element={
              user?.role == "admin" ? <AdminProducts /> : <Navigate to={"/"} />
            }
          />
          <Route
            path="products/edit/:id"
            element={
              user?.role == "admin" ? (
                <AdminProductsEdit />
              ) : (
                <Navigate to={"/"} />
              )
            }
          />
          <Route
            path="products/add"
            element={
              user?.role == "admin" ? (
                <AdminProductsAdd />
              ) : (
                <Navigate to={"/"} />
              )
            }
          />
          <Route
            path="categories"
            element={
              user?.role == "admin" ? (
                <AdminCategories />
              ) : (
                <Navigate to={"/"} />
              )
            }
          />
          {/* <Route
            path="coupons"
            element={
              user?.role == "admin" ? <AdminCoupons /> : <Navigate to={"/"} />
            }
          /> */}
          {/* <Route
            path="orders"
            element={
              user?.role == "admin" ? <AdminOrders /> : <Navigate to={"/"} />
            }
          /> */}
          <Route
            path="admins"
            element={
              user?.role == "admin" ? <AdminAdmins /> : <Navigate to={"/"} />
            }
          />
          <Route
            path="settings"
            element={
              user?.role == "admin" ? <AdminSettings /> : <Navigate to={"/"} />
            }
          />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
