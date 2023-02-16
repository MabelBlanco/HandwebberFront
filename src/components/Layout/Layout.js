import Footer from './footer/Footer';
import Header from './header/Header';
import './Layout.scss';

const Layout = ({ title, children, ...props }) => {
  return (
    <div {...props}>
      <Header />
      <main className='container py-5'>
        <h1 style={{ minHeight: 'calc(100vh - 442px)' }}>{title}</h1>
        {children}
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
