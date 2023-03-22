import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { socket } from ".";
import "./App.css";
import AdsList from "./components/advertisements/AdsList";
import DetailAdvertisement from "./components/advertisements/DetailAdvertisement";
import EditAveritisement from "./components/advertisements/EditAdvertisement";
import NewAdvertisement from "./components/advertisements/NewAdvertisement";
import UserAdsList from "./components/advertisements/UserAdsList";
import { LoginPage } from "./components/auth/login/LoginPage";
import RequireAuth from "./components/auth/RequireAuth";
import ProfilePage from "./components/auth/signUp/ProfilePage";
import SignUp from "./components/auth/signUp/SignUp";
import { Chat } from "./components/Chat/chat/Chat.js";
import NotFoundPage from "./components/commons/feedbacks/NotFound/NotFoundPage";
import { Notification } from "./components/commons/notification/Notification";
import Layout from "./components/Layout/Layout";
import { useIsLoggedSelector } from "./store/authSlice";
import { useState } from "react";
import { Notification } from "./components/commons/notification/Notification";
import ConnectedRequireAuth from "./components/auth/RequireAuth";

function App() {
  const { user } = useIsLoggedSelector();

  const [notification, setNotification] = useState();

  const resetNotifications = () => {
    setNotification("");
  };

  useEffect(() => {
    const priceDropNotification = (data) => {
      const { advert, newPrice } = data;
      const userNotification = data.user;

      if (userNotification === user._id) {
        setNotification(
          `El anuncio ${advert.name}, ha bajado de ${advert.price}€ a ${newPrice}€`
        );
      }
    };

    const outOfStockNotification = (data) => {
      const advert = data.advert;
      const userNotification = data.user;

      if (userNotification === user._id) {
        setNotification(`El anuncio ${advert.name}, se ha quedado sin stock.`);
      }
    };

    const backInStockNotification = (data) => {
      const advert = data.advert;
      const userNotification = data.user;

      if (userNotification === user._id) {
        setNotification(`¡El anuncio ${advert.name}, vuelve a tener stock!`);
      }
    };

    const turnNoActiveNotification = (data) => {
      const advert = data.advert;
      const userNotification = data.user;

      if (userNotification === user._id) {
        setNotification(`El anuncio ${advert.name}, que marcaste como favorito, ha sido desactivado. 
        Te avisaremos si el propietario lo activa de nuevo`);
      }
    };

    const turnActiveNotification = (data) => {
      const advert = data.advert;
      const userNotification = data.user;

      if (userNotification === user._id) {
        setNotification(
          `¡El anuncio ${advert.name}, que marcaste como favorito, vuelve a estar activo!`
        );
      }
    };
    socket.on("Subscription_price_drop", priceDropNotification);
    socket.on("Subscription_out_of_stock", outOfStockNotification);
    socket.on("Subscription_back_in_stock", backInStockNotification);
    socket.on("Subscription_turn_no_active", turnNoActiveNotification);
    socket.on("Subscription_turn_active", turnActiveNotification);

    return () => {
      socket.off("Subscription_price_drop", priceDropNotification);
      socket.off("Subscription_out_of_stock", outOfStockNotification);
      socket.off("Subscription_back_in_stock", backInStockNotification);
      socket.off("Subscription_turn_no_active", turnNoActiveNotification);
      socket.off("Subscription_turn_active", turnActiveNotification);
    };
  });
  return (
    <div className="App">
      {notification && (
        <Notification onClose={resetNotifications}>{notification}</Notification>
      )}

      <Routes>
        <Route path="/login" element={<Layout title="Login" />}>
          <Route path="" element={<LoginPage />} />
        </Route>

        <Route path="/signup" element={<Layout title="Sign Up" />}>
          <Route path="" element={<SignUp />} />
        </Route>

        <Route path="/profile" element={<Layout title="Profile" />}>
          <Route
            index
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
          <Route path="user/:username" element={<UserAdsList />} />
        </Route>

        <Route path="/chat" element={<Layout title="Chat" />}>
          <Route
            path=""
            element={
              <ConnectedRequireAuth>
                <Chat />
              </ConnectedRequireAuth>
            }
          />
        </Route>
        <Route path="/" element={<Navigate to="/advertisements" />} />

        <Route
          path="/advertisements"
          element={<Layout title="Advertisments" />}
        >
          <Route index element={<AdsList title="Advertisement List" />} />
          <Route
            path=":id"
            element={<DetailAdvertisement title="Advertisement Detail" />}
          />
          <Route
            path="edit/:id"
            element={
              <RequireAuth>
                <EditAveritisement title="Editing Avertisement" />
              </RequireAuth>
            }
          />
          <Route
            path="new"
            element={
              <RequireAuth>
                <NewAdvertisement title="New Advertisement" />
              </RequireAuth>
            }
          />
        </Route>

        <Route path="/404" element={<Layout title="NOT FOUND" />}>
          <Route path="" element={<NotFoundPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
