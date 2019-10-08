
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

/*
function enablePhaserPhysics(item)
{
	this.game.physics.enable(item.image, Phaser.Physics.P2JS);
	this.game.physics.enable(item.boardImage, Phaser.Physics.P2JS);
}
*/

var RandomNumberBetween = function(min, max)
{
	let randomNumber = 	game.rnd.integerInRange(min, max);
	return randomNumber;
}

var ItemSpawner = function(maxItems)
{
	//Grupo de fisicas
	
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
		let randomNumber = RandomNumberBetween(0, 1);
		//Buscamos por probabilidad el objeto que este por debajo de ella con el algoritmo de busqueda binaria 
		//let item = this.levenlItems[];
		return this.levelItems[0];
	}
}

var mouseP2 = function()
{
	console.log("P2 mouse created");
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



var BoardMachine = function(x, y, name, maxItems, speed, minSpeed)
{
	this.machineGroup = game.add.group();
	this.image = this.machineGroup.create(x, y, name);
	//this.image = game.add.image(x, y, name),
	this.image.anchor.setTo(0.5, 0.5);
	this.boardSpeed = speed,
	this.minSpeedOfDraggedImage = minSpeed,

	this.boxesGroup,
	this.boxesCollisionGroup,
	
	this.itemSpawner = new ItemSpawner(maxItems),
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
		let itemCopy = new Item(item.name);//Creamos el item
		//Generamos todos los valores como su item padre
		itemCopy.myBoardPhysicsGroup = this.getBoardPhysicsGroup();
		itemCopy.myPhysicsGroup = this.getPhysicsGroup();
		itemCopy.image = itemCopy.myPhysicsGroup.create(xcoord, ycoord, itemCopy.name);

		//ARCADE PHYSICS
		/*
		itemCopy.image = game.add.sprite(xcoord, ycoord, itemCopy.name);
		game.physics.arcade.enable(itemCopy.image);
		itemCopy.image.body.collideWorldBounds = true;
		//itemCopy.image.bounce.set(1);
		*/
		//ARCADE PHYSICS/
		itemCopy.image.anchor.setTo(0.5, 0.5);

		//percibe input, se activa el drag
		itemCopy.image.inputEnabled = true;
		itemCopy.image.input.enableDrag(true);
		
		//FISICAS P2
		game.physics.enable(itemCopy.image, Phaser.Physics.P2JS);
 		//Hitbox circular
		itemCopy.image.body.setCircle(200);
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

		//Tratamiento de imagen transparente
		/*
		//ARCADE PHYSICS
		itemCopy.boardImage = game.add.sprite(xcoord, ycoord, itemCopy.name);
		game.physics.arcade.enable(itemCopy.boardImage);
		itemCopy.boardImage.body.collideWorldBounds = true;
		//ARCADE PHYSICS/
		*/
		//P2 PHYSICS
		itemCopy.boardImage = itemCopy.myBoardPhysicsGroup.create(xcoord, ycoord, itemCopy.name);
		itemCopy.boardImage.body.setCollisionGroup(this.itemSpawner.boardItemCollisionGroup);
		itemCopy.boardImage.body.collideWorldBounds = true;
		itemCopy.boardImage.body.damping = 0;
		//itemCopy.boardImage.body.setCircle(100);
		//P2 PHYSICS/

		itemCopy.boardImage.anchor.setTo(0.5, 0.5);
		itemCopy.boardImage.alpha = 0.5;

		//Se añade velocidad a los objetos
		itemCopy.image.body.velocity.y = this.boardSpeed;
		itemCopy.boardImage.body.velocity.y = this.boardSpeed;
		
		//itemCopy.boardImage.body.collides([]); asi no colisiona con nada, se supone

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
						}
					});

				}else if(obj2_body.id != undefined)
				{
					this.boxesGroup.forEach(function(box_image)
					{
						if(box_image.id === obj2_body.id)
						{
							box_sprite = obj1_body.sprite;
						}
					});

				}
				removeSpawnedItemFromGame(itemCopy, this.mouseP2);

			}else{ //Hay colision con bounds
				//Utilizo el metodo attatch con velocidad 0 para que mande el objeto directamente a board de nuevo
				console.log("Colision con bounds: vuelta a la cinta");
				attatchToBoardImage(itemCopy);
			}

		},this);

		itemCopy.boardImage.body.onBeginContact.add(function(body1, body2, shape1, shape2, equation)
		{
			let obj1_body= equation[0].bodyA.parent;
			let obj2_body = equation[0].bodyB.parent;
			//Si alguno de los dos es null, uno son los bounds
			if(obj1_body == null || obj2_body == null)
			{
				removeSpawnedItemFromGame(itemCopy, this.mouseP2);
			}
		},this);

		return itemCopy;
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
		console.log("StartDrag");
		item.image.body.velocity.x = 0;
		item.image.body.velocity.y = 0;
		
	},

	this.ItemOnDragStopCallback = function(item, minSpeed)
	{
		item.image.update = () =>checkAttatchToBoardImage(item, minSpeed);
	}

}

function removeSpawnedItemFromGame(itemCopy, mouseP2)
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

	//Borramos boardImage de su grupo
	itemCopy.myBoardPhysicsGroup.remove(itemCopy.boardImage);
	//Borramos el objeto del grupo de colisiones

	//¿Como borramos el Item?
	delete itemCopy;
	if(game.global.DEBUG_MODE){
		console.log("[DEBUG] image removed from P2 mouse bodies collision array");
		console.log("[DEBUG] image removed from physics group");
		console.log("[DEBUG] boardImage removed from board physics group");
		console.log("[DEBUG] item removed from cache");
	}
}

function checkAttatchToBoardImage(item, minSpeed)
{
	let magnitude = Math.sqrt(Math.pow(item.image.body.velocity.x, 2) + Math.pow(item.image.body.velocity.y, 2))
	console.log(magnitude);
	if(magnitude < minSpeed)
	{
		attatchToBoardImage(item);
	}	
}

function attatchToBoardImage(item)
{
		//console.log("image: (x,y): " + item.image.x);
		item.image.body.x = item.boardImage.body.x;
		item.image.body.y = item.boardImage.body.y;
		//Sentido contrario de la velocidad en P2
		item.image.body.velocity.x = item.boardImage.body.velocity.x;
		item.image.body.velocity.y = item.boardImage.body.velocity.y;
		item.image.update = ()=>{};
}