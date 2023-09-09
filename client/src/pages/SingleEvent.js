import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import isEmpty, { showToast } from "../utils/common";
import CustomToast from "../components/common/Toast";
import { Api } from "../utils/Api";
import CommentPlaceholder from "../components/Comments/CommentsPlaceholder";
import CommentsPaginationWrapper from "../components/Comments/CommentsPaginationWrapper";
import Footer from "../components/Footer";

function SingleEvent() {
  const { isLoggedIn } = useGlobalContext();
  const [comment, setComment] = useState("");

  /* Get data from another (previous) page */
  const location = useLocation();
  const eventId = location.state._id;

  /* Operation status */
  const [isError, setIsError] = useState("");
  const [isSuccess, setIsSuccess] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    Api(`events/${eventId}`, "GET", null, false).then((data) => {
      setComments(data?.comments);
    });
  }, [isSuccess, eventId]);

  /**
   * @desc Create a comment
   * @method PATCH
   */
  const createComment = async () => {
    if (!comment || !isLoggedIn) {
      setIsError(true);
      showToast(
        isLoggedIn
          ? "Comment is empty!"
          : "You need to login, inorder to comment!",
        "error"
      );
      return;
    }
    const response = await Api(
      `events/${eventId}`,
      "PATCH",
      {
        name: JSON.parse(localStorage.getItem("whatzup_user")).name,
        comment,
        createdAt: new Date().toString()
      },
      true
    );
    if (response?.error) {
      setIsError(true);
      showToast(response?.error, "error");
      return;
    }
    setIsSuccess(true);
    showToast("Comment added successfully!", "success");
  };

  return (
    <>
      <div
        className="container"
        style={{ marginTop: "5rem", marginBottom: "5rem" }}
      >
        <div
          style={{
            border: "1px lightgray solid",
            padding: "1rem",
            borderRadius: "1rem"
          }}
        >
          <div
            style={{
              backgroundColor: "lightgray",
              marginBottom: "1.5rem"
            }}
          >
            {location.state.image ? (
              <img
                style={{ height: "10rem", width: "20rem" }}
                className="img-fluid w-100 h-100"
                src={location.state.image}
                alt={location.state.event}
              />
            ) : (
              <div
                style={{
                  textAlign: "center",
                  fontSize: "1.5rem",
                  textShadow: "0px 4px 4px rgba(0,0,0,0.6)"
                }}
              >
                No image available
              </div>
            )}
          </div>
          <div
            className="d-flex flex-column justify-content-evenly"
            style={{ height: "10rem" }}
          >
            <div className="fs-3 fw-bold">{location.state.event}</div>
            <div>{location.state.description}</div>
            <div>
              <span style={{ fontWeight: "500" }}>Person of contact:</span>{" "}
              {location.state.contactPersonName}
            </div>
            <div className="mb-3">
              <span style={{ fontWeight: "500" }}>Contact Person Number:</span>{" "}
              {location.state.contactPersonPhone}
            </div>
          </div>
        </div>
        <hr />
        {/* Comments section */}
        <div className="p-1">
          <textarea
            type="text"
            className="form-control mb-3"
            id="comment"
            placeholder="Enter a comment"
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div className="d-grid gap-2 mb-4">
            <button
              onClick={createComment}
              className="btn btn-dark"
              type="button"
            >
              Add comment
            </button>
          </div>

          <div className="mt-4 fw-bold fs-3">{comments?.length} Comments</div>
          {!isEmpty(comments) ? (
            <CommentsPaginationWrapper comments={comments} />
          ) : (
            <CommentPlaceholder />
          )}
        </div>
        {(isError || isSuccess) && <CustomToast />}
      </div>
      <Footer />
    </>
  );
}

export default SingleEvent;
