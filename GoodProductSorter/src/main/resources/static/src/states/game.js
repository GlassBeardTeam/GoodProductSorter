GoodProductSorter.gameState = function(game) {

this.aKey;
this.dKey;

//Game objects
this.background;
this.band;
this.velocity=50;
this.cajaIz;
this.cajaDer;
this.baby;
}

GoodProductSorter.gameState.prototype = {

	
	init : function() {
		if(game.global.DEBUG_MODE)
		{
			console.log("[DEBUG] Entering **GAME** state");
		}
		this.band = new Item("Banda");
		this.cajaIz = new Item("BocetoCaja");
		this.cajaDer = new Item("BocetoCaja");
		this.background = game.add.image(0, 0, "SueloFabrica");

		
		this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
		this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
	},

	preload : function() {
	


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
		this.cajaIz.image.width=this.world.width*0.3;
		this.cajaIz.image.height=this.world.height*0.2;
		this.cajaIz.image.x= this.cajaIz.image.width/2;
		this.cajaIz.image.y= this.background.height/2;
		
		//Caja Derecha
		this.cajaDer.image.width = this.world.width*0.3;
		this.cajaDer.image.height = this.world.height*0.2;
		this.cajaDer.image.x = this.background.width - this.cajaDer.image.width/2;
		this.cajaDer.image.y = this.background.height/2;

		//Objeto
		this.baby.width=this.world.width*0.2;
		this.baby.height=this.world.height*0.1;
	},

	create: function() {
		//Background
        this.background.height = this.game.height;
        this.backgroundwidth = this.game.width;
		
		//Banda transportadora
		this.band.setItemImage(game.world.centerX, game.world.centerY, 'BandSpriteSheet');
		//this.band.image.animations.add('move');
		//this.band.playItemAnimation('move', 2, true);
		this.cajaIz.setItemImage(game.world.width*0.15, game.world.centerY, 'BocetoCaja');

		//this.cajaDer.setItemImage(game.add.sprite(this.cajaIz.image.x + this.cajaIz.image.width, this.cajaIz.image.y, 'BocetoCaja'));
		this.cajaDer.setItemImage(this.cajaIz.image.x, this.cajaIz.image.y, 'BocetoCaja');
		
		//Objetos
		this.baby = new Item("bebe");
		this.baby.setItemImage(this.background.width/2, 0, 'bebe');
		alert("baby image pos: " + "(" + this.baby.image.x + ", " + this.baby.image.y + ")");
		alert("baby boardimage pos: " + "(" + this.baby.boardImage.x + ", " + this.baby.boardImage.y + ")");

		this.baby.image.x -= this.baby.image.width/2;
		this.baby.boardImage.x -= this.baby.boardImage.width/2;
		//this.game.physics.enable(this.baby.image, Phaser.Physics.ARCADE);
		enablePhaserPhysics(this.baby);
		this.baby.image.body.velocity.y = this.velocity;
		this.baby.boardImage.body.velocity.y = this.velocity;// this.baby.image.body.velocity.y;
		this.baby.image.inputEnabled = true;
		this.baby.image.input.enableDrag(true);


		let paramsOnDragStart = {
			testing: "hola mi amor, estas viendo porno solo en serio?"
		}

		addOnDragStartCallback(this.onItemDragStart, this.baby, paramsOnDragStart);

		let paramsOnDragStop = {
			testing: "Porque no me ves a mi?"
		}

		addOnDragStopCallback(this.onItemDragStop, this.baby, paramsOnDragStop);
		

	},


	OnOver: function(){
		this.sobre=true;
	},
	
	OnOut: function(){
	},

	onItemDragStart: function(item, params)
	{
		item.image.body.velocity.x = 0;
		item.image.body.velocity.y = 0;
		item.boardImage.alpha = 0.5;
		//item.boardImage.body.velocity.y=0;
	},

	onItemDragStop: function(item, params)
	{
		item.image.x = item.boardImage.x;
		item.image.y = item.boardImage.y;
		item.image.body.velocity.x = item.boardImage.body.velocity.x;
		item.image.body.velocity.y = item.boardImage.body.velocity.y;
		item.boardImage.alpha = 0.0;
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

		//Velocidad de board de los objetos--> esto no para de aumentar
		
	},

	render: function() {
		game.debug.text(this.background.width, 10, 20);
	}

}
