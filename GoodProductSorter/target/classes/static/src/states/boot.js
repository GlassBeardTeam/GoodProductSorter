var GoodProductSorter = {}
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


GoodProductSorter.bootState = function(game) {

}


GoodProductSorter.bootState.prototype = {

	init : function() {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **BOOT** state");
		}
		game.input.mouse.capture = true;
	},

	preload : function() {
		this.game.renderer.renderSession.roundPixels = true
		this.time.desiredFps = game.global.FPS
	},

	create : function() {

	},

	update : function() {
		if (typeof game.global.socket !== 'undefined') {
			game.state.start('preloadState')
		}
	}
}