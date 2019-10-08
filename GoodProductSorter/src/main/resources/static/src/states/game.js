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

//Mi maquina
this.boardMachine;
this.machineSpeed = 400;
this.minSpeedOfDraggedImage = 1000;
this.foo = 0;

//Timer
this.Durpartida=60;
puntuacion=0;
nivel=1;
mundo=1;

//Puntero a lvlitems
this.myLvlItems = [];
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
		//Callback para resize
		window.addEventListener("resize", this.displayWindowSize);

		//Iniciamos fisicas ARCADE
		/*
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = 0;
		*/

		//Iniciamos fisicas P2
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.input.mouse.enabled = true;
		game.physics.p2.setImpactEvents(true);
		game.physics.p2.updateBoundsCollisionGroup();
		//game.physics.p2.restitution = 1.0;


		//Posicion x,y, max items diferentes y velocidad vertical-->HAY QUE METERLE EL NOMBRE DE SU SPRITE
		this.boardMachine = new BoardMachine(game.world._width/2, 0, 'BocetoCaja', 20, this.machineSpeed, this.minSpeedOfDraggedImage);
		this.boardMachine.image.y += this.boardMachine.image.width;
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

		//Info
		// Get width and height of the window excluding scrollbars
		var w = document.documentElement.clientWidth;
		var h = document.documentElement.clientHeight;
		//La altura funciona, la anchura se mantiene
			  
		// Display result inside a div element
		//console.log("Width: " + w + ", " + "Height: " + h);
	},

	create: function() {
			//Control Tiempo
			cuenta_atras=this.time.create();
			final_cuent_atras=cuenta_atras.add(Phaser.Timer.SECOND * this.Durpartida, this.finTiempo);
			cuenta_atras.start();		
			this.text_cuenta_atras=this.game.add.text(/*game.world.centerX*/50,100, '00',this.style_tiempo);
	
		//Background
        this.background.height = this.game.height;
        this.background.width = this.game.width;
		
		//Banda transportadora
		this.band.setItemImage(game.world.centerX, game.world.centerY, 'BandSpriteSheet', this.boardMachine.getPhysicsGroup());
		//Caja izquierda
		this.cajaIz.setItemImage(game.world.width*0.15, game.world.centerY, 'BocetoCaja', this.boardMachine.getPhysicsGroup());
		//Caja derecha
		this.cajaDer.setItemImage(this.cajaIz.image.x, this.cajaIz.image.y, 'BocetoCaja', this.boardMachine.getPhysicsGroup());
		
		
		//Layer order
		game.world.bringToTop(this.boardMachine.machineGroup);
		game.world.bringToTop(this.boardMachine.getBoardPhysicsGroup());
		game.world.bringToTop(this.boardMachine.getPhysicsGroup());

		//OBJETOS
		this.CreateItemsWorld1_level1();
	

	
	},
	finTiempo: function(){
		game.state.start('endGameState',this.puntuacion,this.nivel,this.mundo);		
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

	update : function() {
		segundos="0" + Math.round((final_cuent_atras.delay - cuenta_atras.ms) / 1000);
		this.text_cuenta_atras.text=segundos.substr(-2);

		this.resize();
		//Check if  machine has to spawn something
		if(this.foo <= 0){
			this.boardMachine.SpawnRandomItem();
			//console.log("item x: " + item.image.x  + "y: " + item.image.y);
			this.foo++;
		}
	},

	render: function() {
	},

	CreateItemsWorld1_level1: function()
	{
		
		this.baby = new Item("bebe");
		this.boardMachine.addItemToLevel(new Item("bebe"));

		
	}



}
