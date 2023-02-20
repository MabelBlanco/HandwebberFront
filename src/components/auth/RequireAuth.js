import { Navigate, useLocation } from 'react-router-dom';
import { AuthContextConsumer } from '../context/AuthContext';

const RequireAuth = ({ isLogged, children }) => {
  const location = useLocation();
  if (!isLogged) {
    return (
      <Navigate
        to='/login'
        state={{ from: location }}
      />
    );
  }
  return children;
};

const ConnectedRequireAuth = (props) => {
  return (
    <AuthContextConsumer>
      {(value) => (
        <RequireAuth
          {...props}
          isLogged={value.isLogged}
        />
      )}
    </AuthContextConsumer>
  );
};

export default ConnectedRequireAuth;
