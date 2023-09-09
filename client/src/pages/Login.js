import { useNavigate } from "react-router";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Api } from "../utils/Api";
import { showToast } from "../utils/common";
import CustomToast from "../components/common/Toast";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const navigateToHome = () => navigate("/", { replace: true });

  /**
   * @desc Login a user
   * @method POST
   * @param {*} event
   */
  const loginDetails = async () => {
    if (!emailRef.current.value || !passwordRef.current.value) {
      setIsError(true);
      showToast("Email & password are mandatory!", "error");
      return;
    }
    const response = await Api(
      "auth/login",
      "POST",
      { email: emailRef.current.value, password: passwordRef.current.value },
      false
    );
    if (response?.error) {
      setIsError(true);
      showToast(response?.error, "error");
      return;
    }
    showToast("Login was successful, welcome", "success");
    localStorage.setItem("whatzup_user", JSON.stringify(response));
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
            <div>
              <Link style={{ textDecoration: "none" }} to="/forgot-password">
                Forgot Password?
              </Link>
            </div>
          </div>
          {isError && <CustomToast />}
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
    </div>
  );
}

export default Login;
