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
        var style = {	font: "Acme",
						fill: "Black",
						fontSize: "100pt",
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
		this.button_world1 = this.add.button(0, 200, 'botonTipo', this.click_button, this, 2, 0, 0);
		this.button_world1.stage='gameState';
		
		//Boton Volver
		this.button_volver = this.add.button(this.world.centerX, 200, 'botonTipo', this.click_button, this, 2, 0, 0);
		this.button_volver.stage='worldsState';
		
		//Texto botones y Boton selector de idioma
		if(this.game.global.IDIOMA=='ESP'){
			this.button_idioma = this.add.button(this.game.width, 10, 'idioma1', this.cambiar_idioma, this, 2, 0, 0)
			this.text1=this.game.add.text(0, 0, "Nivel 1",style);
			this.text3=this.game.add.text(0, 0, "Volver",style);
		}else{
			this.button_idioma = this.add.button(this.game.width, 10, 'idioma2', this.cambiar_idioma, this, 2, 0, 0);
			this.text1=this.game.add.text(0, 0, "Level 1",style);
			this.text3=this.game.add.text(0, 0, "Return",style);
		}
		this.text1.setTextBounds(0, 200, this.game.world.width,100);
		this.text3.setTextBounds(0, 400, this.game.world.width,100);

	},

	click_button:function(button){
		this.state.start(button.stage);
	},

	cambiar_idioma:function(){
		if(this.game.global.IDIOMA=='ESP'){
			this.game.global.IDIOMA='ENG';
			this.button_idioma.loadTexture('idioma2');
			this.text1.setText("Level 1");
			this.text3.setText('Return');
		}else{
			this.game.global.IDIOMA='ESP';
			this.button_idioma.loadTexture('idioma1');
			this.text1.setText("Nivel 1");
			this.text3.setText('Volver');
		}
	},

	update : function() {
		if (this.scale.isLandscape && window.screen.availHeight<=1000){
			this.image_turn.height = this.game.height;
			this.image_turn.width = this.game.width;
			this.image_turn.visible=true;
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

		//Boton idioma
		this.button_idioma.width=this.world.width*0.05;
		this.button_idioma.height=this.world.height*0.05;
		this.button_idioma.x = this.world.width- this.button_idioma.width-10;
		this.button_idioma.y = 0;//0 es la posicion
		
		//Botones Menu
		this.button_world1.width=this.world.width*0.32;
		this.button_world1.height=this.world.height*0.12;
		this.button_world1.x =0+this.world.width*0.10;
		this.button_world1.y = (this.world.height*this.porcentaje_logo_juego/100) + (this.world.height*((100-this.porcentaje_logo_juego))/100)/this.num_botones*0;
		this.text1.setTextBounds(this.button_world1.x+this.button_world1.width/3, this.button_world1.y+this.button_world1.height, this.button_world1.x,100);


		this.button_volver.width=this.world.width*0.32;
		this.button_volver.height=this.world.height*0.12;
		this.button_volver.x =this.world.centerX- this.button_volver.width / 2;
		this.button_volver.y = this.world.height-this.world.height*0.05-this.button_volver.height;
		this.text3.setTextBounds(0, this.button_volver.y+this.button_volver.height/3, this.game.world.width,100);
	}
}
