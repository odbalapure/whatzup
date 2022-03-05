import { useRef, useState } from "react";
import axios from "axios";

const url = process.env.REACT_APP_API_URL + "/auth/register";

function Register() {
  /* Operation status */
  const [success, setSuccess] = useState(false);
  const [warning, setWarning] = useState("");

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
      emailRef.current.value === "" ||
      passwordRef.current.value === "" ||
      phoneRef.current.value === "" ||
      passwordRef.current.value === ""
    ) {
      setWarning("All fields are mandatory!");
      return;
    } else {
      setWarning("");
    }

    const user = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: "+91-" + phoneRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axios.post(`${url}`, user);

      const localStorageObj = {
        email: response.data.email,
        token: response.data.token,
        activated: response.data.activated,
      };

      localStorage.setItem(
        "url_shortner_user",
        JSON.stringify(localStorageObj)
      );

      setSuccess(true);
    } catch (error) {
      setWarning("User registration failed, try again some time later...");
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
          boxSizing: "border-box",
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
      <div>
        {warning ? (
          <p
            className="d-flex justify-content-center alert alert-danger"
            role="alert"
          >
            Username, Email and Password are mandatory!
          </p>
        ) : null}
      </div>
      <div>
        {success ? (
          <p
            className="d-flex justify-content-center alert alert-success"
            role="alert"
          >
            An email has been sent to <b>{emailRef.current.value}</b>, to
            confirm your registration!
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default Register;
