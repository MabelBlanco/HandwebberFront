import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../commons/feedbacks/alert/Alert';
import AdsDetailPage from './AdsDetailPage/AdsDetailPage';
import './advertisements.scss';
import { deleteAdvertisement } from './service';
import useDataAdvert from './useDataAdvert';

const DetailAdvertisement = ({ isLoading, className, ...props }) => {
  const [isDelete, setIsDelete] = useState(false);
  const navigate = useNavigate();
  const advert = useDataAdvert();

  const setCurrentData = () => {
    const tempAdvert = localStorage.getItem('current');
    return tempAdvert;
  };
  const temp = setCurrentData();
  const onEdit = async () => {
    try {
      navigate(`/advertisements/edit/${advert._id}-${advert.name}`);
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async () => {
    try {
      await deleteAdvertisement(advert._id);
      setIsDelete(true);
    } catch (error) {
      console.log('err', error);
    }
  };
  const onContact = async () => {
    console.log('contact');
  };
  const handleClickAlert = (e) => {
    e.preventDefault();
    navigate('/advertisements');
  };

  return (
    <div className='row'>
      <h1 className='col-sm-12 py-5'>{props.title}</h1>
      <div className='container advert-content-detail'>
        {advert?._id && !isDelete && (
          <AdsDetailPage
            {...advert}
            fncontact={onContact}
            fndelete={onDelete}
            fnedit={onEdit}
          ></AdsDetailPage>
        )}
        {!advert && !isDelete && (
          <AdsDetailPage
            {...temp}
            fncontact={onContact}
            fndelete={onDelete}
            fnedit={onEdit}
          ></AdsDetailPage>
        )}
        {!advert && !isDelete && (
          <AdsDetailPage
            {...temp}
            fncontact={onContact}
            fndelete={onDelete}
            fnedit={onEdit}
          ></AdsDetailPage>
        )}
        {isDelete && (
          <Alert
            className='alert-success'
            alertTask={handleClickAlert}
          >
            Borrado correctamente
          </Alert>
        )}
      </div>
    </div>
  );
};

export default DetailAdvertisement;
