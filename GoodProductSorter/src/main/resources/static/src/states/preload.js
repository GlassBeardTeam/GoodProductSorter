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
		//Cargar imagenes Menu
		game.load.image("fondoMenu", 'assets/characters/boss.png');
		game.load.image("landscape", 'assets/landscape.png');
		
		game.load.spritesheet('band', 'assets/images/scenario/BandSpriteSheet.png', 197, 712, 2);
		game.load.image('background1_1', 'assets/images/scenario/background1_1.png');
		game.load.image('buttonBackground', "assets/images/interface/buttonBackground.png");
	},

	create : function() {
		game.state.start('gameTitleState');
	},

	update : function() {
	
	}
}
