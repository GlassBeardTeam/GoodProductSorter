GoodProductSorter.world1State = function(game) {

}

GoodProductSorter.world1State.prototype = {


	init : function() {
		if(game.global.DEBUG_MODE)
		{
			console.log("[DEBUG] Entering **worlds** state");
		}
	},

	preload : function() {

	},

	create : function() {
		fontResize = scaleFont(100, game.width);
        var style = {	font: "Acme",
						fill: "Black",
						fontSize: fontResize,
						boundsAlignH: "center",
						boundsAlignV: "middle",
					};

        this.background = this.add.image(0, 0, "fondoMenu");
        this.background.height = this.game.height;
        this.background.width = this.game.width;
		
        this.Botonera = this.add.image(0, 0, "Botonera");
        this.Botonera.height = this.game.height;
        this.Botonera.width = this.game.width;

		//imagen mala orientacion
		this.image_turn =this.add.image(0, 0, "landscape");		

		//Boton selector de idioma
		//this.button_idioma = this.add.button(this.game.width, 10, 'idioma1', this.cambiar_idioma, this, 2, 0, 0);

		//Boton mundos

		this.button_lvl1 = this.add.button(0, 200, 'ssboton', this.click_lvl1_button, this, 1, 2, 1);
		//this.button_lvl1.setFrames(1);
		this.button_lvl1.stage='level1CutsceneState';
		this.button_lvl1.level=1;

		this.button_lvl2 = this.add.button(0, 0, 'ssboton', this.click_lvl2_button, this, 1, 2, 1);
		//this.button_lvl2.setFrames(1);
		this.button_lvl2.stage='gameState';
		this.button_lvl2.level=2;

		this.button_lvl3 = this.add.button(0, 0, 'ssboton', this.click_lvl3_button, this, 1, 2, 1);
		//this.button_lvl3.setFrames(1);
		this.button_lvl3.stage='gameState';
		this.button_lvl3.level=3;

		//Boton Volver
		this.button_volver = game.add.button(game.world.centerX, 400, 'ssboton', this.click_button, this, 1, 2, 1);
		//this.button_volver.setFrames(1);
		this.button_volver.stage='worldsState';
		
		//Puntuacion
		this.text1_1=this.game.add.text(0, 0, this.game.global.game_save.world1.score[0] + " P.P.",style);
		this.text2_1=this.game.add.text(0, 0, this.game.global.game_save.world1.score[1] + " P.P.",style);
		this.text3_1=this.game.add.text(0, 0, this.game.global.game_save.world1.score[2] + " P.P.",style);
		
		//Texto botones y Boton selector de idioma
		if(this.game.global.IDIOMA=='ESP'){
			this.button_idioma = this.add.button(this.game.width, 10, 'idioma1', this.cambiar_idioma, this, 2, 0, 0)
			this.text1=this.game.add.text(0, 0, "Nivel 1",style);
			this.text2=this.game.add.text(0, 0, "Nivel 2",style);
			this.text3=this.game.add.text(0, 0, "Nivel 3",style);
			this.text4=this.game.add.text(0, 0, "Volver",style);
		}else{
			this.button_idioma = this.add.button(this.game.width, 10, 'idioma2', this.cambiar_idioma, this, 2, 0, 0);
			this.text1=this.game.add.text(0, 0, "Level 1",style);
			this.text2=this.game.add.text(0, 0, "Level 2",style);
			this.text3=this.game.add.text(0, 0, "Level 3",style);
			this.text4=this.game.add.text(0, 0, "Back",style);
		}
		this.text1.setTextBounds(0, 300, this.game.world.width,100);
		this.text4.setTextBounds(0, 400, this.game.world.width,100);

		//animación mosca
		this.mosca= game.add.sprite(0, 0, 'mosca');
		this.mosca.width = game.world._width;
		this.mosca.height = game.world._height * 0.5;
		this.mosca.animations.add('fly');
		game.time.events.repeat(Phaser.Timer.SECOND * 5, 10, this.playMosca, this);

	},

	click_button:function(button){
		buttonSound.play();
		this.state.start(button.stage,true,false,button.level);
	},

	createDefaultBoxManager: function()
	{
		//(boxName, nBoxes, group, xleft, xright, ymin, ymax, boxSpriteSize, boxYOffset)
		let boxScale = 0.6;
		let cajaWidth = game.cache.getImage('cajaAcierto').width * boxScale;
		let xleft = cajaWidth*0.5 * boxScale;	let xright = game.world._width - xleft;
		let ymin = game.world._height * 0.5;	let ymax = game.world._height * 0.5;
		let yOffset = game.world._height * 0.1;

		game.global.gameParams.boxManager = new BoxManager('cajaAcierto', boxScale, 2, xleft, xright,
									ymin, ymax, cajaWidth, yOffset);
		console.log("Width height: " + game.world._width + ", " + game.world._height);
	},

	click_lvl1_button: function(button)
	{
		game.global.gameParams.itemsInARowToChangeStreak =  5;
		game.global.gameParams.machineSpeed = [0.1, 0.15, 0.2, 0.25, 0.3];
		game.global.gameParams.minSpeedOfDraggedImage = 500;
		game.global.gameParams.timeForItemSpawn = 3000;

		this.createDefaultBoxManager();
		//Cada objeto tiene el index de la caja a la que pertenece en el array del box manager	
		game.global.gameParams.gameItems.push(new Item("bebe", 0.2, 0)); 
		game.global.gameParams.gameItems.push(new Item("alcohol", 0.2, 0)); 
		game.global.gameParams.gameItems.push(new Item("bisturiLimpio", 0.2, 0));
		game.global.gameParams.gameItems.push(new Item("corazon", 0.2, 0));
		game.global.gameParams.gameItems.push(new Item("condon", 0.2, 1)); 
		game.global.gameParams.gameItems.push(new Item("calavera", 0.2, 1)); 
	 
		this.click_button(button);
	},

	click_lvl2_button : function(button)
	{
		game.global.gameParams.itemsInARowToChangeStreak =  5;
		game.global.gameParams.machineSpeed = [0.1, 0.2, 0.25, 0.35, 0.5];
		game.global.gameParams.minSpeedOfDraggedImage = 500;
		game.global.gameParams.timeForItemSpawn = 2000;

		this.createDefaultBoxManager();
		//Cada objeto tiene el index de la caja a la que pertenece en el array del box manager	
		game.global.gameParams.gameItems.push(new Item("bebe", 0.2, 0)); 
		game.global.gameParams.gameItems.push(new Item("alcohol", 0.2, 0)); 
		game.global.gameParams.gameItems.push(new Item("bisturiLimpio", 0.2, 0));
		game.global.gameParams.gameItems.push(new Item("corazon", 0.2, 0));
		game.global.gameParams.gameItems.push(new Item("bolsaSangre", 0.2, 0)); 
		game.global.gameParams.gameItems.push(new Item("condon", 0.2, 1)); 
		game.global.gameParams.gameItems.push(new Item("calavera", 0.2, 1)); 
		game.global.gameParams.gameItems.push(new Item("analisisOrina", 0.2, 1)); 
		game.global.gameParams.gameItems.push(new Item("coca", 0.2, 0));
		game.global.gameParams.gameItems.push(new Item("estetoscopio", 0.2, 0)); 
		game.global.gameParams.gameItems.push(new Item("viagra", 0.2, 1));
		game.global.gameParams.gameItems.push(new Item("voodoo", 0.2, 1)); 
		this.click_button(button);
	},
	click_lvl3_button : function(button)
	{
		game.global.gameParams.itemsInARowToChangeStreak =  5;
		game.global.gameParams.machineSpeed = [0.1, 0.2, 0.3, 0.4, 0.5];
		game.global.gameParams.minSpeedOfDraggedImage = 500;
		game.global.gameParams.timeForItemSpawn = 1500;

		this.createDefaultBoxManager();
		//Cada objeto tiene el index de la caja a la que pertenece en el array del box manager	
		game.global.gameParams.gameItems.push(new Item("bebe", 0.2, 0)); 
		game.global.gameParams.gameItems.push(new Item("alcohol", 0.2, 0)); 
		game.global.gameParams.gameItems.push(new Item("bisturiLimpio", 0.2, 0));
		game.global.gameParams.gameItems.push(new Item("corazon", 0.2, 0));
		game.global.gameParams.gameItems.push(new Item("condon", 0.2, 1)); 
		game.global.gameParams.gameItems.push(new Item("calavera", 0.2, 1));
		game.global.gameParams.gameItems.push(new Item("bebe", 0.2, 0)); 
		game.global.gameParams.gameItems.push(new Item("alcohol", 0.2, 0)); 
		game.global.gameParams.gameItems.push(new Item("bisturiLimpio", 0.2, 0));
		game.global.gameParams.gameItems.push(new Item("corazon", 0.2, 0));
		game.global.gameParams.gameItems.push(new Item("bolsaSangre", 0.2, 0)); 
		game.global.gameParams.gameItems.push(new Item("condon", 0.2, 1)); 
		game.global.gameParams.gameItems.push(new Item("calavera", 0.2, 1)); 
		game.global.gameParams.gameItems.push(new Item("analisisOrina", 0.2, 1)); 
		game.global.gameParams.gameItems.push(new Item("coca", 0.2, 0));
		game.global.gameParams.gameItems.push(new Item("estetoscopio", 0.2, 0)); 
		game.global.gameParams.gameItems.push(new Item("viagra", 0.2, 1));
		game.global.gameParams.gameItems.push(new Item("voodoo", 0.2, 1)); 
		game.global.gameParams.gameItems.push(new Item("testEmbarazo", 0.2, 1));
		game.global.gameParams.gameItems.push(new Item("tijerasSangre", 0.2, 1)); 
		game.global.gameParams.gameItems.push(new Item("sierra", 0.2, 0)); 
		game.global.gameParams.gameItems.push(new Item("pulmones", 0.2, 0)); 
		game.global.gameParams.gameItems.push(new Item("pulmonesNegros", 0.2, 1)); 
	 
		this.click_button(button);
	},

	cambiar_idioma:function(){
		if(this.game.global.IDIOMA=='ESP'){
			this.game.global.IDIOMA='ENG';
			this.button_idioma.loadTexture('idioma2');
			this.text1.setText("Level 1");
			this.text2.setText("Level 2");
			this.text3.setText("Level 3");
			this.text4.setText('Back');
		}else{
			this.game.global.IDIOMA='ESP';
			this.button_idioma.loadTexture('idioma1');
			this.text1.setText("Nivel 1");
			this.text2.setText("Nivel 2");
			this.text3.setText("Nivel 3");
			this.text4.setText('Volver');
		}
	},

	update : function() {
		if (this.scale.isLandscape && window.screen.availHeight<=1000){
			this.image_turn.height = this.game.height;
			this.image_turn.width = this.game.width;
			this.image_turn.visible=false;
			this.image_turn.bringToTop();
		}else{
			if (this.image_turn.visible === true){
				this.image_turn.visible=false;
			}
		}
		this.resize();
	},
	
	getSpriteScale: function (spriteWidth, spriteHeight, availableSpaceWidth, availableSpaceHeight, minPadding) {
		var ratio = 1;
		var currentDevicePixelRatio = window.devicePixelRatio;
		// Sprite needs to fit in either width or height
		
		var widthRatio = (spriteWidth * currentDevicePixelRatio + 2 * minPadding) / availableSpaceWidth;
		var heightRatio = (spriteHeight * currentDevicePixelRatio + 2 * minPadding) / availableSpaceHeight;
		if(widthRatio > 1 || heightRatio > 1){
			ratio = 1 / Math.max(widthRatio, heightRatio);
		} 
		return ratio * currentDevicePixelRatio;
	},

	resize: function () {
		this.num_botones=3;//numero de botones, para asignar el porcentaje de la pantalla
		this.porcentaje_logo_juego=25;//espacio de la pantalla que se reserva al titulo del juego
		multiplicador_escala=1.5;//valor por el que se escalaran los botones, depende del tamaño de la pantalla

		this.background.height = this.world.height;
		this.background.width = this.world.width;
		
		this.Botonera.height = this.world.height;
		this.Botonera.width = this.world.width;

		//Boton idioma
		this.button_idioma.width=this.world.width*0.08;
		this.button_idioma.height=this.world.height*0.05;
		this.button_idioma.x = this.world.width- this.button_idioma.width-10;
		this.button_idioma.y = 0;//0 es la posicion
		
		//Botones Menu
			//Boton lvl1
		this.button_lvl1.anchor.setTo(0.5, 0.5);
		this.button_lvl1.width=this.world.width*0.32;
		this.button_lvl1.height=this.world.height*0.12;
		this.button_lvl1.x = this.world.width*0.5;
		this.button_lvl1.y = game.world._height * 0.3;


			//Boton lvl2
		this.button_lvl2.anchor.setTo(0.5, 0.5);
		this.button_lvl2.width=this.world.width*0.32;
		this.button_lvl2.height=this.world.height*0.12;
		this.button_lvl2.x = this.button_lvl1.x;
		this.button_lvl2.y = this.button_lvl1.y + game.world._height * 0.15;

		this.button_lvl3.anchor.setTo(0.5, 0.5);
		this.button_lvl3.width=this.world.width*0.32;
		this.button_lvl3.height=this.world.height*0.12;
		this.button_lvl3.x = this.button_lvl2.x;
		this.button_lvl3.y = this.button_lvl2.y + game.world._height * 0.15;

		//Textos
			//Texto boton lvl1
		this.text1.anchor.setTo(0.5 ,0.5);
		this.text1.setTextBounds(this.button_lvl1.x, this.button_lvl1.y, this.button_lvl1.width * 0.5, 0);
			///Texto puntos lvl1
		this.text1_1.anchor.setTo(0.5 ,0.5);
		this.text1_1.setTextBounds(this.button_lvl1.x, this.button_lvl1.y+this.text1.height*0.75, this.button_lvl1.width * 0.5, 0);

			//Texto boton lvl2
		this.text2.anchor.setTo(0.5 ,0.5);
		this.text2.setTextBounds(this.button_lvl2.x, this.button_lvl2.y, this.button_lvl2.width * 0.5, 0);
			///Texto puntos lvl2
		this.text2_1.anchor.setTo(0.5 ,0.5);
		this.text2_1.setTextBounds(this.button_lvl2.x, this.button_lvl2.y+this.text2.height*0.75, this.button_lvl2.width * 0.5, 0);
		
			//Texto boton lvl3
		this.text3.anchor.setTo(0.5 ,0.5);
		this.text3.setTextBounds(this.button_lvl3.x, this.button_lvl3.y, this.button_lvl3.width * 0.5, 0);
			///Texto puntos lvl3
		this.text3_1.anchor.setTo(0.5 ,0.5);
		this.text3_1.setTextBounds(this.button_lvl3.x, this.button_lvl3.y+this.text3.height*0.75, this.button_lvl3.width * 0.5, 0);

		//Boton volver
		this.button_volver.anchor.setTo(0.5, 0.5);
		this.button_volver.width=this.world.width*0.3;
		this.button_volver.height=this.world.height*0.10;
		this.button_volver.x = game.world._width/2;
		this.button_volver.y = game.world._height*0.9;		
		
		this.text4.setTextBounds(this.button_volver.x - this.button_volver.width/2, this.button_volver.y - this.button_volver.height/2- game.world._height * 0.02,
			this.button_volver.width, this.button_volver.height);
	},

	
	playMosca: function(){
		this.mosca.animations.play('fly', 10, false);
	}

}
