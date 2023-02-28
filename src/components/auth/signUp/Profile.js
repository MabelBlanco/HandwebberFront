import { Link } from "react-router-dom";
import Button from "../../commons/button/Button";
import "../../commons/card/card.scss";
import NoImage from "../../commons/noImage/NoImage";
import { useAuth } from "../../context/AuthContext";
import "./profile.scss";
import { useTranslation } from "react-i18next";

const Profile = ({ className, title, ...props }) => {

  const { isLogged, handleLogOut, user } = useAuth();
  const { t } = useTranslation();

  return (
    <>
      {isLogged && (
        <div className="profile-top fixed-top">
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
              <h5 className="profile-top_username">
                {t("Profile.Hello")}
                <span> {user?.username} </span>
              </h5>
            </div>
            <div className="profile-top_actions">
              <Button as={Link} to="/profile" className="btn-link">
                {t("Profile.Profile")}
              </Button>
              <Button
                as={Link}
                type="button"
                className="btn-primary"
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
