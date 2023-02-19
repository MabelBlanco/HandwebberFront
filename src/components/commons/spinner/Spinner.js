import classNames from "classnames";
import "./spinner.scss";
const Spinner = ({ className, ...props }) => {
  return (
    <div className={classNames("", className)}>
      <div className="spinner-grow" role="status" {...props}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
export default Spinner;
