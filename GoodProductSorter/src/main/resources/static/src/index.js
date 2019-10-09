window.onload = function() {
	let game_canvas_width = window.screen.width;
	let game_canvas_height = window.screen.height;

	game = new Phaser.Game(game_canvas_width, game_canvas_height, Phaser.CANVAS, 'Vaqueros vs Piratas');
	

	// GLOBAL VARIABLES
	game.global = {
		FPS : 30,
		DEBUG_MODE : true,
		socket : null,
		IDIOMA: 'ESP',
	}
	
	// Se le pide el nombre al jugador
	//var name = prompt("Enter your name");

	// WEBSOCKET CONFIGURATOR
/*	game.global.socket = new WebSocket("ws://" + window.location.host + "/GoodProductSorter")

	game.global.socket.onopen = () => {
		if (game.global.DEBUG_MODE) {
			console.log('[DEBUG] WebSocket connection opened.')
		}
	}

	game.global.socket.onclose = () => {
		if (game.global.DEBUG_MODE) {
			console.log('[DEBUG] WebSocket connection closed.')
		}
	}
	
	game.global.socket.onmessage = (message) => {
		var msg = JSON.parse(message.data)
		
		switch (msg.event) {
		case 'CONNECTED':
		if (game.global.DEBUG_MODE) {
			console.log('[DEBUG] CONNECTED message recieved')
		}
			break;

		case 'JOIN':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] JOIN message recieved')
			}
			break

			case 'INIT_GAME':
			console.log("Mensaje del servidor de empezar el juego!!");
			game.state.start("gameState");
			break;

		case 'GAME STATE UPDATE' :
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] GAME STATE UPDATE message recieved')
			}
			break;

		case 'END_GAME':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] END_GAME message recieved')
			}

			break;
			
		
			
		default :
			console.dir(msg)
			break
		}
	}
*/

	// PHASER SCENE CONFIGURATOR
	game.state.add('bootState', GoodProductSorter.bootState);
	game.state.add('preloadState', GoodProductSorter.preloadState);
	game.state.add('gameTitleState', GoodProductSorter.gameTitleState);
	game.state.add('menuState', GoodProductSorter.menuState);
	game.state.add('worldsState', GoodProductSorter.worldsState);
	game.state.add('world1State', GoodProductSorter.world1State);
	game.state.add('gameState', GoodProductSorter.gameState);
	game.state.add('endGameState', GoodProductSorter.endGameState);
	game.state.start('bootState');		

};

