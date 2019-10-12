GoodProductSorter.endGameState = function(game) {
this. puntos;
this.nivel;
this.mundo;
}

GoodProductSorter.endGameState.prototype ={

	init: function(puntuacion,nivel,mundo) {
		this.puntos=puntuacion;
		this.nivel=nivel;
		this.mundo=mundo;
		console.log("bug");
		if(game.global.DEBUG_MODE)
		{
			console.log("[DEBUG] Entering **END GAME** state " + puntuacion);
		}
	},

	preload : function() {

	},

	create:function(){
        var style = {	font: "Acme",
						fill: "Black",
						fontSize: "100pt",
						boundsAlignH: "center",
						boundsAlignV: "middle",
					};
        this.background = game.add.image(0, 0, "fondoMenu");
        this.background.height = game.world._height;
        this.background.width = game.world._width;

		//imagen mala orientacion
		this.image_turn = game.add.image(0, 0, "landscape");		

		//Botones del menu
		this.button_volver = game.add.button(game.world.centerX, 400, 'botonTipo', this.click_button, this, 2, 0, 0);
		this.button_volver.stage='worldsState';

		//Texto botones y Boton selector de idioma
		if(this.game.global.IDIOMA=='ESP'){
			this.button_idioma = this.add.button(game.world._width, 10, 'idioma1', this.cambiar_idioma, this, 2, 0, 0);
			this.text1 = game.add.text(0, 0, "Puntuacion Nivel",style);
			this.text2 = game.add.text(0, 0, this.puntos,style);
			this.text3 = game.add.text(0, 0, "Volver",style);
		}else{
			this.button_idioma = game.add.button(game.world._width, 10, 'idioma2', this.cambiar_idioma, this, 2, 0, 0);
			this.text1 = game.add.text(0, 0, "Final score",style);
			this.text2 = game.add.text(0, 0, this.puntos,style);
			this.text3 = game.add.text(0, 0, "Back",style);
		}
		this.text1.setTextBounds(0, 400, game.world._width, game.world._height*0.25);
		this.text2.setTextBounds(0, 400, game.world._width, game.world._height*0.4);
		this.text3.setTextBounds(0, 400, game.world._width,100);
	},

	cambiar_idioma:function(){
		if(game.global.IDIOMA=='ESP'){
			game.global.IDIOMA='ENG';
			this.button_idioma.loadTexture('idioma2');
			this.text3.setText('Final score');
			this.text3.setText("Puntuacion Nivel");
		}else{
			game.global.IDIOMA='ESP';
			this.button_idioma.loadTexture('idioma1');
			this.text3.setText('Volver');
			this.text3.setText('Volver');
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
		this.resize();
	},

	click_button:function(button){
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

		//Boton idioma
		this.button_idioma.width= game.world._width*0.05;
		this.button_idioma.height= game.world._height*0.05;
		this.button_idioma.x = game.world._width- this.button_idioma.width-10;
		this.button_idioma.y = 0;//0 es la posicion

		//Botones Menu

		this.button_volver.width = game.world._width*0.3;
		this.button_volver.height = game.world._height*0.2;
		this.button_volver.x = this.world.centerX - this.button_volver.width / 2;
		this.button_volver.y = (game.world._height*this.porcentaje_logo_juego/100) + (game.world._height*((100-this.porcentaje_logo_juego))/100)/this.num_botones*2;//2 es la posicion
		this.text3.setTextBounds(0, this.button_volver.y+this.button_volver.height/3, game.world._width,100);
	},

	render:function() {
		//this.game.debug.text(this.game.global.IDIOMA ,40,50,"white");
		//this.game.debug.text(this.telon.y ,40,50,"white");
	}
}; 