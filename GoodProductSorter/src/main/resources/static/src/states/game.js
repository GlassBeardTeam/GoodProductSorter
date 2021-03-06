GoodProductSorter.gameState = function(game) {

//Game objects

this.background;
this.band;
this.scenario = {
	score: 0,
	level:1,
	world:1,
	//Control de velocidades de la maquina
	streak: 0,
	successfulItemsInARow: 0,
	itemsInARowToChangeStreak: 5,
	machineSpeed: [0.1, 0.2, 0.3, 0.4, 0.5],
	//Control de velocidades de la maquina/
	boardMachine: undefined,
	minSpeedOfDraggedImage: 500,
	timeForItemSpawn: 1000,
	//Boxes
	boxesGroup: undefined,
	boxesCollisionGroup: undefined,
	leftBox: undefined,
	rightBox: undefined,
	boxSignLeft: undefined,
	boxSignRight: undefined,
	boxSignLeftText: undefined,
	boxSignRightText: undefined,
	//Boxes/
	gameTime: 60,
	seed: 32748372,
	eslabonesGroup: undefined,
	eslabones:[11],
	miss:0,
	bad:0,
	well:0,
	flecha: undefined,
	posiciones_flecha: [9,7.2,5.6,4.1,2.6],
	//Ojos
	eyes: undefined,
};
this.gameParams = undefined;
//Puntero a lvlitems
this.myLvlItems = [];
}



