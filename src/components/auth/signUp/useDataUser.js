import { useState, useEffect } from 'react';
import decodeToken from '../../../utils/decodeToken';
import storage from '../../../utils/storage';
import { getUserById } from '../service';
import { getUserAdvertisements } from '../../advertisements/service';
import { useParams } from 'react-router-dom';

const useDataUser = ({ initialState, ...props }) => {
  const [user, setUser] = useState(initialState);
  const [userSearch, setUserSearch] = useState(initialState);
  const [isFetching, setIsFetching] = useState(false);
  const [errorDataUser, setErrorDataUser] = useState(null);

  const { userId } = decodeToken(storage.get('auth')) || {};

  const userSearchId = useParams().userId;

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
        if (userSearchId) {
          const userSearchData = await getUserById(userSearchId);
          const resultSearch = userSearchData.result;
          const userSearchAds = await getUserAdvertisements(userSearchId);
          resultSearch.ads = userSearchAds.result;
          setUserSearch(resultSearch)
        }
      } catch (error) {
        console.log(error);
        setErrorDataUser(error);
      }
      setIsFetching(false);
    };
    execute();
  }, [userId, userSearchId]);

  return { user, isFetching, setUser, userSearch, setUserSearch, errorDataUser, setErrorDataUser, ...props };
};

export default useDataUser;
