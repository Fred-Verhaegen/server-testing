// import express module (quick setup)
var express = require('express');

// creates an express 'app' that can be used
var app = express();

// creates the server and sets it up to listen for information
var server = app.listen('https://eplgmtst.herokuapp.com');

// declares 'public' as being accessible for the public
app.use(express.static('public'));

/**************************************************************/

// import socket module (io connections)
var socket = require('socket.io');

// creates an 'app' that will keep track of inputs and outputs (for 'server')
var io = socket(server);

/**************************************************************/

var users = [];

/**************************************************************/
/** DEALING WITH EVENTS **/

// to deal with a 'new connection' event ('event', functionToHandleEvent)
io.sockets.on('connection', connected);

/**************************************************************/
/** FUNCTIONS ASSOCIATED WITH EVENTS **/

function connected(socket)
{
	// EVENTS HANDLERS HERE
	socket.on('gameState', function(data)
	{
		if(data.gameState == 1)
		{
			// adding the object to the server
			data.id = socket.id;
			users.push(data);

			// send it to all other clients
        	socket.broadcast.emit('gameState', data);
        	socket.to(socket.id).emit('gameStateInit', users);
		}

	});

	// any player move?
	socket.on('playerMove', function(data)
	{
		data.id = socket.id;
		socket.broadcast.emit('playerMove', data);

		for(var i = 0; i < users.length; i++)
		{
			users[i].pos = createVector(data.x, data.y);
		}
	});
}
