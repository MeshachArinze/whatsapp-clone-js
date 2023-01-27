const { Server } = require("socket.io");
const { createServer } = require("http");

const httpServer = createServer();


const io = new Server(httpServer, {
  allowRequest: (req, callback) => {
    // disable cors origin request
    const noOriginHeader = req.headers.origin === undefined;
    callback(null, noOriginHeader); // only allow requests without 'origin' header
  },
});
console.log(io);

// in a middleware
io.use(async (socket, next) => {
  try {
    const user = await fetchUser(socket);
    socket.user = user;
  } catch (e) {
    next(new Error("unknown user"));
  }
});

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  console.log(id);
  socket.join(id);

  socket.use(([event, ...args], next) => {
    if (isUnauthorized(event)) {
      return next(new Error("unauthorized event"));
    }
    // do something with the packet (logging, authorization, rate limiting...)
    // do not forget to call next() at the end
    next();
  });

  socket.on("error", (err) => {
    if (err && err.message === "unauthorized event") {
      socket.disconnect();
    }
  });

  socket.on("send-message", ({ recipients, text }) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
  });
});

io.listen(3000);
