import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AdsList from "./components/advertisements/AdsList";
import { LoginPage } from "./components/auth/login/LoginPage";
import SignUp from "./components/auth/signUp/SignUp";
import Layout from "./components/Layout/Layout";
import LayoutTest from "./components/Layout/LayoutTest";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/advertisements"
          element={
            <Layout title="Advertisements List">
              <AdsList />
            </Layout>
          }
        />
        <Route path="/" element={<Navigate to="/advertisements" />} />
        <Route path="/test" element={<LayoutTest />} />
        <Route
          path="/signup"
          element={
            <Layout title="Sign up">
              <SignUp />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout title="Login">
              <LoginPage />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
