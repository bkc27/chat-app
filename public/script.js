const socket = io();

const nameInput = document.getElementById("name");
const joinBtn = document.getElementById("joinBtn");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");
const chatBox = document.getElementById("chatBox");

let username = "";

joinBtn.addEventListener("click", function () {
  username = nameInput.value.trim();

  if (username === "") {
    alert("Enter your name");
    return;
  }
// ONLY ALERT IF YOU JOINED
//   alert("You joined as " + username);

//   SHOW WHO JOINED AND WHO LEFT THE CHAT...
socket.emit("join", username);
alert("You joined as " + username);
});

sendBtn.addEventListener("click", function () {
  const message = messageInput.value.trim();

  if (message === "") {
    return;
  }

  socket.emit("chat message", {
    name: username || "Anonymous",
    text: message
  });

  messageInput.value = "";
});

socket.on("chat message", function (data) {
  const p = document.createElement("p");
  p.innerText = data.name + ": " + data.text;
  chatBox.appendChild(p);
});