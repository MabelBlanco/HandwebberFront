import { Link } from "react-router-dom";
import Button from "../../commons/button/Button";
import "../../commons/card/card.scss";
import NoImage from "../../commons/noImage/NoImage";
import { useAuth } from "../../context/AuthContext";
import "./profile.scss";
import useDataUser from "./useDataUser";

const initialState = {
  username: "",
  image: "",
};

const Profile = ({ className, title, ...props }) => {
  const { user } = useDataUser({ initialState });
  const { isLogged, handleLogOut } = useAuth();

  return (
    <div className="profile-top fixed-top">
      {isLogged && (
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
              Hello <span> {user?.username} </span>
            </h5>
          </div>
          <div className="profile-top_actions">
            <Button as={Link} to="/profile" className="btn-link">
              Profile
            </Button>
            <Button
              as={Link}
              type="button"
              className="btn-primary"
              onClick={handleLogOut}
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
