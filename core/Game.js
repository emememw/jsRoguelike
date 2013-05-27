function Game() {

	var canvas;
	var context;
	var inputManager;
	var tilesheet;
	var spritesheet;
	var currentMap;
	var player;
	var animFlag = false;
	var tickCount = 0;
	var viewRadius;
	var lightRadius = 3;
	var tilesize = 32;
	var currentKeyCode = new Array();
	var inputDelay = 0;
	var rayCaster;

	this.init = function() {
		canvas = document.getElementById("canvas");
		context = canvas.getContext("2d");
		context.fillStyle = "rgb(0,0,0)";
		context.fillRect(0, 0, canvas.width, canvas.height);
		viewRadius = canvas.width / tilesize;
		inputManager = new InputManager(this);
		inputManager.init();
		tilesheet = new Image();
		tilesheet.src = "res/tilesheet.png";
		spritesheet = new Image();
		spritesheet.src = "res/spritesheet.png";
		player = new Player(1, 1);
		currentMap = new MapGenerator().generateMap(20, 20, player);
		//rayCaster = new RayCaster();
		//rayCaster.cast(player, currentMap, viewRadius);
		setInterval(loop, 1000 / 60);
	}

	this.handleKeyUpEvent = function(evt) {
		if(evt.keyCode == 39) {
			currentKeyCode["right"] = false;
		} else if(evt.keyCode == 37) {
			currentKeyCode["left"] = false;
		} else if(evt.keyCode == 40) {
			currentKeyCode["down"] = false;
		} else if(evt.keyCode == 38) {
			currentKeyCode["up"] = false;
		}

	}

	this.handleKeyDownEvent = function(evt) {
		if(evt.keyCode == 39) {
			currentKeyCode["right"] = true;
		} else if(evt.keyCode == 37) {
			currentKeyCode["left"] = true;
		} else if(evt.keyCode == 40) {
			currentKeyCode["down"] = true;
		} else if(evt.keyCode == 38) {
			currentKeyCode["up"] = true;
		}

	}
	function tick() {

		if(tickCount % 40 == 2) {
			animFlag = !animFlag;
		}
		if(inputDelay == 0) {
			if(currentKeyCode["right"] == true || currentKeyCode["left"] || currentKeyCode["up"] || currentKeyCode["down"]) {
				var direction = "";

				if(currentKeyCode["right"]) {
					direction = "right";
				} else if(currentKeyCode["left"]) {
					direction = "left";
				} else if(currentKeyCode["down"]) {
					direction = "down";
				} else if(currentKeyCode["up"]) {
					direction = "up";
				}

				if(direction != "") {
					player.move(direction, currentMap);
					inputDelay = 10;
					//rayCaster.cast(player, currentMap, viewRadius);
				}

			}
		} else {
			inputDelay--;
		}
		tickCount++;
	}

	function render() {

		context.fillStyle = "rgb(0,0,0)";
		context.fillRect(0, 0, canvas.width, canvas.height);

		if(currentMap != null) {
			var xMin = player.getX() - viewRadius;
			if(xMin < 0) {
				xMin = 0;
			}
			var xMax = player.getX() + viewRadius;
			if(xMax >= currentMap.length) {
				xMax = currentMap.length - 1;
			}
			var yMin = player.getY() - viewRadius;
			if(yMin < 0) {
				yMin = 0;
			}
			var yMax = player.getY() + viewRadius;
			if(yMax >= currentMap[0].length) {
				yMax = currentMap[0].length - 1;
			}

			for(var x = xMin; x <= xMax; x++) {
				for(var y = yMin; y <= yMax; y++) {
					if(currentMap[x][y] != null) {
						context.drawImage(tilesheet, 32 * currentMap[x][y].getTileX(), 32 * currentMap[x][y].getTileY(), 32, 32, (x * tilesize - player.getX() * tilesize) + canvas.width / 2, (y * tilesize - player.getY() * tilesize) + canvas.height / 2, tilesize, tilesize);
						context.fillStyle = "rgba(0,0,0," + currentMap[x][y].getAlpha() + ")";
						context.fillRect((x * tilesize - player.getX() * tilesize) + canvas.width / 2, (y * tilesize - player.getY() * tilesize) + canvas.height / 2, tilesize, tilesize);
					}
				}
			}

		}

		if(player != null) {
			if(animFlag) {
				context.drawImage(spritesheet, 0, 0, 32, 32, canvas.width / 2, canvas.height / 2, tilesize, tilesize);
			} else {
				context.drawImage(spritesheet, 1 * 32, 0, 32, 32, canvas.width / 2, canvas.height / 2, tilesize, tilesize);
			}
		}

	}

	function loop() {
		tick();
		render();
	}

}
