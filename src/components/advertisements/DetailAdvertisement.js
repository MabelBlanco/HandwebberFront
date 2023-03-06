import { useEffect, useState } from 'react';
import { useNavigate /*, useParams*/ } from 'react-router-dom';
// import { getUserById } from "../auth/service";
// import useDataUser from "../auth/signUp/useDataUser";
import Alert from '../commons/feedbacks/alert/Alert';
import AdsDetailPage from './AdsDetailPage/AdsDetailPage';
import './advertisements.scss';
import { deleteAdvertisement } from './service';
import useDataAdvert from './useDataAdvert';

const DetailAdvertisement = ({ isLoading, className, ...props }) => {
  const [isDelete, setIsDelete] = useState(false);
  const navigate = useNavigate();
  const advert = useDataAdvert();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const execute = async () => {};
      execute();
    }

    return () => {
      isMounted = false;
    };
  }, [advert]);

  const onEdit = async () => {
    try {
      navigate(`/advertisements/edit/${advert._id}-${advert.name}`);
      // await deleteAdvertisement(id).then(navigate("/advertisements"));
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
            fnedit={onEdit}></AdsDetailPage>
        )}
        {isDelete && (
          <Alert
            className='alert-success'
            alertTask={handleClickAlert}>
            Borrado correctamente
          </Alert>
        )}
      </div>
    </div>
  );
};

export default DetailAdvertisement;
