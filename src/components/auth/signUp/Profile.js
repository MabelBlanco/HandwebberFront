import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  dispatchLogoutAction,
  useIsLoggedSelector,
} from "../../../store/authSlice";
import Button from "../../commons/button/Button";
import "../../commons/card/card.scss";
import NoImage from "../../commons/noImage/NoImage";
import "./profile.scss";

const Profile = ({ className, title, ...props }) => {
  const { isLogged, user } = useIsLoggedSelector();
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(dispatchLogoutAction());
  };

  const { t } = useTranslation();

  return (
    <>
      {isLogged && (
        <div className="profile-top">
          <div className="container">
            <div className="profile-top_text_container">
              <div className={"profile-top_avatar"}>
                {user?.image ? (
                  <img
                    style={{ height: "auto", width: "100px" }}
                    src={`${process.env.REACT_APP_API_BASE_URL}/${user?.image}`}
                    alt="..."
                  />
                ) : (
                  <NoImage className="profile-top_noImage" />
                )}
              </div>
              <div className="profile-top_username">
                {t("Profile.Hello")}
                <span> {user?.username} </span>
              </div>
            </div>
            <div className="profile-top_actions">
              <Button as={Link} to="/profile" className="btn-link">
                {t("Profile.Profile")}
              </Button>
              <Button
                as={Link}
                type="button"
                className="btn btn-secondary"
                onClick={handleLogOut}
              >
                {t("Profile.Logout")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
