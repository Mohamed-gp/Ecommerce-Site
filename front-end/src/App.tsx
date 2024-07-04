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

function App() {
  const { user } = useSelector((state: IRootState) => state.auth);
  console.log(user)
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route
          path={"/register"}
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/product/:id" element={<ProductInfo />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
