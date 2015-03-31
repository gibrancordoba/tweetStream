var cfg = require('./config.json');
var tw = require('node-tweet-stream')(cfg);

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use('/public', express.static('public'));



app.get('/', function(req, res){
  res.render('index');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


tw.track('socket.io');
tw.track('javascript');
tw.on('tweet', function(tweet){
	// console.log(tweet);
  io.emit('tweet', tweet);
});