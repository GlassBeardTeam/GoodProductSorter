GoodProductSorter.gameState = function(game) {

this.aKey;
this.dKey;
//Game objects
this.background;
this.band;
}

GoodProductSorter.gameState.prototype = {

	
	init : function() {
		if(game.global.DEBUG_MODE)
		{
			console.log("[DEBUG] Entering **GAME** state");
		}
		this.band = new Item("Banda");
		this.background = new Item("background1_1");
		this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
		this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
	},

	preload : function() {
		//Background
		this.background.setItemImage(game.add.sprite(game.world.centerX, game.world.centerY, 'background1_1'));
		//
		//Banda transportadora
		this.band.setItemImage(game.add.sprite(game.world.centerX, game.world.centerY, 'band'));
		this.band.image.animations.add('move');
		this.band.playItemAnimation('move', 2, true);
		//
	},

	create : function() {
	},

	update : function() {
		if(this.dKey.isDown)
		{
			if(this.band.image.animations.getAnimation('move').speed < 10)
				this.band.image.animations.getAnimation('move').speed +=1;
		}
	}
}
