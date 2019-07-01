"use strict";
var config = require('./config');
var path = require('path');
//var logger = require('morgan');
var http = require('http');

var server = http.createServer().listen(config.get('port'),config.get('ip'), function(){
  console.log('Express server listening on port=' + config.get('port')+",  ip="+config.get('ip'));
});

var value2={};

var io = require('socket.io')(server);
io.sockets.on('connection', function (client) {
//console.log('new!');

client.emit('whu',value2);
client.broadcast.emit('whuN');
client.on("whuS",function () {
client.emit('whu', value2);
});

client.on("addB",function (data) {
if(data[0].length<33&&data[1].length<1010){
value2[data[0]]=data[1];
client.emit('whu', value2);
client.broadcast.emit('whuN');
}//if
});

client.on("delB",function (data) {
delete value2[data];
client.emit('whu', value2);
client.broadcast.emit('whuN');
});

client.on("delAll",function () {
value2={};
client.emit('whu', value2);
client.broadcast.emit('whuN');
});

});
