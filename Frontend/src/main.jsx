import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "react-redux";
import {store} from "./Store/store.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { io } from "socket.io-client";
// export const socket = io("http://localhost:8000", {
//   transports: ["websocket"], // Ensures WebSocket connection
// });
// socket.on("connect", () => {
//   console.log("Connected to server with socket ID:", socket.id);
// });

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  </BrowserRouter>,
)
