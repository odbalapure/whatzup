import { useEffect, useState } from "react";

function ChatRoom({ socket, userName, setRoomJoined, room }) {
  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);

  /**
   * @desc Send a message
   */
  const sendMsg = async () => {
    if (msg === "") {
      return;
    }

    const msgData = {
      room,
      author: userName,
      message: msg,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
      msgId: Date.now().toString(),
    };

    await socket.emit("send_msg", msgData);
    setMsgList((prev) => [...prev, msgData]);
  };

  /**
   * @desc Check for new messages
   */
  useEffect(() => {
    // Check for an event emitted from a server
    socket.on("recieve_msg", (data) => {
      setMsgList((prev) => [...prev, data]);
    });
  }, [socket]);

  /* Handle form submission */
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
  };

  /**
   * @desc Close or change chat window
   */
  const closeChat = () => {
    console.log("Close chat");
    setRoomJoined(false);
  };

  return (
    <div
      className="container"
      style={{ marginTop: "2rem", marginBottom: "2rem" }}
    >
      <div style={{ height: "30rem" }} className="card">
        <div className="card-header fs-4 d-flex justify-content-between">
          <div>{room}</div>
          <div style={{ cursor: "pointer" }} onClick={closeChat}>
            <i
              className="bi bi-x-circle-fill"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Click to close this chat window"
            ></i>
          </div>
        </div>
        <div style={{ overflow: "auto" }} className="card-body">
          {msgList.map((msg) => {
            return (
              <div
                style={{
                  border: "1px solid lightgray",
                  borderRadius: "1rem",
                  backgroundColor:
                    msg.author === userName ? "yellowgreen" : "dodgerblue",
                }}
                className="w-20 mb-3 p-3"
                key={msg.msgId}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Your messages will appear green"
              >
                <div>
                  {msg.author} ({msg.time})
                </div>
                <div className="lead">{msg.message}</div>
              </div>
            );
          })}
        </div>
        <div className="card-footer">
          <form
            onSubmit={handleSubmit}
            className="d-flex justify-content-around align-items-center"
          >
            <div style={{ width: "90%" }}>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => setMsg(e.target.value)}
                style={{ borderRadius: "2rem" }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-success bi bi-send-fill"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Send Message"
              onClick={sendMsg}
              style={{ borderRadius: "2rem" }}
            ></button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
