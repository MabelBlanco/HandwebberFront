import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./loginPage.css";
import { loginUser } from "../service";
import Input from "../../commons/forms/input/Input";
import Button from "../../commons/button/Button";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

export function LoginPage() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogin, isLogged } = useAuth();
  const { t, i18n } = useTranslation();

  const submitEvent = async (event) => {
    event.preventDefault();

    try {
      const token = await loginUser({
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

  if (isLogged) {
    return (
      <p>
        {t(`Sorry, you are loggin now. If you want singin with another count, close
        this session first.`)}
      </p>
    );
  } else {
    return (
      <form id="login" onSubmit={submitEvent}>
        <div className="emailContainer">
          <Input
            value={emailValue}
            type="text"
            label={t("Email") + ":"}
            name="loginEmail"
            id="loginEmail"
            onChange={(event) => setEmailValue(event.target.value)}
          />
        </div>
        <div className="passwordContainer">
          <Input
            value={passwordValue}
            type="password"
            label={t("Password") + ":"}
            name="loginPassword"
            id="loginPassword"
            onChange={(event) => setPasswordValue(event.target.value)}
          />
        </div>
        <Button type="submit" form="login" className="loginButton">
          {t("Login")}
        </Button>
        <div>{errors.length ? errors.map((error) => <p>{error}</p>) : ""}</div>
      </form>
    );
  }
}
