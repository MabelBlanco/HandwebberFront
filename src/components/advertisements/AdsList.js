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
    <div
      className='row'
      {...props}
    >
      {advertisements.map((element) => {
        const newProps = { ...props, ...element };
        return (
          <Card
            key={element._id}
            className='col-md-3'
            {...newProps}
          />
        );
      })}
    </div>
  );
};

export default AdsList;
