function gameStateDraw()
{
	player.tick();
	player.render();

	for(var i = 0; i < players.length; i++)
	{
		players[i].playerObject.render();
	}
}