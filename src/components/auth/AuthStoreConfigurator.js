import { Fragment } from 'react';

import { useDispatchLoggedAction } from '../../store/authSlice';

export const AuthStoreConfigurator = ({ children }) => {
  useDispatchLoggedAction();
  return <Fragment>{children}</Fragment>;
};
