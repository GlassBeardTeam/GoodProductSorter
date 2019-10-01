
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

var randomNumberBetween = function(min, max)
{
	let randomNumber = 0;
	return randomNumber;
}
function ItemSpawner(maxItems)
{
	this.levelItems = [],
	this.maxItems = maxItems,
	this.currentNItems = 0,

	//Asigna probabilidades a cada item
	this.probOfItems = []
	

	this.GiveRandomItem = function()
	{
		let item = this.levenlItems[randomNumberBetween(0, maxItems)];
	}
}