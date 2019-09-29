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
		this.CajaIz = new Item("BocetoCaja");
		this.CajaDer = new Item("BocetoCaja");
		this.background = new Item("background1_1");
		this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
		this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
	},

	preload : function() {
		//Background
        this.background = this.add.image(0, 0, "SueloFabrica");
        this.background.height = this.game.height;
        this.background.width = this.game.width;
		
		//Banda transportadora
		this.band.setItemImage(game.add.sprite(game.world.centerX, game.world.centerY, 'BandSpriteSheet'));
		//this.band.image.animations.add('move');
		//this.band.playItemAnimation('move', 2, true);
		this.CajaIz.setItemImage(game.add.sprite(game.world.width*0.15, game.world.centerY, 'BocetoCaja'));
		this.CajaDer.setItemImage(game.add.sprite(game.world.width-(game.world.width*0.15), game.world.centerY, 'BocetoCaja'));
		//
		
		

	},
	resize: function () {

		this.background.height = this.world.height;
		this.background.width = this.world.width;

		//Banda transportadora
		this.band.image.width=this.world.width*0.4;
		this.band.image.height=this.world.height;
		this.band.image.x=game.world.centerX;
		this.band.image.y=game.world.centerY;
		
		//Caja Izquierda
		this.CajaIz.image.width=this.world.width*0.3;
		this.CajaIz.image.height=this.world.height*0.2;
		this.CajaIz.image.x=game.world.width*0.15;
		this.CajaIz.image.y=game.world.centerY;
		
		//Caja Derecha
		this.CajaDer.image.width=this.world.width*0.3;
		this.CajaDer.image.height=this.world.height*0.2;
		this.CajaDer.image.x=game.world.width-(game.world.width*0.15);
		this.CajaDer.image.y=game.world.centerY;
	},



	create : function() {
	},

	update : function() {
		this.resize();
		if(this.dKey.isDown)
		{
			if(this.band.image.animations.getAnimation('move').speed < 10)
				this.band.image.animations.getAnimation('move').speed +=1;
		}
	}
}
