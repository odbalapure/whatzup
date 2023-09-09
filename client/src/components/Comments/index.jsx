const CommentsList = (props) => {
  const { comments } = props;
  return (
    <>
      {comments.map((comment) => {
        return (
          <div
            style={{
              padding: "1rem",
              border: "1px solid lightgray",
              borderRadius: "1rem"
            }}
            className="mb-3"
            key={comment._id}
          >
            <div
              style={{ fontWeight: "500" }}
              className="d-flex flex-wrap justify-content-between"
            >
              <div>{comment.name}</div>
              <div className="text-muted">
                {comment.createdAt
                  ? new Date(comment.createdAt).toString().substring(0, 10)
                  : ""}{" "}
                (
                {comment.createdAt
                  ? new Date(comment.createdAt)
                      .toString()
                      .split(" ")[4]
                      .substring(0, 5)
                  : ""}
                )
              </div>
            </div>
            <div>{comment.comment}</div>
          </div>
        );
      })}
    </>
  );
};

export default CommentsList;
