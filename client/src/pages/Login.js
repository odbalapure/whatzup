import { useNavigate } from "react-router";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Api } from "../utils/Api";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const navigateToHome = () => navigate("/", { replace: true });

  /**
   * @desc Login a user
   * @method POST
   * @param {*} event
   */
  const loginDetails = async () => {
    if (emailRef.current.value === "" || passwordRef.current.value === "") {
      setError("Email and password are mandatory!");
      return;
    }
    const response = await Api(
      "auth/login",
      "POST",
      { email: emailRef.current.value, password: passwordRef.current.value },
      false
    );
    if (response?.error) {
      setError(response?.error);
      return;
    }
    localStorage.setItem(
      "whatzup_user",
      JSON.stringify({
        name: response.data.name,
        email: response.data.email,
        role: response.data.role,
        token: response.data.token
      })
    );
    navigateToHome();
    window.location.reload(false);
  };

  return (
    <div
      style={{ marginTop: "5rem" }}
      className="container d-flex justify-content-center flex-wrap flex-column"
    >
      <div
        style={{
          border: "1px solid lightgray",
          padding: "1rem",
          margin: "2rem",
          borderRadius: "1rem"
        }}
      >
        <form>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email address"
              ref={emailRef}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              ref={passwordRef}
            />
          </div>
          <div className="my-3 d-flex justify-content-around">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Remember"
                id="remember"
              />
              <label className="form-check-label" htmlFor="remember">
                Remember Me
              </label>
            </div>
            <div>
              <Link style={{ textDecoration: "none" }} to="/forgot-password">
                Forgot Password?
              </Link>
            </div>
          </div>
          <div className="d-grid gap-2">
            <button
              className="btn btn-primary"
              type="button"
              onClick={loginDetails}
            >
              SIGN IN
            </button>
            <div className="my-2" style={{ textAlign: "center" }}>
              Not a member?{" "}
              <Link style={{ textDecoration: "none" }} to="/signup">
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
      <div>
        {error && (
          <p
            className="d-flex justify-content-center alert alert-danger"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
