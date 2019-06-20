// const targetPoint = {x: 0, y: 50} //вне квадрата снизу \ на линии грацницы выпуклого, но на ней \ вне не выпуклого
// const targetPoint = {x: 103, y: 215} //вне квадрата снизу \ на линии грацницы выпуклого, лежит на ней \ вне не выпуклого
// const targetPoint = {x: 103, y: 155} //вне квадрата снизу \ внутри выпуклого \ внутри не выпуклого
// const targetPoint = {x: 30, y: 75} //вне квадрата слева \ внутри выпуклого \ внутри не выпуклого
const targetPoint = {x: 50, y: 50} //уголок квадрата \ внутри выпуклого \ внутри не выпуклого

// const poligon = [{x: 50, y: 50}, {x: 50, y: 100}, {x: 100, y: 100}, {x: 100, y: 50}] // квадрат
// const poligon = [{x: 55, y: 5}, {x: 12, y: 105}, {x: 25, y: 215}, {x: 425, y: 215}] // выпуклый
const poligon = [{x: 55, y: 5}, {x: 12, y: 105}, {x: 125, y: 215}, {x: 125, y: 115}, {x: 425, y: 215}] // не выпуклый


const generateCommonLine = (p1, p2) => ({a:p1.y-p2.y, b:p2.x-p1.x, c:p1.x*p2.y-p2.x*p1.y, p1, p2})

function getPoligonLine() {
	let result = []
	for (var i = 0; i < poligon.length; i++) {
		p1 = poligon[i%poligon.length]
		p2 = poligon[(i+1)%poligon.length]

		result.push(generateCommonLine(p1, p2))
	}
	return result
}

poligonLine = getPoligonLine()

function setup() {
	createCanvas(600, 500)
	background(250)
	gk = Infinity
	k=0
	minSq = Infinity
	gs1 = Infinity
	gs2 = Infinity
}


const getIntersecP = (line1, line2) => ({x: -(line1.c*line2.b - line2.c*line1.b)/(line1.a*line2.b - line2.a*line1.b),
									y: -(line1.a*line2.c - line2.a*line1.c)/(line1.a*line2.b - line2.a*line1.b)})


const pointBeetween = (line, point) => point.x <= Math.max(line.p1.x, line.p2.x) && 
									   point.x >= Math.min(line.p1.x, line.p2.x) && 
									   point.y <= Math.max(line.p1.y, line.p2.y) && 
									   point.y >= Math.min(line.p1.y, line.p2.y)


//Получить площади многоугольников
function getSquare(pol) {
	s = 0
	for (let i = 0; i < pol.length-1; i++) {
		s += pol[i].x*pol[i+1].y
	}
	s += pol[pol.length-1].x*pol[0].y
	
	for (let i = 0; i < pol.length-1; i++) {
		s -= pol[i+1].x*pol[i].y
	}
	s -= pol[0].x*pol[pol.length-1].y

	return abs(s)/2
}

// Нарисовать  многоугольник
function drawPoligon() {
	for (let i=0; i< poligon.length; i++) {
		line(poligon[i%poligon.length].x, poligon[i%poligon.length].y, poligon[(i+1)%poligon.length].x, poligon[(i+1)%poligon.length].y)
	}
}

// Нарисовать целевую точку
function drawTargetPoint() {
	stroke(255,0,0)
	ellipse(targetPoint.x, targetPoint.y, 10, 10)
	point(targetPoint.x, targetPoint.y)
	stroke(0)
}

function getLineWithPoint(point) {
	for (let i = 0; i < poligonLine.length; i++) {
		let li = poligonLine[i]
		let r = li.a*point.x + li.b*point.y + li.c
		if ( abs(r) <= 1e-10 && pointBeetween(li, point)) {
			return li
		}
	}
}

function makeSubPolygons(lines, points) {
	p1 = points[0]
	p2 = points[1]

	index12 = poligon.indexOf(lines[0].p2)
	index22 = poligon.indexOf(lines[1].p2)

	sh1 = []
	sh2 = []

	i = index12
	sh1.push(p1)

	while (i != index22) {
		pp = poligon[i]
		sh1.push(pp)
		i = (i+1) % poligon.length 
	}
	sh1.push(p2)


	sh2.push(p2)
	for (let j = 0; j < poligon.length; j++) {
		jj = (j + index22) % poligon.length
		if (!sh1.includes(poligon[jj])) {
			sh2.push(poligon[jj])
		}
	}
	sh2.push(p1)

	return {shape1: sh1, shape2: sh2}
}

function getIntersecPoints(li) {
	result = []
	for (let i = 0; i < poligonLine.length; i++) {
		r = getIntersecP(li, poligonLine[i])
		if (pointBeetween(poligonLine[i], r)) {
			// ellipse(r.x, r.y, 10, 10)//
			result.push(r)
		}
	}
	return result
}

function draw() {
	noLoop()//
	// background(250)//
	drawTargetPoint()
	drawPoligon()

	for (let k = 0; k < TWO_PI; k += 0.001) {//
		p = {x:(-100)*Math.cos(k-PI/4) - (-100)*Math.sin(k-PI/4) + targetPoint.x,
			 y:(-100)*Math.sin(k-PI/4) + (-100)*Math.cos(k-PI/4) + targetPoint.y}

		// line(targetPoint.x, targetPoint.y, p.x, p.y)//

		li = generateCommonLine(targetPoint, p)
		points = getIntersecPoints(li)
		if (points.length === 2) {

			lines = [getLineWithPoint(points[0]), getLineWithPoint(points[1])]

			if (!lines.includes(undefined)) {
				shapes = makeSubPolygons(lines, points)
				sq1 = getSquare(shapes.shape1)
				sq2 = getSquare(shapes.shape2)
				if (abs(sq1-sq2) < minSq) {
					ss = shapes
					gk = k
					minSq = abs(sq1-sq2)
					gs1 = sq1
					gs2 = sq2
				}
			}
		}
	}//
	// k+=0.01//

	// if (k >= TWO_PI) noLoop()//

	gp = {x:(-1000)*Math.cos(gk-PI/4) - (-1000)*Math.sin(gk-PI/4) + targetPoint.x,
		y:(-1000)*Math.sin(gk-PI/4) + (-1000)*Math.cos(gk-PI/4) + targetPoint.y}
	console.log('s1: ', gs1, '\ns2: ', gs2, '\nΔS', minSq)

	gl = generateCommonLine(targetPoint, gp)
	stroke('red')
	line(0, -gl.c/gl.b, 600,-gl.a/gl.b*600-gl.c/gl.b)
}
