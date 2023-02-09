import Footer from "./footer/Footer";
import Header from "./header/Header";

const Layout = ({ ...props }) => {
  return (
    <div {...props}>
      <Header />
      <main>
        <h1 style={{ minHeight: "calc(100vh - 442px)" }}>MAIN</h1>
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
