import classNames from "classnames";

import "./select.scss";
const InputSelect = ({ className, label, optionarray, ...props }) => {
  return (
    <div className={classNames("", className)}>
      <label>{label}</label>
      <select className="selectpicker" {...props}>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
        <option value="4">Four</option>
      </select>
    </div>
  );
};

export default InputSelect;
