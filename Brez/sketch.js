var a = 200;
var b = 100;
var c = 10;
var d = -200;

// Константы для канонической формы
const AA = Math.sqrt(2*c*a);
const BB = Math.sqrt(2*c*a);
const CC = 2*Math.sqrt(c*a);
const F1 = {x:-CC, y: 0};
const F2 = {x:CC, y: 0};

const etalon_M = 2*AA;

function setup() {
    createCanvas(600, 600);

    noLoop();
    background(250);
	stroke(155);
    line(0, height/2, width, height/2);
    line(width/2, 0, width/2, height);
    stroke(0);
}

const ddist = (focus, point) => sqrt((point.x-focus.x)**2 + (point.y-focus.y)**2)

const distance = (x1, y1, foc1 = F1, foc2 = F2) => abs(ddist(foc1, {x:x1, y:y1}) - ddist(foc2, {x:x1, y:y1}))

function drawPoints(x, y) {
		point(x, -y)
		point(x, y)

		point(-x, -y)
		point(-x, y)
}

function drawWithoutTranslate(){
	x = AA
	y = 0

	for (let h = 0; h < 1000; h++) {

		drawPoints(x, y)

		distA = distance(x+1, y)
		distB = distance(x+1, y+1)
		distC = distance(x, y+1)

		mmm = Math.min(abs(distA-etalon_M), abs(distB-etalon_M), abs(distC-etalon_M))
		if (abs(distA-etalon_M) === mmm){
			x += 1
		} else if (abs(distB-etalon_M) === mmm){
			x += 1
			y += 1
		} else if (abs(distC-etalon_M) === mmm){
			y += 1
		}
	}
}

function drawWithTranslate() {
	x = AA
	y = 0

	for (let h = 0; h < 1000; h++) {

		x1 = (Math.sqrt(2)/2)*(x-y)+b
		y1 = -(Math.sqrt(2)/2)*(x+y)
		console.log(x, y, x1, y1)
		// drawPoints(x, y)
		drawPoints(x1+width/2, y1)

		distA = distance(x+1, y)
		distB = distance(x+1, y+1)
		distC = distance(x, y+1)

		mmm = Math.min(abs(distA-etalon_M), abs(distB-etalon_M), abs(distC-etalon_M))
		if (abs(distA-etalon_M) === mmm){
			x += 1
		} else if (abs(distB-etalon_M) === mmm){
			x += 1
			y += 1
		} else if (abs(distC-etalon_M) === mmm){
			y += 1
		}
	}
}

function drawWithTranslate() {
	translate(width/2+b, height/2-d)
	rotate(-PI/4)

	drawWithoutTranslate()
}

function draw() {
	noLoop()

	// drawWithoutTranslate()
	drawWithTranslate()
}




// считать растояние до фокусов

// алгоритм брезенхема должен только определять следующую точку и рисовать ее.

//yx/(ca-db) - dx/(ca-db) - by/(ca-db) = 1

//Привидение гиперболы к каноничному виду
/*
x=a*t+b; => t=(x-b)/a
y=c/t+d; => t=c/(y-d)

(x-b)/a = c/(y-d)

(x-b)(y-d) = ca

xy-dx-by+bd = ca
xy-dx-by+bd-ca = 0

(x`+x0)(y`+y0)-d(x`+x0)-b(y`+y0)+bd-ca = 0

x`y` + x`y0 + x0y` + x0y0 - x`d- x0d - y`b- y0b + bd - ca = 0

x`y` + x`(y0 - d) + y`(x0 - b) - dx0 - by0 + x0y0 + bd - ca = 0

y0-d=0 => y0 = d
x0-b=0 => x0 = b

x`y`-ca = 0

==> (x`+b)(y`+d)-d(x`+b)-b(y`+d)+bd-ca = 0

(x``cosA - y``sinA)(x``sinA + y``cosA) - ca = 0

x``^2cosAsinA + x``y``cos^2A - y``x``sin^2A - y``^2cosAsinA - ca = 0

x``^2cosAsinA + x``y``(cos^2A - sin^2A) - y``^2cosAsinA - ca = 0

cos^2(A) - sin^2(A) = 0 => A = pi/4

(x``^2)/2 - (y``^2)/2 = ca

 x``^2      y``^2
-------  _ -------  = 1 - Каноничная форма
  2ca        2ca
*/