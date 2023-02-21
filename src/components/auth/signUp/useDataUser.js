import { useState, useEffect } from 'react';
import decodeToken from '../../../utils/decodeToken';
import storage from '../../../utils/storage';
import { getUserById } from '../service';
import { getUserAdvertisements } from '../../advertisements/service';

const useDataUser = ({ initialState, ...props }) => {
  const [user, setUser] = useState(initialState);
  const [isFetching, setIsFetching] = useState(false);

  const { userId } = decodeToken(storage.get('auth')) || {};

  useEffect(() => {
    const execute = async () => {
      setIsFetching(true);
      try {
        const userData = await getUserById(userId);
        const result = userData.result;
        const ads = await getUserAdvertisements(userId);
        result.ads = ads.result;
        setUser(result);
      } catch (error) {
        console.log(error);
      }
      setIsFetching(false);
    };
    execute();
  }, [userId]);

  return { user, isFetching, ...props };
};

export default useDataUser;
