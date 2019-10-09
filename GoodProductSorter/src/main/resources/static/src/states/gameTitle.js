GoodProductSorter.gameTitleState = function(game) {

}

GoodProductSorter.gameTitleState.prototype = {

	init : function() {
		if(this.game.global.DEBUG_MODE)
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
		let iniText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Press left click to continue...", style);
		iniText.anchor.setTo(0.5, 0.5);
		
	},

	update : function() {
		
		/*if(this.game.input.activePointer.leftButton.isDown)
		{*/
			this.game.state.start('menuState');
		/*}*/
	}
}
