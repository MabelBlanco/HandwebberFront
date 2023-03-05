import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from './components/context/AuthContext';

export const Root = ({ haveInitialToken, store, router }) => {
  return (
    <Provider store={store}>
      <AuthContextProvider haveInitialToken={haveInitialToken}>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </Provider>
  );
};
