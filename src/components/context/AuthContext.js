import { createContext, useContext, useState } from "react";
import storage from "../../utils/storage";
import useDataUser from "../auth/signUp/useDataUser";

const AuthContext = createContext();

export const AuthContextConsumer = AuthContext.Consumer;

AuthContext.displayName = "Auth Context";

export function AuthContextProvider({ children, haveInitialToken }) {
  const [isLogged, setIsLogged] = useState(haveInitialToken);

  const { user, isFetching, setUser, errorDataUser, setErrorDataUser } = useDataUser({})

  const handleLogin = () => setIsLogged(true);
  const handleLogOut = () => {
    setIsLogged(false);
    storage.remove('auth');
  }
  return (
    <AuthContext.Provider
      value={{ isLogged: isLogged, handleLogin, handleLogOut, user, isFetching, setUser, errorDataUser, setErrorDataUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
