const Header = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand me-2" href="!#">
            handWebber
          </a>
          <button
            className="navbar-toggler"
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
                <a className="nav-link active" aria-current="page" href="!#">
                  Home
                </a>
              </li>
            </ul>
            <div class="d-flex align-items-center">
              <button type="button" class="btn btn-link px-3 me-2">
                Login
              </button>
              <button type="button" class="btn btn-primary me-3">
                Sign up for free
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Header;
