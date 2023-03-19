import { useEffect, useState } from "react";
import { useIsLoggedSelector } from "../../../store/authSlice";
import { getUserAdvertisements } from "../../advertisements/service";

const useDataUser = ({ initialState, ...props }) => {
  const [adsSubscriptions, setAdsSubscriptions] = useState([]);
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const { user } = useIsLoggedSelector();
  const userLoggedId = user._id;
  const advertId = useParams().id.split("-", 1)[0];
  const advert = useSelector(getAdById(advertId));

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
    advert,
    userSubscriptions,
    adsSubscriptions,
    ...props,
  };
};

export default useDataUser;
