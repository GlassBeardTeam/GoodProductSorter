
function addOnDragStartCallback(callback, item, params)
{
	item.image.events.onDragStart.add(()=>callback(item, params), this);
}

function addOnDragStopCallback(callback, item, params)
{
	item.image.events.onDragStop.add(()=>callback(item, params), this);
}

function addOnOverCallback(callback, item, params)
{
	this.image.input.onInputOver.add(()=>callback(item, params), this);
}

var RandomNumberBetween = function(min, max)
{
	let randomNumber = 	game.rnd.integerInRange(min, max);
	return randomNumber;
}

var ItemSpawner = function(maxItems, seed)
{
	//Grupo de fisicas
	this.lasvegas = new lasvegas(seed);
	this.itemPhysicsGroup = game.add.group();
	this.itemPhysicsGroup.enableBody=true;
	this.itemPhysicsGroup.physicsBodyType= Phaser.Physics.P2JS;

	this.boardItemsPhysicsGroup = game.add.group();
	this.boardItemsPhysicsGroup.enableBody=true;
	this.boardItemsPhysicsGroup.physicsBodyType= Phaser.Physics.P2JS;
	
	//Grupo de colisiones
	this.itemCollisionGroup = game.physics.p2.createCollisionGroup(),
	this.boardItemCollisionGroup = game.physics.p2.createCollisionGroup(),

	this.levelItems = [],
	this.maxItems = maxItems,

	//Asigna probabilidades a cada item
	this.probOfItems = [],

	this.GiveRandomItem = function()
	{
		let randomNumber = this.lasvegas.randomLasVegas(0, this.levelItems.length);
		//Buscamos por probabilidad el objeto que este por debajo de ella con el algoritmo de busqueda binaria 
		//let item = this.levenlItems[];
		return this.levelItems[randomNumber];
	}
}

var mouseP2 = function()
{
	this.mouseBody = new p2.Body();
	game.physics.p2.world.addBody(this.mouseBody);
	this.mouseConstraint;
	this.bodies = [];
	//Añadimos callbacks del raton para raton de p2
	game.input.onDown.add(function(pointer) {
		//Testeo si hay colision con los objetos
		var bodies_collided = game.physics.p2.hitTest(pointer.position, this.bodies);
    
    	// p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
		var physicsPos = [game.physics.p2.pxmi(pointer.position.x), game.physics.p2.pxmi(pointer.position.y)];

		//Si hay colision con algun body
		if(bodies_collided.length > 0)
		{
			var clickedBody = bodies_collided[0];
			var localPointInBody = [0, 0];
			// this function takes physicsPos and coverts it to the body's local coordinate system
			clickedBody.toLocalFrame(localPointInBody, physicsPos);
			
			// use a revoluteContraint to attach mouseBody to the clicked body (asi movemos el objeto con el click)
			this.mouseConstraint = game.physics.p2.createRevoluteConstraint(this.mouseBody, [0, 0], clickedBody, [game.physics.p2.mpxi(localPointInBody[0]), game.physics.p2.mpxi(localPointInBody[1])]);
		}

	}, this);

	game.input.onUp.add(function()
	{
		// remove constraint from object's body
		game.physics.p2.removeConstraint(this.mouseConstraint);
	}, this);
	
	game.input.addMoveCallback(function(pointer){
    	// p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
   		this.mouseBody.position[0] = game.physics.p2.pxmi(pointer.position.x);
    	this.mouseBody.position[1] = game.physics.p2.pxmi(pointer.position.y);
	}, this);
	
	this.addBody = function(image)
	{
		this.bodies.push(image.body);
	},
	this.getBodies = function()
	{
		return this.bodies;
	}
}

