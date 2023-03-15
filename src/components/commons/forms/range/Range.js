import classNames from "classnames";
import "./range.scss";

const Range = ({ className, label, id, children, ...props }) => {
  return (
    <div className={classNames("", className)}>
      <div className="range-input">
        <div className="range-number">
          <label htmlFor={id} className="form-label">
            {label}
          </label>
          <input type="number" {...props} />
        </div>
        <div className="range-slice">
          <datalist id={`list-${id}`}>{children}</datalist>
          <input
            type="range"
            className="form-range"
            id={id}
            list={`list-${id}`}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

export default Range;
