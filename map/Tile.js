function Tile(type) {	
	
	var accessible;
	var alpha = 0;
	this.type = type;
	
	var tileX = 0;
	var tileY = 0;
	
	if(type == "floor") {
		tileX = 0;
		tileY = 0;
		accessible = true;
	} else if(type == "wall") {
		tileX = 1;
		tileY = 0;
		accessible = false;
	} else if(type == "door") {
		tileX = 2;
		tileY = 0;
		accessible = true;
	} 
	
	this.isAccessible = function() {
		return accessible;
	}
	
	this.getTileX = function() {
		return tileX;
	}
	
	this.getTileY = function() {
		return tileY;
	}
	
	this.isVisible = function() {
		return visible;
	}
	
	this.setVisible = function(state) {
		visible = state;
	} 
	
	this.setAlpha = function(alphaLevel) {
		alpha = alphaLevel;
	}
	
	this.getAlpha = function() {
		return alpha;
	}
	
}
