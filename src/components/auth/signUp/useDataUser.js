import { useState, useEffect } from 'react';
import { getUserAdvertisements } from '../../advertisements/service';
import { useIsLoggedSelector } from '../../../store/authSlice';

const useDataUser = ({ initialState, ...props }) => {
  const [user, setUser] = useState(initialState);
  const [isFetching, setIsFetching] = useState(false);
  const [errorDataUser, setErrorDataUser] = useState(null);

  const { user: userData } = useIsLoggedSelector();
  const { _id: userId } = userData;

  const resetErrorDataUser = () => setErrorDataUser(null);

  useEffect(() => {
    const execute = async () => {
      resetErrorDataUser();
      setIsFetching(true);
      try {
        const ads = await getUserAdvertisements(userId);
        const result = {
          ...userData,
          ads: ads.result,
        };
        result.ads = ads.result;

        setUser(result);
      } catch (error) {
        setErrorDataUser(error);
      }
      setIsFetching(false);
    };
    execute();
  }, [userId, userData]);

  return {
    user,
    isFetching,
    setUser,
    errorDataUser,
    setErrorDataUser,
    ...props,
  };
};

export default useDataUser;
