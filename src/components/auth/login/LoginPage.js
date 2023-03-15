import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchLoggedAction,
  useIsLoggedSelector,
} from "../../../store/authSlice";
import {
  errorUi,
  resetErrorUi,
  useUiErrorSelector,
} from "../../../store/uiSlice";
import Button from "../../commons/button/Button";
import { Error } from "../../commons/error/Error";
import Input from "../../commons/forms/input/Input";
import Modal from "../../commons/modal/Modal";
import { loginUser, updatePassword } from "../service";
import styles from "../signUp/SignUp.module.css";
import "./loginPage.scss";

export function LoginPage() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  //const [errors, setErrors] = useState([]);

  const error = useUiErrorSelector();

  const [unknowPassword, setUnknowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { isLogged } = useIsLoggedSelector();
  const handleLogin = () => {
    dispatch(fetchLoggedAction());
  };

  const { t } = useTranslation();

  const loginMessageError = t(
    "LoginPage.Sorry, you are loggin now. If you want singin with another count, close this session first."
  );
  /* const loginMessageError =
    'Sorry, you are loggin now. If you want singin with another count, close this session first.';
 */
  const submitEvent = async (event) => {
    event.preventDefault();

    try {
      await loginUser({
        mail: emailValue,
        password: passwordValue,
      });

      handleLogin();
      const to = location.state?.from?.pathname || "/";
      navigate(to);
    } catch (err) {
      const errors = [];
      if (Array.isArray(err.message)) {
        err.message.map((e) => errors.push(e.msg));
      } else {
        errors.push(err.message);
      }
      dispatch(errorUi(errors));
      console.log(errors);

      //setErrors(errors);
    }
  };

  // Ask a new password with this email
  const sendEmailPassword = async () => {
    try {
      await updatePassword(emailValue);

      setUnknowPassword(false);
      //setErrors([]);
      dispatch(resetErrorUi());

      const to = "/login";
      navigate(to);
    } catch (err) {
      const errors = [];
      if (Array.isArray(err.message)) {
        err.message.map((e) => errors.push(e.msg));
      } else {
        errors.push(err.message);
      }
      //setErrors(errors);
      dispatch(errorUi(errors));
    }
  };
  const recoverPassword = () => {
    setUnknowPassword(true);
  };

  if (isLogged) {
    return <p className="h5">{loginMessageError}</p>;
  } else {
    return (
      <div className="login-container">
        <form id="login" onSubmit={submitEvent} className="row">
          <div className="col-12 title">
            <h2 className="text-center">{t("LoginPage.Login")}</h2>
          </div>
          <div className="emailContainer col-sm-12 col-md-8">
            <Input
              value={emailValue}
              type="text"
              label={t("LoginPage.Email") + ":"}
              name="loginEmail"
              id="loginEmail"
              inputGroup
              className="input-group no-border"
              onChange={(event) => setEmailValue(event.target.value)}
            >
              <i className="bi bi-person-fill"></i>
            </Input>
          </div>
          {!unknowPassword ? (
            <div className="passwordContainer col-sm-12 col-md-8 ">
              <Input
                value={passwordValue}
                type="password"
                label={t("LoginPage.Password") + ":"}
                name="loginPassword"
                id="loginPassword"
                inputGroup
                className="input-group no-border"
                onChange={(event) => setPasswordValue(event.target.value)}
              >
                <i className="bi bi-lock-fill"></i>
              </Input>
            </div>
          ) : (
            ""
          )}
          {!unknowPassword ? (
            <Button
              type="submit"
              form="login"
              className="loginButton btn btn-secondary"
              classNameContainer="d-flex justify-content-center"
            >
              {t("LoginPage.Login")}
            </Button>
          ) : (
            <Modal
              modalTitle={t("LoginPage.Confirm password change")}
              doTask={sendEmailPassword}
              hasConfirm
              classNameContainer="d-flex justify-content-center"
              classNameBtn="m-2 btn-secondary "
              classNameBtnClose="btn-secondary"
              classNameBtnConfirm="btn-primary"
              classNameContent="body"
              label_confirm="OK"
              label_cancel={t("LoginPage.Better not")}
              label_btn={t("LoginPage.Send Password")}
              modalId="SendPassword"
            >
              {t(
                "LoginPage.If you press OK, we will send you a new password to your email and you will not be able to access with the current one. Do you agree?"
              )}
            </Modal>
          )}

          <Error className={styles.signup__error} arrayErrors={error} />
        </form>
        {!unknowPassword ? (
          <div className="recoverPassword">
            <p>{t("LoginPage.Don't remember your password?")}</p>
            <Link onClick={recoverPassword} className="btn-primary-link">
              {t("LoginPage.Send me a new password")}
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
