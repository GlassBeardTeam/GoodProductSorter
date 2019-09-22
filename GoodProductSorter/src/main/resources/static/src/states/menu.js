GoodProductSorter.menuState = function(game) {
	this.startGameKey;
}

GoodProductSorter.menuState.prototype = {

	init : function() {
		console.log("bug");
		if(game.global.DEBUG_MODE)
		{
			console.log("[DEBUG] Entering **MENU** state");
		}
		this.startGameKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},

	preload : function() {

	},

	create : function() {
		this.startGameKey.onDown.add(()=>
		{
			let message= {
				event: "INIT_GAME"
			}
			game.global.socket.send(JSON.stringify(message));
		}, this);
	},

	update : function() {

			//game.state.start("gameState");
	}

}
