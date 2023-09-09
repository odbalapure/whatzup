function UrgentPlaceholder() {
  return (
    <div>
      <div className="p-3">
        {[1, 2].map((_) => (
          <>
            <p className="placeholder-glow">
              <span
                style={{ height: "2rem" }}
                className="placeholder col-2 mb-2 bg-secondary"
              ></span>
              <span
                style={{ height: "2rem" }}
                className="placeholder col-12 mb-2 bg-primary"
              ></span>
              <span
                style={{ height: "2rem" }}
                className="placeholder col-6 mb-2 bg-secondary"
              ></span>
            </p>
            <hr />
          </>
        ))}
      </div>
    </div>
  );
}

export default UrgentPlaceholder;
