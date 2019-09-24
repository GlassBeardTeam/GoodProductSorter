GoodProductSorter.menuState = function(game) {

}

GoodProductSorter.menuState.prototype = {

	init : function() {
		console.log("bug");
		if(game.global.DEBUG_MODE)
		{
			console.log("[DEBUG] Entering **MENU** state");
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
