GoodProductSorter.world1State = function(game) {

}

GoodProductSorter.world1State.prototype = {

	init : function() {
		if(game.global.DEBUG_MODE)
		{
			console.log("[DEBUG] Entering **World1** state");
		}
	},

	preload : function() {
	},

	create : function() {
		game.state.start("gameState");
	},

	update : function() {
	
	}
}
