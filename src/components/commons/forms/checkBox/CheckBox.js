import classNames from "classnames";

const CheckBox = ({ className, label, ...props }) => {
  return (
    <div className={classNames("form-check", className)}>
      <input className="form-check-input" type="checkbox" {...props} />
      <label className="form-check-label">{label}</label>
    </div>
  );
};

export default CheckBox;
