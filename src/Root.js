import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { AuthStoreConfigurator } from './components/auth/AuthStoreConfigurator';

export const Root = ({ store, router }) => {
  return (
    <Provider store={store}>
      <AuthStoreConfigurator>
        <RouterProvider router={router} />
      </AuthStoreConfigurator>
    </Provider>
  );
};
