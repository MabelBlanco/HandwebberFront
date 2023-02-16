import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route
          path='/advertisements'
          element={<Layout />}
        />
        <Route
          path='/'
          element={<Navigate to='/advertisements' />}
        />
      </Routes>
    </div>
  );
}

export default App;
