
function Item(name, scale, boxId)
{
	this.boxId = boxId,
	this.dragging = false,
	this.scale = scale,
	this.name = name,
	this.id,
	this.image,
	this.boardImage,
	this.myPhysicsGroup,
	this.myBoardPhysicsGroup,
	this.animationsFPS,

	this.setItemImage = function(x, y, name, group)
	{
		this.myPhysicsGroup = group;
		this.name = name;
		this.image = game.add.sprite(x, y, name);
		this.image.anchor.setTo(0.5, 0.5);
	
		this.boardImage = game.add.sprite(x, y, name);
		this.boardImage.anchor.setTo(0.5, 0.5);
		this.boardImage.alpha = 0.0;
	},


	this.getAnimation = function(name)
	{
		return this.image.animations.getAnimation(name);
	},

	this.playItemAnimation = function(name, FPS)
	{
		this.image.animations.play(name, FPS, true);
	}

}

function StaticObject(x, y, name, scale, group)
{
	this.name = name,
	this.image = undefined,
	this.group = undefined,
	this.scale = scale,

	this.InstaceObject = function()
	{
		if(this.group != undefined)
		{
			this.image = group.create(x,y, name);

		}else
		{
			this.image = game.add.image(x, y, name);
		}
		let scale = this.image.width/game.world._width;
		let scaleToUse = this.scale/scale;
		this.image.width *= scaleToUse;
		this.image.height *= scaleToUse;
	}
}