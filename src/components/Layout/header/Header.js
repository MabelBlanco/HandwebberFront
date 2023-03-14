import { Link, NavLink } from "react-router-dom";
import Button from "../../commons/button/Button";
import "./Header.scss";
import { useTranslation } from "react-i18next";
import { useIsLoggedSelector } from "../../../store/authSlice";

const Header = () => {
  const { isLogged } = useIsLoggedSelector();
  const { t } = useTranslation();
  return (
    <header className="bd-navbar fixed-top">
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
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list"></i>
          </Button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to={"/advertisements"}
                  end
                >
                  {t("Header.Home")}
                </NavLink>
              </li>
              {isLogged && (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to={"/advertisements/new"}
                      end
                    >
                      {t("Header.New Advertisement")}
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to={"/chat"}
                      end
                    >
                      Chat
                    </NavLink>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink
                  to={"/test"}
                  className="nav-link active"
                  aria-current="page"
                  end
                >
                  {t("Header.Comp List")}
                </NavLink>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              <Button
                type="button"
                as={Link}
                to="/login"
                className="btn btn-secondary-link px-3 me-2"
              >
                {t("Header.Login")}
              </Button>
              <Button
                as={Link}
                to="/signup"
                type="button"
                className="btn btn-secondary"
              >
                {t("Header.Sign up for free")}
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
