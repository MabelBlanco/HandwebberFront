import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AdsList from "./components/advertisements/AdsList";
import NewAdvertisement from "./components/advertisements/NewAdvertisemente";
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
        <Route
          path="/new-advertisement"
          element={
            <Layout title="Add advertisement">
              <NewAdvertisement />
            </Layout>
          }
        />
        <Route path="/" element={<Navigate to="/advertisements" />} />
        <Route path="/test" element={<LayoutTest />} />
      </Routes>
    </div>
  );
}

export default App;
