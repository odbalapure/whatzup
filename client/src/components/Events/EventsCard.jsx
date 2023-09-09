const EventsCard = (props) => {
  const { event, goToEvent } = props;
  return (
    <>
      <div
        key={event._id}
        className="card"
        style={{
          width: "18rem",
          marginRight: "1rem",
          cursor: "pointer",
          minWidth: "18rem"
        }}
      >
        <div
          onClick={() => goToEvent(event)}
          style={{ height: "12.5rem", backgroundColor: "lightgray" }}
        >
          {event.image ? (
            <img
              src={event.image}
              className="card-img-top h-100"
              alt={event.event}
            />
          ) : (
            <div
              style={{
                marginTop: "5rem",
                textAlign: "center",
                fontSize: "1.5rem",
                textShadow: "0px 4px 4px rgba(0,0,0,0.6)"
              }}
            >
              No image available
            </div>
          )}
        </div>
        <div className="card-header">
          <p style={{ fontWeight: "500" }} className="card-text">
            {event.event}
          </p>
        </div>
      </div>
    </>
  );
};

export default EventsCard;
