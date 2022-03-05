import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const url = process.env.REACT_APP_API_URL + "/events";

function Events() {
  const navigate = useNavigate();

  const [warning, setWarning] = useState("");
  const [events, setEvents] = useState([]);

  /**
   * @desc Get events
   * @method GET
   */
  const getAllEvents = async () => {
    try {
      const response = await axios.get(url);
      setEvents(response.data.events);
      setWarning("");
    } catch (err) {
      setWarning("Something went wrong while fetching events...");
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  /**
   * @desc Pass event data to next page
   */
  const goToEvent = (event) => {
    navigate(`/event/${event._id}`, { state: event }, { replace: true });
  };

  return (
    <div className="mt-5 mb-5">
      <div className="fs-4">Upcoming Events</div>
      <hr />
      <div className="d-flex" style={{ overflow: "auto" }}>
        {events.map((eventData) => {
          return (
            <div
              key={eventData._id}
              className="card"
              style={{
                width: "18rem",
                marginRight: "1rem",
                cursor: "pointer",
                minWidth: "18rem",
              }}
            >
              <div
                onClick={() => goToEvent(eventData)}
                style={{ height: "12.5rem", backgroundColor: "lightgray" }}
              >
                {eventData.image ? (
                  <img
                    src={eventData.image}
                    className="card-img-top h-100"
                    alt={eventData.event}
                  />
                ) : (
                  <div
                    style={{
                      marginTop: "5rem",
                      textAlign: "center",
                      fontSize: "1.5rem",
                      textShadow: "0px 4px 4px rgba(0,0,0,0.6)",
                    }}
                  >
                    No image available
                  </div>
                )}
              </div>
              <div className="card-header">
                <p style={{ fontWeight: "500" }} className="card-text">
                  {eventData.event}
                </p>
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

export default Events;
