import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import "./Layout.scss";

const Layout = ({ title, ...props }) => {
  return (
    <div {...props}>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
