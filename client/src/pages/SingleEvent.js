import { useLocation } from "react-router";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../context";

const url = process.env.REACT_APP_API_URL + "/events";

function SingleEvent() {
  const { isLoggedIn } = useGlobalContext();

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  /* Get data from another (previous) page */
  const location = useLocation();
  const eventId = location.state._id;

  /* Operation status */
  const [warning, setWarning] = useState("");
  const [msg, setMsg] = useState("");

  /**
   * @desc Get event comments
   * @method GET
   */
  const getEventComments = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/${eventId}`);
      setComments(response.data.comments);
      setWarning("");
    } catch (err) {
      setWarning("Something went wrong while fetching announcements...");
    }
  }, [eventId]);

  useEffect(() => {
    getEventComments();
  }, [getEventComments]);

  /**
   * @desc Create a comment
   * @method PATCH
   */
  const createComment = async () => {
    if (comment === "") {
      setWarning("Comment is empty :)");
      setTimeout(() => setWarning(""), 2000);
      return;
    }

    if (JSON.parse(localStorage.getItem("whatzup_user"))) {
      const response = await axios.patch(
        `${url}/${eventId}`,
        {
          name: JSON.parse(localStorage.getItem("whatzup_user")).name,
          comment,
          createdAt: new Date().toString(),
        },
        {
          headers: {
            Authorization:
              "Bearer " +
              JSON.parse(localStorage.getItem("whatzup_user")).token,
          },
        }
      );

      getEventComments();
      setMsg(response.data.msg);
      setWarning("");
      setTimeout(() => {
        setMsg("");
      }, 2000);
    }
  };

  return (
    <div
      className="container"
      style={{ marginTop: "5rem", marginBottom: "5rem" }}
    >
      {/* Event details */}
      <div
        style={{
          border: "1px lightgray solid",
          padding: "1rem",
          borderRadius: "1rem",
        }}
      >
        <div
          style={{
            backgroundColor: "lightgray",
            marginBottom: "1.5rem",
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
                textShadow: "0px 4px 4px rgba(0,0,0,0.6)",
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
          onChange={(e) => {
            setComment(e.target.value);
          }}
        ></textarea>
        <div className="d-grid gap-2 mb-4">
          <button
            disabled={!isLoggedIn}
            onClick={createComment}
            className="btn btn-dark"
            type="button"
          >
            Add comment
          </button>
        </div>

        <div className="mt-4 fw-bold fs-3">{comments.length} Comments</div>

        {comments.map((comment) => {
          return (
            <div
              style={{
                padding: "1rem",
                border: "1px solid lightgray",
                borderRadius: "1rem",
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
      </div>
      <div>
        {warning ? (
          <p
            className="d-flex justify-content-center alert alert-danger"
            role="alert"
          >
            {warning}
          </p>
        ) : null}
      </div>
      <div>
        {msg ? (
          <p
            className="d-flex justify-content-center alert alert-success"
            role="alert"
          >
            {msg}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default SingleEvent;
