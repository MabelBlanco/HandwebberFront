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
import ProfilePage from './components/auth/signUp/ProfilePage';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigate to='/advertisements' />} />
        <Route path='/signup' element={<Layout title='Sign Up' />}>
          <Route path='' element={<SignUp />} />
        </Route>
        <Route path='/login' element={<Layout title='Login' />}>
          <Route path='' element={<LoginPage />} />
        </Route>
        <Route path='/profile' element={<Layout title='Profile' />}>
          <Route path='' element={<ProfilePage title={'hola'} />} />
        </Route>
        <Route path='/404' element={<Layout title='NOT FOUND' />}>
          <Route path='' element={<NotFoundPage />} />
        </Route>
        <Route
          path='/advertisements'
          element={<Layout title={'Advertisments'} />}
        >
          <Route path='' element={<AdsList title='Advertisement List' />} />
          <Route
            path=':id'
            element={<DetailAdvertisement title='Advertisement Detail' />}
          />
          <Route
            path='new'
            element={<NewAdvertisement title='New Advertisement' />}
          />
        </Route>

        <Route path='/*' element={<Navigate to='/404' />} />
        <Route path='/test' element={<LayoutTest />} />
      </Routes>
    </div>
  );
}

export default App;
