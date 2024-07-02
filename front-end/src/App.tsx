import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/product/:id" element={<ProductInfo />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
