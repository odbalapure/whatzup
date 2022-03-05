import axios from "axios";
import { useState, useEffect } from "react";

const url = process.env.REACT_APP_API_URL + "/announcements/urgent";

function Urgent() {
  const [urgent, setUrgent] = useState([]);
  const [warning, setWarning] = useState("");

  /**
   * @desc Get urgent announcement
   * @method GET
   */
  const getUrgentAnnoucement = async () => {
    try {
      const response = await axios.get(url);
      setUrgent(response.data.announcements);
      setWarning("");
    } catch (err) {
      setWarning("Something went wrong while fetching urgent announcements...");
    }
  };

  useEffect(() => {
    getUrgentAnnoucement();
  }, []);

  return (
    <>
      {/* Alert logo */}
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <symbol
          id="exclamation-triangle-fill"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </symbol>
      </svg>

      <div
        className="card p-3 mb-4 bg-warning bg-gradient"
        style={{ display: urgent.length >= 1 ? "" : "none" }}
      >
        {/* Alert Message */}
        <div
          className="container alert alert-danger d-flex align-items-center"
          role="alert"
        >
          <svg
            className="bi flex-shrink-0 me-2"
            width="24"
            height="24"
            role="img"
            aria-label="Danger:"
          >
            <use xlinkHref="#exclamation-triangle-fill" />
          </svg>
          <div>Important announcement(s)</div>
        </div>
        {urgent.map((urgentItem) => {
          return (
            <div key={urgentItem._id} className="card-body">
              <h5 className="card-title">{urgentItem.announcement}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {urgentItem.area}
              </h6>
              <div className="card-text lead mb-2">{urgentItem.message}</div>
              <div className="card-text">
                <span style={{ fontWeight: "500" }}>Created:</span>{" "}
                {new Date(urgentItem.createdAt).toString().substring(0, 15)}
              </div>
              <div className="card-text">
                <span style={{ fontWeight: "500" }}>Contact:</span>{" "}
                {urgentItem.contactPersonName} ({urgentItem.contactPersonPhone})
              </div>
              {urgent.length > 1 ? <hr className="text-muted" /> : null}
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
    </>
  );
}

export default Urgent;
