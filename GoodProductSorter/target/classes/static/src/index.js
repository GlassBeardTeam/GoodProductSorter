window.onload = function() {

	game = new Phaser.Game(1024, 600, Phaser.AUTO, 'gameDiv')

	// GLOBAL VARIABLES
	game.global = {
		FPS : 30,
		DEBUG_MODE : true,
		socket : null,
	}
	
	// Se le pide el nombre al jugador
	var name = prompt("Enter your name");

	/*
	if (name == null || name == "") {
	  game.global.myPlayer.name.text = "player"+ game.global.myPlayer.id
	} else {
	  
	}
	*/

	// WEBSOCKET CONFIGURATOR
	game.global.socket = new WebSocket("ws://" + window.location.host + "/GoodProductSorter")

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
		case 'JOIN':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] JOIN message recieved')
				console.dir(msg.info)
			}
			break

		case 'GAME STATE UPDATE' :
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] GAME STATE UPDATE message recieved')
				console.dir(msg)
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

	

	// PHASER SCENE CONFIGURATOR
	game.state.add('bootState', GoodProductSorter.bootState)
	game.state.add('preloadState', GoodProductSorter.preloadState)
	game.state.add('menuState', GoodProductSorter.menuState)
	game.state.add('gameState', GoodProductSorter.menuState)
	game.state.start('bootState')

}
