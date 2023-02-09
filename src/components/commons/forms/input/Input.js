import classNames from "classnames";
import "./Input.css";

const Input = ({ className, label, ...props }) => {
  return (
    <div className={classNames("form-control", className)}>
      <label>{label}</label>
      <input {...props} />
    </div>
  );
};

export default Input;
