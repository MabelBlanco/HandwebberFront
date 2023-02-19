import { useState, useEffect } from "react";
import decodeToken from '../../../utils/decodeToken';
import storage from '../../../utils/storage';
import { useAuth } from '../../context/AuthContext';
import { getUserById } from '../service';

const useDataUser = ({initialState, ...props}) => {
    const [user, setUser] = useState(initialState);
    const { handleLogOut, isLogged } = useAuth();
  
    const { userId } = decodeToken(storage.get('auth')) || {};
  
    console.log(userId);
  
    const getUser = async (userId) => {
      const userData = await getUserById(userId);
      console.log(userData);
      setUser(userData.result);
    };
  
    useEffect(() => {
      if (isLogged) {
        getUser(userId);
      }
    }, [isLogged, userId]);

    return {user, handleLogOut, isLogged, ...props};
};

export default useDataUser;