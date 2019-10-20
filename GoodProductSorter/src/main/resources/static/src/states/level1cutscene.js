GoodProductSorter.level1Cutscene = function(game) {

}

GoodProductSorter.level1Cutscene.prototype = {

    text: "",

    phaserText : "",

    charCount: 0,

    dialogCount: 0,

	init : function(level) {
		this.level=level;
		if(this.game.global.DEBUG_MODE)
		{
			console.log("[DEBUG] Entering **level 1 cutscene** state");
		}
	},

	preload : function() {
        bossDialog1 = game.add.audio('bossDialog1');
        bossDialog2 = game.add.audio('bossDialog2');
        bossDialog3 = game.add.audio('bossDialog3');
        bossDialog4 = game.add.audio('bossDialog4');
        bossDialog5 = game.add.audio('bossDialog5');
        bossDialog6 = game.add.audio('bossDialog6');
        bossDialog7 = game.add.audio('bossDialog7');
	},

	create : function() {

        var boss = game.add.sprite(game.world._width*0.1, game.world._height*0.05, 'jefe');
        boss.scale.setTo(2.5);
        boss.animations.add('talk');
        boss.animations.play('talk', 30, true);
        this.playBossDialog(this.dialogCount);
        this.dialogCount++;

        fontResize = scaleFont(60, game.width);
        var style1 = {	
            font: "Acme",
            fill: "White",
            fontSize: fontResize,
        };

		if(this.game.global.IDIOMA=='ESP'){
			var textoContinuar = "Haz click para saltar"
			var textoJefe = "¡Pensaba que no ibas a llegar nunca!"+ 
				"\n ¡Jaja! Mira, te voy a explicar" +
				"\n mi idea millonaria. "
				+"\n Se trata de recoger los productos de otras "+ 
				"\n empresas y devolvérselos clasificados. "+
				"\n ¡Y solo tenemos que pagar el transporte!"
				+"\n ¡Una ganga! \n Ven aquí, ya verás…"
		}else{
			var textoContinuar = "Click here to skip"
			var textoJefe = " I thought you’d never come!"+ 
				"\n Haha! Let me tell you " +
				"\n my million dollar idea. " +
				"\n It consists of collecting the products"+ 
				"\n of other companies and returning  "+
				"\n them back classified."+
				"\n And we just have to pay the transport!" +
				"\n It’s a bargain!" +
				"\n Come here and you’ll see…"
			
		}
		
        var continueText = game.add.text(game.world._width*0.5, game.world._height*0.02, textoContinuar, style1);
        continueText.anchor.setTo(0.5);

        continueText.align = "center";

        var bocadillo = game.add.sprite(game.world._width*0.05, game.world._height*0.5, 'bocadillo');
        bocadillo.anchor.setTo(0, 0)
        bocadillo.width = game.world._width*0.95;
        bocadillo.height = game.world._height*0.5;

        fontResize2 = scaleFont(80, game.width);
        var style2 = {	
            font: "Acme",
            fill: "Black",
            fontSize: fontResize2,
            align: "left",
            boundsAlignH: "left",
            boundsAlignV: "top"
        };

        this.charCount = 0;
        this.text = textoJefe;

        this.phaserText = game.add.text(bocadillo.x + bocadillo.width*0.1, bocadillo.y + bocadillo.height*0.2, "", style2);

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

    playBossDialog: function(n){
        n = n%7;
        switch(n){
            case 0:
                bossDialog1.play(); 
                break;
            case 1: 
                bossDialog2.play();
                break;
            case 2: 
                bossDialog3.play();
                break;
            case 3: 
                bossDialog4.play();
                break;
            case 4: 
                bossDialog5.play();
                break;
            case 5: 
                bossDialog6.play();
                break;
            case 6: 
                bossDialog7.play();
                break;
        }
        
    },

    goToGame : function(){
        game.camera.fade(0x000000, 1000);
        game.time.events.add(Phaser.Timer.SECOND * 1, ()=>{game.state.start("gameState",true,false,this.level);}, this)
    }


}
