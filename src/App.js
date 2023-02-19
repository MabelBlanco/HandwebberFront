import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AdsList from './components/advertisements/AdsList';
import { LoginPage } from './components/auth/login/LoginPage';
import DetailAdvertisement from './components/advertisements/DetailAdvertisement';
import NewAdvertisement from './components/advertisements/NewAdvertisement';
import SignUp from './components/auth/signUp/SignUp';
import NotFoundPage from './components/feedbacks/NotFound/NotFoundPage';
import Layout from './components/Layout/Layout';
import LayoutTest from './components/Layout/LayoutTest';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={<Navigate to='/advertisements' />}
        />
        <Route
          path='/signup'
          element={<Layout />}
        >
          <Route
            path=''
            element={<SignUp />}
          />
        </Route>
        <Route
          path='/login'
          element={<Layout />}
        >
          <Route
            path=''
            element={<LoginPage />}
          />
        </Route>
        <Route
          path='/404'
          element={
            <Layout>
              <NotFoundPage />
            </Layout>
          }
        />
        <Route
          path='/advertisements'
          element={<Layout />}
        >
          <Route
            path=''
            element={<AdsList />}
            index
          />
          <Route
            path='id'
            element={<DetailAdvertisement title='Advertisement Detail' />}
          />
          <Route
            path='new'
            element={<NewAdvertisement title='New Advertisement' />}
          />
        </Route>

        <Route
          path='/*'
          element={<Navigate to='/404' />}
        />
        <Route
          path='/test'
          element={<LayoutTest />}
        />
      </Routes>
    </div>
  );
}

export default App;
