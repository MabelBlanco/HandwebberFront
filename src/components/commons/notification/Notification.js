import Button from "../button/Button";
import "./notification.scss";

export function Notification({ children, onClose, ...props }) {
  return (
    <div className="notification-container">
      <div className="notification-body">
        <p>NOTIFICATION</p>
        <p {...props}>{children}</p>
        <Button type="button" className="notification-close" onClick={onClose}>
          <i className="bi bi-x-square-fill"></i>
        </Button>
      </div>
    </div>
  );
}
