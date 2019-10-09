
 var lcm = function(seed)
{
	this.seed = seed,
	this.c = {
		M: (Math.pow(2, 31)-1),
		A: 35,
		C: 8,
		X: this.seed
	},

	this.moduloSum = function(x, y, m)
	{
		if(x <= m - 1 - y)
		{
			return x+y;
		}else
		{
			return x - (m-y);
		}
	},

	//Lo que hay que llamar
	this.randomLCM = function(c)
	{
		r = (c.M * c.X) % c.M;
		r = this.moduloSum(r, c.C, c.M);
		c.X = r;
		return c.X;
	}

}

function lasvegas(seed)
{
	this.lcm = new lcm(seed);

	this.calculateW = function(l, u)
	{
		W = u-l;
		while(W > this.lcm.c.M)
		{
			W -= 1;
		}
		return W;
	},

	this.randomLasVegas = function(l, u)
	{
		W = this.calculateW(l, u);
		let w = u - l;
		let foo = Math.trunc(this.lcm.c.M / W);
		let r = Math.trunc(this.lcm.randomLCM(this.lcm.c) / Math.trunc(this.lcm.c.M / W));
		console.log("foo: " + foo);
		while(r >= w)
		{
			r = Math.trunc(this.lcm.randomLCM(this.lcm.c) / Math.trunc(this.lcm.c.M / W));
			r = r+l;
		}
		return r;
	}

/*
    low = 10
    high = 100
    for i in range(10):
        print(randomLasVegas(low, high))
*/
}
