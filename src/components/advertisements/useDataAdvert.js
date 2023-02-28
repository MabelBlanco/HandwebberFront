import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../auth/service";
import useDataUser from "../auth/signUp/useDataUser";
import { getAdvertisementDetail } from "./service";

const initialState = {
  username: "",
  _id: null,
};

const useDataAdvert = () => {
  const [currentAdvert, setCurrentAdvert] = useState({});
  const { user } = useDataUser({ initialState });

  const advertId = useParams().id;
  const navigate = useNavigate();

  const advertisementCall = advertId.split("-", 1)[0];

  useEffect(() => {
    const execute = async () => {
      try {
        const advert = await getAdvertisementDetail(advertisementCall);
        const userData = await getUserById(advert.result.idUser);
        let tags = advert.result.tags[0].split(",");
        const advertObj = {
          ...advert.result,
          username: userData.result.username,
          tags: tags,
          userLoggedId: user._id,
          favorites: 50,
        };
        setCurrentAdvert(advertObj);
      } catch (error) {
        if (error.status === 401) {
          navigate("/login");
        }
        if (error.status === 422) {
          navigate("/404", { state: { message: error.statusText } });
        }
        navigate("/404", { state: { message: error.statusText } });
      }
    };
    execute();
  }, [advertId, navigate, user._id, advertisementCall]);

  return { ...currentAdvert };
};

export default useDataAdvert;
