const CommentPlaceholder = () => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((_, index) => (
        <div
          style={{
            padding: "1rem",
            border: "1px solid lightgray",
            borderRadius: "1rem",
            marginBottom: "1rem"
          }}
          className="card"
          key={index}
        >
          <div className="placeholder-glow">
            <div className="placeholder col-4"></div>
            <div className="placeholder w-75"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommentPlaceholder;
