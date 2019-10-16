GoodProductSorter.contactState = function(game){
	this.startGameKey;
};

GoodProductSorter.contactState.prototype ={

	init : function() {
		if(game.global.DEBUG_MODE)
		{
			console.log("[DEBUG] Entering **CONTACT** state");
		}
	},
	
	preload : function() {

	},

	create:function(){
        var style1 = {	font: "Acme",
						fill: "Black",
						fontSize: "60pt",
						boundsAlignH: "center",
						boundsAlignV: "middle",
					};
					
        var style2 = {	font: "Acme",
						fill: "Black",
						fontSize: "30pt",
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

		//Imagenes
		this.logo = game.add.image(0, 0, 'GlassBeardTeam');
		this.mail = game.add.image(0, 0, 'Gmail');
		
		//Mail 
		this.text_mail=this.game.add.text(0, 0, "GlassBeardTeam@gmail.com",style2);
		
		//Botones de contacto
		this.button_twitter = this.add.button(0, 0, 'Twitter', this.new_page, this, 2, 0, 0);
		this.button_twitter.link='https://twitter.com/glass_beard';
		this.button_GitHub = this.add.button(0, 0, 'GitHub', this.new_page, this, 2, 0, 0);
		this.button_GitHub.link='https://github.com/GlassBeardTeam';
		this.button_Youtube = this.add.button(0, 0, 'Youtube', this.new_page, this, 2, 0, 0);
		this.button_Youtube.link='https://m.youtube.com/channel/UCJsIbbIKmbcrgtMvDwL1Ogw?';

		//Boton volver	
		this.button_volver = this.add.button(0, 0, 'botonTipo', this.click_button, this, 2, 0, 0);
		this.button_volver.stage='menuState';
		

		//animación mosca
		this.mosca= game.add.sprite(0, 0, 'mosca');
		this.mosca.width = game.world._width;
		this.mosca.height = game.world._height * 0.5;
		this.mosca.animations.add('fly');
		game.time.events.repeat(Phaser.Timer.SECOND * 5, 10, this.playMosca, this);
		
		//Texto botones y Boton selector de idioma
		if(this.game.global.IDIOMA=='ESP'){
			this.button_idioma = this.add.button(this.game.width, 10, 'idioma1', this.cambiar_idioma, this, 2, 0, 0);
			this.text1=this.game.add.text(0, 0, "Volver",style1);
		}else{
			this.button_idioma = this.add.button(this.game.width, 10, 'idioma2', this.cambiar_idioma, this, 2, 0, 0);
			this.text1=this.game.add.text(0, 0, "Back",style1);
		}
		this.resize();
	},

	cambiar_idioma:function(){
		if(this.game.global.IDIOMA=='ESP'){
			this.game.global.IDIOMA='ENG';
			this.button_idioma.loadTexture('idioma2');
			this.text1.setText('Back');
		}else{
			this.game.global.IDIOMA='ESP';
			this.button_idioma.loadTexture('idioma1');
			this.text1.setText('Volver');
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
	new_page:function(button){
		window.open(button.link);
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

		//Botones del "menu"
		let textYOffset = game.world._height * 0.02;
		this.button_volver.anchor.setTo(0.5, 0.5);
		this.button_volver.width=this.world.width*0.3;
		this.button_volver.height=this.world.height*0.10;
		this.button_volver.x = game.world._width/2;
		this.button_volver.y = game.world._height*0.9;
		this.text1.setTextBounds(this.button_volver.x - this.button_volver.width/2, this.button_volver.y - this.button_volver.height/2- textYOffset,
			this.button_volver.width, this.button_volver.height);
		
		//Botones contacto
		this.button_Youtube.anchor.setTo(0.5, 0.5);
		this.button_Youtube.width=this.world.width*0.25
		this.button_Youtube.height=this.world.height*0.1;
		this.button_Youtube.x = game.world._width/4;
		this.button_Youtube.y = game.world._height*0.75;
		
		this.button_twitter.anchor.setTo(0.5, 0.5);
		this.button_twitter.width=this.world.width*0.22;
		this.button_twitter.height=this.world.height*0.13;
		this.button_twitter.x = game.world._width/2;
		this.button_twitter.y = game.world._height*0.75;

		this.button_GitHub.anchor.setTo(0.5, 0.5);
		this.button_GitHub.width=this.world.width*0.22;
		this.button_GitHub.height=this.world.height*0.13;
		this.button_GitHub.x = game.world._width/4*3;
		this.button_GitHub.y = game.world._height*0.75;

		//Images
		this.logo.anchor.setTo(0.5, 0.5);
		this.logo.width=this.world.width*0.4;
		this.logo.height=this.world.height*0.25;
		this.logo.x = game.world._width/2;
		this.logo.y = game.world._height*0.35;
		
		this.mail.anchor.setTo(0.5, 0.5);
		this.mail.width=this.world.width*0.15;
		this.mail.height=this.world.height*0.05;
		this.mail.x = game.world._width/4;
		this.mail.y = game.world._height*0.6;
		
		this.text_mail.setTextBounds(game.world._width/4+this.mail.width+(this.text_mail.width/2),this.mail.y)
	},

	playMosca: function(){
		this.mosca.animations.play('fly', 10, false);
	}

};

