
function Item(name)
{
	this.name = name,
	this.image,
	this.boardImage,
	this.animationsFPS,

	this.setItemImage = function(x,y,name)
	{
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