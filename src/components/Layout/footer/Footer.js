import classNames from "classnames";
import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = ({ className, ...props }) => {
  return (
    <footer
      className={classNames(
        "text-white d-flex flex-md-row justify-content-between align-items-center px-md-5 py-2 mx-0",
        className
      )}
      {...props}
    >
      <section className="col-xs-12 col-md-6 text-center">
        <Link className="btn btn-floating  " to="!#" role="button">
          <i className="bi bi-youtube"></i>
        </Link>
        <Link className="btn btn-floating " to="!#" role="button">
          <i className="bi bi-facebook"></i>
        </Link>
        <Link className="btn btn-floating " to="!#" role="button">
          <i className="bi bi-linkedin"></i>
        </Link>
        <Link className="btn" to="!#" role="button">
          <i className="bi bi-twitter"></i>
        </Link>
      </section>
      <section className="col-xs-12 col-md-6 text-center">
        © 2023 Copyright handWebber
      </section>
    </footer>
  );
};

export default Footer;
