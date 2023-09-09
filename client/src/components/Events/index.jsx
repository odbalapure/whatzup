import { useNavigate } from "react-router";
import useAsync from "../../hooks/useAsync";
import EventsCard from "./EventsCard";
import EventPlaceholder from "./EventPlaceholder";
import ErrorCard from "../ErrorCard";

function Events() {
  const { data, error } = useAsync("events", "GET", null, false);
  const navigate = useNavigate();

  if (error?.status >= 500 || error?.error) {
    return <ErrorCard msg="Failed to fetch events!" />;
  }

  const goToEventDetails = (event) =>
    navigate(`/event/${event._id}`, { state: event }, { replace: true });

  return (
    <div className="mt-5 mb-5">
      <div className="fs-4">Upcoming Events</div>
      <hr />
      <div className="d-flex" style={{ overflow: "auto" }}>
        {data.events ? (
          data.events.map((eventData) => (
            <EventsCard event={eventData} goToEvent={goToEventDetails} />
          ))
        ) : (
          <EventPlaceholder />
        )}
      </div>
    </div>
  );
}

export default Events;
