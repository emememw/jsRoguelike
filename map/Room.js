function Room(tileArray) {
	
	this.tileArray = tileArray;
	var connected = false;
	
	this.getTileArray = function() {
		return this.tileArray;
	}
	
	this.isConnected = function() {
		return this.connected;
	}
	
	this.setConnected = function(connected) {
		this.connected = connected;
	}
	
}
