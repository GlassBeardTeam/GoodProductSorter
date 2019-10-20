window.onload = function() {
	
	//Facebook
	FBInstant.initializeAsync().then(function () {
		FBInstant.setLoadingProgress(100);
		FBInstant.startGameAsync().then(function () {
			var windowWidth = window.innerWidth;
			var windowHeight = window.innerHeight;
			if (windowWidth > windowHeight) {
				windowWidth = windowHeight / 1.8;
			}
			var gameWidth = windowWidth * gameOptions.gameHeight / windowHeight;
		})
	})
	
	let ww = window.innerWidth;
	let wh = window.innerHeight;
	console.log("window inner width: " + ww);
	console.log("window inner height: " + wh);

	let window_aspect_ratio = ww/wh;
	let desired_aspect_ratio = 17/9;
	let w;
	let h;

	if(window_aspect_ratio >= desired_aspect_ratio)
	{
		w = ww;
		h = w * desired_aspect_ratio;
	}else
	{
		h = wh;
		w  = h * (1/desired_aspect_ratio);
	}


	game = new Phaser.Game(w, h, Phaser.CANVAS, 'GoodProductSorter');

	// GLOBAL VARIABLES
	game.global = {
		FPS : 30,
		DEBUG_MODE : false,
		socket : null,
		IDIOMA: 'ESP',
		ASPECT_RATIO: desired_aspect_ratio,
		gameParams: {
			itemsInARowToChangeStreak: undefined,
			machineSpeed: undefined,
			minSpeedOfDraggedImage: undefined,
			timeForItemSpawn: undefined,
			boxManager: undefined,
			gameItems: []
			},
		game_save:{
			world1:{
				score:[0,0,0]
			}
		}
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
	game.state.add('level1CutsceneState', GoodProductSorter.level1Cutscene)
	game.state.add('contactState', GoodProductSorter.contactState);
	game.state.start('bootState');		

};

