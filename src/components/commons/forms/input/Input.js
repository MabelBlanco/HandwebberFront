import classNames from "classnames";
import "./Input.scss";

const Input = ({ className, label, ...props }) => {
  return (
    <div className={classNames("", className)}>
      <label>{label}</label>
      <input {...props} />
    </div>
  );
};

export default Input;