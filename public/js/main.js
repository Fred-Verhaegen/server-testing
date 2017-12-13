var socket;
var cnv;
var gameState = 0;
var menuColor = 0;
var player;
var players = [];
var playerName;

/*****************************************************/
/*
function preload()
{
	soundFormats('mp3', 'ogg');
	mySound = loadSound('sound/menu_sound.mp3');
}
*/

function setup()
{
	socket = io.connect('http://eplgametest.fastcomet.site');

	setupListeners();

	initiateCanvas();

	/*
	mySound.setVolume(0.1);
  	mySound.play();
  	*/

}

function draw()
{
	switch(gameState)
	{
		case 0:
			menuDraw();
			break;
		case 1:
			gameDraw();
			break;
		case 2:
			overDraw();
			break;
	}
}

/*****************************************************/

function menuDraw()
{
	background(0);

	menuStateDraw();
}

function gameDraw()
{
	background(0);

	gameStateDraw();
}

function overDraw()
{
	background(0);
}

/*****************************************************/

function initiateCanvas()
{
	cnv = createCanvas(Prm.cnvWidth, Prm.cnvHeight);
	centerCanvas();
}

function windowResized()
{
	centerCanvas();
}

function centerCanvas()
{
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	cnv.position(x, y);
}

function setupListeners()
{
	// gameState
	socket.on('gameState', function(data)
	{
		if(data.gameState == 1)
		{
			data.playerObject = new Player();
			players.push(data);
		}
	});

	socket.on('gameStateInit', function(users)
	{
		for(var i = 0; i < players.length; i++)
			{
				// CARE BCS YOU WILL RENDER YOURSELF ASWELL
				players = users;
			}
	});

	// playerMove
	socket.on('playerMove', function(data)
	{
		for(var i = 0; i < players.length; i++)
		{
			if(players[i].id === data.id)
			{
				players[i].playerObject.pos = createVector(data.x, data.y);
			}
		}
	});
}