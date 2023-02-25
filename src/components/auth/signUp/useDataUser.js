import { useState, useEffect } from 'react';
import decodeToken from '../../../utils/decodeToken';
import storage from '../../../utils/storage';
import { getUserById } from '../service';
import { getUserAdvertisements } from '../../advertisements/service';


const useDataUser = ({ initialState, ...props }) => {
  const [user, setUser] = useState(initialState);
  const [isFetching, setIsFetching] = useState(false);
  const [errorDataUser, setErrorDataUser] = useState(null);

  const { userId } = decodeToken(storage.get('auth')) || {};

  const resetErrorDataUser = () => setErrorDataUser(null);

  useEffect(() => {
    const execute = async () => {
      resetErrorDataUser();
      setIsFetching(true);
      try {
        const userData = await getUserById(userId);
        const result = userData.result;
        const ads = await getUserAdvertisements(userId);
        result.ads = ads.result;
        setUser(result);
      } catch (error) {
        setErrorDataUser(error);
      }
      setIsFetching(false);
    };
    execute();
  }, [userId]);

  return { user, isFetching, setUser, errorDataUser, setErrorDataUser, ...props };
};

export default useDataUser;
