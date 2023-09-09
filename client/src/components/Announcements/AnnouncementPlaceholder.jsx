function AnnouncementPlaceholder() {
  return (
    <>
      <div className="d-flex mb-5" style={{ overflow: "auto" }}>
        {[1, 2, 3].map((_) => (
          <div
            className="card"
            aria-hidden="true"
            style={{
              width: "18rem",
              marginRight: "1rem",
              minWidth: "18rem",
              height: "15rem"
            }}
          >
            <div className="card-body">
              <h5 className="card-title placeholder-glow">
                <span className="placeholder col-6"></span>
              </h5>
              <p className="card-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
              </p>
            </div>
            <div style={{ height: "2rem" }} className="card-footer"></div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AnnouncementPlaceholder;
