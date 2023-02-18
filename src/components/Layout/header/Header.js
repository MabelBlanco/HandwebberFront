import Button from '../../commons/button/Button';
import './Header.scss';
import { Link } from 'react-router-dom';

const Header = () => {

  return (
    <header className="bd-navbar sticky-top">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand me-2" href="/advertisements">
            handWebber
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/advertisements"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/new-advertisement"
                >
                  New Advertisement
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/test">
                  Comp List
                </a>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              <Button type="button" className="btn btn-link px-3 me-2">
                Login
              </Button>
              <Button
                as={Link}
                to='/signup'
                type='button'
                className='btn btn-secondary'>
                Sign up for free
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
