import classNames from "classnames";
import "./Input.scss";

const Input = ({
  className,
  label,
  inputGroup,
  children,
  classNameInput,
  ...props
}) => {
  return (
    <div className={classNames("", className)}>
      {inputGroup && <span className="input-group-text">{children}</span>}
      {!inputGroup && <label>{label}</label>}
      <input {...props} className={classNameInput} />
    </div>
  );
};

export default Input;
