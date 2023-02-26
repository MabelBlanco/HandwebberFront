import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../button/Button";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const handleClick = () => {
    navigate("/advertisements");
  };
  return (
    <div className="not-found-page">
      {location.state && <h1>{t(`NotFoundPage.${location.state.message}`)}</h1>}
      {!location.state && <h1>{t("NotFoundPage.NOT FOUND")}</h1>}
      <Button className="btn btn-secondary" onClick={handleClick}>
        {t("NotFoundPage.Close")}
      </Button>
    </div>
  );
};
export default NotFoundPage;
