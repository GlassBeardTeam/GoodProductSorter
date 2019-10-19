
function Box(name){

	this.name = name,
	this.image,
	this.group,
	this.scale,
	this.widthDiff,
	this.createBox = function(x, y, group, scale)
	{
		this.scale = scale;
		this.group = group;
		this.image = group.create(x,y,name);
		this.image.anchor.setTo(0.5, 0.5);

		let imageWidth = this.image.width;
		this.image.width = game.world._width * scale;	this.image.height = game.world._width * scale;
		this.widthDiff = imageWidth - this.image.width;

		game.physics.enable(this.image, Phaser.Physics.P2JS);
		this.image.body.static = true;
		this.image.body.setCircle(this.image.body.width*2);
		this.image.id = this.image.body.id;
	}
}


function BoxManager(boxName, boxScale, nBoxes, xleft, xright, ymin, ymax, boxSpriteSize, boxYOffset)
{
	this.boxName = boxName,
	this.boxScale =  boxScale,
	this.boxesGroup = undefined,
	this.boxSpriteSize = boxSpriteSize, //already scaled
	this.xPos = [xleft, xright],
	this.ymin = ymin, 
	this.ymax = ymax,
	this.boxesPos = [],
	this.nBoxes = nBoxes,
	this.boxYOffset = boxYOffset,
	this.boxes = [],
	this.createBoxesPositions = function()
	{
		let xIndex = 0;
		let yIndex = 0;
		let lastXPos = this.xPos[xIndex];
		let totalYOffset = this.boxSpriteSize + this.boxYOffset;
		let lastYPos = this.ymin;

		for(i= 0; i< this.nBoxes; i++)
		{
			this.boxesPos.push([lastXPos, lastYPos]);
			this.boxes.push(new Box(this.boxName));
			//Deplazamos la y cada 2 cajas
			if(yIndex < 2)
			{
				yIndex++;
			}else{
				//Hacer crecer lasYPos
				lastYPos += totalYOffset;
				//Si la posicion es mayor que la maxima no puedo guardar todas las cajas
				if(lasYPos > this.ymax)
				{
					return false;
				}
				yIndex = yIndex%2;
			}

			//Desplazamos la x de izquierda a derecha
			xIndex++;
			xIndex = xIndex % this.xPos.length;
			lastXPos = this.xPos[xIndex];		
		}
		return true;
	},

	//Metodo preparado para acceder desde game
	this.createBoxes = function(collisionGroup, itemCollisionGroup)
	{
		this.boxesGroup = game.add.group();
		let i = 0;
		this.boxesPos.forEach(pos=>{
			
			this.boxes[i].createBox(pos[0], pos[1], this.boxesGroup, this.boxScale);
			if(i%2 === 0) //Si la caja esta a la izquierda
			{
				//this.boxes[i].image.body.x -= this.boxes[i].widthDiff;
			}else
			{
				//this.boxes[i].image.body.x += this.boxes[i].widthDiff;
			}
			this.boxes[i].image.body.setCollisionGroup(collisionGroup);
			this.boxes[i].image.body.collides([itemCollisionGroup]);
			//nombre, frames de la anim, fps, loop, usar numeric index
			this.boxes[i].image.animations.add('idle',[0], 1, true, true);
			this.boxes[i].image.animations.add('success',[1,2,3,4], 15, false, true);
			this.boxes[i].image.animations.add('closing',[5,6,7,8,9], 15, false, true);
			this.boxes[i].image.animations.add('wrong',[10,11,12,13,14,15,16,17,18,19,20], 15, false, true);
			this.boxes[i].image.animations.play('idle');

			i++;
		});
	}
}