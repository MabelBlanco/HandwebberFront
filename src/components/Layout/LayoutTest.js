import ComponentsList from '../commons/ComponentsList';
import Footer from './footer/Footer';
import Header from './header/Header';
import './Layout.scss';

const LayoutTest = ({ ...props }) => {
  return (
    <div {...props}>
      <Header />
      <main className='container py-5'>
        <ComponentsList />
      </main>
      <Footer />
    </div>
  );
};
export default LayoutTest;
