GoodProductSorter.preloadState = function(game){
	this.preloadBar=null;
};

GoodProductSorter.preloadState.prototype={
	// Variables que indican si se han cargado los assets y la fuente
	assetsReady : false,
	fontsReady : false,
	
	init : function() {
/*		if(game.global.DEBUG_MODE)
		{
			console.log("[DEBUG] Entering **PRELOAD** state");
		}*/
	},


	preload : function() {
		this.loadAnimation();
		this.loadFonts();
        this.loadAssets();
	},

	loadAssets:function(){

		//Menu Images
		this.game.load.onLoadComplete.addOnce(this.loadComplete,this);
		this.load.image("fondoMenu", 'assets/images/scenario/SueloFabricaBoceto.png');
		this.load.image("Botonera", 'assets/images/interface/Botonera.png');
		this.load.image("landscape", 'assets/landscape.png');
		this.load.image("botonTipo", 'assets/images/interface/BotonGenerico.png');
		this.load.image("botonEnable", 'assets/images/interface/BotonGenericoVerde.png');
		this.load.image("idioma1", 'assets/images/interface/FlagSpain.png');
		this.load.image("idioma2", 'assets/images/interface/FlagUK.png');
		this.load.image("BandSpriteSheet", 'assets/images/scenario/BandSpriteSheet.png');

		//Game Images
		this.load.image("band", 'assets/images/scenario/Eslabon_v4.png');
		game.load.image("cartelIzq" , 'assets/images/scenario/CartelIzq.png');
		game.load.image("cartelDer" , 'assets/images/scenario/CartelDch.png');
		this.load.image("BocetoCaja", 'assets/images/scenario/BocetoCaja1.png');
		this.load.image("SueloFabrica", 'assets/images/scenario/FondoNivel.png');
		this.load.image("bocadillo", 'assets/images/Bocadillo.png');
		this.load.image("bebe", 'assets/items/hosptal/bebe.png');
		this.load.image("alcohol", 'assets/items/hosptal/Alcohol.png');
		this.load.image("bisturiLimpio", 'assets/items/hosptal/BisturiLimpio.png');
		this.load.image("condon", 'assets/items/hosptal/condon.png');
		this.load.image("calavera", 'assets/items/hosptal/calavera.png');
		this.load.image("corazon", 'assets/items/hosptal/corazon.png');
		game.load.image("analisisOrina" , 'assets/items/hosptal/analisis_orina.png');
		game.load.image("bolsaSangre" , 'assets/items/hosptal/BolsaSangre.png');
		game.load.image("coca" , 'assets/items/hosptal/Coca.png');
		game.load.image("estetoscopio" , 'assets/items/hosptal/Estetoscopio_v2.png');
		game.load.image("jarabe" , 'assets/items/hosptal/jarabe.png');
		game.load.image("jeringuilla" , 'assets/items/hosptal/jeringuilla.png');
		game.load.image("licor" , 'assets/items/hosptal/licor.png');
		game.load.image("martillo" , 'assets/items/hosptal/martillo.png');
		game.load.image("mascarilla" , 'assets/items/hosptal/Mascarilla.png');
		game.load.image("ojo" , 'assets/items/hosptal/ojo.png');
		game.load.image("pastillas" , 'assets/items/hosptal/pastillas.png');
		game.load.image("probeta" , 'assets/items/hosptal/Probeta.png');
		game.load.image("pulmones" , 'assets/items/hosptal/pulmones.png');
		game.load.image("pulmonesNegros" , 'assets/items/hosptal/pulmones_negros.png');
		game.load.image("sierra" , 'assets/items/hosptal/sierra.png');
		game.load.image("tarroBebe" , 'assets/items/hosptal/tarro_bebe.png');
		game.load.image("testEmbarazo" , 'assets/items/hosptal/test_embarazo.png');
		game.load.image("tijerasSangre" , 'assets/items/hosptal/tijeras_sangre.png');
		game.load.image("veneno" , 'assets/items/hosptal/Veneno.png');
		game.load.image("viagra" , 'assets/items/hosptal/viagra.png');
		game.load.image("voodoo" , 'assets/items/hosptal/VoodooDoll.png');

		this.load.image("Nomina", 'assets/images/interface/nomina1.png');
		
		//Contact Logos
		this.load.image("GitHub", 'assets/images/interface/github_logo.png');
		this.load.image("Twitter", 'assets/images/interface/twitter_logo.png');
		this.load.image("Youtube", 'assets/images/interface/youtube_logo.png');
		this.load.image("Gmail", 'assets/images/interface/gmail_logo.png');
		this.load.image("GlassBeardTeam", 'assets/images/interface/Logo.png');
		
		//load spriteSheet
		game.load.spritesheet('maquina', 'assets/images/scenario/SSmaquina1.png', 1276/2, 459, 2);
		
		game.load.spritesheet('mosca', 'assets/images/mosca_spritesheet.png', 1080, 830);
		game.load.spritesheet('jefe', 'assets/characters/jefe_spritesheet.png', 3940/5, 1200)
		game.load.spritesheet('cajaAcierto', 'assets/images/scenario/caja_acierto.png', 1540/4, 370, 4);
		game.load.spritesheet('sscaja', 'assets/images/scenario/SScaja.png', 1925/25, 1850, 25);
		game.load.spritesheet('ssboton', 'assets/images/interface/SSBotonVerde.png', 1654/2, 377, 2);
		game.load.spritesheet('ojos', 'assets/images/scenario/SSOjos1.png', 92, 49, 5);

		//Boss sounds
		game.load.audio('bossDialog1', 'assets/Sounds/BossSounds/BossDialog1.ogg');
		game.load.audio('bossDialog2', 'assets/Sounds/BossSounds/BossDialog2.ogg');
		game.load.audio('bossDialog3', 'assets/Sounds/BossSounds/BossDialog3.ogg');
		game.load.audio('bossDialog4', 'assets/Sounds/BossSounds/BossDialog4.ogg');
		game.load.audio('bossDialog5', 'assets/Sounds/BossSounds/BossDialog5.ogg');
		game.load.audio('bossDialog6', 'assets/Sounds/BossSounds/BossDialog6.ogg');
		game.load.audio('bossDialog7', 'assets/Sounds/BossSounds/BossDialog7.ogg');
		game.load.audio('bossDisappoint1', 'assets/Sounds/BossSounds/BossDisappoint1.ogg');
		game.load.audio('bossDisappoint2', 'assets/Sounds/BossSounds/BossDisappoint2.ogg');
		game.load.audio('bossError1', 'assets/Sounds/BossSounds/BossError1.ogg');
		game.load.audio('bossError2', 'assets/Sounds/BossSounds/BossError2.ogg');
		game.load.audio('bossError3', 'assets/Sounds/BossSounds/BossError3.ogg');
		game.load.audio('bossError4', 'assets/Sounds/BossSounds/BossError4.ogg');
		game.load.audio('bossSuccess1', 'assets/Sounds/BossSounds/BossSuccess1.ogg');
		game.load.audio('bossSuccess2', 'assets/Sounds/BossSounds/BossSuccess2.ogg');
		game.load.audio('bossSuccess3', 'assets/Sounds/BossSounds/BossSuccess3.ogg');
		game.load.audio('bossSuccess4', 'assets/Sounds/BossSounds/BossSuccess4.ogg');

		//Game sounds
		game.load.audio('select', 'assets/Sounds/Effects/select.ogg');
		game.load.audio('over', 'assets/Sounds/Effects/over.ogg');
		game.load.audio('cantSelect', 'assets/Sounds/Effects/CantSelect.ogg');
		game.load.audio('store', 'assets/Sounds/Effects/Store.ogg');
		game.load.audio('success', 'assets/Sounds/Effects/Success.ogg');
		game.load.audio('wrong', 'assets/Sounds/Effects/Wrong.ogg');

		//Game music
		game.load.audio('fabric', 'assets/Sounds/Music/Fabric.ogg');
	},
	
	//Carga la animación
	loadAnimation: function()
	{
		this.game.load.onLoadComplete.addOnce(this.playAnimation,this);
		game.load.spritesheet('titulo', 'assets/images/titulo_spritesheet.png', 788, 1200);
	},

    //Carga el script necesario para cargar las fuentes de google
    loadFonts: function() 
    {
        const WebFontConfig = {
            active: this.fontIsReady.bind(this),

            google: {
                families:['SchoolBell', 'Permanent Marker', 'Acme']
            }
        };
		this.game.load.script('webfont',
			"https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js",
			() => WebFont.load(WebFontConfig)
		);
    },

    //Reproduce la animación
    playAnimation: function()
    {   	
		var title = game.add.sprite(0, 0, 'titulo');

		title.width = game.world._width;
		title.height = game.world._height;

		title.animations.add('move');
		title.animations.play('move', 10, true);
    },

    //Comunica que se han cargado las fuentes
   fontIsReady: function() {
    	if(this.game.global.DEBUG_MODE)
		{
        	console.log('Fonts Loaded');
    	}
        this.fontsReady = true;
	},
	
    //Comunica que se han cargado los assets
    loadComplete: function() {
    	if(this.game.global.DEBUG_MODE)
		{
        	console.log('Assets Ready');
    	}
        this.ready = true;
    },
	
    //Una vez se hayan cargado los Assets y las fuentes se pasa al menú de inicio
	update : function() {
	/*	if (this.ready && this.fontsReady) {*/
		this.state.start('gameTitleState');
	/*}*/ 
	}
};
