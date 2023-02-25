import classNames from "classnames";
import "./noImage.scss";
import { useTranslation } from "react-i18next";
const NoImage = ({ className, ...props }) => {
  const { t } = useTranslation();
  return (
    <div className={classNames("noImage", className)} {...props}>
      {t("NoImage.No image")}
    </div>
  );
};
export default NoImage;
