import classNames from "classnames";
import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = ({ className, ...props }) => {
  return (
    <footer
      className={classNames("text-center text-white ", className)}
      {...props}
    >
      <div className="container d-flex justify-content-between align-items-center py-3">
        <section>
          <Link className="btn btn-floating m-1 " to="!#" role="button">
            <i className="fab fa-facebook-f"></i>
          </Link>
          <Link className="btn  btn-floating m-1 " to="!#" role="button">
            <i className="fab fa-twitter"></i>
          </Link>
          <Link className="btn btn-floating m-1 " to="!#" role="button">
            <i className="bi bi-youtube"></i>
          </Link>
          <Link className="btn btn-floating m-1 " to="!#" role="button">
            <i className="bi bi-facebook"></i>
          </Link>
          <Link className="btn btn-floating m-1 " to="!#" role="button">
            <i className="bi bi-linkedin"></i>
          </Link>
          <Link className="btn  m-1 " to="!#" role="button">
            <i className="bi bi-twitter"></i>
          </Link>
        </section>
        <section>© 2023 Copyright handWebber</section>
      </div>
    </footer>
  );
};

export default Footer;
