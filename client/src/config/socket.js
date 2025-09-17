import { io } from "socket.io-client";

let socket;
const ENDPOINT = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

export function initSocket() {
  if (!socket) {
    const token = localStorage.getItem("token");

    socket = io(ENDPOINT, {
      path: "/chat",
      transports: ["websocket"],
      auth: {
        token: token,
      },
    });
  }
  return socket;
}

export function getSocket() {
  if (!socket) {
    throw new Error("Socket not initialized! Call initSocket() first.");
  }
  return socket;
}
