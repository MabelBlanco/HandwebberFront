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
const initialState = {
  username: '',
  _id: null,
};

const useDataAdvert = () => {
  const [currentAdvert, setCurrentAdvert] = useState({});
  const { isLogged, user } = useAuth();
  //TODO
  console.log('user', user, 'islogged:', isLogged);
  //const { user } = useDataUser({ initialState });
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

    console.log(
      '¿he filtrado?',
      adsList,
      advertFiltered,
      advertFiltered.length
    );

    const execute = async () => {
      try {
        const userLoggedId = user._id;
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
        //TODO
        //        console.log('advert:', advert);
        const idUser = advert.idUser._id;
        const tags = advert.tags;

        //        const userData = await getUserById(idUser);

        const advertObj = {
          ...advert,
          //          username: userData.result.username,
          tags: tags,
          //          userLoggedId: isLogged && userLoggedId,
          userLoggedId: user._id,
          //          favorites: 50,
        };
        setCurrentAdvert(advertObj);
        localStorage.setItem('current', JSON.stringify(advertObj));
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
    isLogged,
    adsList,
    dispatch,
  ]);

  return { ...currentAdvert };
};

export default useDataAdvert;
