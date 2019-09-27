GoodProductSorter.preloadState = function(game) {

}

GoodProductSorter.preloadState.prototype = {

	// Variables que indican si se han cargado los assets y la fuente
	assetsReady : false,
	fontsReady : false,

	init : function() {
		if(game.global.DEBUG_MODE)
		{
			console.log("[DEBUG] Entering **PRELOAD** state");
		}
	},

	preload : function() {
		
		this.loadFonts();
        this.loadAssets();
        
	},
	//Carga los Assets
    loadAssets: function() 
    {

    	game.load.onLoadComplete.addOnce(this.loadComplete,this);
		game.load.image("fondoMenu", 'assets/characters/boss.png');
		game.load.image("landscape", 'assets/landscape.png');
		
		game.load.spritesheet('band', 'assets/images/scenario/BandSpriteSheet.png', 197, 712, 2);
		game.load.image('background1_1', 'assets/images/scenario/background1_1.png');
		game.load.image('buttonBackground', "assets/images/interface/buttonBackground.png");  
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

        game.load.script('webfont',
        "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js",
        () => WebFont.load(WebFontConfig));  
    },

    //Comunica que se han cargado las fuentes
    fontIsReady: function() {
    	if(game.global.DEBUG_MODE)
		{
        	console.log('Fonts Loaded');
    	}
        this.fontsReady = true;
    },
    //Comunica que se han cargado los assets
    loadComplete: function() {
    	if(game.global.DEBUG_MODE)
		{
        	console.log('Assets Ready');
    	}
        this.ready = true;
    },

	
    //Una vez se hayan cargado los Assets y las fuentes se pasa al menú de inicio
	update : function() {
		if (this.ready && this.fontsReady) {
				game.state.start('gameTitleState');
			} 
	}
}
