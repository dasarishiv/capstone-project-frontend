import { useEffect, useState } from "react";
import { socket } from "../socket";

export function Chat() {
  // console.log("chat component", socket);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [serverMessages, setServerMessages] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
      setServerMessages([]);
    }
    function onMessage(message) {
      setServerMessages((prev) => [...prev, message]);
      //   console.log("message from server", message);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onMessage);
    };
  }, []);
  const handleConnect = () => {
    socket.connect();
  };

  const handleDisconnect = () => {
    socket.disconnect();
  };

  return (
    <div className="chat">
      <h3>
        Chat {!isConnected && <button onClick={handleConnect}>Connect</button>}
        {isConnected && <button onClick={handleDisconnect}>DisConnect</button>}
      </h3>
      <div className="chat-container">
        {isConnected && serverMessages?.length > 0 && (
          <>
            <h5>{socket?.id}</h5>
            <ul>
              {serverMessages.map((msg, ind) => (
                <li key={ind}>{msg}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

/**

const socket = io();
const btn = document.getElementById("send");
const input = document.getElementById("message");
const ul = document.getElementById("list");
const grpBtn = document.getElementById("createGrp");
const joinGrpBtn = document.getElementById("joinGrp");
const stg = document.getElementById("stg");
const leaveBtn = document.getElementById("leave");

btn.addEventListener("click", () => {
  const value = input.value; // hi , hello
  const div = document.createElement("div");
  div.setAttribute("class", "sender");
  const li = document.createElement("li");
  li.innerText = value;
  const para = document.createElement("p");
  para.innerText = "sender";
  div.appendChild(para);
  div.appendChild(li);
  ul.appendChild(div);

  console.log("sending message", input.value);
  socket.emit("message", input.value);
  input.value = "";
});

socket.on("broadcast", (message) => {
  console.log("broadcast message", message);
  const div = document.createElement("div");
  div.setAttribute("class", "receiver");
  const li = document.createElement("li");
  li.innerText = message;
  const para = document.createElement("p");
  para.innerText = "receiver";
  div.appendChild(para);
  div.appendChild(li);
  ul.appendChild(div);
});

grpBtn.addEventListener("click", () => {
  console.log("group created req");
  socket.emit(
    "create_grp",
    Math.floor(Math.random(0, 1) * 1000),
    (response) => {
      console.log(response);
    }
  );
});

joinGrpBtn.addEventListener("click", () => {
  console.log("group joined req");
  socket.emit("join_grp");
});

stg.addEventListener("click", () => {
  const value = input.value;
  if (value) {
    socket.emit("grp message", value);
  }
});

leaveBtn.addEventListener("click", () => {
  socket.emit("leave_room");
});

socket.on("server_grp_msg", (data) => {
  console.log("grp message", data);
});

socket.on("message", (message) => {
  console.log("recieving message", message);
});

 */