var BoardMachine = function(x, y, name, maxItems, levelSpeed , minSpeed, seed, timeForItemSpawn)
{
	this.scenarioReference = undefined,
	this.machineGroup = game.add.group();
	this.image = this.machineGroup.create(x, y, name);
	this.image.anchor.setTo(0.5, 0.5);
	this.lvlSpeed = levelSpeed;
	this.minSpeedOfDraggedImage = minSpeed,
	//Milliseconds
	this.elapsedTimeStacker = 0,
	this.timeForItemSpawn = timeForItemSpawn,
	this.boxesGroup,
	this.boxesCollisionGroup,
	
	this.itemSpawner = new ItemSpawner(maxItems, seed),
	this.mouseP2 = new mouseP2();
	this.MaxSpawnXCoords = [this.image.x,(this.image.x + this.image.width/2)],
	this.MaxSpawnYCoords = [0 ,(this.image.y + this.image.height/2)],
	this.timeToSpawnNewItem,
	this.timeSinceLastSpawn,


	this.addItemToLevel = function(item, showProb)
	{		
		this.itemSpawner.levelItems.push(item)
		this.itemSpawner.probOfItems.push(showProb);
	},

	this.SpawnRandomItem = function()
	{
		let xcoord = RandomNumberBetween(this.MaxSpawnXCoords[0], this.MaxSpawnXCoords[1]);
		let ycoord = RandomNumberBetween(this.MaxSpawnYCoords[0], this.MaxSpawnYCoords[1]);

		xcoord = this.image.x; ycoord = this.image.y;

		let item = this.itemSpawner.GiveRandomItem();

		if(game.global.DEBUG_MODE)
		{
			console.log("Item spawned: " + item.name);
			console.log("item boxid: " + item.boxId);
		}

		let itemCopy = new Item(item.name);//Creamos el item
		//Generamos todos los valores como su item padre
		itemCopy.myBoardPhysicsGroup = this.getBoardPhysicsGroup();
		itemCopy.myPhysicsGroup = this.getPhysicsGroup();

		//Creamos la imagen
		itemCopy.image = itemCopy.myPhysicsGroup.create(xcoord, ycoord, itemCopy.name);
		itemCopy.boxId = item.boxId;
	
		//Escalamos el objeto para que ocupa el porcentaje que marca item.scale
		let scale = itemCopy.image.width/game.world._width;
		itemCopy.image.width *= item.scale/scale;
		itemCopy.image.height *= item.scale/scale;
		itemCopy.image.anchor.setTo(0.5, 0.5);

		//percibe input, se activa el drag
		itemCopy.image.inputEnabled = true;
		itemCopy.image.input.enableDrag(true);
		
		//FISICAS P2
		game.physics.enable(itemCopy.image, Phaser.Physics.P2JS);
 		//Hitbox circular
		itemCopy.image.body.setCircle(itemCopy.image.width *0.5);
		itemCopy.image.body.angularDamping = 1;
		itemCopy.image.body.fixedRotation = true;
		//Añadimos la imagen a un collision group
		itemCopy.image.body.setCollisionGroup(this.itemSpawner.itemCollisionGroup);
		itemCopy.image.body.collides([this.boxesCollisionGroup]);
		itemCopy.image.body.collideWorldBounds = true;
		itemCopy.image.body.damping = 0;
		//FISICAS P2/

		//Añadimos la imagen al raton de p2
		this.mouseP2.addBody(itemCopy.image);

		//P2 PHYSICS
		itemCopy.boardImage = itemCopy.myBoardPhysicsGroup.create(xcoord, ycoord, itemCopy.name);

		//Scale
		let boardItemScale = itemCopy.boardImage.width/game.world._width;
		itemCopy.boardImage.width *= item.scale/boardItemScale;
		itemCopy.boardImage.height *= item.scale/boardItemScale;

		itemCopy.boardImage.anchor.setTo(0.5, 0.5);
		itemCopy.boardImage.alpha = 0.5;
		
		//P2 PHYSICS
		game.physics.enable(itemCopy.boardImage, Phaser.Physics.P2JS);
		//Hitbox circular
		itemCopy.boardImage.body.setCircle(itemCopy.boardImage.width * 0.5);
		itemCopy.boardImage.body.angularDamping = 1;
		itemCopy.boardImage.body.fixedRotation = true;
		//Añadimos la imagen a un colision group
		itemCopy.boardImage.body.setCollisionGroup(this.itemSpawner.boardItemCollisionGroup);
		//itemCopy.boardImage.body.collides([]); asi no colisiona con nada, se supone
		itemCopy.boardImage.body.collideWorldBounds = true;
		itemCopy.boardImage.body.damping = 0;
		//P2 PHYSICS/

		//Se añade velocidad a los objetos
		let itemVel =  this.lvlSpeed[this.scenarioReference.streak] * game.world._height;
		itemCopy.image.body.velocity.y = itemVel;
		itemCopy.boardImage.body.velocity.y = itemVel;

		//Añadimos las callbacks de drag and drop
		addOnDragStartCallback(this.ItemOnDragStartCallback, itemCopy, null);
		addOnDragStopCallback(this.ItemOnDragStopCallback, itemCopy, this.minSpeedOfDraggedImage);

		//Callbacks de colisiones con el escenario y cajas
		itemCopy.image.body.onBeginContact.add(function(body1, body2, shape1, shape2, equation)
		{
			let obj1_body= equation[0].bodyA.parent;
			let obj2_body = equation[0].bodyB.parent;
			//Si  ninguno es null(no hay colision con bounds)
			if(obj1_body != null && obj2_body != null)
			{
				//Buscamos la caja en los dos bodies
				let box_sprite;
				//Si tiene un id es una caja
				if(obj1_body.id != undefined)
				{
					//si la la imagen de la caja tiene el mismo id que el body encontramos nuestra caja
					this.boxesGroup.forEach(function(box_image)
					{
						if(box_image.id === obj1_body.id)
						{
							box_sprite = obj1_body.sprite;
							CheckItemPlacement(box_image, itemCopy, this.scenarioReference,this);
						}
					},this);

				}else if(obj2_body.id != undefined)
				{
					this.boxesGroup.forEach(function(box_image)
					{
						if(box_image.id === obj2_body.id)
						{
							box_sprite = obj1_body.sprite;
							CheckItemPlacement(box_image, itemCopy, this.scenarioReference,this);
						}
					});
				}
				removeSpawnedItemFromGame(itemCopy, this.mouseP2, this.itemSpawner.itemCollisionGroup ,this.itemSpawner.boardItemCollisionGroup);
				
			}else{ //Hay colision con bounds
				//console.log("Colision de image con bounds: vuelta a la cinta");
				if(itemCopy.dragging == false)
				{
					attatchToBoardImage(itemCopy);
				}
			}
		},this);

		itemCopy.boardImage.body.onBeginContact.add(function(body1, body2, shape1, shape2, equation)
		{
			let obj1_body= equation[0].bodyA.parent;
			let obj2_body = equation[0].bodyB.parent;
			//Si alguno de los dos es null, uno son los bounds
			if(obj1_body == null || obj2_body == null)
			{
				//console.log("remove item from game because u didnt clicked it");
				ItemOutOfBounds(itemCopy, this.scenarioReference, this);
				removeSpawnedItemFromGame(itemCopy, this.mouseP2);
			}
		},this);

		return itemCopy;
	},

	this.CheckItemSpawn = function(elapsedTime)
	{
		//Milliseconds
		this.elapsedTimeStacker += elapsedTime;
		if(this.elapsedTimeStacker >= this.timeForItemSpawn)
		{
			this.elapsedTimeStacker -= this.timeForItemSpawn;
			this.SpawnRandomItem();
		}
	},

	this.getPhysicsGroup = function()
	{
		return this.itemSpawner.itemPhysicsGroup;
	},

	this.getBoardPhysicsGroup = function()
	{
		return this.itemSpawner.boardItemsPhysicsGroup;
	},

	this.ItemOnDragStartCallback = function(item)
	{
		item.dragging = true;
		item.image.body.velocity.x = 0;
		item.image.body.velocity.y = 0;
		
	},

	this.ItemOnDragStopCallback = function(item, minSpeed)
	{
		item.dragging = false;
		item.image.update = () =>checkAttatchToBoardImage(item, minSpeed);
	}

}

