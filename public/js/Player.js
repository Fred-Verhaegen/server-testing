function Player()
{
	this.pos = createVector(width/2, height/2);

	this.tick = function()
	{
		this.pos.x = mouseX;
		this.pos.y = mouseY;

		var data = {x: this.pos.x, y: this.pos.y};
		socket.emit('playerMove', data);
	}

	this.render = function()
	{
		push();
		fill(255);
		ellipse(this.pos.x, this.pos.y, 40, 40);
		pop();
	}
}