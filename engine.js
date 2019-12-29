const Engine = function(timeStep, update, render) {
	this.accumulatedTime = 0;
	this.animationFrameRequest = undefined;
	this.time = undefined;
	this.timeStep = timeStep;

	this.updated = false;

	this.update = update;
	this.render = render;

	this.run = function(timeStamp) {
		this.accumulatedTime += timeStamp - this.time;
		this.time = timeStamp;

		if (this.accumulatedTime >= this.timeStep * 3) {
			this.accumulatedTime = this.timeStep;
		}

		while(this.accumulatedTime >= this.timeStep) {
			this.accumulatedTime -= this.timeStep;
			this.update(timeStep);
			this.updated = true;
		}

		if (this.updated) {
			this.updated = false;
			this.render(timeStep);
		}

		this.animationFrameRequest = window.requestAnimationFrame(this.handleRun);
	};
	this.handleRun = timeStep => this.run(timeStep);
};

Engine.prototype = {
	constructor: Engine,
	start: function() {
		this.accumulatedTime = this.timeStep;
		this.time = window.performance.now();
		this.animationFrameRequest = window.requestAnimationFrame(this.handleRun);
	},
	stop: function() {
		window.cancelAnmiationFrame(this.animationFrameRequest);
	}
};
