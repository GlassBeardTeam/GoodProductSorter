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
		game.load.spritesheet('band', 'assets/images/scenario/BandSpriteSheet.png', 197, 712, 2);
		game.load.image('background1_1', 'assets/images/scenario/background1_1.png');
		//game.load.image('band0', 'assets/images/scenario/Band0.png');
		//game.load.image('band1', 'assets/images/scenario/Band1.png');
	},

	create : function() {
		game.state.start("menuState");
	},

	update : function() {
	
	}
}
