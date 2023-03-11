import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { AuthStoreConfigurator } from './components/auth/AuthStoreConfigurator';
import { AuthContextProvider } from './components/context/AuthContext';

export const Root = ({ haveInitialToken, store, router }) => {
  return (
    <Provider store={store}>
      <AuthStoreConfigurator>
        <AuthContextProvider haveInitialToken={haveInitialToken}>
          <RouterProvider router={router} />
        </AuthContextProvider>
      </AuthStoreConfigurator>
    </Provider>
  );
};
