import classNames from "classnames";
import Button from "../button/Button";
import "./accordion.scss";

const Accordion = ({ ...props }) => {
  const {
    title,
    children,
    classHeader,
    classBody,
    classButton,
    itemTarget,
    itemId,
    iconType,
    icon,
  } = props;
  //const [currentValue, setNewValue] = useState([]);
  //useEffect(() => {
  //setNewValue(currentValue);
  //.then((currentValue) => setNewValue(currentValue));
  //}, []);
  return (
    <div className="accordion-item">
      <div className={classNames("accordion-header", classHeader)} id={itemId}>
        <Button
          className={classNames("accordion-button", classButton)}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${itemTarget}`}
          aria-expanded="true"
          aria-controls={itemTarget}
        >
          {icon && <i className={classNames("bi m-1", iconType)}> </i>}
          {title}
        </Button>
      </div>
      <div
        id={itemTarget}
        className={classNames("accordion-collapse collapse", classBody)}
        aria-labelledby={itemId}
      >
        <div className="accordion-body">{children}</div>
      </div>
    </div>
  );
};
export default Accordion;
