import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getAdById, loadOneAdByIdAction } from '../../store/adsListSlice';
import { useIsLoggedSelector } from '../../store/authSlice';
import Alert from '../commons/feedbacks/alert/Alert';
import AdsDetailPage from './AdsDetailPage/AdsDetailPage';
import './advertisements.scss';
import { deleteAdvertisement } from './service';

const DetailAdvertisement = ({ isLoading, className, ...props }) => {
  const [isDelete, setIsDelete] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useIsLoggedSelector();
  const userLoggedId = user._id;

  const advertId = useParams().id.split('-', 1)[0];
  const advert = useSelector(getAdById(advertId));
  useRef(advert);
  useEffect(() => {
    dispatch(loadOneAdByIdAction(advertId));
    //   const execute = async () => {
    //     if (advert) {
    //       //TODO
    //       //console.log('el anuncio ya está cargado');
    //       return;
    //     }

    //     try {
    //       //setUiIsFetching();
    //       //dispatch(request);
    //       const advertisement = await getAdvertisementDetail(advertId);
    //       dispatch(loadOneAd(advertisement.result));
    //       //setUiSuccess();
    //       //dispatch(success);
    //     } catch (error) {
    //       //dispatch(errorUi(error.message));
    //     }
    //   };
    //   execute();
    // }, [dispatch, advertId]);
  }, [dispatch, advertId]);

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
    navigate(`/chat?ad_id=${advertId}&user_id=${advert.idUser._id}`);
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
            advert={advert}
            userLoggedId={userLoggedId}
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

  // return (
  //   <div className='row'>
  //     <h1 className='col-sm-12 py-5'>{props.title}</h1>
  //     <div className='container advert-content-detail'>
  //       {advert?._id && !isDelete && (
  //         <AdsDetailPage
  //           {...advert}
  //           fncontact={onContact}
  //           fndelete={onDelete}
  //           fnedit={onEdit}
  //         ></AdsDetailPage>
  //       )}
  //       {!advert && !isDelete && (
  //         <AdsDetailPage
  //           {...temp}
  //           fncontact={onContact}
  //           fndelete={onDelete}
  //           fnedit={onEdit}
  //         ></AdsDetailPage>
  //       )}
  //       {!advert && !isDelete && (
  //         <AdsDetailPage
  //           {...temp}
  //           fncontact={onContact}
  //           fndelete={onDelete}
  //           fnedit={onEdit}
  //         ></AdsDetailPage>
  //       )}
  //       {isDelete && (
  //         <Alert
  //           className='alert-success'
  //           alertTask={handleClickAlert}
  //         >
  //           Borrado correctamente
  //         </Alert>
  //       )}
  //     </div>
  //   </div>
  // );
};

export default DetailAdvertisement;
