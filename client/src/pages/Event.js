import { useRef, useState, useEffect } from "react";
import axios from "axios";

const url = process.env.REACT_APP_API_URL + "/events";

function Event() {
  /* Events list */
  const [events, setEvents] = useState([]);

  /* Create editable object */
  const [editMode, setEditMode] = useState(false);
  const [editObj, setEditObj] = useState({});

  /* Operation status */
  const [warning, setWarning] = useState("");
  const [msg, setMsg] = useState("");

  /* Time and date */
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  /* Form fields */
  const title = useRef("");
  const image = useRef("");
  const description = useRef("");
  const contactPersonName = useRef("");
  const contactPersonPhone = useRef("");

  /**
   * @desc Create an event
   * @request POST
   */
  const createEvent = async () => {
    if (
      title.current.value === "" ||
      date === "" ||
      from === "" ||
      to === "" ||
      image.current.value === "" ||
      description.current.value === ""
    ) {
      setTimeout(() => setWarning(""), 2000);
      setWarning("All fields are madatory!");
      setMsg("");
      return;
    }

    try {
      setMsg("Creating event please wait...");

      if (JSON.parse(localStorage.getItem("whatzup_user"))) {
        const response = await axios.post(
          url,
          {
            event: title.current.value,
            date: date,
            from: from,
            to: to,
            image: image.current.value,
            description: description.current.value,
            contactPersonName: contactPersonName.current.value,
            contactPersonPhone: "+91" + contactPersonPhone.current.value,
          },
          {
            headers: {
              Authorization:
                "Bearer " +
                JSON.parse(localStorage.getItem("whatzup_user")).token,
            },
          }
        );

        getAllEvents();
        setMsg(response.data.msg);
        setWarning("");
      }
    } catch (err) {
      setWarning(err.msg);
      setMsg("");
    }
  };

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
   * @desc Delete an event
   * @method DELETE
   */
  const deleteEvent = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      setWarning("");
      getAllEvents();
    } catch (err) {
      setWarning("Something went wrong while fetching announcements...");
    }
  };

  /**
   * @desc Edit event
   */
  const editEvent = async () => {
    const url = process.env.REACT_APP_API_URL + "/events/edit";

    try {
      await axios.patch(`${url}/${editObj._id}`, {
        event: title.current.value,
        date: date || editObj.date,
        from: from || editObj.from,
        to: to || editObj.to,
        image: image.current.value,
        description: description.current.value,
        contactPersonName: contactPersonName.current.value,
        contactPersonPhone: contactPersonPhone.current.value,
      });

      setEditObj({});
      setWarning("");
      setMsg("Event edited!");
      setEditMode(false);
      setTimeout(() => setMsg(""), 2000);
      getAllEvents();
    } catch (err) {
      setWarning("Something went wrong while fetching announcements...");
    }
  };

  /**
   * @desc Create editable object
   */
  const createEditableObject = async (id) => {
    setEditObj({});
    setEditMode((prev) => !prev);
    const event = events.find((event) => event._id === id);
    setEditObj(event);
  };

  /* Prevent form submission and reset form values */
  const handleSubmit = (e) => {
    e.target.reset();
    e.preventDefault();
  };

  return (
    <div
      style={{ marginTop: "5rem" }}
      className="container d-flex justify-content-center flex-column"
    >
      <div
        style={{
          border: "1px solid lightgray",
          padding: "1rem",
          margin: "2rem",
          borderRadius: "1rem",
          boxSizing: "border-box",
        }}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-3">
              <input
                type="text"
                className="form-control"
                id="event"
                placeholder="Enter event title"
                ref={title}
                defaultValue={editMode ? editObj.event : ""}
              />
            </div>
            <div className="col-lg-6 col-md-12 mb-3">
              <input
                onChange={(e) => setDate(e.target.value)}
                type="date"
                className="form-control"
                id="event"
                defaultValue={editMode ? editObj.date : ""}
              />
            </div>
          </div>
          <div className="mb-3">
            <input
              type="url"
              className="form-control"
              id="image"
              placeholder="Enter image URL"
              ref={image}
              defaultValue={editMode ? editObj.image : ""}
            />
          </div>
          <div className="row">
            <div className="mb-3 col-lg-5 col-md-12">
              <input
                onChange={(e) => setFrom(e.target.value)}
                type="time"
                className="form-control"
                id="from"
                defaultValue={editMode ? editObj.from : ""}
              />
            </div>
            <div
              className="col-lg-2 col-md-12"
              style={{
                marginTop: "0.3rem",
                textAlign: "center",
              }}
            >
              To
            </div>
            <div className="mb-3 col-lg-5 col-md-12">
              <input
                onChange={(e) => setTo(e.target.value)}
                type="time"
                className="form-control"
                id="to"
                defaultValue={editMode ? editObj.to : ""}
              />
            </div>
          </div>
          <div className="mb-3">
            <textarea
              type="text"
              className="form-control"
              id="message"
              placeholder="Enter event description"
              ref={description}
              defaultValue={editMode ? editObj.description : ""}
            />
          </div>
          <div className="row">
            <div className="mb-3 col-lg-6 col-md-12">
              <input
                type="text"
                className="form-control"
                id="contact-person"
                placeholder="Enter contact person name"
                ref={contactPersonName}
                defaultValue={editMode ? editObj.contactPersonName : ""}
              />
            </div>
            <div className="mb-3 col-lg-6 col-md-12">
              <input
                type="text"
                className="form-control"
                id="contact-phone"
                placeholder="Enter contact person phone number"
                ref={contactPersonPhone}
                defaultValue={editMode ? editObj.contactPersonPhone : ""}
              />
            </div>
          </div>
          {editMode ? (
            <div className="d-grid gap-2">
              <button
                onClick={editEvent}
                className="btn btn-warning"
                type="submit"
              >
                Edit Event
              </button>
            </div>
          ) : (
            <div className="d-grid gap-2">
              <button
                onClick={createEvent}
                className="btn btn-success"
                type="submit"
              >
                Create Event
              </button>
            </div>
          )}
        </form>
      </div>
      <div className="container mt-4 mb-5" style={{ oveflow: "auto" }}>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Date</th>
              <th scope="col">Message</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
              <th scope="col">Contact Person</th>
              <th scope="col">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => {
              return (
                <tr key={event._id}>
                  <td>{event.event}</td>
                  <td style={{ width: "7rem" }}>{event.date}</td>
                  <td>{event.description}</td>
                  <td>{event.from}</td>
                  <td>{event.to}</td>
                  <td>
                    {event.contactPersonName} ({event.contactPersonPhone})
                  </td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        onClick={() => createEditableObject(event._id)}
                        type="button"
                        className="btn btn-warning"
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                      <button
                        onClick={() => deleteEvent(event._id)}
                        type="button"
                        className="btn btn-danger"
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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

export default Event;
