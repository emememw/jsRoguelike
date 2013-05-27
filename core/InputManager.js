function InputManager(game) {
	
	function keyDown(evt) {
		game.handleKeyDownEvent(evt);
	}
	
	function keyUp(evt) {
		game.handleKeyUpEvent(evt);
	}
	
	this.init = function() {
		window.addEventListener("keydown", keyDown, false);
		window.addEventListener("keyup", keyUp, false);
	}
	
	
	
	
	
}
