import classNames from "classnames";
import Button from "../../button/Button";
import "./alert.scss";

const Alert = ({ children, className, alertTask, ...props }) => {
  return (
    <>
      <div className={classNames("alert", className)} role="alert" {...props}>
        {children}
        <Button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={alertTask}
        ></Button>
      </div>
    </>
  );
};
export default Alert;
