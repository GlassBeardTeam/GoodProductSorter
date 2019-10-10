GoodProductSorter.worldsState = function(game) {

}

GoodProductSorter.worldsState.prototype = {

	init : function() {
		if(game.global.DEBUG_MODE)
		{
			console.log("[DEBUG] Entering **worlds** state");
		}
	},

	preload : function() {

	},

	create : function() {
        var style = {	font: "Acme",
						fill: "Black",
						fontSize: "70pt",
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

		//Boton mundos
		this.button_world1 = this.add.button(0, 0, 'botonEnable', this.click_button, this, 2, 0, 0);
		this.button_world1.stage='world1State';

		this.button_world2 = this.add.button(0, 0, 'botonTipo', this.click_button, this, 2, 0, 0);
		//this.button_world2.stage='world1State';
		
		//Boton Volver
		this.button_volver = this.add.button(this.world.centerX, 200, 'botonTipo', this.click_button, this, 2, 0, 0);
		this.button_volver.stage='menuState';
		
		//Texto botones y Boton selector de idioma
		if(this.game.global.IDIOMA=='ESP'){
			this.button_idioma = this.add.button(this.game.width, 10, 'idioma1', this.cambiar_idioma, this, 2, 0, 0)
			this.text1=this.game.add.text(0, 0, "Mundo 1",style);
			this.text2=this.game.add.text(0, 0, "Mundo 2",style);
			this.text3=this.game.add.text(0, 0, "Volver",style);
		}else{
			this.button_idioma = this.add.button(this.game.width, 10, 'idioma2', this.cambiar_idioma, this, 2, 0, 0);
			this.text1=this.game.add.text(0, 0, "World 1",style);
			this.text2=this.game.add.text(0, 0, "World 2",style);
			this.text3=this.game.add.text(0, 0, "Return",style);
		}
		/*
		this.text1.setTextBounds(0, 200, this.game.world.width,100);
		this.text2.setTextBounds(0, 300, this.game.world.width,100);
		this.text3.setTextBounds(0, 400, this.game.world.width,100);
		*/
		this.resize();
	},

	click_button:function(button){
		this.state.start(button.stage);
	},


	cambiar_idioma:function(){
		if(this.game.global.IDIOMA=='ESP'){
			this.game.global.IDIOMA='ENG';
			this.button_idioma.loadTexture('idioma2');
			this.text1.setText("World 1");
			this.text2.setText('World 2');
			this.text3.setText('Return');
		}else{
			this.game.global.IDIOMA='ESP';
			this.button_idioma.loadTexture('idioma1');
			this.text1.setText("Mundo 1");
			this.text2.setText('Mundo 2');
			this.text3.setText('Volver');
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
		//this.resize();
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
		let buttonsYOffset = game.world._width * 0.05;
		let textYOffset = game.world._height * 0.02;

		this.button_world1.anchor.setTo(0.5, 0.5);
		this.button_world1.width = game.world._width*0.5;
		this.button_world1.height = game.world._height*0.15;
		this.button_world1.x = game.world._width*0.5;
		this.button_world1.y = this.world._height*0.3;
		this.text1.setTextBounds(this.button_world1.x - this.button_world1.width/2, this.button_world1.y - this.button_world1.height/2- textYOffset,
			this.button_world1.width, this.button_world1.height);

		this.button_world2.anchor.setTo(0.5, 0.5);
		this.button_world2.width = this.world.width*0.5;
		this.button_world2.height = this.world.height*0.15;
		this.button_world2.x = this.button_world1.x;
		this.button_world2.y = this.button_world1.y + this.button_world2.height + buttonsYOffset;
		this.text2.setTextBounds(this.button_world2.x - this.button_world2.width/2, this.button_world2.y - this.button_world2.height/2- textYOffset,
			this.button_world2.width, this.button_world2.height);

		this.button_volver.anchor.setTo(0.5, 0.5);
		this.button_volver.width=this.world.width*0.3;
		this.button_volver.height=this.world.height*0.10;
		this.button_volver.x = game.world._width/2;
		this.button_volver.y = game.world._height*0.9;
		this.text3.setTextBounds(this.button_volver.x - this.button_volver.width/2, this.button_volver.y - this.button_volver.height/2- textYOffset,
			this.button_volver.width, this.button_volver.height);
	}
}
