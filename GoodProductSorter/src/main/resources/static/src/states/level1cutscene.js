GoodProductSorter.level1Cutscene = function(game) {

}

GoodProductSorter.level1Cutscene.prototype = {

    text: "",

    phaserText : "",

    charCount: 0,

	init : function() {
		if(this.game.global.DEBUG_MODE)
		{
			console.log("[DEBUG] Entering **level 1 cutscene** state");
		}
	},

	preload : function() {
	},

	create : function() {

        var boss = game.add.sprite(game.world._width*0.2, game.world._height*0.05, 'jefe');
        boss.scale.setTo(0.5);
        boss.animations.add('talk');
        boss.animations.play('talk', 30, true);

        var style1 = {	
            font: "Acme",
            fill: "White",
            fontSize: "12pt",
        };

        var continueText = game.add.text(game.world._width*0.5, game.world._height*0.02, "Haz click para saltar", style1);
        continueText.anchor.setTo(0.5);

        continueText.align = "center";

        var bocadillo = game.add.sprite(game.world._width*0.05, game.world._height*0.5, 'bocadillo');
        bocadillo.anchor.setTo(0, 0)
        bocadillo.width = game.world._width*0.95;
        bocadillo.height = game.world._height*0.5;

        var style2 = {	
            font: "Acme",
            fill: "Black",
            fontSize: "20pt",
            align: "left",
            boundsAlignH: "left",
            boundsAlignV: "top"
        };

        this.text = "Pensaba que no ibas a llegar nunca!\n¡Jaja Mira te voy a explicar mi\nidea millonaria,\nse trata de recoger y clasificar los objetos \nde otras empresas\ny mandárselos de vuelta,\ny solo tenemos que pagar el transporte!\n¡Una ganga!\nMira ponte ahí ya verás…"

        this.phaserText = game.add.text(bocadillo.x + bocadillo.width*0.1, bocadillo.y + bocadillo.height*0.1, "", style2);

        game.time.events.add(Phaser.Timer.SECOND * 0.05, this.showLetter, this);
		
	},

	update : function() {
        if(game.input.activePointer.isDown){
            this.goToGame();
        }
    },
    
    showLetter : function (){

        nextChar = this.text.charAt(this.charCount);
        this.phaserText.text = this.phaserText.text.concat(this.text.charAt(this.charCount));
        this.charCount += 1;
        if(this.charCount < this.text.length){
            game.time.events.add(Phaser.Timer.SECOND * 0.05, this.showLetter, this);        
        }else{
            game.time.events.add(Phaser.Timer.SECOND * 3, this.goToGame, this);
        }
    },

    goToGame : function(){
        game.camera.fade(0x000000, 1000);
        game.time.events.add(Phaser.Timer.SECOND * 1, ()=>{game.state.start("gameState");}, this)
    }
}
