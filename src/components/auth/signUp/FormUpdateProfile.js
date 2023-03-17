import { useTranslation } from "react-i18next";
import Button from "../../commons/button/Button";
import Input from "../../commons/forms/input/Input";
import InputFile from "../../commons/forms/inputFile/InputFile";
import styles from "./SignUp.module.css";
import "./signUp.scss";

const FormUpdateProfile = ({
  updateAccount,
  handleCredentials,
  credentials,
  handleConfirmPassword,
  confirmPassword,
  handleImage,
  isFetching,
}) => {
  const { t } = useTranslation();

  return (
    <form className={styles.signup__form} onSubmit={updateAccount}>
      <Input
        type="text"
        name="username"
        label={t("ProfilePage.New username")}
        className={styles.signup__field}
        onChange={handleCredentials}
        value={credentials.username}
      />

      <Input
        type="email"
        name="mail"
        label={t("ProfilePage.New mail")}
        className={styles.signup__field}
        onChange={handleCredentials}
        value={credentials.mail}
      />

      <Input
        type="password"
        name="password"
        label={t("ProfilePage.New password") + " (min 8 characters)"}
        className={styles.signup__field}
        onChange={handleCredentials}
        value={credentials.password}
      />

      <Input
        type="password"
        name="passwordConfirm"
        label={t("ProfilePage.Confirm new password")}
        className={styles.signup__field}
        onChange={handleConfirmPassword}
        value={confirmPassword}
      />

      <InputFile
        name="image"
        id="image"
        label={t("ProfilePage.Upload new picture")}
        className={styles.signup__field}
        onChange={handleImage}
      />

      <Button
        type="submit"
        className={styles.signup__submit}
        disabled={!!isFetching}
      >
        {t("ProfilePage.CLICK FOR UPDATE")}
      </Button>
    </form>
  );
};

export default FormUpdateProfile;
