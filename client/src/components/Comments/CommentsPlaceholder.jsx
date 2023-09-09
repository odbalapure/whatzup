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
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item disabled">
            <div class="page-link" tabindex="-1">
              Previous
            </div>
          </li>
          {[1, 2, 3].map((_, index) => (
            <li class="page-item">
              <div class="page-link">{index + 1}</div>
            </li>
          ))}
          <li class="page-item">
            <div class="page-link">Next</div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default CommentPlaceholder;
