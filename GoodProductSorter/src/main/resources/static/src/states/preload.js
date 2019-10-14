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
		this.load.image("bebe", 'assets/items/hosptal/bebe.png');
		this.load.image("alcohol", 'assets/items/hosptal/Alcohol.png');
		this.load.image("bisturiLimpio", 'assets/items/hosptal/BisturiLimpio.png');
		this.load.image("condon", 'assets/items/hosptal/condon.png');
		this.load.image("calavera", 'assets/items/hosptal/calavera.png');
		this.load.image("corazon", 'assets/items/hosptal/corazon.png');

		//load spriteSheet
		game.load.spritesheet('maquina', 'assets/images/scenario/SSmaquina1.png', 1276/2, 459, 2);
		game.load.spritesheet('titulo', 'assets/images/titulo_spritesheet.png', 788, 1200);
		game.load.spritesheet('mosca', 'assets/images/mosca_spritesheet.png', 1080, 830);
		game.load.spritesheet('cajaAcierto', 'assets/images/scenario/caja_acierto.png', 1540/4, 370, 4)

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
