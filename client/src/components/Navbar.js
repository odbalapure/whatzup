import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

function Navbar() {
  /* Navigate programatically */
  const navigate = useNavigate();
  const navigateToHome = () => navigate("/", { replace: true });

  /* Glboal context values */
  const { userName, isAdmin, isLoggedIn } = useGlobalContext();

  /* Function to logout user */
  const logoutUser = () => {
    localStorage.removeItem("whatzup_user");
    navigateToHome();
    window.location.reload(false);
  };

  return (
    <>
      {/* Navbar code */}
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top"
        style={{ backgroundColor: "#0d101c" }}
      >
        <div className="container-fluid">
          <Link style={{ textDecoration: "none", fontWeight: "600" }} to="/">
            <span className="navbar-brand text-success fs-3">
              Whatzup{" "}
              <i
                style={{ color: "azure" }}
                className="bi bi-calendar2-day-fill"
              ></i>
            </span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link fs-5" aria-current="page" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link fs-5"
                  aria-current="page"
                  to="/signup"
                >
                  Signup
                </Link>
              </li>
              {isAdmin && isLoggedIn ? (
                <li className="nav-item">
                  <Link
                    className="nav-link fs-5"
                    aria-current="page"
                    to="/event"
                  >
                    Event
                  </Link>
                </li>
              ) : null}
              {isAdmin && isLoggedIn ? (
                <li className="nav-item">
                  <Link
                    className="nav-link fs-5"
                    aria-current="page"
                    to="/announcement"
                  >
                    Announcement
                  </Link>
                </li>
              ) : null}
              {isLoggedIn ? (
                <li className="nav-item">
                  <Link
                    className="nav-link fs-5"
                    aria-current="page"
                    to="/chat"
                  >
                    Chat
                  </Link>
                </li>
              ) : null}
            </ul>
            {isLoggedIn || userName ? (
              <div
                className="d-flex align-items-center"
                style={{ fontSize: "1.2rem" }}
              >
                <span style={{ color: "azure", marginRight: "1rem" }}>
                  Hello{" "}
                  <span className="fw-bold text-primary">
                    <i>{userName.split(" ")[0]}</i>
                  </span>
                  !
                </span>
                <button
                  onClick={logoutUser}
                  className="btn btn-outline-primary"
                  type="submit"
                >
                  Logout
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
