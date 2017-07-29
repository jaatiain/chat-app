var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

console.log(__dirname);

app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', require(__dirname + '/socket'));

http.listen(3001, function(){
  console.log('listening on *:3001');
});
