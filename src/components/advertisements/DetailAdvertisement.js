import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  editAdAction,
  getAdById,
  loadOneAdByIdAction,
} from "../../store/adsListSlice";
import { useIsLoggedSelector } from "../../store/authSlice";
import { updateUser } from "../auth/service";
import Alert from "../commons/feedbacks/alert/Alert";
import Favorites from "../favorites/Favorites";
import AdsDetailPage from "./AdsDetailPage/AdsDetailPage";
import "./advertisements.scss";
import { deleteAdvertisement, updateAdsSubscriptions } from "./service";

const DetailAdvertisement = ({ isLoading, className, ...props }) => {
  const [isDelete, setIsDelete] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [adsSubscriptions, setAdsSubscriptions] = useState([]);
  // const [userSubscriptions, setUserSubscriptions] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useIsLoggedSelector();
  const userLoggedId = user._id;
  const advertId = useParams().id.split("-", 1)[0];
  const advert = useSelector(getAdById(advertId));

  const setFavorite = () => {
    sendDataAdsSubscriptions();
    sendDataUserSubscriptions();
  };

  const addSusbscriptor = (propertyArray, id) => {
    let newSubcriptions = [...propertyArray];
    const noExists = !newSubcriptions.find((s) => s === id);
    console.log("antes", newSubcriptions, id);
    if (noExists) {
      newSubcriptions.push(id);
      // console.log("result of add", id, newSubcriptions);
      setIsFavorite(true);
    } else {
      const resultOfDelete = newSubcriptions.filter((f) => f !== id);
      // console.log("result of delete", id, resultOfDelete);
      setIsFavorite(false);
      newSubcriptions = resultOfDelete;
    }
    console.log("despues", newSubcriptions);
    return newSubcriptions;
  };

  const sendDataAdsSubscriptions = async () => {
    const bodyFormData = new FormData();
    const newSubscriptions = addSusbscriptor(adsSubscriptions, userLoggedId);
    setAdsSubscriptions(newSubscriptions);
    // console.log("advert", adsSubscriptions, userLoggedId);
    Object.keys(advert).forEach(function (key, index) {
      key !== "image" &&
        key !== "idUser" &&
        key !== "subscriptions" &&
        bodyFormData.append(key, advert[key]);
    });
    bodyFormData.append("subscriptions", newSubscriptions);
    bodyFormData.append("idUser", advert.idUser._id);
    if (advert.image) {
      bodyFormData.append("image", advert.image);
    }

    try {
      const response = await updateAdsSubscriptions(advertId, bodyFormData);
      dispatch(editAdAction(response.result));
      console.log("responese advert", response.result.subscriptions);
      const to = `/advertisements/${advert._id}-${advert.name}`;
      navigate(to);
    } catch (error) {
      //TODO
      console.log(error);
    }
  };

  const sendDataUserSubscriptions = async () => {
    const bodyUserData = new FormData();
    bodyUserData.append("subscriptions", advert._id);

    try {
      const response = await updateUser(userLoggedId, bodyUserData);
      dispatch(editAdAction(response.result));
      console.log("responese user", response.result.subscriptions);
      const to = `/advertisements/${advert._id}-${advert.name}`;
      navigate(to);
    } catch (error) {
      //TODO
      console.log(error);
    }
  };
  // eslint-disable-next-line
  const consoleFormData = (bodyData) => {
    for (var pair of bodyData.entries()) {
      console.log("bodyData", pair[0] + ", " + pair[1]);
    }
  };

  useRef(advert);
  useEffect(() => {
    dispatch(loadOneAdByIdAction(advert._id));
    const execute = async () => {
      console.log("ads useefect", advert.subscriptions);
      if (advert && userLoggedId) {
        setAdsSubscriptions(advert.subscriptions);
        setIsFavorite(adsSubscriptions.includes(userLoggedId) ? true : false);
        //TODO
        //console.log('el anuncio ya está cargado');
        // return;
      }
    };
    execute();
  }, [
    dispatch,
    advert,
    advertId,
    userLoggedId,
    isFavorite,
    adsSubscriptions,
    advert.subscriptions,
  ]);

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
      console.log("err", error);
    }
  };
  const onContact = async () => {
    navigate(`/chat?ad_id=${advertId}&user_id=${advert.idUser._id}`);
  };
  const handleClickAlert = (e) => {
    e.preventDefault();
    navigate("/advertisements");
  };

  return (
    <div className="row">
      <h1 className="col-sm-12 py-5">
        {props.title} {isFavorite ? "favorite" : "no"}
      </h1>

      <div className="container advert-content-detail">
        {advert?._id && !isDelete && (
          <AdsDetailPage
            {...advert}
            advert={advert}
            userLoggedId={userLoggedId}
            fncontact={onContact}
            fndelete={onDelete}
            fnedit={onEdit}
          >
            {userLoggedId !== advert.idUser._id && (
              <Favorites
                styleFavoriteBtn={isFavorite ? "active" : ""}
                subscribers={adsSubscriptions}
                addFavorites={setFavorite}
              />
            )}
          </AdsDetailPage>
        )}

        {isDelete && (
          <Alert className="alert-success" alertTask={handleClickAlert}>
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
