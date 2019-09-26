GoodProductSorter.menuState = function(game) {
	this.startGameKey;
}

GoodProductSorter.menuState.prototype = {

	init : function() {
		console.log("bug");
		if(game.global.DEBUG_MODE)
		{
			console.log("[DEBUG] Entering **MENU** state");
		}
		this.startGameKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},

	preload : function() {

	},

	create : function() {
		//Fondo
        this.background = this.add.image(0, 0, "fondoMenu");
        this.background.height = this.game.height;
        this.background.width = this.game.width;
		
		//imagen mala orientacion
		this.image_turn =this.add.image(0, 0, "landscape");		
		/*game.state.start("gameState");*/
		//alert(window.screen.availHeight);
		
		
		/*
		this.startGameKey.onDown.add(()=>
		{
			let message= {
				event: "INIT_GAME"
			}
			game.global.socket.send(JSON.stringify(message));
		}, this);
		*/
		//Jugar
		let style ={
			font: "bold 100px Arial",
			fill: "#fff"
		}
		let play = new textButton(game.world._width*0.5, game.world._height* 0.2, 'buttonBackground', "PLAY", style, null, null ,this);
		play.button.onInputDown.add(function(){game.state.start('worldsState')},this);
		
	},

	resize: function () {
		this.background.height = this.world.height;
		this.background.width = this.world.width;
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
		
		//game.state.start("gameState");
	}

}
