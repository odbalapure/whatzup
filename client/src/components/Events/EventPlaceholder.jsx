function EventPlaceholder() {
  return (
    <>
      <div className="d-flex mb-5" style={{ overflow: "auto" }}>
        <div
          className="card placeholder-glow"
          aria-hidden="true"
          style={{
            width: "18rem",
            marginRight: "1rem",
            minWidth: "18rem",
            height: "15rem"
          }}
        >
          <div className="placeholder card-body"></div>
          <div style={{ height: "2rem" }} className="card-footer"></div>
        </div>
        <div
          className="card placeholder-glow"
          aria-hidden="true"
          style={{
            width: "18rem",
            marginRight: "1rem",
            minWidth: "18rem",
            height: "15rem"
          }}
        >
          <div className="placeholder card-body"></div>
          <div style={{ height: "2rem" }} className="card-footer"></div>
        </div>
        <div
          className="card placeholder-glow"
          aria-hidden="true"
          style={{
            width: "18rem",
            marginRight: "1rem",
            minWidth: "18rem",
            height: "15rem"
          }}
        >
          <div className="placeholder card-body"></div>
          <div style={{ height: "2rem" }} className="card-footer"></div>
        </div>
      </div>
    </>
  );
}

export default EventPlaceholder;
