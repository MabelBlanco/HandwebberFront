import classNames from "classnames";
import "./range.scss";

const Range = ({ className, label, id, ...props }) => {
  return (
    <div className={classNames("", className)}>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input type="range" className="form-range" id={id} {...props}></input>
    </div>
  );
};

export default Range;
