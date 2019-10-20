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
		
		
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.setShowAll();
		window.addEventListener('resize', function () {  this.game.scale.refresh();});
		this.game.scale.refresh();

		var data=JSON.parse(window.localStorage.getItem('game_save'));
		if(data==undefined){
			window.localStorage.setItem('game_save',JSON.stringify(this.game.global.game_save));
		}	
		else{
			for(i=0;i<data.world1.score.length;i++){
				this.game.global.game_save.world1.score[i]=data.world1.score[i];
			}
		}

		//game.load.crossOrigin = 'anonymous';


		//this.scale.scaleMode = Phaser.ScaleManager.RESIZE;

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
