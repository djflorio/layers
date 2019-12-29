window.addEventListener('load', event => {
	"use strict"

	const keyDownUp = e => {
		controller.keyDownUp(e.type, e.keyCode);
	};

	const resize = e => {
		const {clientWidth, clientHeight} = document.documentElement;
		const {height, width} = game.world;
		display.resize(clientWidth, clientHeight, height / width);
		display.render();
	};


	const render = () => {
		display.fill(game.world.backgroundColor); // clear to games bg color
		const {x, y, width, height, color} = game.world.player;
		display.drawRectangle(x, y, width, height, color);
		display.render();
	};

	const update = () => {
		if (controller.left.active) { game.world.player.moveLeft(); }
		if (controller.right.active) { game.world.player.moveRight(); }
		if (controller.up.active) {
			game.world.player.jump();
			controller.up.active = false;
		}
		game.update();
	};

	const controller = new Controller();
	const display = new Display(document.querySelector("canvas"));
	const game = new Game();
	const engine = new Engine(1000/30, render, update);

	window.addEventListener('keydown', keyDownUp);
	window.addEventListener('keyup', keyDownUp);
	window.addEventListener('resize', resize);

	resize();
	engine.start();
});
