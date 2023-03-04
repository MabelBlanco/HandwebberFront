import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./loginPage.css";
import { loginUser, updatePassword } from "../service";
import Input from "../../commons/forms/input/Input";
import Button from "../../commons/button/Button";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { Error } from "../../commons/error/Error";

export function LoginPage() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errors, setErrors] = useState([]);
  const [unknowPassword, setUnknowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogin, isLogged } = useAuth();
  const { t } = useTranslation();

  const loginMessageError = t(
    "LoginPage.Sorry, you are loggin now. If you want singin with another count, close this session first."
  );

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
    } catch (error) {
      const errors = [];
      if (Array.isArray(error.message)) {
        error.message.map((e) => errors.push(e.msg));
      } else {
        errors.push(error.message);
      }
      setErrors(errors);
    }
  };

  // Ask a new password with this email
  const submitRecoverEvent = async (event) => {
    event.preventDefault();

    try {
      await updatePassword(emailValue);

      const to = "/login";
      navigate(to);

      window.alert(t("LoginPage.A new password has been sent to your email"));
    } catch (error) {
      const errors = [];
      if (Array.isArray(error.message)) {
        error.message.map((e) => errors.push(e.msg));
      } else {
        errors.push(error.message);
      }
      setErrors(errors);
    }
  };
  const recoverPassword = () => {
    setUnknowPassword(true);
  };

  if (isLogged) {
    return <Error arrayErrors={[loginMessageError]} />;
  } else {
    return (
      <>
        <form
          id="login"
          onSubmit={!unknowPassword ? submitEvent : submitRecoverEvent}
        >
          <div className="emailContainer">
            <Input
              value={emailValue}
              type="text"
              label={t("LoginPage.Email") + ":"}
              name="loginEmail"
              id="loginEmail"
              onChange={(event) => setEmailValue(event.target.value)}
            />
          </div>
          {!unknowPassword ? (
            <div className="passwordContainer">
              <Input
                value={passwordValue}
                type="password"
                label={t("LoginPage.Password") + ":"}
                name="loginPassword"
                id="loginPassword"
                onChange={(event) => setPasswordValue(event.target.value)}
              />
            </div>
          ) : (
            ""
          )}
          <Button type="submit" form="login" className="loginButton">
            {!unknowPassword
              ? t("LoginPage.Login")
              : t("LoginPage.Send Password")}
          </Button>
          <Error arrayErrors={errors} />
        </form>
        {
          //TODO translation
        }
        {!unknowPassword ? (
          <>
            <p>{t("LoginPage.Don't remember your password?")}</p>
            <Link onClick={recoverPassword}>
              {t("LoginPage.Send me a new password")}
            </Link>
          </>
        ) : (
          ""
        )}
      </>
    );
  }
}
