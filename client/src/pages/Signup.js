import { useRef, useState } from "react";
import { Api } from "../utils/Api";
import { showToast } from "../utils/common";
import CustomToast from "../components/common/Toast";

function Register() {
  const [isError, setIsError] = useState(false);

  /* Form fields */
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();

  /**
   * @desc Signup user
   * @method POST
   * @param {*} event
   */
  const signupDetails = async () => {
    if (
      !emailRef.current.value ||
      !passwordRef.current.value ||
      !phoneRef.current.value ||
      !passwordRef.current.value
    ) {
      setIsError(true);
      showToast(
        "All fields are mandatory!",
        "error",
        { position: "top-right" },
        0
      );
      return;
    }

    try {
      const response = await Api(
        "auth/register",
        "POST",
        {
          name: nameRef.current.value,
          email: emailRef.current.value,
          phone: "+91-" + phoneRef.current.value,
          password: passwordRef.current.value
        },
        false
      );
      if (response?.error) {
        setIsError(true);
        showToast(response?.error, "error");
        return;
      }
      showToast(
        `An email has been sent to ${response?.email} , to confirm your registration!`,
        "success",
        { position: "top-right" },
        0
      );
      localStorage.setItem("url_shortner_user", JSON.stringify(response));
    } catch (error) {
      setIsError("User registration failed, try again some time later...");
      showToast("User registration failed, try again some time later", "error");
    }
  };

  return (
    <div
      style={{ marginTop: "5rem" }}
      className="container d-flex justify-content-center flex-column"
    >
      <div
        style={{
          border: "1px solid lightgray",
          padding: "1rem",
          margin: "2rem",
          borderRadius: "1rem",
          boxSizing: "border-box"
        }}
      >
        <form>
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-3">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter full name"
                ref={nameRef}
              />
            </div>
            <div className="col-lg-6 col-md-12 mb-3">
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="Enter phone number"
                ref={phoneRef}
              />
            </div>
          </div>
          <div className="mb-3">
            <input
              type="text"
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
          <div className="d-grid gap-2">
            <button
              className="btn btn-primary"
              type="button"
              onClick={signupDetails}
            >
              SIGN UP
            </button>
          </div>
        </form>
      </div>
      <div>{isError ? <CustomToast /> : null}</div>
    </div>
  );
}

export default Register;
