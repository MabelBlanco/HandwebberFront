import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import ConfirmButton from "../commons/alerts/confirmButton";
import Button from "../commons/button/Button";
import Card from "../commons/card/Card";
import "./advertisements.scss";
import { getAdvertisementDetail } from "./service";
import { useTranslation } from "react-i18next";

const DetailAdvertisement = ({
  // confirm,
  isLoading,
  className,
  link_1,
  link_2,
  image,
  name,
  price,
  tags,
  stock,
  idUser,
  custom,
  active,
  description,
  date,
  ...props
}) => {
  const [advert, setAdvert] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onDelete = async () => {
    try {
      // await deleteAdvertisement(id).then(navigate("/advertisements"));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const execute = async () => {
        try {
          const advert = await getAdvertisementDetail(id);
          setAdvert(advert.result);
        } catch (error) {
          if (error.statusCode === 401) {
            navigate("/login");
          }
          if (error.statusCode === 404) {
            navigate("/404", { state: { message: error.statusCode } });
          }
          navigate("/404", { state: { message: error } });
        }
      };
      execute();
    }
    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  return (
    <div className="row">
      <h1 className="col-sm-12 py-5">{props.title}</h1>
      <div className="container advert-content-detail">
        <Card
          {...advert}
          label_button_2={t("DetailAdvertisement.Delete")}
          label_button_1={t("DetailAdvertisement.Edit")}
        />
        {/* <ConfirmButton
          confirmation="Are you sure?"
          doTask={onDelete}
          disabled={isLoading}
          message="¿Estas seguro de eliminar?"
        >
          Delete
        </ConfirmButton> */}
        <Button onClick={onDelete}>{t("DetailAdvertisement.Delete")}</Button>
      </div>
    </div>
  );
};
export default DetailAdvertisement;
