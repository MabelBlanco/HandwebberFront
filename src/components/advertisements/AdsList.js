import { useEffect, useState } from 'react';
import { getAdvertisements } from './service';

const useAdvertisement = () => {
  const [adsList, setAdsList] = useState([]);

  useEffect(() => {
    const execute = async () => {
      try {
        const ads = await getAdvertisements();
        setAdsList(ads.result);
      } catch (error) {}
    };
    execute();
  }, []);
  return adsList;
};

const AdsList = ({ ...props }) => {
  const advertisements = useAdvertisement();
  return (
    <div {...props}>
      {advertisements.map((element) => (
        <h2 key={element._id}>{element.name}</h2>
      ))}
    </div>
  );
};

export default AdsList;
