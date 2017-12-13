function menuStateDraw()
{
	/** Menu **/
	push();
	textSize(100);
	textAlign(CENTER);
	fill(0, menuColor, menuColor);
	text('EPL Game', width/2, 200);
	pop();

	push();
	textSize(20);
	textAlign(CENTER);
	fill(menuColor, 0, 0);
	text('By Fred Verhaegen', width/2, 235);
	pop();

	/** Play button **/
	push();
	fill('Grey');
	ellipse(width/2, 400, menuColor-40, menuColor-40);
	pop();

	push();
	textSize(50);
	textAlign(CENTER);
	fill(menuColor, menuColor, menuColor);
	text('Play', width/2, 415);
	pop();

	push();
	textSize(10);
	textAlign(CENTER);
	fill(menuColor, menuColor, menuColor);
	text('Version Alpha 0.0.1', width/2, 580);
	pop();

	if(menuColor <= 180)
	{
		menuColor += 1.5;
	}

	// If button is pressed
	if(dist(mouseX, mouseY, width/2, 400) <= 80 && mouseIsPressed)
	{
		playerName = prompt('Please choose a name');

		if(playerName)
		{
			// Starts the game
			var data = {gameState: 1, playerName: playerName};
			socket.emit('gameState', data);

			// creating player
			player = new Player();

			gameState = 1;
		}
		mouseIsPressed = false;
	}
}