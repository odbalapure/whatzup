const UrgetCard = (props) => {
  const { urgent } = props;
  if (urgent?.importance !== "HIGH") {
    return <></>;
  }

  return (
    <>
      <div key={urgent._id} className="card-body">
        <h5 className="card-title">{urgent.announcement}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{urgent.area}</h6>
        <div className="card-text lead mb-2">{urgent.message}</div>
        <div className="card-text">
          <span style={{ fontWeight: "500" }}>Created:</span>{" "}
          {new Date(urgent.createdAt).toString().substring(0, 15)}
        </div>
        <div className="card-text">
          <span style={{ fontWeight: "500" }}>Contact:</span>{" "}
          {urgent.contactPersonName} ({urgent.contactPersonPhone})
        </div>
        {urgent.length > 1 ? <hr className="text-muted" /> : null}
        <hr />
      </div>
    </>
  );
};

export default UrgetCard;
