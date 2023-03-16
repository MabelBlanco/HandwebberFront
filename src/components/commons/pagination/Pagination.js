import classNames from "classnames";
import { useTranslation } from "react-i18next";
import "./pagination.scss";

const Pagination = ({
  clasName,
  handleFirst,
  handlePrevious,
  handleNext,
  handleLast,
  ...props
}) => {
  const { t } = useTranslation();
  //const [currentValue, setNewValue] = useState([]);
  //useEffect(() => {
  //setNewValue(currentValue);
  //.then((currentValue) => setNewValue(currentValue));
  //}, []);
  return (
    <div className={classNames("pagination-container py-5", clasName)}>
      <nav aria-label="Page navigation example" {...props}>
        <ul className="pagination">
          <li className="page-item">
            <span className="page-link" onClick={handleFirst}>
              <i className="bi bi-arrow-bar-left"></i>{" "}
              <span className="text">First</span>
            </span>
          </li>
          <li className="page-item">
            <span className="page-link" onClick={handlePrevious}>
              <i className="bi bi-arrow-left"></i>
              <span className="text">{t("Pagination.Previous")}</span>
            </span>
          </li>
          <li className="page-item">
            <span className="page-link" onClick={handleNext}>
              <span className="text">{t("Pagination.Next")}</span>
              <i className="bi bi-arrow-right"></i>
            </span>
          </li>
          <li className="page-item">
            <span className="page-link" onClick={handleLast}>
              <span className="text"> {t("Pagination.Last")} </span>
              <i className="bi bi-arrow-bar-right"></i>
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Pagination;