function removeSpawnedItemFromGame(itemCopy, mouseP2, itemCollisionGroup, boardItemCollisionGroup)
{
	//Borramos el body de image del raton P2
	for(let i = 0; i< mouseP2.bodies.length; i++)
	{
		if(mouseP2.bodies[i] === itemCopy.image.body)
		{
			mouseP2.bodies.splice(i, 1);
		}
	}
	//Borramos image de su grupo
	itemCopy.myPhysicsGroup.remove(itemCopy.image);
	//Borramos el objeto del grupo de colisiones
	itemCopy.image.body.clearCollision(true,true);
	//Borramos boardImage de su grupo
	itemCopy.myBoardPhysicsGroup.remove(itemCopy.boardImage);
	//Borramos el objeto del grupo de colisiones
	itemCopy.boardImage.body.clearCollision(true,true);
	//¿Como borramos el Item?
	delete itemCopy;
	if(game.global.DEBUG_MODE){
		/*
		console.log("[DEBUG] image removed from P2 mouse bodies collision array");
		console.log("[DEBUG] image removed from physics group");
		console.log("[DEBUG] boardImage removed from board physics group");
		console.log("[DEBUG] item removed from cache");
		*/
	}
}

function checkAttatchToBoardImage(item, minSpeed)
{
	let magnitude = Math.sqrt(Math.pow(item.image.body.velocity.x, 2) + Math.pow(item.image.body.velocity.y, 2))
	if(magnitude < minSpeed)
	{
		attatchToBoardImage(item);
	}	
}

