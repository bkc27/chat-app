const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

// JUST THE CHAT.....
// io.on("connection", (socket) => {
//   socket.on("chat message", (data) => {
//     io.emit("chat message", data);
//   });
// });

// IF YOU WANT THAT WHO JOINED WHO LEAVED..
io.on("connection", (socket) => {

  socket.on("join", (name) => {
    socket.username = name;

    io.emit("chat message", {
      name: "System",
      text: name + " joined the chat"
    });
  });

  socket.on("chat message", (data) => {
    io.emit("chat message", data);
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      io.emit("chat message", {
        name: "System",
        text: socket.username + " left the chat"
      });
    }
  });
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});