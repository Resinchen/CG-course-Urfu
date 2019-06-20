const func = (x, y) => cos(x*y);
// const func = (x, y) => x**2-y**2;
// const func = (x, y) => (cos(x*y))**2 + (sin(x*y))**2;
// const func = (x, y) => sin(sqrt(x*x+y*y));

const coordX = (x, y, z) => (y-x)*sqrt(3)/2;
const coordY = (x, y, z) => (x+y)/2-z;

function setup() {
	mx = 800
	my = 600
	createCanvas(mx, my)
	background(250)
	n=50
	minx=10000 
	maxx=-minx
  	miny=minx
   	maxy=maxx
   	x1=-3
   	x2=3
   	y1=-3
   	y2=3
   	t = []
   	b=[]
   	m=mx*2
}

function draw() {
	noLoop()

	for (var i=0; i <= n; i++) {
		x = x2+i*(x1-x2)/n
		for (var j=0; j<=n; j++) {
			y = y2+j*(y1-y2)/n
			z = func(x,y)
			xx = coordX(x,y,z)
			yy = coordY(x,y,z)
			if (xx > maxx) maxx=xx 
			if (yy > maxy) maxy=yy 
			if (xx < minx) minx=xx 
			if (yy < miny) miny=yy 
		}
	}

	t = []
   	b = []
	for (var i=0; i<=mx; ++i) {
		t.push(my)
		b.push(0)
	}

	for (var i=0; i<=n; ++i) {
		x = x2+i*(x1-x2)/n
		for (var j=0; j<=m; j++) {
			y = y2+j*(y1-y2)/m
			z = func(x,y)
			xx = coordX(x,y,z)
			yy = coordY(x,y,z)

			xx=round((xx-minx)/(maxx-minx)*mx)
			yy=round((yy-miny)/(maxy-miny)*my)
		   	
			if (yy > b[xx]) {
				stroke('blue');
				point(xx, yy)
				b[xx] = yy
			}

			if (yy < t[xx]) {
				stroke('red');
				point(xx, yy)
				t[xx] = yy
			}
		}
	}

	t = []
   	b = []
	for (var i=0; i<=mx; ++i) {
		t.push(my)
		b.push(0)
	}

	for (var i=0; i<=n; ++i) {
		y = y2+i*(y1-y2)/n
		for (var j=0; j<=m; j++) {
			x = x2+j*(x1-x2)/m
			z = func(x,y)
			xx = coordX(x,y,z)
			yy = coordY(x,y,z)

			xx=round((xx-minx)/(maxx-minx)*mx)
			yy=round((yy-miny)/(maxy-miny)*my)
		   	
			if (yy > b[xx]) {
				stroke('blue');
				point(xx, yy)
				b[xx] = yy
			}

			if (yy < t[xx]) {
				stroke('red');
				point(xx, yy)
				t[xx] = yy
			}
		}
	}
}