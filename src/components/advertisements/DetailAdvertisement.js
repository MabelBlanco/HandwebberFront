import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../auth/service";
import useDataUser from "../auth/signUp/useDataUser";
import Alert from "../commons/feedbacks/alert/Alert";
import AdsDetailPage from "./AdsDetailPage/AdsDetailPage";
import "./advertisements.scss";
import { deleteAdvertisement, getAdvertisementDetail } from "./service";

const initialState = {
  username: "",
  _id: null,
};
const DetailAdvertisement = ({ isLoading, className, ...props }) => {
  const [currentAdvert, setCurrentAdvert] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useDataUser({ initialState });

  const onEdit = async () => {
    try {
      console.log("delete");
      // await deleteAdvertisement(id).then(navigate("/advertisements"));
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async () => {
    try {
      await deleteAdvertisement(id);
      setIsDelete(true);
    } catch (error) {
      console.log(error);
    }
  };
  const onContact = async () => {
    console.log("contact");
  };
  const handleClickAlert = (e) => {
    e.preventDefault();
    navigate("/advertisements");
  };

  const advertisementCall = id.split("-", 1)[0];
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const execute = async () => {
        try {
          const advert = await getAdvertisementDetail(advertisementCall);
          const userData = await getUserById(advert.result.idUser);
          let tags = advert.result.tags[0].split(",");
          const advertObj = {
            ...advert.result,
            username: userData.result.username,
            tags: tags,
            userLoggedId: user._id,
            favorites: 50,
          };
          setCurrentAdvert(advertObj);
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
    }
    return () => {
      isMounted = false;
    };
  }, [navigate, user._id, advertisementCall]);

  return (
    <div className="row">
      <h1 className="col-sm-12 py-5">{props.title}</h1>
      <div className="container advert-content-detail">
        {currentAdvert && !isDelete && (
          <AdsDetailPage
            {...currentAdvert}
            fncontact={onContact}
            fndelete={onDelete}
            fnedit={onEdit}
          ></AdsDetailPage>
        )}
        {isDelete && (
          <Alert className="alert-success" alertTask={handleClickAlert}>
            Borrado correctamente
          </Alert>
        )}
      </div>
    </div>
  );
};

export default DetailAdvertisement;
