import { io } from "socket.io-client";

const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const socket = io(URL, {
  autoConnect: false, // We will connect manually
});
