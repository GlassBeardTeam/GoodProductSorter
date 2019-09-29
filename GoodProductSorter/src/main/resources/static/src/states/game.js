GoodProductSorter.gameState = function(game) {

this.aKey;
this.dKey;
//Game objects
this.background;
this.band;
this.velocity=50;

this.varx=0;
this.vary=0;
this.sobre=false;
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
		
	//	this.objeto1 = new Item("bebe");
		
		
		
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
		//this.CajaDer.setItemImage(game.add.sprite(game.world.width-(game.world.width*0.15), game.world.centerY, 'BocetoCaja'));
		//this.CajaDer.inputEnabled = true;
		this.CajaDer = game.add.sprite(game.world.width-(game.world.width*0.15), game.world.centerY, 'BocetoCaja');
		this.CajaDer.inputEnabled = true;
		
		
		
	//	this.objeto1.setItemImage(game.add.sprite(game.world.centerX, 0-100, 'bebe'));
		this.objeto1 = game.add.sprite(0, 0, 'bebe');
		this.objeto1.y = -this.objeto1.height;
		this.objeto1.x = this.game.world.centerX - this.objeto1.width;
		this.game.physics.enable(this.objeto1, Phaser.Physics.ARCADE);
		this.objeto1.body.velocity.y=this.velocity;
		this.objeto1.inputEnabled = true;
		this.objeto1.input.enableDrag(true);
		this.objeto1.events.onDragStart.add(this.onDragStart, this);
		this.objeto1.events.onDragStop.add(this.onDragStop, this);
		

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
		this.CajaDer.width=this.world.width*0.3;
		this.CajaDer.height=this.world.height*0.2;
		this.CajaDer.x=game.world.width-(game.world.width*0.15)-this.CajaDer.width/2;
		this.CajaDer.y=game.world.centerY-this.CajaDer.height/2;
		this.CajaDer.events.onInputOver﻿﻿.add(this.OnOver, this);
		this.CajaDer.events.onInputOut.add(this.OnOut, this)
		
		//Objeto
		this.objeto1.width=this.world.width*0.2;
		this.objeto1.height=this.world.height*0.1;
		//this.objeto1.image.x=game.world.width-(game.world.width*0.15);
		//this.objeto1.image.y=game.world.centerY;
	},

	create: function() {
	},


	OnOver: function(){
		this.sobre=true;
	},
	
	OnOut: function(){
		this.sobre=false;
	},

	onDragStart: function(sprite, pointer) {
		this.varx = sprite.x;
		this.vary = sprite.y;
		sprite.body.velocity.y=0;
	},
	
	onDragStop: function(sprite, pointer) {
		if(this.sobre){
			alert();
		}
		sprite.x=this.varx;
		sprite.y=this.vary;
		sprite.body.velocity.y=this.velocity;
	},

	update : function() {
		this.resize();
		if(this.dKey.isDown)
		{
			if(this.band.image.animations.getAnimation('move').speed < 10)
				this.band.image.animations.getAnimation('move').speed +=1;
		}
	},

	render: function() {
		game.debug.text('a', 10, 20);
	}

}
