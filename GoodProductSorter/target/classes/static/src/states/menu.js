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

	update : function() {

			//game.state.start("gameState");
	}

}
