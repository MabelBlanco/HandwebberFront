import classNames from "classnames";
import "./pagination.scss";

const Pagination = ({
  clasName,
  handleFirst,
  handlePrevious,
  handleNext,
  handleLast,
  ...props
}) => {
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
              <i class="bi bi-arrow-bar-right"></i> First
            </span>
          </li>
          <li className="page-item">
            <span className="page-link" onClick={handlePrevious}>
              <i class="bi bi-arrow-left"></i> Previous
            </span>
          </li>
          <li className="page-item">
            <span className="page-link" onClick={handleNext}>
              Next <i class="bi bi-arrow-right"></i>
            </span>
          </li>
          <li className="page-item">
            <span className="page-link" onClick={handleLast}>
              Last <i class="bi bi-arrow-bar-left"></i>
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Pagination;
