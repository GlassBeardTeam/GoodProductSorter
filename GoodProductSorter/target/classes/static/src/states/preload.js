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
		this.load.image("fondoMenu", 'assets/images/interface/BocetoFondoMenu.png');
		this.load.image("background1_1", 'assets/images/interface/BocetoFondoMenu.png');
		this.load.image("landscape", 'assets/landscape.png');
		this.load.image("botonTipo", 'assets/images/interface/BotonGenerico.png');
		this.load.image("idioma1", 'assets/images/interface/idioma1.png');
		this.load.image("idioma2", 'assets/images/interface/idioma2.png');
		this.load.image("BandSpriteSheet", 'assets/images/scenario/BandSpriteSheet.png');

		//Game Images
		this.load.image("band", 'assets/images/scenario/Eslabon_v1.png');
		this.load.image("BocetoCaja", 'assets/images/scenario/BocetoCaja1.png');
		this.load.image("SueloFabrica", 'assets/images/scenario/SueloFabricaBoceto.png');
		this.load.image("bebe", 'assets/items/hosptal/bebe.png');


        /*this.background = this.add.image(0, 0, "preloader_fondo");
        this.background.height = this.game.height;
        this.background.width = this.game.width;	
		
		this.preloadBar=this.add.sprite(this.world.centerX,this.world.centerY + this.world.centerY/2,'preloader_bar');
		this.preloadBar.anchor.setTo(0.5,0.5);
		this.preloadBar.scale.x *= 0.5;
		this.time.advancedTiming = true;
			
		
		this.load.setPreloadSprite(this.preloadBar);*/
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
