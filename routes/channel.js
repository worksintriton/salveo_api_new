module.exports = function (server, numUsers) {
    numUsers = 0;
    const io = require('socket.io')(server);
    io.sockets.on("connection", function (socket) {
        console.log("Connected");
        
        // convenience function to log server messages on the client
        function log() {
            var array = ["Message from server:"];
            array.push.apply(array, arguments);
            socket.emit("log", array);
        }

        socket.on("message", function (message) {
            console.log("Message", message);
            log("Client said: ", message);
            // for a real app, would be room-only (not broadcast)
            socket.broadcast.emit("message", message);
        });

        socket.on("create or join", function (room) {
            ++numUsers;
            console.log("Create or Join", numUsers);
            // io.of('/').in("some_room_name").clients((err, clients) => {
            //     console.log(clients) // an array of socket ids
            // })
            console.log("Connected", room);
            console.log("Received request to create or join room " + room);
            var numClients = io.sockets.sockets.length;
            numClients = numUsers;
           console.log("Room " + room + " now has " + numClients + " client(s)");

            if (numClients === 1) {
                socket.join(room);
                console.log("Client ID " + socket.id + " created room " + room);
                console.log("socket id of the client...", socket.id)
                console.log("Client ID " + socket.id + " created room " + room);
                socket.emit("created", room, socket.id);
            } else if (numClients >= 2) {
                console.log("Client ID " + socket.id + " joined room " + room);
               // console.log("Client ID " + socket.id + " joined room " + room);
                io.sockets.in(room).emit("join", room);
                socket.join(room);
                socket.emit("joined", room, socket.id);
                io.sockets.in(room).emit("ready");
            } else {
                // max 5 clients
                socket.emit("full", room);
            }
        });

        socket.on("ipaddr", function () {
            console.log("IP Address");
            var ifaces = os.networkInterfaces();
            for (var dev in ifaces) {
                ifaces[dev].forEach(function (details) {
                    if (details.family === "IPv4" && details.address !== "127.0.0.1") {
                        socket.emit("ipaddr", details.address);
                    }
                });
            }
        });

        socket.on("Leave", function () {
             socket.emit("left", room, socket.id);
            socket.leave(room);
            console.log("user left the room");
        });

        socket.on('disconnect', function() {
            --numUsers;
            console.log("received bye");
        });
    });
}