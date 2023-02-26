import { useEffect } from "react";
import useDataAdvert from "./useDataAdvert";

const EditAdvertisement = () => {
  const advert = useDataAdvert();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const execute = async () => {
        console.log(advert);
      };
      execute();
    }

    return () => {
      isMounted = false;
    };
  }, [advert]);

  return <div>{JSON.stringify(advert)}</div>;
};
export default EditAdvertisement;
