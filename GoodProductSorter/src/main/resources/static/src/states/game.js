GoodProductSorter.gameState = function(game) {

this.aKey;
this.dKey;


//Game objects

this.background;
this.band;
this.scenario = {
	score: 0,
	boardMachine: undefined,
	machineSpeed: undefined,
	minSpeedOfDraggedImage: 500,
	timeForItemSpawn: 1000,
	boxesGroup: undefined,
	boxesCollisionGroup: undefined,
	leftBox: undefined,
	rightBox: undefined,
	gameTime: 60,
	seed: 32748372,
	eslabonesGroup: undefined,
	eslabones:[11]
};

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
		for(i=0;i<11;i++){
			this.scenario.eslabones[i] = new Item("band");
		};
		this.scenario.boxesGroup = game.add.group();
		this.scenario.eslabonesGroup = game.add.group();
	
		this.background = game.add.image(0, 0, "SueloFabrica");

		
		this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
		this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
	},

	preload : function() {
		this.scenario.machineSpeed = game.world._height* 0.1;
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

		this.scenario.boardMachine = new BoardMachine(0, 0, 'maquina', 20, this.scenario.machineSpeed,
		this.scenario.minSpeedOfDraggedImage, this.scenario.seed, this.scenario.timeForItemSpawn);

		this.scenario.boardMachine.image.animations.add('working');
		this.scenario.boardMachine.image.animations.play('working', this.scenario.machineSpeed, true);

		//Escalamos la IA
		this.scenario.boardMachine.scale = 0.6;
		let machineProp = this.scenario.boardMachine.image.width/game.world._width;
		this.scenario.boardMachine.image.width *= this.scenario.boardMachine.scale/machineProp;
		this.scenario.boardMachine.image.height *= this.scenario.boardMachine.scale/machineProp;

		//ajustar posicion
		this.scenario.boardMachine.image.x = game.world._width/2;
		this.scenario.boardMachine.image.y = this.scenario.boardMachine.image.width/2 * 0.72;


		this.scenario.boxesCollisionGroup = game.physics.p2.createCollisionGroup();

		//Añadir a boardMachine el grupo de colisiones cajas y el grupo de fisicas
		this.scenario.boardMachine.boxesCollisionGroup = this.scenario.boxesCollisionGroup;
		this.scenario.boardMachine.boxesGroup = this.scenario.boxesGroup;
	},

	resize_eslab: function (eslabon,num){
		eslabon.anchor.setTo(0.5, 0);
		eslabon.width=this.world.width*0.4;
		eslabon.height=this.world.height*0.1;
		eslabon.x=game.world.centerX;
		eslabon.y=this.scenario.eslabones[0].image.height*num;
		eslabon.body.velocity.y = this.scenario.machineSpeed;
	},

	resize: function () {

		this.background.height = this.world.height;
		this.background.width = this.world.width;

		//Banda transportadora
		
		//Caja Izquierda

		this.scenario.leftBox.image.anchor.setTo(0.5, 0.5);
		let leftBoxProp = this.scenario.leftBox.image.width/game.world._width;
		this.scenario.leftBox.image.width *= this.scenario.leftBox.scale/leftBoxProp;
		this.scenario.leftBox.image.height *= this.scenario.leftBox.scale/leftBoxProp;

		//Caja Derecha
		this.scenario.rightBox.image.anchor.setTo(0.5, 0.5);
		let rightBoxProp = this.scenario.rightBox.image.width/game.world._width;
		this.scenario.rightBox.image.width *= this.scenario.rightBox.scale/rightBoxProp;
		this.scenario.rightBox.image.height *= this.scenario.rightBox.scale/rightBoxProp;

		//ajustamos las cajas despues del escalado para que siempre quede pegada a los margenes
		this.scenario.leftBox.image.body.x = this.scenario.leftBox.image.width/2;
		this.scenario.rightBox.image.body.x -= (this.scenario.rightBox.image.width/2);
		
		//Info
		// Get width and height of the window excluding scrollbars
		var w = document.documentElement.clientWidth;
		var h = document.documentElement.clientHeight;
	
		//Eslabones
		for(i=0;i<this.scenario.eslabones.length;i++){
			this.resize_eslab(this.scenario.eslabones[i].image,i);
			//this.scenario.eslabones[i] = new Item("band");
		};
	},

	create: function() {
		
		//Referencia de escenario para la maquina--> mala practica
		this.scenario.boardMachine.scenarioReference = this.scenario;
		//Eslabones bandas transportadoras
		
		for(i=0;i<this.scenario.eslabones.length;i++){
			this.scenario.eslabones[i].image=this.scenario.eslabonesGroup.create(game.world.centerX,0,this.scenario.eslabones[i].name);
			game.physics.enable(this.scenario.eslabones[i].image, Phaser.Physics.ARCADE);
		}

		
		//Control Tiempo
		cuenta_atras=this.time.create();
		final_cuent_atras=cuenta_atras.add(Phaser.Timer.SECOND * this.scenario.gameTime, this.finTiempo);
		cuenta_atras.start();		
		this.text_cuenta_atras=this.game.add.text(/*game.world.centerX*/50,100, '00',this.style_tiempo);
	
		//Background
        this.background.height = this.game.height;
        this.background.width = this.game.width;
		
		//Banda transportadora
		//this.band.setItemImage(game.world.centerX, game.world.centerY, 'BandSpriteSheet', this.scenario.boardMachine.getPhysicsGroup());
		//Caja izquierda
		let boxScale = 0.25;
		this.scenario.leftBox.image = this.scenario.boxesGroup.create(game.world.width*0.15, game.world.centerY, this.scenario.leftBox.name);
		this.scenario.leftBox.scale = boxScale;
		this.scenario.leftBox.myPhysicsGroup = this.scenario.boxesGroup;

		game.physics.enable(this.scenario.leftBox.image, Phaser.Physics.P2JS);
		this.scenario.leftBox.image.id = this.scenario.leftBox.image.body.id;
		this.scenario.leftBox.image.body.static = true;
		this.scenario.leftBox.image.body.setCircle(this.scenario.leftBox.image.body.width/2);
		this.scenario.leftBox.image.body.setCollisionGroup(this.scenario.boxesCollisionGroup);
		this.scenario.leftBox.image.body.collisionGroup = this.scenario.boxesCollisionGroup;
		this.scenario.leftBox.image.body.collides([this.scenario.boardMachine.itemSpawner.itemCollisionGroup]);


		//Caja derecha
		this.scenario.rightBox.image = this.scenario.boxesGroup.create(game.world._width, this.scenario.leftBox.image.y, this.scenario.leftBox.name);
		this.scenario.rightBox.scale = boxScale;
		this.scenario.rightBox.myPhysicsGroup = this.scenario.boxesGroup;

		game.physics.enable(this.scenario.rightBox.image, Phaser.Physics.P2JS);
		this.scenario.rightBox.image.id = this.scenario.rightBox.image.body.id;
		this.scenario.rightBox.image.body.static = true;
		this.scenario.rightBox.image.body.setCircle(this.scenario.rightBox.image.body.width/2);
		this.scenario.rightBox.image.body.setCollisionGroup(this.scenario.boxesCollisionGroup);
		this.scenario.rightBox.image.body.collisionGroup = this.scenario.boxesCollisionGroup;
		this.scenario.rightBox.image.body.collides([this.scenario.boardMachine.itemSpawner.itemCollisionGroup]);

		//Layer order
		game.world.bringToTop(this.scenario.eslabonesGroup);
		game.world.bringToTop(this.scenario.boxesGroup);
		game.world.bringToTop(this.scenario.boardMachine.getBoardPhysicsGroup());
		game.world.bringToTop(this.scenario.boardMachine.getPhysicsGroup());
		game.world.bringToTop(this.scenario.boardMachine.machineGroup);

		//OBJETOS
		this.CreateItemsWorld1_level1();
		this.resize();

	},

	removeAllItems: function()
	{
		return true;
	},

	finTiempo: function(){
		this.removeAllItems;
		game.state.start('endGameState',this.puntuacion,this.nivel,this.mundo);		
	},

	bandOutCanvas:function(){
		this.scenario.eslabonesGroup.forEach(function(item) {
			if(item.y>=game.world._height){
				item.y=-item.height;
			};
		});
	},

	update : function() {
		
		this.bandOutCanvas();
		segundos = "0" + Math.round((final_cuent_atras.delay - cuenta_atras.ms) / 1000);
		this.text_cuenta_atras.text=segundos.substr(-2);
		//Check if  machine has to spawn something
		this.scenario.boardMachine.CheckItemSpawn(game.time.elapsed);
	},

	render: function() {
	},

	CreateItemsWorld1_level1: function()
	{
		//Reutilizable
		let reutilizable = this.scenario.leftBox.image.id;
		//No reutilizable
		let desechable = this.scenario.rightBox.image.id;

		this.scenario.boardMachine.addItemToLevel(new Item("bebe", 0.2, reutilizable));
		this.scenario.boardMachine.addItemToLevel(new Item("alcohol", 0.2, reutilizable));
		this.scenario.boardMachine.addItemToLevel(new Item("bisturiLimpio", 0.2, reutilizable));
		this.scenario.boardMachine.addItemToLevel(new Item("condon", 0.2, desechable));
		this.scenario.boardMachine.addItemToLevel(new Item("calavera", 0.2, desechable));
		this.scenario.boardMachine.addItemToLevel(new Item("corazon", 0.2, reutilizable));
	}



}
