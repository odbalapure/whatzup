function Footer() {
  const footerStyle = {
    paddingTop: "2rem",
    fontSize: "1rem",
    color: "rgb(158, 187, 187)",
    backgroundColor: "#1a2538",
    left: 0,
    bottom: 0,
    width: "100%"
  };

  return (
    <div>
      <div style={footerStyle}>
        <div
          className="d-flex justify-content-center align-items-center flex-wrap"
          style={{ padding: "1rem", textAlign: "center" }}
        >
          <div>
            <ol style={{ listStyle: "none", padding: 0, cursor: "pointer" }}>
              <li>
                <span>
                  <b>Phone</b>
                </span>
                : +91-1234567890
              </li>
              <li>
                <span>
                  <b>Instagram ID</b>
                </span>
                : whatzup
              </li>
              <li>
                <span>
                  <b>Email</b>
                </span>
                : whatzup@gmail.com
              </li>
            </ol>
          </div>
        </div>
        <hr className="mx-5" />
        <p
          style={{
            fontSize: "1.3rem",
            textAlign: "center",
            paddingBottom: "2rem"
          }}
        >
          <b>Whatzup ©</b>
        </p>
      </div>
    </div>
  );
}

export default Footer;
