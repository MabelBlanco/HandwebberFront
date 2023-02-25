import classNames from "classnames";
import "./pagination.scss";
import { useTranslation } from "react-i18next";

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
    <div className={classNames("py-5", clasName)}>
      <nav aria-label="Page navigation example" {...props}>
        <ul className="pagination">
          <li className="page-item">
            <span className="page-link" onClick={handleFirst}>
              <i className="bi bi-arrow-bar-left"></i> First
            </span>
          </li>
          <li className="page-item">
            <span className="page-link" onClick={handlePrevious}>
              <i className="bi bi-arrow-left"></i> {t("Pagination.Previous")}
            </span>
          </li>
          <li className="page-item">
            <span className="page-link" onClick={handleNext}>
              {t("Pagination.Next")} <i className="bi bi-arrow-right"></i>
            </span>
          </li>
          <li className="page-item">
            <span className="page-link" onClick={handleLast}>
              {t("Pagination.Last")} <i className="bi bi-arrow-bar-right"></i>
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Pagination;
