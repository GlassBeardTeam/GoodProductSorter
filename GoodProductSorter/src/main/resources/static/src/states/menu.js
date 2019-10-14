GoodProductSorter.menuState = function(game){
	this.startGameKey;
};

GoodProductSorter.menuState.prototype ={

	init : function() {
		if(game.global.DEBUG_MODE)
		{
			console.log("[DEBUG] Entering **MENU** state");
		}
		this.startGameKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
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
        this.background = this.add.image(0, 0, "fondoMenu");
        this.background.height = this.game.height;
        this.background.width = this.game.width;
		
        this.Botonera = this.add.image(0, 0, "Botonera");
        this.Botonera.height = this.game.height;
        this.Botonera.width = this.game.width;

		//imagen mala orientacion
		this.image_turn =this.add.image(0, 0, "landscape");		

		//Botones del menu
		this.button_inicio = this.add.button(0, 0, 'botonEnable', this.click_button, this, 2, 0, 0);
		this.button_inicio.stage='worldsState';

		this.button_casa = this.add.button(0, 0, 'botonTipo', this.click_button, this, 2, 0, 0);
		this.button_casa.stage='Casa';

		this.button_ajustes = this.add.button(0, 0, 'botonTipo', this.click_button, this, 2, 0, 0);
		this.button_ajustes.stage='Ajustes';

		//animación mosca
		this.mosca= game.add.sprite(0, 0, 'mosca');
		this.mosca.width = game.world._width;
		this.mosca.height = game.world._height * 0.5;
		this.mosca.animations.add('fly');
		game.time.events.repeat(Phaser.Timer.SECOND * 5, 10, this.playMosca, this);
		
		//Texto botones y Boton selector de idioma
		if(this.game.global.IDIOMA=='ESP'){
			this.button_idioma = this.add.button(this.game.width, 10, 'idioma1', this.cambiar_idioma, this, 2, 0, 0);
			this.text1=this.game.add.text(0, 0, "Mundos",style);
			this.text2=this.game.add.text(0, 0, "Casa",style);
			this.text3=this.game.add.text(0, 0, "Ajustes",style);
		}else{
			this.button_idioma = this.add.button(this.game.width, 10, 'idioma2', this.cambiar_idioma, this, 2, 0, 0);
			this.text1=this.game.add.text(0, 0, "Worlds",style);
			this.text2=this.game.add.text(0, 0, "Home",style);
			this.text3=this.game.add.text(0, 0, "Settings",style);
		}
		/*
		this.startGameKey.onDown.add(()=>
		{
			let message= {
				event: "INIT_GAME"
			}
			game.global.socket.send(JSON.stringify(message));
		}, this);
		*/
		this.resize();
	},

	cambiar_idioma:function(){
		if(this.game.global.IDIOMA=='ESP'){
			this.game.global.IDIOMA='ENG';
			this.button_idioma.loadTexture('idioma2');
			this.text1.setText('Worlds');
			this.text2.setText('Home');
			this.text3.setText('Settings');
		}else{
			this.game.global.IDIOMA='ESP';
			this.button_idioma.loadTexture('idioma1');
			this.text1.setText('Mundos');
			this.text2.setText('Casa');
			this.text3.setText('Ajustes');
		}
	},
	
	
	update:function(){
		if (this.scale.isLandscape && window.screen.availHeight<=1000){
			this.image_turn.height = this.game.height;
			this.image_turn.width = this.game.width;
			this.image_turn.visible= false;
			this.image_turn.bringToTop();
		}else{
			if (this.image_turn.visible === true){
				this.image_turn.visible=false;
			}
		}
		//this.resize();
	},

	click_button:function(button){
		this.state.start(button.stage);
	},

	resize: function () {
		this.num_botones=3;//numero de botones, para asignar el porcentaje de la pantalla
		this.porcentaje_logo_juego=20;//espacio de la pantalla que se reserva al titulo del juego
		multiplicador_escala=0.75;//valor por el que se escalaran los botones, depende del tamaño de la pantalla

		this.background.height = game.world._height;
		this.background.width = game.world._width;
		
		this.Botonera.height = game.world._height;
		this.Botonera.width = game.world._width;

		//Boton idioma
		this.button_idioma.width= game.world._width*0.08;
		this.button_idioma.height=game.world._height*0.05;
		this.button_idioma.x = game.world._width- this.button_idioma.width-10;
		this.button_idioma.y = 0;

		//Botones del menu
		let buttonsOffset = game.world._height * 0.05;
			//Button inicio
		this.button_inicio.anchor.setTo(0.5, 0.5);
		this.button_inicio.width = game.world._width*0.6;
		this.button_inicio.height = game.world._height*0.2;
		this.button_inicio.x = game.world._width/2;
		this.button_inicio.y += game.world._height*0.32;
			//Button casa
		this.button_casa.anchor.setTo(0.5, 0.5);
		this.button_casa.width = game.world._width*0.6;
		this.button_casa.height = game.world._height*0.2;
		this.button_casa.x += this.button_inicio.x;
		this.button_casa.y += this.button_inicio.y + this.button_inicio.height + buttonsOffset;
			//Button ajustes
		this.button_ajustes.anchor.setTo(0.5, 0.5);
		this.button_ajustes.width = game.world._width*0.6;
		this.button_ajustes.height = game.world._height*0.2;
		this.button_ajustes.x += this.button_casa.x;
		this.button_ajustes.y +=  this.button_casa.y + this.button_casa.height + buttonsOffset;
			//Text bounds		
		let textYOffset = game.world._height * 0.02;
		this.text1.setTextBounds(this.button_inicio.x - this.button_inicio.width/2, this.button_inicio.y - this.button_inicio.height/2-textYOffset, this.button_inicio.width, this.button_inicio.height);
		this.text2.setTextBounds(this.button_casa.x - this.button_casa.width/2, this.button_casa.y - this.button_casa.height/2-textYOffset, this.button_casa.width, this.button_casa.height);
		this.text3.setTextBounds(this.button_ajustes.x - this.button_ajustes.width/2, this.button_ajustes.y - this.button_ajustes.height/2-textYOffset, this.button_ajustes.width, this.button_ajustes.height);

	},

	playMosca: function(){
		this.mosca.animations.play('fly', 10, false);
	}

};

