GoodProductSorter.gameTitleState = function(game) {

}

GoodProductSorter.gameTitleState.prototype = {

	init : function() {
		if(game.global.DEBUG_MODE)
		{
			console.log("[DEBUG] Entering **gameTitle** state");
		}
	},

	preload : function() {

	},

	create : function() {
		let style ={
			font: "bold 32px Arial",
			fill: "#fff"
		}
		let iniText = game.add.text(game.world.centerX, game.world.centerY, "Press left click to continue...", style);
		iniText.anchor.setTo(0.5, 0.5);
		
	},

	update : function() {
		
		/*if(game.input.activePointer.leftButton.isDown)
		{*/
			game.state.start('menuState');
		/*}*/
		
	}
}
