GoodProductSorter.preloadState = function(game) {

}

GoodProductSorter.preloadState.prototype = {

	init : function() {
		if(game.global.DEBUG_MODE)
		{
			console.log("[DEBUG] Entering **PRELOAD** state");
		}
	},

	preload : function() {

	},

	create : function() {
		game.state.start("menuState");
	},

	update : function() {
	
	}
}
