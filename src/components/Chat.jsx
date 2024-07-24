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
    <div className="chat p-6 max-w-sm bg-white rounded-xl shadow-lg flex flex-col">
      <div className="w-full flex items-center space-x-4">
        <div className="shrink-0">
          <svg
            className="h-12 w-12"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a">
                <stop stopColor="#2397B3" offset="0%"></stop>
                <stop stopColor="#13577E" offset="100%"></stop>
              </linearGradient>
              <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="b">
                <stop stopColor="#73DFF2" offset="0%"></stop>
                <stop stopColor="#47B1EB" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
              <path
                d="M28.872 22.096c.084.622.128 1.258.128 1.904 0 7.732-6.268 14-14 14-2.176 0-4.236-.496-6.073-1.382l-6.022 2.007c-1.564.521-3.051-.966-2.53-2.53l2.007-6.022A13.944 13.944 0 0 1 1 24c0-7.331 5.635-13.346 12.81-13.95A9.967 9.967 0 0 0 13 14c0 5.523 4.477 10 10 10a9.955 9.955 0 0 0 5.872-1.904z"
                fill="url(#a)"
                transform="translate(1 1)"
              ></path>
              <path
                d="M35.618 20.073l2.007 6.022c.521 1.564-.966 3.051-2.53 2.53l-6.022-2.007A13.944 13.944 0 0 1 23 28c-7.732 0-14-6.268-14-14S15.268 0 23 0s14 6.268 14 14c0 2.176-.496 4.236-1.382 6.073z"
                fill="url(#b)"
                transform="translate(1 1)"
              ></path>
              <path
                d="M18 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM24 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM30 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                fill="#FFF"
              ></path>
            </g>
          </svg>
        </div>
        <div className="flex flex-row justify-between flex-1">
          <div className="text-xl font-medium text-black flex-1">Chat</div>
          {!isConnected && (
            <button
              className="px-4 py-1 text-sm text-blue-600 font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              onClick={handleConnect}
            >
              Connect
            </button>
          )}
          {isConnected && (
            <button
              className="px-4 py-1 text-sm text-blue-600 font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              onClick={handleDisconnect}
            >
              Disconnect
            </button>
          )}
        </div>
      </div>

      {isConnected && (
        <div className="chat-container mt-4">
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
      )}
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
