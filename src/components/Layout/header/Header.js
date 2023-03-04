import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "../../commons/button/Button";
import { useAuth } from "../../context/AuthContext";
import "./Header.scss";

const Header = () => {
  const { isLogged } = useAuth();
  const { t } = useTranslation();
  return (
    <header className="bd-navbar fixed-top">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand me-2" to="/advertisements">
            handWebber
          </Link>
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
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/advertisements"
                >
                  {t("Header.Home")}
                </Link>
              </li>
              {isLogged && (
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/advertisements/new"
                  >
                    {t("Header.New Advertisement")}
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/test"
                >
                  {t("Header.Comp List")}
                </Link>
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
