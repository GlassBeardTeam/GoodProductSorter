
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

function enablePhaserPhysics(item)
{
	this.game.physics.enable(item.image, Phaser.Physics.ARCADE);
	this.game.physics.enable(item.boardImage, Phaser.Physics.ARCADE);
}

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

	this.levelItems = [],
	this.maxItems = maxItems,
	this.currentNItems = 0,

	//Asigna probabilidades a cada item
	this.probOfItems = [],


	this.GiveRandomItem = function()
	{
		let randomNumber = randomNumberBetween(0, 1);
		//Buscamos por probabilidad el objeto que este por debajo de ella con el algoritmo de busqueda binaria 
		//let item = this.levenlItems[];
		return levelItems[0];
	}
}

var BoardMachine = function(x, y, name, maxItems)
{
	this.image = game.add.image(x, y, name),
	this.image.anchor.setTo(0.5, 0.5);
	this.itemSpawner = new ItemSpawner(maxItems),
	this.MaxSpawnXCoords = [this.image.x,(this.image.x + this.image.width/2)],
	this.MaxSpawnYCoords = [0 ,(this.image.y + this.image.height/2)],
	this.timeToSpawnNewItem,
	this.timeSinceLastSpawn,

	this.addItemToLevel = function(item, showProb)
	{
		this.itemSpawner.levelItems[this.itemSpawner.currentNItems] = item;
		this.itemSpawner.probOfItems[this.itemSpawner.currentNItems] = showProb;
		this.itemSpawner.currentNItems
	},

	this.SpawnRandomItem = function()
	{
		let xcoord = RandomNumberBetween(this.MaxSpawnXCoords[0], this.MaxSpawnXCoords[1]);
		let ycoord = RandomNumberBetween(this.MaxSpawnYCoords[0], this.MaxSpawnYCoords[1]);
		let item = this.itemSpawner.GiveRandomItem();
		let itemCopy = new Item(item.name);//Creamos el item
		//Generamos todos los valores como su item padre
		itemCopy.CreateImageInPhysicsGroup(xcoord, ycoord, item.name, this.getPhysicsGroup());//Set de la imagen
		itemCopy.image.body.setCircle(20); //Hitbox circular
		itemCopy.image.body.angularVelocity = 0; //ESTO PUEDE QUE ESTE MAL
		itemCopy.image.body.angularDamping = 0;
		itemCopy.image.body.kinematic=true;
		//game.physics.p2.createCollisionGroup();

		return itemCopy;
	}
	this.getPhysicsGroup = function()
	{
		return this.itemSpawner.itemPhysicsGroup;
	}
}