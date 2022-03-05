import { useState } from "react";
import { useGlobalContext } from "../context";

import ChatRoom from "../components/ChatRoom";
import io from "socket.io-client";

/* Socket io conenction */
const socket = io("https://whatzzzup.herokuapp.com/");

function Chat() {
  const [room, setRoom] = useState("");
  const [warning, setWarning] = useState("");
  const { userName } = useGlobalContext();
  const [roomJoined, setRoomJoined] = useState(false);

  /**
   * @desc Function to join chat room
   */
  const joinRoom = () => {
    if (room !== "" && userName !== "") {
      setRoomJoined(true);
      socket.emit("join_room", room);
    } else {
      setWarning("Please choose a room!");
      setTimeout(() => setWarning(""), 2000);
    }
  };

  return (
    <div style={{ marginTop: "5rem" }}>
      <div
        className="container p-4"
        style={{ border: "1px solid lightgray", borderRadius: "1rem" }}
      >
        <select
          onChange={(e) => setRoom(e.target.value)}
          className="form-select mb-3"
          aria-label="Default select example"
        >
          <option>Select Chat Room</option>
          <option value="Drawing Competition">Drawing Competition</option>
          <option value="Founder's Day">Founder's Day</option>
        </select>
        <div className="d-grid gap-2 mb-1">
          <button onClick={joinRoom} className="btn btn-primary" type="button">
            Join Room
          </button>
        </div>
        <div className="text-muted">
          NOTE: You need to choose a room for starting/joining a chat!
        </div>
        {warning ? (
          <div
            className="d-flex mt-3 justify-content-center alert alert-danger"
            role="alert"
          >
            {warning}
          </div>
        ) : null}
      </div>
      {room && roomJoined && userName ? (
        <ChatRoom
          socket={socket}
          userName={userName}
          room={room}
          roomJoined={roomJoined}
          setRoomJoined={setRoomJoined}
        />
      ) : null}
    </div>
  );
}

export default Chat;
