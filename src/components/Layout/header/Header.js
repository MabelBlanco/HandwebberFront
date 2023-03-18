import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import { useIsLoggedSelector } from "../../../store/authSlice";
import Profile from "../../auth/signUp/Profile";
import Button from "../../commons/button/Button";
import "./Header.scss";

const Header = () => {
  const { isLogged } = useIsLoggedSelector();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const handleLinkClick = () => {
    setIsOpen(false);
  };
  const handleButtonClick = () => {
    isOpen === true ? setIsOpen(false) : setIsOpen(true);
  };

  return (
    <header className="bd-navbar sticky-top">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <NavLink className="navbar-brand me-2" to={"/advertisements"} end>
            handWebber
          </NavLink>
          <Button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="true"
            aria-label="Toggle navigation"
            onClick={handleButtonClick}
          >
            <i className={`bi ${!isOpen ? "bi-list" : "bi-x-lg"}`}></i>
          </Button>
          <div
            className={`collapse navbar-collapse ${isOpen ? "show" : "hide"}`}
            id="navbarNav"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item active">
                <NavLink
                  className="nav-link"
                  to={"/advertisements"}
                  onClick={handleLinkClick}
                  end
                >
                  {t("Header.Home")}
                </NavLink>
              </li>
              {isLogged && (
                <>
                  <li className="nav-item active">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to={"/advertisements/new"}
                      onClick={handleLinkClick}
                      end
                    >
                      {t("Header.New Advertisement")}
                    </NavLink>
                  </li>

                  <li className="nav-item active">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to={"/chat"}
                      onClick={handleLinkClick}
                      end
                    >
                      Chat
                    </NavLink>
                  </li>
                </>
              )}
              <li className="nav-item active">
                <NavLink
                  to={"/test"}
                  className="nav-link"
                  aria-current="page"
                  onClick={handleLinkClick}
                  end
                >
                  {t("Header.Comp List")}
                </NavLink>
              </li>
            </ul>
            <div className="d-flex justify-content-end header-actions">
              {!isLogged && (
                <>
                  <Button
                    type="button"
                    as={Link}
                    to="/login"
                    onClick={handleLinkClick}
                    className="btn btn-secondary-link px-3 me-2"
                  >
                    {t("Header.Login")}
                  </Button>
                  <Button
                    as={Link}
                    to="/signup"
                    type="button"
                    onClick={handleLinkClick}
                    className="btn btn-secondary"
                  >
                    {t("Header.Sign up for free")}
                  </Button>
                </>
              )}
              {isLogged && (
                <>
                  <Profile handleLinkClick={handleLinkClick} />
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
