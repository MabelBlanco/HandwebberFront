import { useState } from "react";
import Input from "../../commons/forms/input/Input";
import InputFile from "../../commons/forms/inputFile/InputFile";
import Button from "../../commons/button/Button";
import CheckBox from "../../commons/forms/checkbox/Checkbox";
import styles from "./SignUp.module.css";
import { createUser, loginUser } from "../service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const initialState = {
  username: "",
  mail: "",
  password: "",
  image: "",
};

const SignUp = ({ className, title, ...props }) => {
  const [credentials, setCredentials] = useState(initialState);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [check, setCheck] = useState(false);
  const [error, setError] = useState(null);

  const { t } = useTranslation();

  const { handleLogin, isLogged } = useAuth();

  const navigate = useNavigate();

  const resetError = () => setError(null);

  const handleCredentials = (event) => {
    resetError();
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleImage = (event) => {
    console.log(event.target.files[0]);
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.files[0],
    });
  };

  const handleConfirmPassword = (event) => {
    resetError();
    setConfirmPassword(event.target.value);
  };

  const handleCheck = () => setCheck(!check);

  const handleSubmit = async (event) => {
    event.preventDefault();
    resetError();
    const { image, username, mail, password } = credentials;
    if (password !== confirmPassword) {
      setError(["Passwords don't match"]);
      throw error;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("mail", mail);
    formData.append("password", password);
    image && formData.append("image", image);
    try {
      const newUser = await createUser(formData);

      await loginUser({ mail, password });
      console.log(newUser);
      handleLogin();
      navigate("/advertisements");
      return newUser;
    } catch (error) {
      const errors = [];
      if (Array.isArray(error.message)) {
        error.message.map((e) => errors.push(e.msg));
      } else {
        errors.push(error.message);
      }
      setError(errors);
    }
  };

  const isEnabledButton = () =>
    credentials.username && credentials.mail && credentials.password && check;

  return (
    <>
      <div className={styles.signup__page}>
        {error &&
          error.map((e) => (
            <p className={styles.signup__error} key={e}>
              {" "}
              {e}{" "}
            </p>
          ))}
        {!isLogged && (
          <form className={styles.signup__form} onSubmit={handleSubmit}>
            <Input
              type="text"
              name="username"
              label={t("SignUp.username")}
              className={styles.signup__field}
              onChange={handleCredentials}
              value={credentials.username}
            />

            <Input
              type="email"
              name="mail"
              label={t("SignUp.mail")}
              className={styles.signup__field}
              onChange={handleCredentials}
              value={credentials.mail}
            />

            <Input
              type="password"
              name="password"
              label={t("SignUp.password") + " (min 8 characters)"}
              className={styles.signup__field}
              onChange={handleCredentials}
              value={credentials.password}
            />

            <Input
              type="password"
              name="passwordConfirm"
              label={t("SignUp.confirm password")}
              className={styles.signup__field}
              onChange={handleConfirmPassword}
              value={confirmPassword}
            />

            <InputFile
              name="image"
              id="image"
              label={t("SignUp.Upload picture")}
              className={styles.signup__field}
              onChange={handleImage}
            />

            <CheckBox
              name="check"
              label={t("SignUp.I accept the conditions")}
              onChange={handleCheck}
              checked={check}
            />
            <Button
              type="submit"
              className={styles.signup__submit}
              disabled={!isEnabledButton()}
            >
              {t("SignUp.SIGNUP")}
            </Button>
          </form>
        )}
        {isLogged && (
          <p>
            {t(
              "SignUp.Sorry, you are already registered. If you want register a new count, close this session first"
            )}
          </p>
        )}
      </div>
    </>
  );
};

export default SignUp;
