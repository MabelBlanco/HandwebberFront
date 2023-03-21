import { Navigate, useLocation } from 'react-router-dom';
import { useIsLoggedSelector } from '../../store/authSlice';

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
  const { isLogged } = useIsLoggedSelector();
  return (
    <RequireAuth
      {...props}
      isLogged={isLogged}
    />
  );
};

export default ConnectedRequireAuth;
