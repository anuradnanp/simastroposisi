/* Copyright (C) 2022 Alma Nuradnan Pramudita (email: gocodealpha@gmail.com)

This file is part of SimAstroPosisi.

SimAstroPosisi is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

SimAstroPosisi is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with SimAstroPosisi. If not, see <https://www.gnu.org/licenses/>. */

let MercVsSphere = function(p) {
	let LatoReg, worldWrap, worldWrapTri, merc, bul;
  let lat1, long1, lat2, long2, camHor, camVer;
  let lat1Val, long1Val, lat2Val, long2Val, long2New;
	let n, i, j, coords;

	p.preload = function() {

		// the fonts
// 		LatoReg = p.loadFont('../aset/Lato-Regular.ttf');
		LatoReg = p.loadFont('https://anuradnanp.github.io/simastroposisi/aset/Lato-Regular.ttf');
// 		LatoReg = p.loadFont('file:///android_asset/aset/Lato-Regular.ttf');

		// the texture materials, providing surfaces for the Mercator and the globe
// 		worldWrap = p.loadImage('../aset/world-wrap.png');
// 		worldWrapTri = p.loadImage('../aset/world-wrap-triple.png');
		worldWrap = p.loadImage('https://anuradnanp.github.io/simastroposisi/aset/world-wrap.png');
		worldWrapTri = p.loadImage('https://anuradnanp.github.io/simastroposisi/aset/world-wrap-triple.png');
// 		worldWrap = p.loadImage('file:///android_asset/aset/world-wrap.png');
// 		worldWrapTri = p.loadImage('file:///android_asset/aset/world-wrap-triple.png');
	};

	p.setup = function() {

		// the Mercator is the main canvas
		merc = p.createCanvas(320, 479);
		merc.position(0, 220);
		merc.style('border-radius', '0');

		// the globe will be the extra graphic on the canvas,
		// offset to create the illusion of the second canvas
		bul = p.createGraphics(320, 320, p.WEBGL);
		bul.setAttributes('antialias', true);

		// the inputs and their labels, trying chained attributes to save lines
		p.createP('lintang posisi merah :').style('font-family', 'Lato-Regular').style('font-size', '14px').style('font-weight', 'normal').position(10, 10).style('width', '150px').style('text-align', 'right').style('color', '#ff0000').addClass('leaveAlone');
		lat1 = p.createSlider(- 90, 90, - 30, 0.5);
		lat1.size(230, 15).position(42, 30).id('val1');

		p.createP('bujur posisi merah :').style('font-family', 'Lato-Regular').style('font-size', '14px').style('font-weight', 'normal').position(10, 60).style('width', '150px').style('text-align', 'right').style('color', '#ff0000').addClass('leaveAlone');
		long1 = p.createSlider(- 180, 180, 30, 0.5);
		long1.size(230, 15).position(42, 80).id('val2');

		p.createP('lintang posisi biru :').style('font-family', 'Lato-Regular').style('font-size', '14px').style('font-weight', 'normal').position(10, 110).style('width', '150px').style('text-align', 'right').style('color', '#0000ff').addClass('leaveAlone');
		lat2 = p.createSlider(- 90, 90, 30, 0.5);
		lat2.size(230, 15).position(42, 130).id('val3');

		p.createP('bujur posisi biru :').style('font-family', 'Lato-Regular').style('font-size', '14px').style('font-weight', 'normal').position(10, 160).style('width', '150px').style('text-align', 'right').style('color', '#0000ff').addClass('leaveAlone');
		long2 = p.createSlider(- 180, 180, - 40, 0.5);
		long2.size(230, 15).position(42, 180).id('val4');

		// enabling change of horizontal position of the cam
		camHor = p.createSlider(0, 2 * p.PI, 3 * p.PI / 2, p.PI / 30);
		camHor.size(280, 15).position(10, 670);

		// vertical cam position is necessary, too
		camVer = p.createSlider(- p.PI / 2 + 0.1, p.PI / 2 - 0.1, p.PI / 4, p.PI / 20);
		camVer.size(280, 15).position(165, 519).style('transform', 'rotate(90deg)');

		p.frameRate(5);

		// the placeholders to show the coords as confirmation of values picked by users
		// initially blank, will be filled by other functions
		lat1Val = p.createP('');
		lat1Val.position(170, 10).id('lat1Val').style('font-family', 'Lato-Regular').style('font-size', '14px').style('color', '#ff0000').addClass('leaveAlone');

		long1Val = p.createP('');
		long1Val.position(170, 60).id('long1Val').style('font-family', 'Lato-Regular').style('font-size', '14px').style('color', '#ff0000').addClass('leaveAlone');

		lat2Val = p.createP('');
		lat2Val.position(170, 110).id('lat2Val').style('font-family', 'Lato-Regular').style('font-size', '14px').style('color', '#0000ff').addClass('leaveAlone');

		long2Val = p.createP('');
		long2Val.position(170, 160).id('long2Val').style('font-family', 'Lato-Regular').style('font-size', '14px').style('color', '#0000ff').addClass('leaveAlone');

		// adding buttons for better precision in inputting values
		sub1 = p.createButton('--');
		sub1.position(8, 31).addClass('leaveAlone').mousePressed(p.sub1Fu).style('font-size', '10px').style('padding', '2px 8px');
		add1 = p.createButton('+');
		add1.position(275, 31).addClass('leaveAlone').mousePressed(p.add1Fu).style('font-size', '10px').style('padding', '2px 8px');

		sub2 = p.createButton('--');
		sub2.position(8, 81).addClass('leaveAlone').mousePressed(p.sub2Fu).style('font-size', '10px').style('padding', '2px 8px');
		add2 = p.createButton('+');
		add2.position(275, 81).addClass('leaveAlone').mousePressed(p.add2Fu).style('font-size', '10px').style('padding', '2px 8px');

		sub3 = p.createButton('--');
		sub3.position(8, 131).addClass('leaveAlone').mousePressed(p.sub3Fu).style('font-size', '10px').style('padding', '2px 8px');
		add3 = p.createButton('+');
		add3.position(275, 131).addClass('leaveAlone').mousePressed(p.add3Fu).style('font-size', '10px').style('padding', '2px 8px');

		sub4 = p.createButton('--');
		sub4.position(8, 181).addClass('leaveAlone').mousePressed(p.sub4Fu).style('font-size', '10px').style('padding', '2px 8px');
		add4 = p.createButton('+');
		add4.position(275, 181).addClass('leaveAlone').mousePressed(p.add4Fu).style('font-size', '10px').style('padding', '2px 8px');
	};

	// the functions run by the buttons, the number will be
	// twice the number of the sliders
	// sliders are not precise but can provide continous variation
	p.sub1Fu = function() {
		if (lat1.value() > - 90) {
			document.getElementById("val1").value = lat1.value() - 0.5;
		}
	};
	p.add1Fu = function() {
		if (lat1.value() < 90) {
			document.getElementById("val1").value = lat1.value() + 0.5;
		}
	};
	p.sub2Fu = function() {
		if (long1.value() > - 180) {
			document.getElementById("val2").value = long1.value() - 0.5;
		}
	};
	p.add2Fu = function() {
		if (long1.value() < 180) {
			document.getElementById("val2").value = long1.value() + 0.5;
		}
	};
	p.sub3Fu = function() {
		if (lat2.value() > - 90) {
			document.getElementById("val3").value = lat2.value() - 0.5;
		}
	};
	p.add3Fu = function() {
		if (lat2.value() < 90) {
			document.getElementById("val3").value = lat2.value() + 0.5;
		}
	};
	p.sub4Fu = function() {
		if (long2.value() > - 180) {
			document.getElementById("val4").value = long2.value() - 0.5;
		}
	};
	p.add4Fu = function() {
		if (long2.value() < 180) {
			document.getElementById("val4").value = long2.value() + 0.5;
		}
	};

	// here they are, the commands to display the coords picked by users
	// the placements target the ID of the previously created paragraphs
	p.dispCoords = function() {
			document.getElementById('lat1Val').textContent = lat1.value() + '\u00b0';
			document.getElementById('long1Val').textContent = long1.value() + '\u00b0';
			document.getElementById('lat2Val').textContent = lat2.value() + '\u00b0';
			document.getElementById('long2Val').textContent = long2.value() + '\u00b0';
	};

	p.draw = function() {
		p.clear();
		p.background('#ffffff');
		p.angleMode(p.RADIANS);

		p.textFont(LatoReg);
		p.textSize(14);
		p.fill('#000000');
		p.noStroke();

		// it's because of the Mercator, the trouble maker
		// its display of longitudes doesn't come around as on globe
		// to ensure the maximum longitude separation is 180 deg, one
		// of the inputted longitude must be modified as if the values
		// are on long to the right and to the left
		// such modification gives values that can be calculated more directly
		// in the spherical trig analysis
		// the modified value also enables, later, the display to be shifted
		// so the mid latitude between the inputted ones is always at the center
		// of the image
		if (p.abs(long1.value() - long2.value()) > 180) {
			long2New = long1.value() + Math.sign(long1.value()) * (360 - p.abs(long1.value() - long2.value()));
		} else {long2New = long2.value();}

		// the texture, basically the Mercator but multiplied three times
		// the third pair of parameters determine the shift of the image,
		// making sure the mid of the inputted will be at the center
		// initially, the clipping shows only the mid repetition of the
		// Mercator, but then shifted by half the sum of the
		// inputted longitudes, scaled so that 180 deg away from 0 deg
		// of longitude goes half the image length
		// note: the x value is measured at the left side of the image
		p.push();
		p.image(
			worldWrapTri,
			0, 0,
			320, 159,
			1503 / 3 + (long1.value() + long2New) / 2 / 180 * 1503 / 3 / 2, 0,
			1503 / 3, 250
		);
		p.pop();

			// starting to draw the 3D, wohooo
			// the clear() is there because I read somewhere
			// that WebGL as graphic on p5.js canvas doesn't
			// clear the display automatically for each frame
			bul.clear();
			bul.background('#ffffff');
			bul.angleMode(p.RADIANS);

			// cam positioning and orientating is a must in 3D
			// no need to set the perspective, not planning on
			// zoom interaction
			bul.camera(
				250 * p.cos(camHor.value()) * p.cos(camVer.value()),
				- 250 * p.sin(camVer.value()),
				250 * p.sin(camHor.value()) * p.cos(camVer.value()),
				0, 0, 0, 0, 1, 0
			);

			bul.textFont(LatoReg);
			bul.textSize(14);
			bul.noStroke();

			// the majestic globe and its surface
			bul.push();
			bul.texture(worldWrap);
			bul.sphere(90);
			bul.pop();

		// trig analysis on spherical coords are full choked of
		// singularity and floating-point-errors, hence the
		// ubiquitous if blocks, sorry :)
		// this one handles the case of antipodal points, each at pole
		if (p.abs(lat1.value()) == 90 && p.abs(lat2.value()) == 90 && lat1.value() * lat2.value() < 0) {

			// I forgot the problem, but it's related to floating-point errors
			// when the longitude separation is 180 deg
			// the workaround is to never put the points exactly at the
			// poles by shifting the longitudes just a little,
			// hence the 0.01 offset
			// such error manifests in producing cosine value greater than one,
			// by introducing non-zero at so far down the decimal place
			if (p.abs(long1.value() - long2New) == 180) {
				long2New = long2New + Math.sign(long1.value() - long2New) * 0.01;
			}

			// antipodal points are free to pick direction to the reach
			// each other, so six plots will be displayed to emphasize the case
			// only the longitudes need the shift
			p.plot(lat1.value(), lat2.value(), long1.value(), long2New);
			p.plot(lat1.value(), lat2.value(), long1.value() - 60, long2New - 60);
			p.plot(lat1.value(), lat2.value(), long1.value() - 120, long2New - 120);
			p.plot(lat1.value(), lat2.value(), long1.value() - 180, long2New - 180);
			p.plot(lat1.value(), lat2.value(), long1.value() + 60, long2New + 60);
			p.plot(lat1.value(), lat2.value(), long1.value() + 120, long2New + 120);
			p.plot(lat1.value(), lat2.value(), long1.value() + 180, long2New + 180);

		// another antipode case, more generic actually, for non-polar latitudes
		// again, six plots to emphasize the freedom to pick direction
		// let alone, the calc will produce singularity, the software can't decide
		// what value should be outputted, hence for each plot, the inputted
		// coords are shifted 0.01 deg
		// unlike the polar case, this time both lat and long must be shifted, done
		// by using sine for long and cosine for lat and different angle rotation
		// for both points
		} else if (lat1.value() + lat2.value() == 0 && p.abs(long1.value() - long2New) == 180) {
			p.plot(
				lat1.value() + 0.01 * p.cos(p.PI / 3 * 0), lat2.value() + 0.01 * p.cos(- p.PI / 3 * 0),
				long1.value() + 0.01 * p.sin(p.PI / 3 * 0), long2New + 0.01 * p.sin(- p.PI / 3 * 0)
			);
			p.plot(
				lat1.value() + 0.01 * p.cos(p.PI / 3 * 1), lat2.value() + 0.01 * p.cos(- p.PI / 3 * 1),
				long1.value() + 0.01 * p.sin(p.PI / 3 * 1), long2New + 0.01 * p.sin(- p.PI / 3 * 1)
			);
			p.plot(
				lat1.value() + 0.01 * p.cos(p.PI / 3 * 2), lat2.value() + 0.01 * p.cos(- p.PI / 3 * 2),
				long1.value() + 0.01 * p.sin(p.PI / 3 * 2), long2New + 0.01 * p.sin(- p.PI / 3 * 2)
			);
			p.plot(
				lat1.value() + 0.01 * p.cos(p.PI / 3 * 3), lat2.value() + 0.01 * p.cos(- p.PI / 3 * 3),
				long1.value() + 0.01 * p.sin(p.PI / 3 * 3), long2New + 0.01 * p.sin(- p.PI / 3 * 3)
			);
			p.plot(
				lat1.value() + 0.01 * p.cos(p.PI / 3 * 4), lat2.value() + 0.01 * p.cos(- p.PI / 3 * 4),
				long1.value() + 0.01 * p.sin(p.PI / 3 * 4), long2New + 0.01 * p.sin(- p.PI / 3 * 4)
			);
			p.plot(
				lat1.value() + 0.01 * p.cos(p.PI / 3 * 5), lat2.value() + 0.01 * p.cos(- p.PI / 3 * 5),
				long1.value() + 0.01 * p.sin(p.PI / 3 * 5), long2New + 0.01 * p.sin(- p.PI / 3 * 5)
			);

		// the normal, regular cases, lol, just plot the shortest route between
		// the inputted points, no shift is necessary
		} else {
			p.plot(lat1.value(), lat2.value(), long1.value(), long2New);
		}

			// the inputted points on the globe
			bul.push();
			bul.fill('#ff0000');

			// the distances of the points are 1 value greater than the radius
			// of the globe to ensure their visibility
			// the traslation is  basically the conversion from spherical
			// coords (r, theta, phi) to Cartesian ones (x, y, z)
			// care should be taken since in p5.js's WebGL, negative y is upward
			bul.translate(
				- 91 * bul.sin(long1.value() * p.PI / 180) * bul.cos(- lat1.value() * p.PI / 180),
				91 * bul.sin(- lat1.value() * p.PI / 180),
				- 91 * bul.cos(long1.value() * p.PI / 180) * bul.cos(- lat1.value() * p.PI / 180)
			);
			bul.sphere(3);
			bul.pop();

			bul.push();
			bul.fill('#0000ff');
			bul.translate(
				- 91 * bul.sin(long2New * p.PI / 180) * bul.cos(- lat2.value() * p.PI / 180),
				91 * bul.sin(- lat2.value() * p.PI / 180),
				- 91 * bul.cos(long2New * p.PI / 180) * bul.cos(- lat2.value() * p.PI / 180)
			);
			bul.sphere(3);
			bul.pop();

		// drawing the spherical triangle and its equivalence on Mercator
		if (
			(p.abs(lat1.value()) != 90 || p.abs(lat2.value()) != 90 || lat1.value() * lat2.value() >= 0) &&
			p.abs(long1.value() - long2New) != 180
		) {
			p.plotTri(lat1.value(), lat2.value(), long1.value(), long2New);
		}

		// the inputted points on the Mercator
		p.push();
		p.fill('#ff0000');

		// the scaling is such that 180 deg of longitude separations from
		// the mid of the image is at the very sides of the frame
		p.circle(
			(1440 + 4 * (long1.value() - long2New)) / 9,
			(4770 - 53 * lat1.value()) / 60,
			8
		);
		p.fill('#0000ff');

		// the second location point
		p.circle(
			(1440 + 4 * (long2New - long1.value())) / 9,
			(4770 - 53 * lat2.value()) / 60,
			8
		);
		p.pop();

		// putting the 3D graphic frame
		p.image(bul, 0, 159);

		// calling the coords confirmation display
		p.dispCoords();
	};

	p.plot = function(a, b, c, d) {

		// the function-scope variables, first time using
		// it from the start, lol
		var specStat = 0;
    var latA, latB, hiA, hiB, sepAB, distAB;
    var dirAToB, dirBToA, distTemp;
    var hiTemp, sepBTemp, latTemp, longTemp;

		// the case of non-polar antipodes require plotting six
		// routes, two of them span distances more than 180 deg,
		// if plotted on the Mercator
		// such case necessitates, again, modification of one of the
		// longitudes, basically putting it off frame
		// specStat is used to indicate the happening of such
		// situation, will be used later, pretty slick, lol
		if (p.abs(c - d) > 180) {
			c = d + Math.sign(d) * (360 - p.abs(c - d));
			specStat = 1;
		}

		// another case of singularity, when the latitudes are polar
		// simple workaround, shift the points 0.01 deg away from +- 90 deg
		if (p.abs(a) == 90) {
			latA = Math.sign(a) * 89.99;
		} else {latA = a;}

		if (p.abs(b) == 90) {
			latB = Math.sign(b) * 89.99;
		} else {latB = b;}

		// the spherical triangle uses north pole as the top vertex,
		// so the latitudes must be converted into heights
		hiA = (90 - latA) * p.PI / 180;
		hiB = (90 - latB) * p.PI / 180;
		sepAB = (p.abs(c - d)) * p.PI / 180;
		distAB = p.acos(p.cos(hiA) * p.cos(hiB) + p.sin(hiA) * p.sin(hiB) * p.cos(sepAB));

		// another singularity, the calc got stucked in the case of
		// same longitudes, unable to pick value of bearing
		// the workaround is to set manually the bearing, easy, only
		// two possible values: 0 (northward) or pi (southward), in radians
		if (c == d) {
			if (hiA < hiB) {
				dirAToB = p.PI;
				dirBToA = 0;
			} else {
				dirAToB = 0;
				dirBToA = p.PI;
			}

		// manual value assignment should also be taken for the
		// case of 180-deg-separation of longitudes
		// such case, non-antipodal, will have only two possible
		// bearings: both 0 or both pi, in radians
		} else if (p.abs(c - d) == 180) {
			if (a + b > 0) {
				dirAToB = 0;
				dirBToA = 0;
			} else {
				dirAToB = p.PI;
				dirBToA = p.PI;
			}

		// the regular cases, I wish the previous workarounds weren't necessary
		} else {
			dirAToB = p.acos((p.cos(hiB) - p.cos(hiA) * p.cos(distAB)) / p.sin(hiA) / p.sin(distAB));
			dirBToA = p.acos((p.cos(hiA) - p.cos(hiB) * p.cos(distAB)) / p.sin(hiB) / p.sin(distAB));
		}

		// n determines the precision of the route plot, the more
		// the better, also the heavier the computation load, too, lol
		n = 15;

		// the array to store the coords to be plotted
		coords = [];

		// calculating the intermediate coords between two points
		for (i = 0; i < n + 1; i++) {

			// this part traces the segments of the whole arc connecting the points
			// if all is well, the formula of hiTemp is enough to used further
			// to get sepBTemp
			distTemp = distAB / n * i;
			hiTemp = p.acos(p.cos(hiB) * p.cos(distTemp) + p.sin(hiB) * p.sin(distTemp) * p.cos(dirBToA));

			// alas, it's not enough, floating point errors still happen
			// sepBTemp is the longitude separation between hiB and the intermediate
			// side toward hiA
			// for same longitude case, set sepBTemp to zero immediately
			if (c == d) {
				sepBTemp = 0;

			// 180-deg-longitude-separations are problematic, too
			} else if (p.abs(c - d) == 180) {

				// this condition is when the arc goes northward initially
				// it will go southward after passing some distance, dictated
				// by the ratio of hiB to hiA
				// sepBTemp equals 0 basically means the intermediate points
				// are still on the same longitude as the initial point
				if (dirBToA == 0 && i / n < hiB / distAB) {
					sepBTemp = 0;

				// this condition handles the situation of initial southward
				// since hiB is measured from North Pole, the southward arc's
				// length equals pi minus hiB
				} else if (dirBToA == p.PI && i / n < (p.PI - hiB) / distAB) {
					sepBTemp = 0;

				// finally, switching to the second point's longitude
				} else {
					sepBTemp = p.PI;
				}

			// the normal condition, getting the longitude separation
			// between the starting and the intermediate points
			} else {
				sepBTemp = p.acos((p.cos(distTemp) - p.cos(hiB) * p.cos(hiTemp)) / p.sin(hiB) / p.sin(hiTemp));
			}

			// to overcome floating point errors, the initial intermediate point
			// is set manually to be the same as the starting point
			if (i == 0) {
				latTemp = b;
				longTemp = d;

			// the normal, regular case
			} else {
				latTemp = (p.PI / 2 - hiTemp) * 180 / p.PI;
				longTemp = d + Math.sign(c - d) * sepBTemp * 180 / p.PI;
			}

			// pooling the coordinates, ready for plotting
			coords.push([longTemp, latTemp]);
		}

		// the plotting
		p.push();
		p.noFill();
		p.stroke('#ffff00');
		p.strokeWeight(2);
		p.beginShape();
		for (i = 0; i < n + 1; i++) {

			// the placement is just like the location points'
			// scaled with respect to the location points' coords
			p.vertex(
				(1440 + 8 * coords[i][0] - 4 * long2New - 4 * long1.value()) / 9,
				(4770 - 53 * coords[i][1]) / 60
			);
		}
		p.endShape();
		p.pop();

		// now, this is so nice
		// antipodal points six plots, this segment plot the routes
		// going away if plotted on the Mercator
		// the shape is identical to the already plotted, only needs to be
		// shifted horizontally
		if (specStat == 1) {
			p.push();
			p.noFill();
			p.stroke('#ffff00');

			// here goes the shift, horizontally
			p.translate(
				2 * ((1440 + 4 * (long1.value() - long2New)) / 9 - (1440 + 4 * (long2New - long1.value())) / 9),
				0
			);
			p.strokeWeight(2);
			p.beginShape();
			for (i = 0; i < n + 1; i++) {

				// the translated points are exactly the same as the points
				// in the previous plot
				p.vertex(
					(1440 + 8 * coords[i][0] - 4 * long2New - 4 * long1.value()) / 9,
					(4770 - 53 * coords[i][1]) / 60
				);
			}
			p.endShape();
			p.pop();
		}

			bul.push();
			bul.noFill();
			bul.stroke('#ffff00');
			bul.strokeWeight(1.5);
			bul.beginShape();
			for (i = 0; i < n + 1; i++) {

				// so peaceful here on the globe, no (x, y, z) scaling is
				// necessary, only direct (r, theta, phi) conversion to (x, y, z)
				bul.vertex(
					- 91 * bul.sin(coords[i][0] * p.PI / 180) * bul.cos(- coords[i][1] * p.PI / 180),
					91 * bul.sin(- coords[i][1] * p.PI / 180),
					- 91 * bul.cos(coords[i][0] * p.PI / 180) * bul.cos(- coords[i][1] * p.PI / 180)
				);
			}
			bul.endShape();
			bul.pop();
	};

	p.mousePressed = function() {
		if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > - 200 && p.mouseY < 470) {
			p.frameRate(20);
		}
	};

	p.mouseReleased = function() {
		p.frameRate(5);
	};

	// plotting the spherical triangle and its equivalence on Mercator
	p.plotTri = function(a, b, c, d) {
    var latDown, latUp, longUpDown;

		p.push();
		p.noStroke();
		p.fill('#00000077');
		p.beginShape();

		// first part, vertical side from North Pole to the second location
		// or from South Pole, depending on the latitudes
		// the drawn area corresponds to smaller triangle on the globe
		if (a + b > 0) {
			for (i = 90; i > b; i--) {
				p.vertex(
					(1440 + 8 * d - 4 * long2New - 4 * long1.value()) / 9,
					(4770 - 53 * i) / 60
				);
			}
		} else {
			for (i = - 90; i < b; i++) {
				p.vertex(
					(1440 + 8 * d - 4 * long2New - 4 * long1.value()) / 9,
					(4770 - 53 * i) / 60
				);
			}
		}

		// followed by the shortest route arc
		for (i = 0; i < n + 1; i++) {
			p.vertex(
				(1440 + 8 * coords[i][0] - 4 * long2New - 4 * long1.value()) / 9,
				(4770 - 53 * coords[i][1]) / 60
			);
		}

		// finalized by vertical side from the first location to North Pole
		// or the South Pole, depending on the latitudes
		if (a + b > 0) {
			for (i = a + 1; i < 90 + 1; i++) {
				p.vertex(
					(1440 + 8 * c - 4 * long2New - 4 * long1.value()) / 9,
					(4770 - 53 * i) / 60
				);
			}
		} else {
			for (i = a - 1; i > - 90 - 1; i--) {
				p.vertex(
					(1440 + 8 * c - 4 * long2New - 4 * long1.value()) / 9,
					(4770 - 53 * i) / 60
				);
			}
		}
		p.endShape(p.CLOSE);
		p.pop();

			// the spherical triangle is tricky, the shape is
			// three dimensional curved surface
			bul.push();
			bul.fill('#00000077');
			bul.noStroke();
			bul.beginShape(p.TRIANGLE_STRIP);

			// looping in two ways, the first, in i, controls northward strips
			// while the second, in j, controls the longitudinal steps
			for (i = 0; i < n; i++) {
				for (j = 0; j < n + 1; j++) {

					// the strips start from bottom latitude, less longitude to greater
					// only the latitudes needs modification for i and j,
					// the longitudes are constant for each i
					// the polar point is selected to ensure the smaller triangle
					// will be drawn, must be like that because drawing the greater
					// triangle requires more steps, putting even heavier load
					if (a + b > 0) {
						latDown = coords[j][1] + i * (90 - coords[j][1]) / n;
						latUp = coords[j][1] + (i + 1) * (90 - coords[j][1]) / n;
					} else {
						latDown = coords[j][1] - i * (90 + coords[j][1]) / n;
						latUp = coords[j][1] - (i + 1) * (90 + coords[j][1]) / n;
					}
					longUpDown = coords[j][0];
					bul.vertex(
						- 92 * bul.sin(longUpDown * p.PI / 180) * bul.cos(- latDown * p.PI / 180),
						92 * bul.sin(- latDown * p.PI / 180),
						- 92 * bul.cos(longUpDown * p.PI / 180) * bul.cos(- latDown * p.PI / 180)
					);
					bul.vertex(
						- 92 * bul.sin(longUpDown * p.PI / 180) * bul.cos(- latUp * p.PI / 180),
						92 * bul.sin(- latUp * p.PI / 180),
						- 92 * bul.cos(longUpDown * p.PI / 180) * bul.cos(- latUp * p.PI / 180)
					);
				}
			}
			bul.endShape();
			bul.pop();
	};
};

let SketMercVsSphere = new p5(MercVsSphere, 'SimMercVsSphere');
