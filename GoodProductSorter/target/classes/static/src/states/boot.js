var GoodProductSorter ={};
/*function textButton(x, y, image, textString, style, callback, paramObj, context)*/
function textButton(x, y, image, textString, style, callback, paramObj, context)
{
	let button = game.add.button(x, y, image, function()
	{
		//callback(paramObj, this.x)
	}, context);
	
	button.anchor.setTo(0.5, 0.5);
	//let text = game.add.text(x + button.width/2, y + button.height/2, textString, style);
	let text = game.add.text(x, y, textString, style);
	text.anchor.setTo(0.5, 0.5);

	let textButton = {button, text};
	button.onInputDown.add(function()
	{
		callback(paramObj, textButton);
	},this);

	return textButton;
}

GoodProductSorter.bootState = function(game){
	
};


GoodProductSorter.bootState.prototype = {
	init:function(){
		if (this.game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **BOOT** state");
		}
		this.input.maxpointer=1;
		this.stage.disableVisibilityChange = true;
		//resize
		this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
	},
	
	preload:function(){
		/*this.load.image('preloader_fondo','assets/Backgrounds/FondoPreload.png');
		this.load.image('preloader_bar','assets/Backgrounds/BarraCarga.png');*/
	},
	
	create:function(){
		if (typeof this.game.global.socket !== 'undefined') {
			this.game.physics.startSystem(Phaser.Physics.ARCADE);
			this.state.start('preloadState');
		}
	}
};