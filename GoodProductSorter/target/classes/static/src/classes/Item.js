
function Item(name)
{
	this.name,
	this.image,
	this.animationsFPS,

	this.setItemImage = function(image)
	{
		this.image = image;
		this.image.anchor.setTo(0.5, 0.5);
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