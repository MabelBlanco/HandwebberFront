import { Fragment } from 'react';
import './App.css';
import AdsList from './components/advertisements/AdsList';
import Layout from './components/Layout/Layout';
import LayoutTest from './components/Layout/LayoutTest';

function App() {
  return (
    <Fragment>
      <div className='App'>
        <LayoutTest />
      </div>

      <div className='App'>
        <Layout title='Advertisements List'>
          <AdsList />
        </Layout>
      </div>
    </Fragment>
  );
}

export default App;
