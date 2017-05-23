"use strict"

module.exports = function (io) {
    io.on('connection', function(socket){
        socket.on('message', function(msg){
            io.emit('message', msg);
        });

        socket.on('join_room', function(data){
            socket.join(data.room);
            socket.broadcast.to(data.room).emit('message', data.message);
        })

    });

}
