import { useEffect, useRef, useState } from "react";
import axios from "axios";

const url = process.env.REACT_APP_API_URL + "/announcements";

function Announcement() {
  /* Announcement List */
  const [announcements, setAnnouncements] = useState([]);

  /* Create editable object */
  const [editMode, setEditMode] = useState(false);
  const [editObj, setEditObj] = useState({});

  /* Operation status */
  const [warning, setWarning] = useState("");
  const [msg, setMsg] = useState("");

  /* Form fields */
  const announcement = useRef("");
  const area = useRef("");
  const message = useRef("");
  const contactPersonName = useRef("");
  const contactPersonPhone = useRef("");
  const [importance, setImportance] = useState("");

  /**
   * @desc Create an announcement
   * @request POST
   */
  const createAnnouncement = async () => {
    if (
      announcement.current.value === "" ||
      area.current.value === "" ||
      message === "" ||
      importance === ""
    ) {
      setWarning("All fields are mandatory!");
      setTimeout(() => setWarning(""), 2000);
      setMsg("");
      return;
    }

    try {
      setMsg("Creating announcement please wait...");

      if (JSON.parse(localStorage.getItem("whatzup_user"))) {
        const response = await axios.post(
          url,
          {
            announcement: announcement.current.value,
            area: area.current.value,
            message: message.current.value,
            contactPersonName: contactPersonName.current.value,
            contactPersonPhone: "+91" + contactPersonPhone.current.value,
            importance: importance,
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

        getAllAnnouncements();
        setWarning("");
        setMsg(response.data.msg);
        setTimeout(() => setMsg(""), 2500);
      }
    } catch (err) {
      setWarning("Something went wrong while creating announcement...");
      setMsg("");
    }
  };

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

  /**
   * @desc Delete announcement
   */
  const deleteAnnoucement = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      setWarning("");
      getAllAnnouncements();
    } catch (err) {
      setWarning("Something went wrong while fetching announcements...");
    }
  };

  useEffect(() => {
    getAllAnnouncements();
  }, []);

  /**
   * @desc Edit announcement
   */
  const editAnnouncement = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "/announcements/edit";

      await axios.patch(`${url}/${editObj._id}`, {
        announcement: announcement.current.value,
        area: area.current.value,
        message: message.current.value,
        contactPersonName: contactPersonName.current.value,
        contactPersonPhone: contactPersonPhone.current.value,
        importance: importance || editObj.importance,
      });

      setEditObj({});
      setWarning("");
      setMsg("Event edited!");
      setEditMode(false);
      setTimeout(() => setMsg(""), 2000);
      getAllAnnouncements();
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
    const announcement = announcements.find(
      (announcement) => announcement._id === id
    );
    setEditObj(announcement);
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
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="announcement"
              placeholder="Enter announcement title"
              ref={announcement}
              defaultValue={editMode ? editObj.announcement : ""}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="area"
              placeholder="Enter area"
              ref={area}
              defaultValue={editMode ? editObj.area : ""}
            />
          </div>
          <div className="mb-3">
            <textarea
              type="text"
              className="form-control"
              id="message"
              placeholder="Enter message"
              ref={message}
              defaultValue={editMode ? editObj.message : ""}
            />
          </div>
          <div className="row">
            <div className="mb-3 col-6">
              <input
                type="text"
                className="form-control"
                id="contact-person"
                placeholder="Enter contact person name"
                ref={contactPersonName}
                defaultValue={editMode ? editObj.contactPersonName : ""}
              />
            </div>
            <div className="mb-3 col-6">
              <input
                type="text"
                className="form-control"
                id="contact-number"
                placeholder="Enter contact person phone number"
                ref={contactPersonPhone}
                defaultValue={editMode ? editObj.contactPersonPhone : ""}
              />
            </div>
          </div>
          <div className="mb-3">
            <div className="text-muted lead">Importance: </div>
            <div className="d-flex justify-content-evenly">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="low"
                  value="LOW"
                  onChange={(e) => setImportance(e.target.value)}
                />
                <label className="form-check-label" htmlFor="low">
                  Low
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="moderate"
                  value="MODERATE"
                  onChange={(e) => setImportance(e.target.value)}
                />
                <label className="form-check-label" htmlFor="moderate">
                  Moderate
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="high"
                  value="HIGH"
                  onChange={(e) => setImportance(e.target.value)}
                />
                <label className="form-check-label" htmlFor="high">
                  High
                </label>
              </div>
            </div>
          </div>
          {editMode ? (
            <div className="d-grid gap-2">
              <button
                onClick={editAnnouncement}
                className="btn btn-warning"
                type="submit"
              >
                Edit Announcement
              </button>
            </div>
          ) : (
            <div className="d-grid gap-2">
              <button
                onClick={createAnnouncement}
                className="btn btn-success"
                type="submit"
              >
                Create Announcement
              </button>
            </div>
          )}
        </form>
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
      <div className="container mt-4 mb-5" style={{ oveflow: "auto" }}>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Area</th>
              <th scope="col">Message</th>
              <th scope="col">Contact Person</th>
              <th scope="col">Importance</th>
              <th scope="col">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement) => {
              return (
                <tr key={announcement._id}>
                  <td>{announcement.announcement}</td>
                  <td>{announcement.area}</td>
                  <td>{announcement.message}</td>
                  <td>
                    {announcement.contactPersonName} (
                    {announcement.contactPersonPhone})
                  </td>
                  <td>{announcement.importance}</td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        onClick={() => createEditableObject(announcement._id)}
                        type="button"
                        className="btn btn-warning"
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                      <button
                        onClick={() => deleteAnnoucement(announcement._id)}
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
    </div>
  );
}

export default Announcement;
