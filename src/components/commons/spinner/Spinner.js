import classNames from "classnames";
import "./spinner.scss";
const Spinner = ({ className, ...props }) => {
  return (
    <div className={classNames("", className)}>
      <div class="spinner-grow" role="status" {...props}>
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
export default Spinner;
