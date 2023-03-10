import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById } from '../auth/service';
import useDataUser from '../auth/signUp/useDataUser';
import { useAuth } from '../context/AuthContext';
import { getAdvertisementDetail } from './service';
import {
  loadThisAd,
  useAdsListSelector,
  useDispatchAdsList,
} from '../../store/adsListSlice';
import { useIsLoggedSelector } from '../../store/authSlice';
const initialState = {
  username: '',
  _id: null,
};

const useDataAdvert = () => {
  const [currentAdvert, setCurrentAdvert] = useState({});
  const { isLogged, user } = useIsLoggedSelector();
  const advertId = useParams().id;
  const navigate = useNavigate();

  const advertisementCall = advertId.split('-', 1)[0];
  const adsList = useAdsListSelector();
  const dispatch = useDispatchAdsList();

  useEffect(() => {
    const advertsFilter = (ads) => {
      return ads.filter((ad) => {
        return ad._id === advertisementCall;
      });
    };
    let advertFiltered = advertsFilter(adsList);

    //TODO
    console.log(
      '¿he filtrado?',
      adsList,
      advertFiltered,
      advertFiltered.length
    );

    const execute = async () => {
      try {
        if (advertFiltered.length === 0) {
          console.log('estoy añadiendo', advertFiltered.length);
          advertFiltered = await getAdvertisementDetail(advertisementCall);
          dispatch(loadThisAd(advertFiltered));
          advertFiltered = [advertFiltered.result];
          console.log('He añadido:', advertFiltered);
          // const advertGetted = await getAdvertisementDetail(advertisementCall);
          // console.log('advertgetted: ', advertGetted.result);

          // advertFiltered = [advertsFilter(adsList)];
        }

        const advert = advertFiltered[0];

        setCurrentAdvert(advert);
        localStorage.setItem('current', JSON.stringify(advert));
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
  }, [
    advertId,
    navigate,
    user._id,
    advertisementCall,
    user,
    //    isLogged,
    adsList,
    dispatch,
  ]);

  return { ...currentAdvert };
};

export default useDataAdvert;