GoodProductSorter.gameState.prototype = {

	
	init : function(level) {
		this.scenario.level=level;		
		if(game.global.DEBUG_MODE)
		{
			console.log("[DEBUG] Entering **GAME** state");
		}

		this.scenario.streak = 0;
		this.scenario.successfulItemsInARow = 0;
		this.gameParams = game.global.gameParams;
		this.scenario.itemsInARowToChangeStreak = game.global.gameParams.itemsInARowToChangeStreak,
		this.scenario.machineSpeed = game.global.gameParams.machineSpeed;
		this.scenario.minSpeedOfDraggedImage = game.global.gameParams.minSpeedOfDraggedImage;
		this.scenario.timeForItemSpawn = game.global.gameParams.timeForItemSpawn;
		this.scenario.boxManager = game.global.gameParams.boxManager;

		
		this.band = new Item("Banda");
		this.scenario.leftBox = new Item("cajaAcierto");
		this.scenario.rightBox = new Item("BocetoCaja");
		for(i=0;i<11;i++){
			this.scenario.eslabones[i] = new Item("band");
		};
		this.scenario.boxesGroup = game.add.group();
		this.scenario.eslabonesGroup = game.add.group();
	
		this.background = game.add.image(0, 0, "SueloFabrica");
		
		this.scenario.score=0;
		this.scenario.streak=0;
		this.scenario.miss=0;
		this.scenario.bad=0;
		this.scenario.well=0;
		this.scenario.successfulItemsInARow=0;
	},

	preload : function() {
		//this.scenario.machineSpeed = game.world._height* 0.1;
		//Callback para resize
		//window.addEventListener("resize", this.displayWindowSize);

		//Iniciamos fisicas ARCADE
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
		this.scenario.boardMachine.image.animations.play('working',this.scenario.boardMachine.lvlSpeed[this.scenario.streak]*this.game.world._height, true);

		//Escalamos la Máquina
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

		//Sonidos Juego
		correct = game.add.audio('success');
		wrong = game.add.audio('wrong');
		store = game.add.audio('store');
		//Música
		gameMusic = game.add.audio('fabric');
	},

	resize_eslab: function (eslabon,num){
		eslabon.anchor.setTo(0.5, 0);
		eslabon.width=this.world.width*0.4;
		eslabon.height=this.world.height*0.1;
		eslabon.x=game.world.centerX;
		eslabon.y=this.scenario.eslabones[0].image.height*num;
		eslabon.body.velocity.y = this.scenario.machineSpeed[this.scenario.streak]*this.game.world._height;
	},

	resize: function () {

		this.background.height = game.world._height;
		this.background.width = game.world._width;
		
		/*
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
		*/
		//Carteles de cajas
		let signOffset = 0.05;
		//Cartel izquierdo
		this.scenario.boxSignLeft.anchor.setTo(0.5, 0.5);
		this.scenario.boxSignLeft.y -= this.scenario.boxManager.boxes[0].image.height/2 + game.world._height * signOffset;
		
		//Cartel derecho
		this.scenario.boxSignRight.anchor.setTo(0.5, 0.5);
		this.scenario.boxSignRight.y -= this.scenario.boxManager.boxes[1].image.height/2 + game.world._height * signOffset;
		
		//this.scenario.boxSignRight.x -= this.scenario.boxManager.boxes[1].image.width *0.5;
		
		//Texto de los carteles
		let LBox = this.scenario.boxSignLeft;
		let RBox = this.scenario.boxSignRight;
	
		this.scenario.boxSignLeftText.anchor.setTo(0.5, 0.5);
		this.scenario.boxSignLeftText.setTextBounds(LBox.x, LBox.y, LBox.width*0.5, 0);

		this.scenario.boxSignRightText.anchor.setTo(0.5, 0.5);
		this.scenario.boxSignRightText.setTextBounds(RBox.x, RBox.y, RBox.width*0.75, 0);

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
		//Crear las cajas
		game.global.gameParams.boxManager.createBoxesPositions();
		this.scenario.boxManager.createBoxes(this.scenario.boxesCollisionGroup, this.scenario.boardMachine.itemSpawner.itemCollisionGroup);

		//Musica
		gameMusic.play();
		//Eslabones bandas transportadoras
		
		for(i=0;i<this.scenario.eslabones.length;i++){
			this.scenario.eslabones[i].image=this.scenario.eslabonesGroup.create(game.world.centerX,0,this.scenario.eslabones[i].name);
			game.physics.enable(this.scenario.eslabones[i].image, Phaser.Physics.ARCADE);
		}
		fontResize = scaleFont(70, game.width);
		var style_tiempo = { font: "Acme",
							fill: "Black",
							fontSize: fontResize,
							boundsAlignH: "center",
							boundsAlignV: "middle", };
		//Control Tiempo
		cuenta_atras=this.time.create();
		final_cuent_atras=cuenta_atras.add(Phaser.Timer.SECOND * this.scenario.gameTime, this.finTiempo,this);
		cuenta_atras.start();	
		this.text_cuenta_atras=this.game.add.text(game.world.width*0.44,game.world.height*0.08, '00',style_tiempo);

		//Texto puntuacion
		this.text_score=this.game.add.text(game.world.width*0.40,game.world.height*0.02, '00',style_tiempo);

		//Background
        this.background.height = this.game.height;
        this.background.width = this.game.width;
		/*
		//Caja izquierda
		let boxScale = 0.25;
		this.scenario.leftBox.image = this.scenario.boxesGroup.create(game.world.width*0.15, game.world.centerY, this.scenario.leftBox.name);
		this.scenario.leftBox.scale = boxScale;
		this.scenario.leftBox.myPhysicsGroup = this.scenario.boxesGroup;

		game.physics.enable(this.scenario.leftBox.image, Phaser.Physics.P2JS);
		this.scenario.leftBox.image.id = this.scenario.leftBox.image.body.id;
		this.scenario.leftBox.image.body.static = true;
		this.scenario.leftBox.image.body.setCircle(this.scenario.leftBox.image.body.width*2);
		this.scenario.leftBox.image.body.setCollisionGroup(this.scenario.boxesCollisionGroup);
		this.scenario.leftBox.image.body.collisionGroup = this.scenario.boxesCollisionGroup;
		this.scenario.leftBox.image.body.collides([this.scenario.boardMachine.itemSpawner.itemCollisionGroup]);

		//nombre, frames de la anim, fps, loop, usar numeric index
		this.scenario.leftBox.image.animations.add('idle',[1], 1, true, true);
		this.scenario.leftBox.image.animations.add('success',[1,2,3,4], 15, false, true);
		this.scenario.leftBox.image.animations.play('idle');


		//Caja derecha
		this.scenario.rightBox.image = this.scenario.boxesGroup.create(game.world._width, this.scenario.leftBox.image.y, this.scenario.leftBox.name);
		game.physics.enable(this.scenario.rightBox.image, Phaser.Physics.P2JS);
		this.scenario.rightBox.scale = boxScale;
		this.scenario.rightBox.myPhysicsGroup = this.scenario.boxesGroup;

		this.scenario.rightBox.image.id = this.scenario.rightBox.image.body.id;
		this.scenario.rightBox.image.body.static = true;
		this.scenario.rightBox.image.body.setCircle(this.scenario.rightBox.image.body.width*2);
		this.scenario.rightBox.image.body.setCollisionGroup(this.scenario.boxesCollisionGroup);
		this.scenario.rightBox.image.body.collisionGroup = this.scenario.boxesCollisionGroup;
		this.scenario.rightBox.image.body.collides([this.scenario.boardMachine.itemSpawner.itemCollisionGroup]);

		this.scenario.rightBox.image.animations.add('idle',[1], 1, true, true);
		this.scenario.rightBox.image.animations.add('success',[1,2,3,4], 15, false, true);
		this.scenario.rightBox.image.animations.play('idle');
		*/
		//Carteles de las cajas
		signScale = 0.25
		
			//Cartel izquierdo
		this.scenario.boxSignLeft = game.add.image(this.scenario.boxManager.boxes[0].image.body.x, this.scenario.boxManager.boxes[0].image.body.y, 'cartelIzq');
		

		let signLeftProp = this.scenario.boxSignLeft.width/game.world._width;
		leftWidth = this.scenario.boxSignLeft.width;
		
		this.scenario.boxSignLeft.width *= signScale/signLeftProp;
		this.scenario.boxSignLeft.height *= signScale/signLeftProp;
		//this.scenario.boxSignLeft.x += this.scenario.boxSignLeft.width - leftWidth;
		
		
			//Cartel derecho
		this.scenario.boxSignRight = game.add.image(this.scenario.boxManager.boxes[1].image.body.x, this.scenario.boxManager.boxes[1].image.body.y, 'cartelDer');
		

		let signRightProp = this.scenario.boxSignRight.width/game.world._width;
		rightWidth = this.scenario.boxSignRight.width;
		
		this.scenario.boxSignRight.width *= signScale/signRightProp;
		this.scenario.boxSignRight.height *= signScale/signRightProp;
		//this.scenario.boxSignRight.x += this.scenario.boxSignRight.width - rightWidth;
		
		
		//Layer order
		game.world.bringToTop(this.scenario.eslabonesGroup);
		game.world.bringToTop(this.scenario.boxesGroup);
		game.world.bringToTop(this.scenario.boardMachine.getBoardPhysicsGroup());
		game.world.bringToTop(this.scenario.boardMachine.getPhysicsGroup());
		game.world.bringToTop(this.scenario.boardMachine.machineGroup);
		game.world.bringToTop(this.text_cuenta_atras);
		game.world.bringToTop(this.text_score);


		//Texto de los carteles
		fontResize = scaleFont(50, game.width);
		let style = { font: "Acme", fill: "Blue", fontSize: fontResize, boundsAlignH: "center", boundsAlignV: "middle"};
		
		if (this.game.global.IDIOMA=='ESP'){
			var text0 = "Reutilizable";
			var text1 = "Desechable";
		} else {
			var text0 = "Reusable";
			var text1 = "Disposable";
		}
		
		this.scenario.boxSignLeftText = game.add.text(-game.width*0.01, 0, text0, style);
		this.scenario.boxSignRightText = game.add.text(0, 0, text1, style);

		//Flecha
		this.scenario.flecha = game.add.sprite(game.width/6*4.1,this.scenario.boardMachine.image.height/20*9, 'ssflecha');
		this.scenario.flecha.anchor.setTo(0.5,0.5);
		this.scenario.flecha.width = this.scenario.boardMachine.image.width / 8;
		this.scenario.flecha.height = this.scenario.boardMachine.image.height / 12;
		this.scenario.flecha.animations.add('play', [0,1], this.scenario.boardMachine.lvlSpeed[this.scenario.streak]*this.game.world._height, true, true);
		this.scenario.flecha.animations.play('play');

		//Ojos
		this.scenario.eyes = game.add.sprite(this.scenario.boardMachine.image.x, this.scenario.boardMachine.image.y + this.scenario.boardMachine.image.height / 4, 'ojos');
		this.scenario.eyes.anchor.setTo(0.5);
		this.scenario.eyes.width = this.scenario.boardMachine.image.width / 5;
		this.scenario.eyes.height = this.scenario.boardMachine.image.height / 8;
		this.scenario.eyes.visible = false;
		this.scenario.eyes.animations.add('opening', [0, 1, 2, 3, 4], 15, true, true);
		this.scenario.eyes.animations.add('closing', [4, 3, 2, 1, 0], 15, true, true);
		this.scenario.eyes.animations.add('blink', [4, 3, 2, 1, 0, 1, 2, 3, 4], 15, true, true)

		game.time.events.add(Phaser.Timer.SECOND * 20, this.playOpening, this)
		
		//OBJETOS
		this.CreateItemsWorld1_level1();
		this.resize();

				
		//Referencia de escenario para la maquina--> mala practica
		this.scenario.boardMachine.scenarioReference = this.scenario;


	},

	removeAllItems: function()
	{
		this.scenario.boardMachine.itemSpawner.boardItemsPhysicsGroup.removeAll();
		return true;
	},

	finTiempo: function(){
		this.removeAllItems;
			game.state.start('endGameState',false, false, this.scenario.score, this.scenario.level,this.scenario.world,this.scenario.well,this.scenario.bad,this.scenario.miss);
	},

	bandOutCanvas:function(){
		this.scenario.eslabonesGroup.forEach(function(item) {
			if(item.y>=game.world._height){
				item.y=-item.height;
			};
		});
	},

	update : function() {
		game.physics.arcade.collide(this.scenario.eslabonesGroup, this.scenario.eslabonesGroup);
		this.bandOutCanvas();
		segundos = "0" + Math.round((final_cuent_atras.delay - cuenta_atras.ms) / 1000);
		this.text_cuenta_atras.text=segundos.substr(-2);
		puntos="0000" + this.scenario.score;
		this.text_score.text=puntos.substr(-4);
		//Check if  machine has to spawn something
		this.scenario.boardMachine.CheckItemSpawn(game.time.elapsed);
	},

	render: function() {
	},

	CreateItemsWorld1_level1: function()
	{		
		game.global.gameParams.gameItems.forEach((item)=>{
			//Asigno el id de la caja buscandolo por su posicion en el array
			item.boxId = this.scenario.boxManager.boxes[item.boxIndex].image.id;
			this.scenario.boardMachine.addItemToLevel(item, null);
		});
		
	},

	playOpening: function(){
		this.scenario.eyes.visible = true;
		this.scenario.eyes.animations.play('opening', 50, false).onComplete.add(
			()=>{game.time.events.add(Phaser.Timer.SECOND * 1, this.blink, this);}
		);
		
	},
	
	blink: function(){
		this.scenario.eyes.animations.play('blink',50, false).onComplete.add(
			()=>{game.time.events.add(Phaser.Timer.SECOND * 1, this.playClosing, this);}
		);
	},

	playClosing: function(){
		this.scenario.eyes.animations.play('closing',50, false).onComplete.add(
			()=>{this.scenario.eyes.visible = false;}
		);
		
	}



}
