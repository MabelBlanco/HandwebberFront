import { createContext, useContext } from 'react';
import useDataUser from '../auth/signUp/useDataUser';

const AuthContext = createContext();

export const AuthContextConsumer = AuthContext.Consumer;

AuthContext.displayName = 'Auth Context';

export function AuthContextProvider({ children }) {
  const { user, isFetching, setUser, errorDataUser, setErrorDataUser } =
    useDataUser({});

  return (
    <AuthContext.Provider
      value={{
        user,
        isFetching,
        setUser,
        errorDataUser,
        setErrorDataUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