function attatchToBoardImage(item)
{
		item.image.body.x = item.boardImage.body.x;
		item.image.body.y = item.boardImage.body.y;
		//Sentido contrario de la velocidad en P2
		item.image.body.velocity.x = item.boardImage.body.velocity.x;
		item.image.body.velocity.y = item.boardImage.body.velocity.y;
		item.image.update = ()=>{};
}


function CheckItemPlacement(boxSprite, item, scenario,board)
{
	if(boxSprite.id === item.boxId)
	{
		CorrecItemPlacement(item, scenario, board);
	}else
	{
		WrongItemPlacement(item, scenario, board);
	}
}

function CorrecItemPlacement(item, scenario, board)
{
	scenario.score +=10;
	scenario.successfulItemsInARow++;
	UpdateStreak(scenario, board);

	if(game.global.DEBUG_MODE)
	{
		console.log(item.name +" metido en la caja CORRECTA!");
	}

}

function WrongItemPlacement(item, scenario, board)
{
	if(scenario.score > 0){
		scenario.score -= 10;
	}

	if(game.global.DEBUG_MODE)
	{
		console.log(item.name +" metido en la caja INCORRECTA!");
	}
}

function ItemOutOfBounds(item, scenario, board)
{
	scenario.successfulItemsInARow = 0;
	UpdateStreak(scenario, board);

	if(game.global.DEBUG_MODE)
	{
		console.log(item.name +" se te ha pasado!");
	}
}

//La manera de cambiar de racha (o marcha de la maquina)
function UpdateStreak(scenario, boardMachine)
{
	let lastStreak = scenario.streak;
	let streak = scenario.successfulItemsInARow / scenario.itemsInARowToChangeStreak;
	streak = Math.trunc(streak);
	if(streak >= boardMachine.lvlSpeed.length) streak = boardMachine.lvlSpeed.length -1;
	scenario.streak = streak;

	if(game.global.DEBUG_MODE)
	{
		if(lastStreak != streak)
		{
			console.log("aumento de march de  " + lastStreak + " a " + scenario.streak);
		}
	}

	let updatedVel =  boardMachine.lvlSpeed[scenario.streak] * game.world._height;
	//Updates de velocidades
	scenario.eslabonesGroup.forEach((item)=>{item.body.velocity.y = updatedVel});

	boardMachine.itemSpawner.boardItemsPhysicsGroup.forEach((item)=>{item.body.velocity.y = updatedVel;});

	boardMachine.itemSpawner.itemPhysicsGroup.forEach(function(item) {item.body.velocity.y= updatedVel;});	
}