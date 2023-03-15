import classNames from "classnames";
import Button from "../button/Button";
import "./modal.scss";

const Modal = ({
  modalId,
  classNameBtn,
  label_btn,
  classNameContent,
  classNameBtnClose,
  classNameBtnConfirm,
  label_confirm,
  label_cancel,
  children,
  hasConfirm,
  selfOpen,
  modalTitle,
  doTask,
  classNameContainer,
  ...props
}) => {
  const handleConfirm = (e) => {
    e.preventDefault();
    doTask();
  };
  return (
    <div className={classNameContainer}>
      <Button
        type="button"
        className={classNames(`btn btn-primary `, classNameBtn)}
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
      >
        {label_btn}
      </Button>

      <div
        className={classNames(
          `modal fade`,
          classNameContent,
          `${selfOpen && "self-open"}`
        )}
        id={modalId}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby={`#${modalId}Label`}
        aria-hidden="true"
        {...props}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`#${modalId}Label`}>
                {modalTitle}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <Button
                type="button"
                className={classNames("btn btn-primary", classNameBtnClose)}
                data-bs-dismiss="modal"
              >
                {label_cancel}
              </Button>
              {hasConfirm && (
                <Button
                  type="button"
                  className={classNames("btn btn-primary", classNameBtnConfirm)}
                  data-bs-dismiss="modal"
                  onClick={handleConfirm}
                >
                  {label_confirm}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
