import { useState, useEffect } from "react";
import decodeToken from '../../../utils/decodeToken';
import storage from '../../../utils/storage';
import { getUserById } from '../service';
import { getAdvertisements } from "../../advertisements/service";

const useDataUser = ({initialState, ...props}) => {
    const [user, setUser] = useState(initialState);
    const [isFetching, setIsFetching] = useState(false);
  
    const { userId } = decodeToken(storage.get('auth')) || {};

    useEffect(() => {
      const execute = async () => {
        setIsFetching(true);
        try {
          const userData = await getUserById(userId);
          const result = userData.result;
          const ads = await getAdvertisements();
          result.ads = ads.result.filter(e => e.idUser === userId);
          setUser(result);
        } catch (error) {
          console.log(error);
        }
        setIsFetching(false)
      };  
      execute();
    }, [userId]);

    return {user, isFetching, ...props};
};

export default useDataUser;