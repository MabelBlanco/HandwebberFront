import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById } from '../auth/service';
import useDataUser from '../auth/signUp/useDataUser';
import { getAdvertisementDetail } from './service';
import {
  loadThisAd,
  useAdsListSelector,
  useDispatchAdsList,
} from '../../store/adsListSlice';
const initialState = {
  username: '',
  _id: null,
};

const useDataAdvert = () => {
  const [currentAdvert, setCurrentAdvert] = useState({});
  const { user } = useDataUser({ initialState });

  const advertId = useParams().id;
  const navigate = useNavigate();

  const advertisementCall = advertId.split('-', 1)[0];
  const adsList = useAdsListSelector();
  const dispatch = useDispatchAdsList();

  useEffect(() => {
    const execute = async () => {
      try {
        let advertFiltered = adsList.filter((ad) => {
          return ad._id === advertisementCall;
        });
        if (advertFiltered.length === 0) {
          // advertFiltered = await getAdvertisementDetail(advertisementCall);
          // advertFiltered = [advertFiltered.result];
          const advertGetted = await getAdvertisementDetail(advertisementCall);
          dispatch(loadThisAd(advertGetted));
        }
        const advert = advertFiltered[0];

        const idUser = advert.idUser;
        const tags = advert.tags[0].split(',');
        const userData = await getUserById(idUser);

        const advertObj = {
          ...advert,
          username: userData.result.username,
          tags: tags,
          userLoggedId: user._id,
          favorites: 50,
        };
        setCurrentAdvert(advertObj);
      } catch (error) {
        if (error.status === 401) {
          navigate('/login');
        }
        if (error.status === 422) {
          navigate('/404', { state: { message: error.statusText } });
        }
        navigate('/404', { state: { message: error.statusText } });
      }
    };
    execute();
  }, [adsList, advertisementCall, navigate, user._id, dispatch]);

  return { ...currentAdvert };
};

export default useDataAdvert;
