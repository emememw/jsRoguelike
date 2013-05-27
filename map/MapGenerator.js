function MapGenerator() {

	this.generateMap = function(width, height, player) {

		var map = new Array();

		for(var x = 0; x < width; x++) {
			map[x] = new Array();
			for(var y = 0; y < height; y++) {

				map[x][y] = null;

			}
		}

		var xRoomSize = 8;
		var yRoomSize = 8;
		var xRoomCount = parseInt(width / xRoomSize);
		var yRoomCount = parseInt(height / yRoomSize);

		var globalUtil = new GlobalUtil();

		var roomArray = new Array();
		var roomArrayIndex = 0;

		while(roomArrayIndex < 3) {
			for(var xr = 0; xr < xRoomCount; xr++) {

				for(var yr = 0; yr < yRoomCount; yr++) {

					if(globalUtil.getRandomInt(0, 100) <= 50) {

						var xMax = xr * xRoomSize + xRoomSize;
						var yMax = yr * yRoomSize + yRoomSize;

						var tileArray = new Array();

						var tileArrayIndex = 0;
						for(var x = xr * xRoomSize + 1; x < xMax; x++) {
							for(var y = yr * yRoomSize + 1; y < yMax; y++) {

								if(x == xr * xRoomSize + 1 || x == xr * xRoomSize + xRoomSize - 1 || y == yr * yRoomSize + 1 || y == yr * yRoomSize + yRoomSize - 1) {
									map[x][y] = new Tile("wall");

								} else {
									map[x][y] = new Tile("floor");
									tileArray[tileArrayIndex] = new Coord(x, y);
									tileArrayIndex++;
								}

							}
						}

						var room = new Room(tileArray);
						roomArray[roomArrayIndex] = room;
						roomArrayIndex++;

					}
				}
			}
		}

		var allConnected = false;
		var connectionCount = 0;
		var lastRoom = null;
		while(!allConnected) {
			allConnected = true;
			for(var i = 0; i < roomArray.length; i++) {
				if(!roomArray[i].isConnected()) {
					allConnected = false;

					var destinationRoom = null;

					if(lastRoom == null) {
						var randomIndex = i;
						while(randomIndex == i) {
							randomIndex = globalUtil.getRandomInt(0, roomArray.length-1);
						}
						destinationRoom = roomArray[randomIndex];
					} else {
						destinationRoom = lastRoom;
					}

					var destinationTile = destinationRoom.getTileArray()[globalUtil.getRandomInt(0, destinationRoom.getTileArray.length-1)];
					var startTile = roomArray[i].getTileArray()[globalUtil.getRandomInt(0, roomArray[i].getTileArray.length-1)];
					var cursorX = startTile.getX();
					var cursorY = startTile.getY();
					map[cursorX][cursorY] = new Tile("floor");
					while(cursorX != destinationTile.getX() || cursorY != destinationTile.getY()) {
						if(globalUtil.getRandomInt(0, 1) == 1) {
							if(cursorX < destinationTile.getX()) {
								cursorX++;
							} else if(cursorX > destinationTile.getX()) {
								cursorX--;
							} else if(cursorY < destinationTile.getY()) {
								cursorY++;
							} else if(cursorY > destinationTile.getY()) {
								cursorY--;
							}
						} else {
							if(cursorY < destinationTile.getY()) {
								cursorY++;
							} else if(cursorY > destinationTile.getY()) {
								cursorY--;
							} else if(cursorX < destinationTile.getX()) {
								cursorX++;
							} else if(cursorX > destinationTile.getX()) {
								cursorX--;
							}
						}

						map[cursorX][cursorY] = new Tile("floor");
						if(map[cursorX-1][cursorY] == null) {
							map[cursorX-1][cursorY] = new Tile("wall");
						}
						if(map[cursorX+1][cursorY] == null) {
							map[cursorX+1][cursorY] = new Tile("wall");
						}
						if(map[cursorX][cursorY-1] == null) {
							map[cursorX][cursorY-1] = new Tile("wall");
						}
						if(map[cursorX][cursorY+1] == null) {
							map[cursorX][cursorY+1] = new Tile("wall");
						}
					}
					lastRoom = roomArray[i];
					roomArray[i].setConnected(true);
				}
			}
		}
		
		var randomRoom = roomArray[globalUtil.getRandomInt(0,roomArray.length-1)];
		var randomCoord = randomRoom.getTileArray()[globalUtil.getRandomInt(0,randomRoom.getTileArray().length-1)];
		player.setX(randomCoord.getX());
		player.setY(randomCoord.getY());

		return map;
	}
}