import { useEffect, useState } from "react";
import Card from "../commons/card/Card";
import { getAdvertisements } from "./service";

export const useAdvertisement = () => {
  const [adsList, setAdsList] = useState([]);

  useEffect(() => {
    const execute = async () => {
      try {
        const ads = await getAdvertisements();
        setAdsList(ads.result);
      } catch (error) {
        console.log("tenemos un error");
        console.log(error);
      }
    };
    execute();
  }, []);
  return adsList;
};

const AdsList = ({ ...props }) => {
  const advertisements = useAdvertisement();
  return (
    <div className="row" {...props}>
      {advertisements.map((element) => {
        const newProps = { ...props, ...element };
        return (
          <Card
            className="col-sm-12 col-lg-3 m-2"
            key={element._id}
            {...newProps}
            link_1={`/advertisements/${element._id}`}
            label_link_1="See more"
          />
        );
      })}
    </div>
  );
};

export default AdsList;
