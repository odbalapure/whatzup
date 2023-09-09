const AnnouncementCard = (props) => {
  const { announcement } = props;
  if (announcement?.importance === "HIGH") {
    return <></>;
  }
  return (
    <>
      <div
        key={announcement._id}
        className="card"
        style={{
          width: "18rem",
          marginRight: "1rem",
          minWidth: "18rem"
        }}
      >
        <div className="card-body">
          <h5 className="card-title">{announcement.announcement}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{announcement.area}</h6>
          <p className="card-text">{announcement.message}</p>
        </div>
        <div className="card-footer">
          <small>
            {announcement.contactPersonName} ({announcement.contactPersonPhone})
          </small>
        </div>
      </div>
    </>
  );
};

export default AnnouncementCard;
