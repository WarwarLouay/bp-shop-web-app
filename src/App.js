/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import "./i18n";
import "./App.css";
import { useCookies } from "react-cookie";
import Request from "./Config/Request";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Favorites from "./Pages/Favorites/Favorites";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import ShippingAddress from "./Pages/ShippingAddress/ShippingAddress";
import Cart from "./Pages/Cart/Cart";
import BottomNavBar from "./Components/BottomNavBar/BottomNavBar";
import Settings from "./Pages/Settings/Settings";
import { useTranslation } from "react-i18next";
import Language from "./Pages/Language/Language";
import Orders from "./Pages/Orders/Orders";
import OrderDetails from "./Pages/OrderDetails/OrderDetails";

function App() {
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir();

  const request = new Request();
  const user = localStorage.getItem("uid");
  const [cookie, removeCookie] = useCookies([]);

  const [openCategory, setOpenCategory] = React.useState(false);
  const [cartLength, setCartLength] = React.useState("");
  const [favorites, setFavorites] = React.useState([]);
  const [isIn, setIsIn] = React.useState(false);

  const toggleCategory = () => {
    setOpenCategory(!openCategory);
  };

  const getCartLength = async () => {
    const data = { user };
    const cart = await request.getCart(data);
    setCartLength(cart.data);
  };

  const getFavorites = async () => {
    const data = { user };
    const favorite = await request.getFavorite(data);
    setFavorites(favorite.data);
  };

  const onLogin = () => {
    setIsIn(true);
  };

  const onLogout = () => {
    setIsIn(false);
  };

  React.useEffect(() => {
    const verifyUser = async () => {
      if (!cookie.jwt) {
      } else {
        const { data } = await axios.post(
          "http://localhost:4000/api/user/auth",
          {},
          { withCredentials: true }
        );
        if (!data.status) {
          setIsIn(false);
        } else {
          setIsIn(true);
        }
      }
    };
    console.log(isIn);

    verifyUser();
    getCartLength();
    getFavorites();
  }, [cookie, removeCookie, user]);

  return (
    <BrowserRouter>
      <div className="topNav">
        <NavBar
          toggleCategory={toggleCategory}
          openCategory={openCategory}
          cartLength={cartLength}
          favorites={favorites}
          isIn={isIn}
          onLogout={onLogout}
        />
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <Home
              cartLength={cartLength}
              isIn={isIn}
              openCategory={openCategory}
              getCartLength={getCartLength}
              getFavorites={getFavorites}
            />
          }
        />
        <Route
          path="/authentication/login"
          element={<Login onLogin={onLogin} />}
        />
        <Route path="/authentication/register" element={<Register />} />
        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              isIn={isIn}
              getFavorites={getFavorites}
              getCartLength={getCartLength}
            />
          }
        />
        <Route path="/shipping/address" element={<ShippingAddress />} />
        <Route
          path="/cart"
          element={<Cart getCartLength={getCartLength} isIn={isIn} />}
        />
        <Route
          path="/settings"
          element={<Settings isIn={isIn} onLogout={onLogout} />}
        />
        <Route path="/language" element={<Language />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order/:id" element={<OrderDetails />} />
      </Routes>
      <div className="ftr">
        <Footer />
      </div>
      <div className="bottomNav">
        <BottomNavBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
