//Import modules
var http = require('http');
var path = require('path');
var socketio = require('socket.io');
var express = require('express');
//Import module personnel
var players=require('./node_modules/players/players.js');
var player= new players();

//
//
//
// J'aimerai utiliser Pure mais je suis pas sûr niveaux copyrights donc ...  exemple : http://purecss.io/layouts/marketing/
//Tu as l'autorisation http://fr.wikipedia.org/wiki/Licence_BSD
//
//

var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'public')));

io.sockets.on('connection', function (socket) {  //Un client vas sur la page 
    
    socket.on('newPLayer',function(e){  //Un client se connecte
      player.new(e.username,socket.id,e.salon,e.instrument);
    });
    
    socket.on('disconnect',function(e) {  //Un client se deconnecte
        player.discoPlayer(socket.id);
    });
    
});


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});