const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const port = 3001;

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    // origin: "https://example.com",
  },
});

io.on("connection", (socket) => {
  console.log("connect");
  console.log(socket.id);

  socket.onAny((eventName, ...args) => {
    console.log("onAny", eventName);
  });

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    socket.emit("chat message1111", msg + "js");
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("ping", (count) => {
    console.log(count);
  });

  socket.prependAny((eventName, ...args) => {
    console.log("prependAny", eventName);
  });
});

httpServer.listen(port, () => {
  console.log(`listening on *:${port}`);
});
