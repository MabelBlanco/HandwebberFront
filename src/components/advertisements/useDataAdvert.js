import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAdvertisementDetail } from "./service";

const useDataAdvert = () => {
  const [currentAdvert, setCurrentAdvert] = useState({});
  const { isLogged, user } = useAuth();
  const advertId = useParams().id;
  const navigate = useNavigate();

  const advertisementCall = advertId.split("-", 1)[0];
  console.log(advertisementCall);
  useEffect(() => {
    const execute = async () => {
      try {
        const advert = await getAdvertisementDetail(advertisementCall);
        const userLoggedId = user._id;
        let tags = advert.result.tags[0].split(",");
        const advertObj = {
          ...advert.result,
          tags: tags,
          userLoggedId: isLogged && userLoggedId,
        };
        setCurrentAdvert(advertObj);
        localStorage.setItem("current", JSON.stringify(advertObj));
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
  }, [advertId, navigate, advertisementCall, user, isLogged]);

  return { ...currentAdvert };
};

export default useDataAdvert;
