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
		/*
		let iniText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Press left click to continue...", style);
		iniText.anchor.setTo(0.5, 0.5);
		*/

		var title = game.add.sprite(0, 0, 'titulo');

		title.width = game.world._width;
		title.height = game.world._height;

		title.animations.add('move');

		title.animations.play('move', 10, true);
		
		game.time.events.add(Phaser.Timer.SECOND * 4, this.goToMenu, this);
	},

	update : function() {
	},

	goToMenu : function(){
		game.state.start('menuState');
	}
}
