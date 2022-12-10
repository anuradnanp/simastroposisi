/* Copyright (C) 2022 Alma Nuradnan Pramudita (email: gocodealpha@gmail.com)

This file is part of SimAstroPosisi.

SimAstroPosisi is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

SimAstroPosisi is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with SimAstroPosisi. If not, see <https://www.gnu.org/licenses/>. */

let SphereTri = function(p) {
  let LatoReg, calcBul, side1, side2, sep;
  let camHorCalc, camVerCalc, side1Val, side2Val, sepVal;
  let pos1, pos2, pos21, dir1To2, dir2To1, coords, dist12;
  let hi1, hi2, sep12, n, i, distTemp, hiTemp, sep2Temp;
  let latTemp, longTemp, j, latDown, latUp, longUpDown;

	p.preload = function() {

		// the fonts
//		LatoReg = p.loadFont('../aset/Lato-Regular.ttf');
//		LatoReg = p.loadFont('../aset/Lato-Bold.ttf');
 		LatoReg = p.loadFont('https://anuradnanp.github.io/simastroposisi/aset/Lato-Regular.ttf');
 		LatoReg = p.loadFont('https://anuradnanp.github.io/simastroposisi/aset/Lato-Bold.ttf');
// 		LatoReg = p.loadFont('file:///android_asset/aset/Lato-Regular.ttf');
// 		LatoReg = p.loadFont('file:///android_asset/aset/Lato-Bold.ttf');
	};

	p.setup = function() {
		p.setAttributes('antialias', true);

		calcBul = p.createCanvas(310, 310, p.WEBGL);
		calcBul.position(5, 170).style('border-radius', '0');

		// the inputs for side arc lengths and the angle between
		p.createP('panjang sisi merah :').style('font-family', 'Lato-Regular').style('font-size', '14px').style('font-weight', 'normal').position(10, 10).style('width', '190px').style('text-align', 'right').style('color', '#ff0000');
		side1 = p.createSlider(20, 150, 30, 0.5);
		side1.size(300, 15).position(10, 30);

		p.createP('panjang sisi biru :').style('font-family', 'Lato-Regular').style('font-size', '14px').style('font-weight', 'normal').position(10, 60).style('width', '190px').style('text-align', 'right').style('color', '#0000ff');
		side2 = p.createSlider(20, 150, 60, 0.5);
		side2.size(300, 15).position(10, 80);

		p.createP('sudut antara merah dan biru :').style('font-family', 'Lato-Regular').style('font-size', '14px').style('font-weight', 'normal').position(10, 110).style('width', '190px').style('text-align', 'right').style('color', '#000000');
		sep = p.createSlider(20, 150, 50, 0.5);
		sep.size(300, 15).position(10, 130);

		// horizontal cam position
		camHorCalc = p.createSlider(0, 2 * p.PI, 3 * p.PI / 2, p.PI / 30);
		camHorCalc.size(280, 15).position(10, 450);

		// vertical cam position
		camVerCalc = p.createSlider(- p.PI / 2 + 0.1, p.PI / 2 - 0.1, p.PI / 4, p.PI / 20);
		camVerCalc.size(280, 15).position(160, 300).style('transform', 'rotate(90deg)');

		p.frameRate(5);

		// the placeholders to show the coords as confirmation of values picked by users
		// initially blank, will be filled by other functions
		side1Val = p.createP('');
		side1Val.position(210, 10).id('side1Val').style('font-family', 'Lato-Bold').style('font-size', '17px').style('color', '#ffffff').style('text-shadow', '0px 0px 4px #ff0000');

		side2Val = p.createP('');
		side2Val.position(210, 60).id('side2Val').style('font-family', 'Lato-Bold').style('font-size', '17px').style('color', '#ffffff').style('text-shadow', '0px 0px 4px #0000ff');

		sepVal = p.createP('');
		sepVal.position(210, 110).id('sepVal').style('font-family', 'Lato-Bold').style('font-size', '17px').style('color', '#ffffff').style('text-shadow', '0px 0px 4px #000000');
	};

	// confirming the side length and angle picked by users
	p.dispVal = function() {
			document.getElementById('side1Val').textContent = side1.value() + '\u00b0';
			document.getElementById('side2Val').textContent = side2.value() + '\u00b0';
			document.getElementById('sepVal').textContent = sep.value() + '\u00b0';
	};

	p.draw = function() {
		p.clear();
		p.background('#d79922');
		p.angleMode(p.RADIANS);

		p.textFont(LatoReg);
		p.noStroke();

		// cam positioning, based on values picked by users
		p.camera(
			250 * p.cos(camHorCalc.value()) * p.cos(camVerCalc.value()),
			- 250 * p.sin(camVerCalc.value()),
			250 * p.sin(camHorCalc.value()) * p.cos(camVerCalc.value()),
			0, 0, 0, 0, 1, 0
		);

		// the sphere to put the triangle, great circles, sides, and angles
		p.push();
		p.fill('#ffffff');
		p.sphere(90);
		p.pop();

		// the great circles the red and blue side arcs situated at
		p.push();
		p.noFill();
		p.stroke('#bbbbbb');
		p.strokeWeight(1.5);
		p.rotateY(p.PI / 2 - sep.value() / 2 * p.PI / 180);
		p.circle(0, 0, 181);
		p.pop();

		p.push();
		p.noFill();
		p.stroke('#bbbbbb');
		p.strokeWeight(1.5);
		p.rotateY(p.PI / 2 + sep.value() / 2 * p.PI / 180);
		p.circle(0, 0, 181);
		p.pop();

		// vector to orient the arc connecting the end of the red and blue sides
		pos1 = p.createVector(
			- 91 * p.sin(sep.value() / 2 * p.PI / 180) * p.cos(- (90 - side1.value()) * p.PI / 180),
			91 * p.sin(- (90 - side1.value()) * p.PI / 180),
			- 91 * p.cos(sep.value() / 2 * p.PI / 180) * p.cos(- (90 - side1.value()) * p.PI / 180)
		);
		pos2 = p.createVector(
			- 91 * p.sin(- sep.value() / 2 * p.PI / 180) * p.cos(- (90 - side2.value()) * p.PI / 180),
			91 * p.sin(- (90 - side2.value()) * p.PI / 180),
			- 91 * p.cos(- sep.value() / 2 * p.PI / 180) * p.cos(- (90 - side2.value()) * p.PI / 180)
		);

		// there you go, the vector normal to the great circle
		// connecting the base of the inputted two sides
		pos21 = pos2.cross(pos1);

		// putting and orienting the great circle
		p.push();
		p.noFill();
		p.stroke('#bbbbbb');
		p.strokeWeight(1.5);
 		p.rotateY(p.atan2(pos21.x, pos21.z));
		p.rotateX(p.PI / 2 + p.acos(pos21.y / pos21.mag()));
		p.circle(0, 0, 181);
		p.pop();

		// plotting the arc connecting the base of the inputted sides
		p.plotCalc(90 - side1.value(), 90 - side2.value(), sep.value() / 2, - sep.value() / 2);

		// the bearing from the base of red side to the base of blue side
		p.push();
		p.fill('#000000');
		p.textAlign(p.CENTER, p.CENTER);
		p.textSize(7);
		p.translate(
			- 100 * p.sin((sep.value() / 2 + 5) * p.PI / 180) * p.cos(- (90 - (side1.value() + 5)) * p.PI / 180),
			100 * p.sin(- (90 - (side1.value() + 5)) * p.PI / 180),
			- 100 * p.cos((sep.value() / 2 + 5) * p.PI / 180) * p.cos(- (90 - (side1.value() + 5)) * p.PI / 180)
		);

		// all preceding texts are oriented to be parallel to the view
		p.rotateY(- camHorCalc.value() + p.PI / 2);
		p.rotateX(camVerCalc.value());
		p.text(p.round(dir1To2 * 180 / p.PI, 1) + '\u00b0', 0, 0);
		p.pop();

		// the bearing from the base of blue side to the base of red side
		p.push();
		p.fill('#000000');
		p.textAlign(p.CENTER, p.CENTER);
		p.textSize(7);
		p.translate(
			- 100 * p.sin(- (sep.value() / 2 + 5) * p.PI / 180) * p.cos(- (90 - (side2.value() + 5)) * p.PI / 180),
			100 * p.sin(- (90 - (side2.value() + 5)) * p.PI / 180),
			- 100 * p.cos(- (sep.value() / 2 + 5) * p.PI / 180) * p.cos(- (90 - (side2.value() + 5)) * p.PI / 180)
		);
		p.rotateY(- camHorCalc.value() + p.PI / 2);
		p.rotateX(camVerCalc.value());
		p.text(p.round(dir2To1 * 180 / p.PI, 1) + '\u00b0', 0, 0);
		p.pop();

		// the distance arc connecting the base of red and blue sides
		p.push();
		p.fill('#00ff00');
		p.textAlign(p.CENTER, p.CENTER);
		p.textSize(7);
		p.translate(
			- 100 * p.sin((0 - 5 * p.cos(dir1To2)) * p.PI / 180) * p.cos(- (coords[7][1] - 5 * p.sin(dir1To2)) * p.PI / 180),
			100 * p.sin(- (coords[7][1] - 5 * p.sin(dir1To2)) * p.PI / 180),
			- 100 * p.cos((0 - 5 * p.cos(dir1To2)) * p.PI / 180) * p.cos(- (coords[7][1] - 5 * p.sin(dir1To2)) * p.PI / 180)
		);
		p.rotateY(- camHorCalc.value() + p.PI / 2);
		p.rotateX(camVerCalc.value());
		p.text(p.round(dist12 * 180 / p.PI, 1) + '\u00b0', 0, 0);
		p.pop();

		// the separation angle of the inputted sides
		p.push();
		p.fill('#000000');
		p.textAlign(p.CENTER, p.CENTER);
		p.textSize(7);
		p.translate(
			- 100 * p.sin(180 * p.PI / 180) * p.cos(- 85 * p.PI / 180),
			100 * p.sin(- 85 * p.PI / 180),
			- 100 * p.cos(180 * p.PI / 180) * p.cos(- 85 * p.PI / 180)
		);
		p.rotateY(- camHorCalc.value() + p.PI / 2);
		p.rotateX(camVerCalc.value());
		p.text(sep.value() + '\u00b0', 0, 0);
		p.pop();

		// the red side
		p.push();
		p.fill('#ff0000');
		p.textAlign(p.CENTER, p.CENTER);
		p.textSize(7);
		p.translate(
			- 100 * p.sin((sep.value() / 2 + 15) * p.PI / 180) * p.cos(- (90 - side1.value() / 2) * p.PI / 180),
			100 * p.sin(- (90 - side1.value() / 2) * p.PI / 180),
			- 100 * p.cos((sep.value() / 2 + 15) * p.PI / 180) * p.cos(- (90 - side1.value() / 2) * p.PI / 180)
		);
		p.rotateY(- camHorCalc.value() + p.PI / 2);
		p.rotateX(camVerCalc.value());
		p.text(side1.value() + '\u00b0', 0, 0);
		p.pop();

		// the blue side
		p.push();
		p.fill('#0000ff');
		p.textAlign(p.CENTER, p.CENTER);
		p.textSize(7);
		p.translate(
			- 100 * p.sin(- (sep.value() / 2 + 15) * p.PI / 180) * p.cos(- (90 - side2.value() / 2) * p.PI / 180),
			100 * p.sin(- (90 - side2.value() / 2) * p.PI / 180),
			- 100 * p.cos(- (sep.value() / 2 + 15) * p.PI / 180) * p.cos(- (90 - side2.value() / 2) * p.PI / 180)
		);
		p.rotateY(- camHorCalc.value() + p.PI / 2);
		p.rotateX(camVerCalc.value());
		p.text(side2.value() + '\u00b0', 0, 0);
		p.pop();

		// calling the function to display the inputted values
		p.dispVal();
	};

	// the main feature, the plotting of shortest arc
	p.plotCalc = function(a, b, c, d) {

		// the calcs are based on the sim program, using coords as inputs
		// the coords are changed into side arc length and separating angle
		hi1 = (90 - a) * p.PI / 180;
		hi2 = (90 - b) * p.PI / 180;
		sep12 = (c - d) * p.PI / 180;

		// the good, old cosine rule
		dist12 = p.acos(p.cos(hi1) * p.cos(hi2) + p.sin(hi1) * p.sin(hi2) * p.cos(sep12));

		dir1To2 = p.acos((p.cos(hi2) - p.cos(hi1) * p.cos(dist12)) / p.sin(hi1) / p.sin(dist12));
		dir2To1 = p.acos((p.cos(hi1) - p.cos(hi2) * p.cos(dist12)) / p.sin(hi2) / p.sin(dist12));

		// the smoothness of the arc, min 5 segments for zero length
		// and max 20 for 180-deg-length
		n = p.round(
			(p.max(p.abs(c - d), hi1 * 180 / p.PI, hi2 * 180 / p.PI) + 45) / 9, 0);
		coords = [];
		for (i = 0; i < n + 1; i++) {
			distTemp = dist12 / n * i;
			hiTemp = p.acos(p.cos(hi2) * p.cos(distTemp) + p.sin(hi2) * p.sin(distTemp) * p.cos(dir2To1));
			sep2Temp = p.acos((p.cos(distTemp) - p.cos(hi2) * p.cos(hiTemp)) / p.sin(hi2) / p.sin(hiTemp));

			// avoiding floating point error in the first step
			if (i == 0) {
				latTemp = b;
				longTemp = d;
			} else {
				latTemp = (p.PI / 2 - hiTemp) * 180 / p.PI;
				longTemp = d + sep2Temp * 180 / p.PI;
			}

			coords.push([longTemp, latTemp]);
		}

			// the plotting begins
			p.push();
			p.noFill();
			p.stroke('#00ff00');
			p.strokeWeight(1.5);
			p.beginShape();
			for (i = 0; i < n + 1; i++) {
				p.vertex(
					- 91 * p.sin(coords[i][0] * p.PI / 180) * p.cos(- coords[i][1] * p.PI / 180),
					91 * p.sin(- coords[i][1] * p.PI / 180),
					- 91 * p.cos(coords[i][0] * p.PI / 180) * p.cos(- coords[i][1] * p.PI / 180)
				);
			}
			p.endShape();
			p.pop();

			// also plotting the red side
			p.push();
			p.stroke('#ff0000');
			p.strokeWeight(1.5);
			p.beginShape();
			for (i = 0; i < n + 1; i++) {
				latTemp = 90 - i * (90 - a) / n;
				longTemp = c;
				p.vertex(
					- 91 * p.sin(longTemp * p.PI / 180) * p.cos(- latTemp * p.PI / 180),
					91 * p.sin(- latTemp * p.PI / 180),
					- 91 * p.cos(longTemp * p.PI / 180) * p.cos(- latTemp * p.PI / 180)
				);
			}
			p.endShape();
			p.pop();

			// the blue side, too
			p.push();
			p.stroke('#0000ff');
			p.strokeWeight(1.5);
			p.beginShape();
			for (i = 0; i < n + 1; i++) {
				latTemp = 90 - i * (90 - b) / n;
				longTemp = d;
				p.vertex(
					- 91 * p.sin(longTemp * p.PI / 180) * p.cos(- latTemp * p.PI / 180),
					91 * p.sin(- latTemp * p.PI / 180),
					- 91 * p.cos(longTemp * p.PI / 180) * p.cos(- latTemp * p.PI / 180)
				);
			}
			p.endShape();
			p.pop();

			// drawing the surface of the spherical triangle
			p.push();
			p.fill('#00000033');
			p.noStroke();
			p.beginShape(p.TRIANGLE_STRIP);

			// the first loop control the strips vertically
			// the second loop controls the strips horizontally
			for (i = 0; i < n; i++) {
				for (j = 0; j < n + 1; j++) {
					latDown = coords[j][1] + i * (90 - coords[j][1]) / n;
					latUp = coords[j][1] + (i + 1) * (90 - coords[j][1]) / n;
					longUpDown = coords[j][0];
					p.vertex(
						- 91 * p.sin(longUpDown * p.PI / 180) * p.cos(- latDown * p.PI / 180),
						91 * p.sin(- latDown * p.PI / 180),
						- 91 * p.cos(longUpDown * p.PI / 180) * p.cos(- latDown * p.PI / 180)
					);
					p.vertex(
						- 91 * p.sin(longUpDown * p.PI / 180) * p.cos(- latUp * p.PI / 180),
						91 * p.sin(- latUp * p.PI / 180),
						- 91 * p.cos(longUpDown * p.PI / 180) * p.cos(- latUp * p.PI / 180)
					);
				}
			}
			p.endShape();
			p.pop();
	};

	p.mousePressed = function() {
		if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > - 200 && p.mouseY < 470) {
			p.frameRate(20);
		}
	};

	p.mouseReleased = function() {
		p.frameRate(5);
	};
};

let SketSphericalTri = new p5(SphereTri, 'CalcSphericalTri');
