import { useEffect, useState } from 'react';
import Card from '../commons/card/Card';
import { getAdvertisements } from './service';

const useAdvertisement = () => {
  const [adsList, setAdsList] = useState([]);

  useEffect(() => {
    const execute = async () => {
      try {
        const ads = await getAdvertisements();
        setAdsList(ads.result);
      } catch (error) {
        console.log('tenemos un error');
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
    <div {...props}>
      {advertisements.map((element) => {
        const newProps = { ...props, ...element };
        return (
          <li
            className='list-group-item'
            key={element._id}
          >
            <Card {...newProps} />
          </li>
        );
      })}
    </div>
  );
};

export default AdsList;
