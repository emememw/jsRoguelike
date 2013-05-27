function Player(x, y) {

	this.x = x;
	this.y = y;

	this.getX = function() {
		return this.x;
	}

	this.setX = function(x) {
		this.x = x;
	}

	this.getY = function() {
		return this.y;
	}

	this.setY = function(y) {
		this.y = y;
	}

	this.move = function(direction, currentMap) {
		
		var newX = this.x;
		var newY = this.y

		if(direction == "right") {
			newX++;
		} else if(direction == "left") {
			newX--;
		} else if(direction == "down") {
			newY++;
		} else if(direction == "up") {
			newY--;
		}

		if(newX != this.x || newY != this.y) {

			if(newX >= 0 && newX < currentMap.length && newY >= 0 && newY < currentMap[0].length) {
				
				if(currentMap[newX][newY] != null) {
					
					if(currentMap[newX][newY].isAccessible()) {
						this.x = newX;
						this.y = newY;
						var snd = new Audio("res/walk.wav");
						snd.play();
					} else {
						var snd = new Audio("res/block.wav");
						snd.play();
					}
				}
			}

		}

	}
}