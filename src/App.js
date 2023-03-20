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
    socket.on("Subscription_price_drop", priceDropNotification);

    return () => {
      socket.off("Subscription_price_drop", priceDropNotification);
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

        <Route path="chat" element={<Layout title="Chat" />}>
          <Route
            index
            element={
              <RequireAuth>
                <Chat />
              </RequireAuth>
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
