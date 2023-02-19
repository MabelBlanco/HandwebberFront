import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AdsList from "./components/advertisements/AdsList";
import DetailAdvertisement from "./components/advertisements/DetailAdvertisement";
import NewAdvertisement from "./components/advertisements/NewAdvertisement";
import SignUp from "./components/auth/signUp/SignUp";
import NotFoundPage from "./components/feedbacks/NotFound/NotFoundPage";
import Layout from "./components/Layout/Layout";
import LayoutTest from "./components/Layout/LayoutTest";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/advertisements" element={<Layout />}>
          <Route path="" element={<AdsList />} index />
          <Route
            path=":id"
            element={<DetailAdvertisement title="Advertisement Detail" />}
          />
          <Route
            path="new"
            element={<NewAdvertisement title="New Advertisement" />}
          />
        </Route>

        <Route path="/" element={<Navigate to="/advertisements" />} />
        <Route path="/404" element={<Layout />}>
          <Route path="" element={<NotFoundPage title="Sign Up" />} index />
        </Route>
        <Route path="/*" element={<Navigate to="/404" />} />
        <Route path="/test" element={<LayoutTest />} />
        <Route path="/signup" element={<Layout />}>
          <Route path="" element={<SignUp title="Sign Up" />} index />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
