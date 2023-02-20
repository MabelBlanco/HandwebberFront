import { useState, useEffect } from "react";
import decodeToken from '../../../utils/decodeToken';
import storage from '../../../utils/storage';
import { useAuth } from '../../context/AuthContext';
import { getUserById } from '../service';
import { getAdvertisements } from "../../advertisements/service";

const useDataUser = ({initialState, ...props}) => {
    const [user, setUser] = useState(initialState);
    const { handleLogOut, isLogged } = useAuth();
  
    const { userId } = decodeToken(storage.get('auth')) || {};

    useEffect(() => {
      const execute = async () => {
        try {
          const userData = await getUserById(userId);
          const result = userData.result;
          const ads = await getAdvertisements();
          result.ads = ads.result.filter(e => e.idUser === userId);
          setUser(result);
        } catch (error) {
          console.log(error);
        }
      };  
      execute();
    }, [userId]);

    return {user, handleLogOut, isLogged, ...props};
};

export default useDataUser;