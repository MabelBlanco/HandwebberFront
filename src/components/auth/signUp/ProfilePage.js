import NoImage from "../../commons/noImage/NoImage";
import "../../commons/card/card.scss";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../commons/button/Button";
import useDataUser from "./useDataUser";
import { deleteUser, updateUser } from "../service";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import styles from "./SignUp.module.css";
import Input from "../../commons/forms/input/Input";
import InputFile from "../../commons/forms/inputFile/InputFile";
import { deleteAdvertisement } from "../../advertisements/service";
import { useTranslation } from "react-i18next";
import { Error } from "../../commons/error/Error";

const initialState = {
  username: "",
  mail: "",
  password: "",
  image: "",
};

const ProfilePage = ({ className, title, ...props }) => {
  const { user, isFetching, setUser } = useDataUser({ initialState });
  const { isLogged, handleLogOut } = useAuth();
  const [credentials, setCredentials] = useState(initialState);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [activeForm, setActiveForm] = useState(false);
  const [activeDeleteUser, setActiveDeleteUser] = useState(false);
  const { t } = useTranslation();

  const handleActiveDeleteUser = () => setActiveDeleteUser(!activeDeleteUser);

  const handleActiveForm = () => setActiveForm(!activeForm);

  const navigate = useNavigate();

  const resetError = () => setError(null);

  const goToMyAds = () => navigate(`/profile/${user._id}`);

  const handleCredentials = (event) => {
    resetError();
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleImage = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.files[0],
    });
  };

  const handleConfirmPassword = (event) => {
    resetError();
    setConfirmPassword(event.target.value);
  };

  const updateAccount = async (event) => {
    event.preventDefault();
    resetError();
    const { image, username, mail, password } = credentials;
    if (password !== confirmPassword) {
      setError(["Passwords don't match"]);
      throw error;
    }

    const formData = new FormData();

    username && formData.append("username", username);
    mail && formData.append("mail", mail);
    password && formData.append("password", password);
    image && formData.append("image", image);

    try {
      const { result } = await updateUser(user._id, formData);
      result.ads = user.ads;
      setUser(result);
      navigate("/");
    } catch (error) {
      const errors = [];
      if (Array.isArray(error.message)) {
        error.message.map((e) => errors.push(e.msg));
      } else {
        errors.push(error.message);
      }
      setError(errors);
    }
    setActiveForm(false);
  };

  const deleteAccount = async () => {
    try {
      const userAds = user.ads;
      for (let ad of userAds) {
        await deleteAdvertisement(ad._id);
      }
      const response = await deleteUser(user._id);
      handleLogOut();
      navigate("/");
      setActiveDeleteUser(false);
      return response;
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    !isLogged && navigate("/");
  }, [isLogged, navigate]);

  return (
    <div className="row">
      {isLogged && (
        <div className="col-sm-12 py-5 my-5 text-center">
          {" "}
          <div className="card-body py-3">
            <h2 className="card-title h1">{user?.username}</h2>
          </div>{" "}
          <div className="header-card">
            {user?.image ? (
              <img
                src={`${process.env.REACT_APP_API_BASE_URL}/${user?.image}`}
                className="rounded-pill w-25 h-25"
                alt="..."
              />
            ) : (
              <NoImage className="card-img-top" />
            )}
          </div>
          <ul className="list-group list-group-flush my-3">
            <li key="mail" className="list-group-item">
              <span>{t("ProfilePage.Mail")}: </span>
              {user?.mail}
            </li>
            <li key="subscriptions" className="list-group-item">
              <span>{t("ProfilePage.Favorites")}: </span>
              <ul>
                {user?.subscriptions &&
                  user.subscriptions.map((e) => (
                    <li key={e}>
                      <Link to={`/advertisements/${e}`}>{e}</Link>
                    </li>
                  ))}
              </ul>
            </li>
            <li key="ads" className="list-group-item">
              <span>{t("ProfilePage.My advertisements")}: </span>
              <Button
                type="button"
                className="btn btn-secondary mx-3 my-3"
                onClick={goToMyAds}
              >
                {t("ProfilePage.GO TO MY ADVERTISEMENTS LIST")}
              </Button>
              <ul>
                {user?.ads &&
                  user.ads.map((e) => (
                    <li key={e._id}>
                      <Link to={`/advertisements/${e._id}`}>{e.name}</Link>
                    </li>
                  ))}
              </ul>
            </li>
          </ul>
          <div className="card-body actions">
            {
              error && (
                <Error className={styles.signup__error} arrayErrors={error} />
              )
              // error.map((e) => (
              //   <p className={styles.signup__error} key={e}>
              //     {" "}
              //     {e}{" "}
              //   </p>
              //))
            }
            <Button
              type="button"
              className="btn btn-secondary mx-3 my-3"
              onClick={handleActiveForm}
            >
              {t("ProfilePage.CLICK FOR UPDATE YOUR PROFILE")}
            </Button>
            {activeForm && (
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
            )}
            <Button
              type="button"
              className="btn btn-secondary mx-3 my-3"
              onClick={handleActiveDeleteUser}
            >
              {t("ProfilePage.DELETE ACCOUNT")}
            </Button>

            {activeDeleteUser && (
              <div>
                <p>{t("ProfilePage.Are you sure for delete account?")}</p>
                <div className="d-flex justify-content-center align-items-center">
                  <Button
                    type="button"
                    className="btn-primary mx-3 col-12"
                    onClick={deleteAccount}
                  >
                    {t("ProfilePage.YES")}
                  </Button>
                  <Button
                    type="button"
                    className="btn-secondary mx-3 col-12"
                    onClick={handleActiveDeleteUser}
                  >
                    {t("ProfilePage.NO")}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
