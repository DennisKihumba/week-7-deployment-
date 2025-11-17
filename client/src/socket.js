import { io } from "socket.io-client";

const socket = io("https://websocket-io-bynr.onrender.com", {
  transports: ["websocket", "polling"]
});

export default socket;
