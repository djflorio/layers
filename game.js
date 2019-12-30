const Game = function() {
	this.world = {
		backgroundColor: "rgba(40, 48, 56, 0.25)",
		friction: 0.9,
		gravity: 3,
		player: new Game.Player(),
		height: 72,
		width: 128,
		collideObject: function(object) {
			if (object.x < 0) { object.x = 0; object.velocityX = 0; }
			else if (object.x + object.width > this.width) {
				object.x = this.width - object.width;
				object.velocityX = 0;
			}
			if (object.y < 0) { object.y = 0; object.velocityY = 0; }
			else if (object.y + object.height > this.height) {
				object.jumping = false;
				object.y = this.height - object.height;
				object.velocityY = 0;
			}
		},
		update: function() {
			this.player.velocityY += this.gravity;
			this.player.update();
			this.player.velocityX *= this.friction;
			this.player.velocityY *= this.friction;
			this.collideObject(this.player);
		}
	};

	this.update = function() {
		this.world.update();
	};
};

Game.prototype = {
	constructor: Game
};

Game.Player = function(x, y) {
	this.color = "#ff0000";
	this.height = 16;
	this.jumping = true;
	this.velocityX = 0;
	this.velocityY = 0;
	this.width = 16;
	this.x = 100;
	this.y = 50;
};

Game.Player.prototype = {
	constructor: Game.Player,
	jump: function() {
		if (!this.jumping) {
			this.jumping = true;
			this.velocityY -= 20;
		}
	},
	moveLeft: function() { this.velocityX -= 0.5; },
	moveRight: function() { this.velocityX += 0.5; },
	update: function() {
		this.x += this.velocityX;
		this.y += this.velocityY;
	}
};
