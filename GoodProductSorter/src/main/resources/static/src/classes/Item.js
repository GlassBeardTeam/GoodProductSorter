
function Item(name)
{
	this.name = name,
	this.image,
	this.boardImage,
	this.myPhysicsGroup,
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
	
	this.CreateImageInPhysicsGroup = function(x, y, name, group)
	{
		this.name = name;
		this.myPhysicsGroup = group;
		this.image = this.myPhysicsGroup.create(x,y,name);
		this.image.anchor.setTo(0.5, 0.5);

		this.boardImage =this.myPhysicsGroup.create(x,y,name);
		this.boardImage.anchor.setTo(0.5, 0.5);
		this.boardImage.alpha = 0.0;
	}

	this.getAnimation = function(name)
	{
		return this.image.animations.getAnimation(name);
	},

	this.playItemAnimation = function(name, FPS)
	{
		this.image.animations.play(name, FPS, true);
	}

}