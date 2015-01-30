var http = require('http'), io = require('socket.io');

// Start the server at port 8080
var port= process.env.PORT || 8080;
var server = http.createServer(function(req, res){ 

    // Send HTML headers and message
    res.writeHead(200,{ 'Content-Type': 'text/html' }); 
    res.end('<h1>Hello Socket Lover!</h1>');
});
io.configure (function () { 
  io.set ("transports", ["xhr-polling"]); 
  io.set ("polling duration", 10); 
});
server.listen(port);

// Create a Socket.IO instance, passing it our server
var socket = io.listen(server);

// Add a connect listener
socket.on('connection', function(client){ 
console.log("connectedd");
    // Create periodical which ends a message to the client every 5 seconds
    var interval = setInterval(function() {
        client.send('This is a message from the server!  ' + new Date().getTime());
    },1000);

    // Success!  Now listen to messages to be received
    client.on('message',function(event){ 
        console.log('Received message from client!',event);
    });
    client.on('disconnect',function(){
        clearInterval(interval);
        console.log('Server has disconnected');
    });

});
