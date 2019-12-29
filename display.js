const Display = function(canvas) {
	this.buffer = document.createElement("canvas").getContext("2d");
	this.context = canvas.getContext("2d");

	this.drawRectangle = function(x, y, width, height, color) {
		this.buffer.fillStyle = color;
		this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);
	};

	this.fill = function(color) {
		const {width, height} = this.buffer.canvas;
		this.buffer.fillStyle = color;
		this.buffer.fillRect(0, 0, width, height);
	};

	this.render = function() {
		const bCanvas = this.buffer.canvas;
		const bWidth = this.buffer.canvas.width;
		const bHeight = this.buffer.canvas.height;
		const width = this.context.canvas.width;
		const height = this.context.canvas.height;
		this.context.drawImage(bCanvas, 0, 0, bWidth, bHeight, 0, 0, width, height);
	};

	this.resize = function(width, height, heightWidthRatio) {
		if (height / width  > heightWidthRatio) {
			this.context.canvas.height = width * heightWidthRatio;
			this.context.canvas.width = width;
		} else {
			this.context.canvas.height = height;
			this.context.canvas.width = height / heightWidthRatio;
		}
		this.context.imageSmoothingEnabled = false;
	};
};

Display.prototype = {
	constructor: Display
};
