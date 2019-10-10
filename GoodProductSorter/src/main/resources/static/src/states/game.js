GoodProductSorter.gameState = function(game) {

this.aKey;
this.dKey;


//Game objects

this.background;
this.band;

this.scenario = {
	boardMachine: undefined,
	machineSpeed: 300,
	minSpeedOfDraggedImage: 500,
	timeForItemSpawn: 1000,
	boxesGroup: undefined,
	boxesCollisionGroup: undefined,
	leftBox: undefined,
	rightBox: undefined,
	gameTime: 60,
	seed: 32748372
};

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
		this.scenario.leftBox = new Item("BocetoCaja");
		this.scenario.rightBox = new Item("BocetoCaja");
		this.scenario.boxesGroup = game.add.group();
	
		this.background = game.add.image(0, 0, "SueloFabrica");

		
		this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
		this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
	},

	preload : function() {
		//Callback para resize
		//window.addEventListener("resize", this.displayWindowSize);

		//Iniciamos fisicas ARCADE
		/*
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = 0;
		*/

		//Iniciamos fisicas P2
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.world.setBounds(0, 0, game.world._width, game.world._height);
		game.input.mouse.enabled = true;
		game.physics.p2.setImpactEvents(true);
		game.physics.p2.updateBoundsCollisionGroup();
		//game.physics.p2.restitution = 1.0;


		//Posicion x,y, max items diferentes y velocidad vertical-->HAY QUE METERLE EL NOMBRE DE SU SPRITE

		this.scenario.boardMachine = new BoardMachine(game.world._width/2, 0, 'BocetoCaja', 20, this.scenario.machineSpeed,
								 this.scenario.minSpeedOfDraggedImage, this.scenario.seed, this.scenario.timeForItemSpawn);

		//Escalamos la IA
		this.scenario.boardMachine.scale = 0.3;
		let machineProp = this.scenario.boardMachine.image.width/game.world._width;
		this.scenario.boardMachine.image.width *= this.scenario.boardMachine.scale/machineProp;
		this.scenario.boardMachine.image.height *= this.scenario.boardMachine.scale/machineProp;

		//ajustar posicion
		this.scenario.boardMachine.image.y += this.scenario.boardMachine.image.width;


		this.scenario.boxesCollisionGroup = game.physics.p2.createCollisionGroup();

		//Añadir a boardMachine el grupo de colisiones cajas y el grupo de fisicas
		this.scenario.boardMachine.boxesCollisionGroup = this.scenario.boxesCollisionGroup;
		this.scenario.boardMachine.boxesGroup = this.scenario.boxesGroup;
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
		this.scenario.leftBox.image.width=this.world.width*0.3;
		this.scenario.leftBox.image.height=this.world.height*0.2;
		this.scenario.leftBox.image.x= this.scenario.leftBox.image.width/2;
		this.scenario.leftBox.image.y= this.background.height/2;
		
		//Caja Derecha
		this.scenario.rightBox.image.width = this.world.width*0.3;
		this.scenario.rightBox.image.height = this.world.height*0.2;
		this.scenario.rightBox.image.x = this.background.width - this.scenario.rightBox.image.width/2;
		this.scenario.rightBox.image.y = this.background.height/2;

		//Info
		// Get width and height of the window excluding scrollbars
		var w = document.documentElement.clientWidth;
		var h = document.documentElement.clientHeight;
	
	},

	create: function() {
		//Control Tiempo
		cuenta_atras=this.time.create();
		final_cuent_atras=cuenta_atras.add(Phaser.Timer.SECOND * this.scenario.gameTime, this.finTiempo);
		cuenta_atras.start();		
		this.text_cuenta_atras=this.game.add.text(/*game.world.centerX*/50,100, '00',this.style_tiempo);
	
		//Background
        this.background.height = this.game.height;
        this.background.width = this.game.width;
		
		//Banda transportadora
		this.band.setItemImage(game.world.centerX, game.world.centerY, 'BandSpriteSheet', this.scenario.boardMachine.getPhysicsGroup());
		//Caja izquierda
		this.scenario.leftBox.image = this.scenario.boxesGroup.create(game.world.width*0.15, game.world.centerY, this.scenario.leftBox.name);
		this.scenario.leftBox.scale = 0.15;
		let leftBoxProp = this.scenario.leftBox.image.width/game.world._width;
		this.scenario.leftBox.image.width *= this.scenario.leftBox.scale/leftBoxProp;
		this.scenario.leftBox.image.height *= this.scenario.leftBox.scale/leftBoxProp;

		this.scenario.leftBox.myPhysicsGroup = this.scenario.boxesGroup;
		this.scenario.leftBox.image.anchor.setTo(0.5, 0.5);
		game.physics.enable(this.scenario.leftBox.image, Phaser.Physics.P2JS);
		this.scenario.leftBox.image.id = this.scenario.leftBox.image.body.id;
		this.scenario.leftBox.image.body.static = true;
		this.scenario.leftBox.image.body.setCircle(this.scenario.leftBox.image.body.width/2);
		this.scenario.leftBox.image.body.setCollisionGroup(this.scenario.boxesCollisionGroup);
		this.scenario.leftBox.image.body.collisionGroup = this.scenario.boxesCollisionGroup;
		this.scenario.leftBox.image.body.collides([this.scenario.boardMachine.itemSpawner.itemCollisionGroup]);
		//Caja derecha
		this.scenario.rightBox.image = this.scenario.boxesGroup.create(game.world._width - this.scenario.leftBox.image.width/2, this.scenario.leftBox.image.y, this.scenario.leftBox.name);

		this.scenario.rightBox.scale = 0.15;
		let rightBoxProp = this.scenario.rightBox.image.width/game.world._width;
		this.scenario.rightBox.image.width *= this.scenario.rightBox.scale/rightBoxProp;
		this.scenario.rightBox.image.height *= this.scenario.rightBox.scale/rightBoxProp;

		this.scenario.rightBox.myPhysicsGroup = this.scenario.boxesGroup;
		this.scenario.rightBox.image.anchor.setTo(0.5, 0.5);
		game.physics.enable(this.scenario.rightBox.image, Phaser.Physics.P2JS);
		this.scenario.rightBox.image.id = this.scenario.rightBox.image.body.id;
		this.scenario.rightBox.image.body.static = true;
		this.scenario.rightBox.image.body.setCircle(this.scenario.rightBox.image.body.width/2);
		this.scenario.rightBox.image.body.setCollisionGroup(this.scenario.boxesCollisionGroup);
		this.scenario.rightBox.image.body.collisionGroup = this.scenario.boxesCollisionGroup;
		this.scenario.rightBox.image.body.collides([this.scenario.boardMachine.itemSpawner.itemCollisionGroup]);

		//Layer order
		game.world.bringToTop(this.scenario.boardMachine.machineGroup);
		game.world.bringToTop(this.scenario.boxesGroup);
		game.world.bringToTop(this.scenario.boardMachine.getBoardPhysicsGroup());
		game.world.bringToTop(this.scenario.boardMachine.getPhysicsGroup());

		//OBJETOS
		this.CreateItemsWorld1_level1();
		
	},

	removeAllItems: function()
	{
		return true;
	},

	finTiempo: function(){
		this.removeAllItems;
		game.state.start('endGameState',this.puntuacion,this.nivel,this.mundo);		
	},

	

	update : function() {
		
		segundos = "0" + Math.round((final_cuent_atras.delay - cuenta_atras.ms) / 1000);
		this.text_cuenta_atras.text=segundos.substr(-2);
		//this.resize();
		//Check if  machine has to spawn something
		this.scenario.boardMachine.CheckItemSpawn(game.time.elapsed);
	},

	render: function() {
	},

	CreateItemsWorld1_level1: function()
	{
		this.scenario.boardMachine.addItemToLevel(new Item("bebe", 0.2));
		this.scenario.boardMachine.addItemToLevel(new Item("alcohol", 0.2));
		this.scenario.boardMachine.addItemToLevel(new Item("bisturiLimpio", 0.2));
		this.scenario.boardMachine.addItemToLevel(new Item("condon", 0.2));
		this.scenario.boardMachine.addItemToLevel(new Item("calavera", 0.2));
		this.scenario.boardMachine.addItemToLevel(new Item("corazon", 0.2));
	}



}
