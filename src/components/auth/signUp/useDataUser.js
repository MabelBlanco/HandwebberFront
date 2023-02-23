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

  const { userId } = decodeToken(storage.get('auth')) || {};

  const userSearchId = useParams().id;

  useEffect(() => {
    const execute = async () => {
      setIsFetching(true);
      try {
        const userData = await getUserById(userId);
        const result = userData.result;
        const ads = await getUserAdvertisements(userId);
        result.ads = ads.result;
        setUser(result);
        if (userSearchId) {
          console.log(userSearchId)
          const userSearchData = await getUserById(userSearchId);
          const resultSearch = userSearchData.result;
          const userSearchAds = await getUserAdvertisements(userSearchId);
          resultSearch.ads = userSearchAds.result;
          setUserSearch(resultSearch)
        }
      } catch (error) {
        console.log(error);
      }
      setIsFetching(false);
    };
    execute();
  }, [userId, userSearchId]);

  return { user, isFetching, setUser, userSearch, setUserSearch, ...props };
};

export default useDataUser;
