import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from '../context/AuthContext';

export const Root = ({ haveInitialToken, store, children }) => {
  return (
    <Provider store={store}>
      <Router>
        <AuthContextProvider haveInitialToken={haveInitialToken}>
          {children}
        </AuthContextProvider>
      </Router>
    </Provider>
  );
};
