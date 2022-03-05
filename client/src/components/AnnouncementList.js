import { useState, useEffect } from "react";
import axios from "axios";

const url = process.env.REACT_APP_API_URL + "/announcements";

function AnnouncementList() {
  const [warning, setWarning] = useState("");
  const [announcements, setAnnouncements] = useState([]);

  /**
   * @desc Get announcements
   * @method GET
   */
  const getAllAnnouncements = async () => {
    try {
      const response = await axios.get(url);
      setAnnouncements(response.data.announcements);
      setWarning("");
    } catch (err) {
      setWarning("Something went wrong while fetching announcements...");
    }
  };

  useEffect(() => {
    getAllAnnouncements();
  }, []);

  return (
    <div className="mt-5 mb-5 container">
      <div className="fs-4">General Announcements</div>
      <hr />
      <div
        className="d-flex"
        style={{
          overflow: "auto",
        }}
      >
        {announcements.map((announcement) => {
          if (announcement.importance === "HIGH") {
            return (
              <div key={announcement._id}></div>
            );
          }

          return (
            <div
              key={announcement._id}
              className="card"
              style={{
                width: "18rem",
                marginRight: "1rem",
                minWidth: "18rem",
              }}
            >
              <div className="card-body">
                <h5 className="card-title">{announcement.announcement}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {announcement.area}
                </h6>
                <p className="card-text">{announcement.message}</p>
              </div>
              <div className="card-footer">
                <small>
                  {announcement.contactPersonName} (
                  {announcement.contactPersonPhone})
                </small>
              </div>
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
    </div>
  );
}

export default AnnouncementList;
