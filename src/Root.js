import { Provider } from 'react-redux';
import { BrowserRouter as Router, RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from './components/context/AuthContext';

/* <Router>
      <AuthContextProvider haveInitialToken={haveInitialToken}>
        <Provider store={store}>{children}</Provider>
      </AuthContextProvider>
    </Router> */

export const Root = ({ haveInitialToken, store, router }) => {
  return (
    <Provider store={store}>
      <AuthContextProvider haveInitialToken={haveInitialToken}>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </Provider>
  );
};
