GoodProductSorter.endGameState = function(game) {
this. puntos;
this.nivel;
this.mundo;
}

GoodProductSorter.endGameState.prototype ={

	init: function(puntuacion,nivel,mundo,bien,mal,perdido) {
		//actualiza la cache
		if(this.game.global.game_save.world1.score[nivel-1]<puntuacion){
			this.game.global.game_save.world1.score[nivel-1]=puntuacion;
			window.localStorage.setItem('game_save',JSON.stringify(this.game.global.game_save));
		};
		
		this.puntos=puntuacion;
		this.clasificados=bien;
		this.mal_clasificados=mal;
		this.no_clasificados=perdido;
		this.nivel=nivel;
		this.mundo=mundo;
		if(game.global.DEBUG_MODE)
		{
			console.log("[DEBUG] Entering **END GAME** state " + puntuacion);
		}
	},

	preload : function() {

	},

	create:function(){
		fontResize = scaleFont(100, game.width);
        var style = {	font: "Acme",
						fill: "Black",
						fontSize: fontResize,
						boundsAlignH: "center",
						boundsAlignV: "middle",
					};
		fontResize2 = scaleFont(50, game.width);
        var style2 = {	font: "Acme",
						fill: "Black",
						fontSize: fontResize2,
						boundsAlignH: "left",
						boundsAlignV: "middle",
					};
        this.background = game.add.image(0, 0, "fondoMenu");
        this.background.height = game.world._height;
        this.background.width = game.world._width;

		//Nomina
        this.Nomina = this.add.image(0, 0, "Nomina");
        this.Nomina.height = this.game.height;
        this.Nomina.width = this.game.width;

		//imagen mala orientacion
		this.image_turn = game.add.image(0, 0, "landscape");		

		//Botones del menu
		this.button_volver = game.add.button(game.world.centerX, 400, 'ssboton', this.click_button, this, 1, 2, 1);
		if(this.nivel == 3)
			this.button_volver.stage = 'employeeState';
		else
			this.button_volver.stage='worldsState';

		//Texto botones y Boton selector de idioma
		if(this.game.global.IDIOMA=='ESP'){
			this.button_idioma = this.add.button(game.world._width, 10, 'idioma1', this.cambiar_idioma, this, 2, 0, 0);
			this.text1 = game.add.text(0, 0, "Objetos bien clasificados",style2);
			this.text2 = game.add.text(0, 0, "Objetos mal clasificados",style2);
			this.text3 = game.add.text(0, 0, "Objetos no clasificados",style2);
			this.text4 = game.add.text(0, 0, "Puntos Positivos",style2);
			this.text5 = game.add.text(0, 0, "Volver",style);	
		}else{
			this.button_idioma = this.add.button(game.world._width, 10, 'idioma2', this.cambiar_idioma, this, 2, 0, 0);
			this.text1 = game.add.text(0, 0, "Well classified objects:",style2);
			this.text2 = game.add.text(0, 0, "Misclassified objects:",style2);
			this.text3 = game.add.text(0, 0, "Unclassified objects:",style2);
			this.text4 = game.add.text(0, 0, "Positive Points",style2);
			this.text5 = game.add.text(0, 0, "Back",style);
		}

		this.text1_1=game.add.text(0, 0, "x" + this.clasificados, style2);
		this.text2_1=game.add.text(0, 0, "x" + this.mal_clasificados, style2);
		this.text3_1=game.add.text(0, 0, "x" + this.no_clasificados, style2);
		
		total=this.clasificados+ this.mal_clasificados+this.no_clasificados;
		this.text1_2=game.add.text(0, 0, Math.round(this.clasificados/total*10000)/100 + " %", style2);
		this.text2_2=game.add.text(0, 0, Math.round(this.mal_clasificados/total*10000)/100 + " %", style2);
		this.text3_2=game.add.text(0, 0, Math.round(this.no_clasificados/total*10000)/100 + " %", style2);
		this.text4_2=game.add.text(0, 0, this.puntos, style2);

		this.stampSound = game.add.audio("stamp");

		this.levelStamps(this.nivel, this.puntos);

		this.resize();
	},

	//Recibe el nivel y los puntos obtenidos y coloca el número de sellos correspondiente
	levelStamps: function(level, points){
		switch (level) {
			case 1:
				if (points > 149){
					this.placeStamp(game.width*0.2, game.height*0.6);
					game.time.events.add(Phaser.Timer.SECOND * 0.5, this.placeStamp, this, game.width*0.4, game.height*0.6);
					game.time.events.add(Phaser.Timer.SECOND * 0.5, this.placeStamp, this, game.width*0.6, game.height*0.6);
				}
				else if (points > 99){
					this.placeStamp(game.width*0.2, game.height*0.6);
					game.time.events.add(Phaser.Timer.SECOND * 0.5, this.placeStamp, this, game.width*0.4, game.height*0.6);
				}
				else if (points > 49){
					this.placeStamp(game.width*0.2, game.height*0.6);
				}
				break;
			case 2:
				if (points > 199){
					this.placeStamp(game.width*0.2, game.height*0.6);
					game.time.events.add(Phaser.Timer.SECOND * 0.5, this.placeStamp, this, game.width*0.4, game.height*0.6);
					game.time.events.add(Phaser.Timer.SECOND * 0.5, this.placeStamp, this, game.width*0.6, game.height*0.6);
				}
				else if (points > 129){
					this.placeStamp(game.width*0.2, game.height*0.6);
					game.time.events.add(Phaser.Timer.SECOND * 0.5, this.placeStamp, this, game.width*0.4, game.height*0.6);
				}
				else if (points > 79){
					this.placeStamp(game.width*0.2, game.height*0.6);
				}
				break;
			case 3:
				if (points > 249){
					this.placeStamp(game.width*0.2, game.height*0.6);
					game.time.events.add(Phaser.Timer.SECOND * 0.5, this.placeStamp, this, game.width*0.4, game.height*0.6);
					game.time.events.add(Phaser.Timer.SECOND * 0.5, this.placeStamp, this, game.width*0.6, game.height*0.6);
				}
				else if (points > 199){
					this.placeStamp(game.width*0.2, game.height*0.6);
					game.time.events.add(Phaser.Timer.SECOND * 0.5, this.placeStamp, this, game.width*0.4, game.height*0.6);
				}
				else if (points > 129){
					this.placeStamp(game.width*0.2, game.height*0.6);
				}
				break;
		}
	},

	//Coloca un sello en la posición indicada
	placeStamp: function(posX, posY){
		
		this.stamp = game.add.image(posX, posY, "sello");

		stampScale = 1;

        let stampProp = this.stamp.width/game.world._width;
        
        boss.width *= stampScale/stampProp;
        boss.height *= stampScale/stampProp;

		this.stampSound.play();
	},

	cambiar_idioma:function(){
		if(game.global.IDIOMA=='ESP'){
			game.global.IDIOMA='ENG';
			this.button_idioma.loadTexture('idioma2');
			this.text1.setText('Well classified objects:');
			this.text2.setText('Misclassified objects:');
			this.text3.setText('Unclassified objects:');
			this.text4.setText('Positive Points');
			this.text5.setText('Back');
		}else{
			game.global.IDIOMA='ESP';
			this.button_idioma.loadTexture('idioma1');
			this.text1.setText('Objetos bien clasificados:');
			this.text2.setText('Objetos mal clasificados:');
			this.text3.setText('Objetos no clasificados:');
			this.text4.setText('Puntos Positivos:');
			this.text5.setText('Volver');
		}
	},


	update:function(){
		if (this.scale.isLandscape && window.screen.availHeight<=1000){
			this.image_turn.height = game.world._height;
			this.image_turn.width = game.world._width;
			this.image_turn.visible=false;
			this.image_turn.bringToTop();
		}else{
			if (this.image_turn.visible === true){
				this.image_turn.visible=false;
			}
		}
	},

	click_button:function(button){
		buttonSound.play();
		this.state.start(button.stage);
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
		this.porcentaje_logo_juego=20;//espacio de la pantalla que se reserva al titulo del juego
		multiplicador_escala=0.75;//valor por el que se escalaran los botones, depende del tamaño de la pantalla

		this.background.height = this.world.height;
		this.background.width = this.world.width;
		
		this.Nomina.height = game.world._height;
		this.Nomina.width = game.world._width;

		//Boton idioma
		this.button_idioma.width= game.world._width*0.08;
		this.button_idioma.height= game.world._height*0.05;
		this.button_idioma.x = game.world._width- this.button_idioma.width-10;
		this.button_idioma.y = 0;//0 es la posicion

		//Botones Menu
		this.button_volver.anchor.setTo(0.5, 0.5);
		this.button_volver.width=this.world.width*0.3;
		this.button_volver.height=this.world.height*0.10;
		this.button_volver.x = game.world._width/2;
		this.button_volver.y = game.world._height*0.9;		
		
		this.text5.setTextBounds(this.button_volver.x - this.button_volver.width/2, this.button_volver.y - this.button_volver.height/2- game.world._height * 0.02,
			this.button_volver.width, this.button_volver.height);
		
		this.text1.setTextBounds(game.world._width/6.6, game.world._height*0.27,game.world._width/6.6, game.world._height*0.27);
		this.text2.setTextBounds(game.world._width/6.6, game.world._height*0.30,game.world._width/6.6, game.world._height*0.30);
		this.text3.setTextBounds(game.world._width/6.6, game.world._height*0.33,game.world._width/6.6, game.world._height*0.33);
		this.text4.setTextBounds(game.world._width/6.6, game.world._height*0.46,game.world._width/6.6, game.world._height*0.46);

		this.text1_1.setTextBounds(game.world._width/6.6*4, game.world._height*0.27,game.world._width/6.6*4, game.world._height*0.27);
		this.text2_1.setTextBounds(game.world._width/6.6*4, game.world._height*0.30,game.world._width/6.6*4, game.world._height*0.30);
		this.text3_1.setTextBounds(game.world._width/6.6*4, game.world._height*0.33,game.world._width/6.6*4, game.world._height*0.33);

		this.text1_2.setTextBounds(game.world._width/6.8*5, game.world._height*0.27,game.world._width/6.8*5, game.world._height*0.27);
		this.text2_2.setTextBounds(game.world._width/6.8*5, game.world._height*0.30,game.world._width/6.8*5, game.world._height*0.30);
		this.text3_2.setTextBounds(game.world._width/6.8*5, game.world._height*0.33,game.world._width/6.8*5, game.world._height*0.33);
		this.text4_2.setTextBounds(game.world._width/6.6*5, game.world._height*0.46,game.world._width/6.6*5, game.world._height*0.46);


	},

	render:function() {
		//this.game.debug.text(this.game.global.IDIOMA ,40,50,"white");
		//this.game.debug.text(this.telon.y ,40,50,"white");
	}
}; 