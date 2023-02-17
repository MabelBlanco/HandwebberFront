import classNames from "classnames";
import "./checkbox.scss";

const Checkbox = ({ className, label, ...props }) => {
  return (
    <div className={classNames("", className)}>
      <input className="form-check-input" type="checkbox" {...props} />
      <label className="form-check-label">{label}</label>
    </div>
  );
};

export default Checkbox;