import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import "./Layout.scss";
import Profile from "../auth/signUp/Profile";

const Layout = ({ title, ...props }) => {
  return (
    <div {...props}>
      <Header />    
      <main className="container py-5">
      <Profile title={title}/>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
