import classNames from "classnames";
import "./textarea.scss";
const Textarea = ({
  className,
  classNameInput,
  id,
  label,
  children,
  ...props
}) => {
  //const [currentValue, setNewValue] = useState([]);
  //useEffect(() => {
  //setNewValue(currentValue);
  //.then((currentValue) => setNewValue(currentValue));
  //}, []);
  return (
    <div className={classNames("", className)}>
      <label htmlFor={id}>{label}</label>
      <textarea id={id} {...props}>
        {children}
      </textarea>
    </div>
  );
};
export default Textarea;
