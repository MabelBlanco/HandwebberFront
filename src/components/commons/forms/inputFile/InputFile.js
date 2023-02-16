import classNames from "classnames";
import "./inputFile.scss";

const InputFile = ({ className, label, id, ...props }) => {
  return (
    <div className={classNames("", className)}>
      <label>{label}</label>
      <div className="input-group">
        <input type="file" className="form-control" id={id} {...props} />
      </div>
    </div>
  );
};

export default InputFile;

