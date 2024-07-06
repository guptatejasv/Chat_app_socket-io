const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
  res.sendFile("/public/index.html");
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg, socket.id);
  });
  console.log(`New user Connected ${socket.id}`);
});

server.listen(8000, () => {
  console.log(`Server listen at port 9000`);
});
