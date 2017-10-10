module.exports = (io) => {
    var usernames = [];

    io.sockets.on("connection", function (socket) {
        console.log("Have a new user connected");
        socket.on('disconnect', function () {
            console.log('User disconnected');
        });

        socket.on('room', function (room) {
            console.log("room-----", room);
            socket.join(room);
        });

        socket.on('leave-room', function (room) {
            console.log("roomId ----", room);
            socket.leave(room);
        });

        socket.on("save-message", function (data) {
            console.log("save-message", data);
            socket.to(data.room).emit("new-message", data);
        });

    });
}