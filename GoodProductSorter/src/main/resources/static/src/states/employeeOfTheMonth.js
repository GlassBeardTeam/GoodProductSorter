GoodProductSorter.employeeSate = function(game) {
}

GoodProductSorter.employeeSate.prototype = {

    init: function() {
		if(game.global.DEBUG_MODE)
		{
			console.log("[DEBUG] Entering **employee of the month** state " + puntuacion);
		}
	},


	preload : function() {

	},

	create : function() {
        fontResize = scaleFont(100, game.width);
        var style1 = {	
            font: "Acme",
            fill: "White",
            fontSize: fontResize,
        };
        var style2 = {	
            font: "Acme",
            fill: "Black",
            fontSize: fontResize,
        };
        var text1 = "";
        var text2 = "";
        if(this.game.global.IDIOMA=='ESP'){
            text1 = "Y el empleado del mes es..."
            text2 = "Empleado del mes"
        }
        else{
            text1 = "And the employee of the month is..."
            text2 = "Employee of the month"
            style2.fontSize = scaleFont(70, game.width);
        }

        var image = game.add.image(0, 0, 'empleadoDelMes');
        image.width =game.world._width;
        image.height = game.world._height;
        image.alpha = 0;

        var cartelText= game.add.text(game.world._width*0.28, game.world.height*0.58, text2, style2)
        cartelText.alpha = 0;

        
        var text = game.add.text(0, 0,text1, style1)
        text.alpha = 0;

        //game.camera.fade(0x000000, 1000);
        game.time.events.add(Phaser.Timer.SECOND * 1, ()=>{
            game.add.tween(text).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
        }, this);
        game.time.events.add(Phaser.Timer.SECOND * 3, ()=>{
            game.add.tween(image).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
            game.add.tween(cartelText).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
        }, this)
        game.time.events.add(Phaser.Timer.SECOND * 8, ()=>{
            
            game.camera.fade(0x000000, 1000);
        }, this);
        game.time.events.add(Phaser.Timer.SECOND * 9, ()=>{game.state.start('worldsState');}, this);
       
	},

	update : function() {
     
    },
 
}
