/* Copyright (C) 2022 Alma Nuradnan Pramudita (email: gocodealpha@gmail.com)

This file is part of SimAstroPosisi.

SimAstroPosisi is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

SimAstroPosisi is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with SimAstroPosisi. If not, see <https://www.gnu.org/licenses/>. */

let DailyPath = function(p) {
	let widthCanvas = 320;
	let pad = 10;
	let lebar = widthCanvas - 7 * pad;
	let tinggi = 120.288 / 384.101 * lebar;
	let tinggiLand = 131.242 / 384.101 * lebar;
	let elHeight = 15;

	let LatoReg, LatoBold, img1, img2;
	let deltaDeg, latiDeg;
	let equX, equY, lati, delta, lat, delt, objX0, objY0, objX, objY;
	let arahKiri, arahKanan, arahBawah;

	p.preload = function() {

		// the sceneries, generic and polar ones
// 		img1 = p.loadImage('../aset/web-celestial-coords-landscape.png');
// 		img2 = p.loadImage('../aset/web-celestial-coords-landscape-kutub.png');
		img1 = p.loadImage('https://anuradnanp.github.io/simastroposisi/aset/web-celestial-coords-landscape.png');
		img2 = p.loadImage('https://anuradnanp.github.io/simastroposisi/aset/web-celestial-coords-landscape-kutub.png');
// 		img1 = p.loadImage('file:///android_asset/aset/web-celestial-coords-landscape.png');
// 		img2 = p.loadImage('file:///android_asset/aset/web-celestial-coords-landscape-kutub.png');

		// the fonts
// 		LatoReg = p.loadFont('../aset/Lato-Regular.ttf');
// 		LatoBold = p.loadFont('../aset/Lato-Bold.ttf');
		LatoReg = p.loadFont('https://anuradnanp.github.io/simastroposisi/aset/Lato-Regular.ttf');
		LatoBold = p.loadFont('https://anuradnanp.github.io/simastroposisi/aset/Lato-Bold.ttf');
// 		LatoReg = p.loadFont('file:///android_asset/aset/Lato-Regular.ttf');
// 		LatoBold = p.loadFont('file:///android_asset/aset/Lato-Bold.ttf'); 
	};

	p.setup = function() {
		p.createCanvas(widthCanvas, 2 * elHeight + lebar + 5 * pad);

		p.frameRate(5);

		// inputs for declination and latitudes values
		deltaDeg = p.createSlider(- 90, 90, 60, 1);
		latiDeg = p.createSlider(- 90, 90, 70, 1);

		deltaDeg.position(160, pad);
		latiDeg.position(160, elHeight + 2 * pad);

		deltaDeg.size(120, elHeight);
		latiDeg.size(120, elHeight);
	};

	// the ground for general situations
	p.horizon = function() {
		p.image(img1, 3.5 * pad, lebar / 2 + pad - 0.5 * tinggi + 2 * elHeight + 3 * pad, lebar, tinggiLand);
		p.noFill();
	};

	// the ground for both poles
	p.horizonKutub = function() {
		p.image(img2, 3.5 * pad, lebar / 2 + pad - 0.5 * tinggi + 2 * elHeight + 3 * pad, lebar, tinggiLand);
		p.noFill();
	};

	// the sky dome is simply half of circle, will be drawn behind the ground
	p.dome = function() {
		p.noStroke();
		p.fill('#d7eef4');
		p.arc(widthCanvas / 2, lebar / 2 + pad + 2 * elHeight + 3 * pad, lebar, lebar, p.PI, 2 * p.PI);
		p.noFill();
	};

	// the arc spanned for latitude less than 45 deg differs from greater
	// than 45 deg, initially the arc curves to the left, then to the right
	// necessitating different procedure to draw both cases
	// this critical latitude was from the chosen viewing angle, to enable
	// as much view as possible from a fixed vantage point
	// the equator back-arc is half of ellipse, the same as daily path arc
	// of 45-deg declination
	// i forgot where 0.129 and 1.346 come from
	// the 482.863 and 358.778 are the original sizes of the ground ellipse
	// in the drawing software, the ratio of which is the same as the
	// simulated horizon's
	// initially, the arc is drawn upwright, then rotated and translated to the
	// center of the celestial equator
	// (equX, equY) is the center of the celestial equator, the values are fixed
	// all these complications arisen from my inexperience in utilizing
	// WEBGL capability of p5.js, sorry, this project is the second I made with p5.js
	p.backEquBelowLat45 = function() {
		p.strokeWeight(2);
		p.stroke('#dbd7dc');
		p.translate(equX, equY);
		p.rotate(lati);
		p.arc(0, 0, (1 - 0.129 * (482.863 / 358.778 * Math.abs(Math.sin(lati - Math.PI / 4)) - 1.346)) * 482.863 / 358.778 * tinggi * Math.abs(Math.sin(lati - Math.PI / 4)), lebar, - p.PI / 2, p.PI / 2);
		p.rotate(-lati);
		p.translate(- equX, - equY);
	};

	p.backEquOverLat45 = function() {
		p.strokeWeight(2);
		p.stroke('#dbd7dc');
		p.translate(equX, equY);
		p.rotate(lati);
		p.arc(0, 0, (1 - 0.129 * (482.863 / 358.778 * Math.abs(Math.sin(lati - Math.PI / 4)) - 1.346)) * 482.863 / 358.778 * tinggi * Math.abs(Math.sin(lati - Math.PI / 4)), lebar, p.PI / 2, - p.PI / 2);
		p.rotate(-lati);
		p.translate(- equX, - equY);
	};

	// here goes the front, closer segment of the celestial equator
	// all are similar to the previous arcs except for the color
	// and the angle spanned by the arc
	p.frontEquBelowLat45 = function() {
		p.strokeWeight(2);
		p.stroke('#ff0000');
		p.translate(equX, equY);
		p.rotate(lati);
		p.arc(0, 0, (1 - 0.129 * (482.863 / 358.778 * Math.abs(Math.sin(lati - Math.PI / 4)) - 1.346)) * 482.863 / 358.778 * tinggi * Math.abs(Math.sin(lati - Math.PI / 4)), lebar, p.PI / 2, - p.PI / 2);
		p.rotate(-lati);
		p.translate(- equX, - equY);
	};

	p.frontEquOverLat45 = function() {
		p.strokeWeight(2);
		p.stroke('#ff0000');
		p.translate(equX, equY);
		p.rotate(lati);
		p.arc(0, 0, (1 - 0.129 * (482.863 / 358.778 * Math.abs(Math.sin(lati - Math.PI / 4)) - 1.346)) * 482.863 / 358.778 * tinggi * Math.abs(Math.sin(lati - Math.PI / 4)), lebar, - p.PI / 2, p.PI / 2);
		p.rotate(-lati);
		p.translate(- equX, - equY);
	};

	// the back and front arcs of the object's path, now contain
	// terms involving declination
	p.backObjBelowLat45 = function() {
		p.strokeWeight(2);
		p.stroke('#e7f592');
		p.translate(objX, objY);
		p.rotate(lati);
		p.arc(0, 0, (1 - 0.129 * (482.863 / 358.778 * Math.abs(Math.sin(lati - Math.PI / 4)) - 1.346)) * Math.cos(delta) * 482.863 / 358.778 * tinggi * Math.abs(Math.sin(lati - Math.PI / 4)) * Math.cos(delta), lebar * Math.cos(delta), - p.PI / 2, p.PI / 2);
		p.rotate(- lati);
		p.translate(- objX, - objY);
	};

	p.backObjOverLat45 = function() {
		p.strokeWeight(2);
		p.stroke('#e7f592');
		p.translate(objX, objY);
		p.rotate(lati);
		p.arc(0, 0, (1 - 0.129 * (482.863 / 358.778 * Math.abs(Math.sin(lati - Math.PI / 4)) - 1.346)) * Math.cos(delta) * 482.863 / 358.778 * tinggi * Math.abs(Math.sin(lati - Math.PI / 4)) * Math.cos(delta), lebar * Math.cos(delta), p.PI / 2, - p.PI / 2);
		p.rotate(-lati);
		p.translate(- objX, - objY);
	};

	p.frontObjBelowLat45 = function() {
		p.strokeWeight(2);
		p.stroke('#ffff00');
		p.translate(objX, objY);
		p.rotate(lati);
		p.arc(0, 0, (1 - 0.129 * (482.863 / 358.778 * Math.abs(Math.sin(lati - Math.PI / 4)) - 1.346)) * Math.cos(delta) * 482.863 / 358.778 * tinggi * Math.abs(Math.sin(lati - Math.PI / 4)) * Math.cos(delta), lebar * Math.cos(delta), p.PI / 2, - p.PI / 2);
		p.rotate(-lati);
		p.translate(- objX, - objY);
	};

	p.frontObjOverLat45 = function() {
		p.strokeWeight(2);
		p.stroke('#ffff00');
		p.translate(objX, objY);
		p.rotate(lati);
		p.arc(0, 0, (1 - 0.129 * (482.863 / 358.778 * Math.abs(Math.sin(lati - Math.PI / 4)) - 1.346)) * Math.cos(delta) * 482.863 / 358.778 * tinggi * Math.abs(Math.sin(lati - Math.PI / 4)) * Math.cos(delta), lebar * Math.cos(delta), - p.PI / 2, p.PI / 2);
		p.rotate(-lati);
		p.translate(- objX, - objY);
	};

	// easing the users' device's load, revving
	// the framerate only when needed
	p.mousePressed = function() {
		if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
			p.frameRate(20);
		}
	};

	p.mouseReleased = function() {
		p.frameRate(5);
	};

	p.draw = function() {
		p.background('#ffffff');
		p.angleMode(p.RADIANS);
		p.dome();

		p.textFont(LatoReg);
		p.textSize(14);
		p.textAlign(p.LEFT);
		p.fill('#000000');
		p.text('deklinasi objek', pad, pad, 100, elHeight);
		p.text('lintang lokasi', pad, elHeight + 2 * pad, 100, elHeight);

		p.text(': ' + deltaDeg.value() + '°', 110, pad, 50, elHeight);
		p.text(': ' + latiDeg.value() + '°', 110, elHeight + 2 * pad, 50, elHeight);
		p.noFill();

		// need both just to shorten the writing, lol
		delt = deltaDeg.value();
		lat = latiDeg.value();

		// the value of -90 and 90 deg in declination result
		// in path so small, a point in fact, which is correct
		// but potentially denying immediate recognition by users
		// hence the max abs for declination is 89 to ensure there
		// is still visible roundish spot on the display
		if (Math.abs(deltaDeg.value()) > 89) {
			delt = Math.abs(deltaDeg.value()) / deltaDeg.value() * 89;
		}

		// the value of 45 deg for latitude brought problem, don't
		// know and forgot the how and why, but vaguely recalled some issue
		// of bizarre display of ellipse with zero in one axis
		if (latiDeg.value() == 45) {
			lat = 44.9999;
		}

		// so much inefficiency in assigning variable, sorry, it's
		// only my 2nd p5.js project
		delta = delt * Math.PI / 180;
		lati = lat * Math.PI / 180;

		// the 1st two rows are the coords of the center
		// of the equatorial circle
		// the 2nd two rows are the coords of the center
		// of the object's path for latitude zero
		// the 3rd two rows are the coords of the center
		// of the object's path rotated according to latitude
		equX = 0.5 * widthCanvas;
		equY = 0.5 * lebar + 2 * pad + 2 * elHeight + 2 * pad;
		objX0 = equX - 0.5 * lebar * Math.sin(delta);
		objY0 = equY;
		objX = Math.cos(- lati) * (objX0 - equX) - Math.sin(- lati) * (objY0 - equY) + equX;
		objY = Math.sin(lati) * (objX0 - equX) + Math.cos(lati) * (objY0 - equY) + equY;

		// labelling the cardinal directions, east is hidden behind the image
		arahKiri = 'U';
		arahKanan = 'S';
		arahBawah = 'B';

		// i'm so proud of this little feature, lol
		// setting the irection label for both poles
		if (latiDeg.value() == 90) {
			arahKiri = 'S';
			arahKanan = 'S';
			arahBawah = 'S';
		} else if (latiDeg.value() == -90) {
			arahKiri = 'U';
			arahKanan = 'U';
			arahBawah = 'U';
		}

		// assembling all those arcs of celestial equator
		// and object's path for positive declination
		if (delta > 0) {
			if (lati <= Math.PI / 4) {

				// back arcs go first
				p.backObjBelowLat45();
				p.backEquBelowLat45();

				// ground follows
				if (Math.abs(latiDeg.value()) == 90) {
					p.horizonKutub();
				} else {
					p.horizon();
				}

				// front arcs complete the drawing
				p.frontObjBelowLat45();
				p.frontEquBelowLat45();

			// for the case of latitude greater than 45 deg
			// there'll be no case of latitude 45 deg, as
			// already explained in a previous comment somewhere
			} else {
				p.backEquOverLat45();
				p.backObjOverLat45();
				if (Math.abs(latiDeg.value()) == 90) {
					p.horizonKutub();
				} else {
					p.horizon();
				}
				p.frontEquOverLat45();
				p.frontObjOverLat45();
			}

		// for object exactly at celestial equator
		} else if (delta == 0) {
			if (lati <= Math.PI / 4) {
				p.backObjBelowLat45();
				if (Math.abs(latiDeg.value()) == 90) {
					p.horizonKutub();
				} else {
					p.horizon();
				}
				p.frontObjBelowLat45();
			} else {
				p.backObjOverLat45();
				if (Math.abs(latiDeg.value()) == 90) {
					p.horizonKutub();
				} else {
					p.horizon();
				}
				p.frontObjOverLat45();
			}

		// and for object with negative declination
		} else {
			if (lati <= Math.PI / 4) {
				p.backEquBelowLat45();
				p.backObjBelowLat45();
				if (Math.abs(latiDeg.value()) == 90) {
					p.horizonKutub();
				} else {
					p.horizon();
				}
				p.frontEquBelowLat45();
				p.frontObjBelowLat45();
			} else {
				p.backObjOverLat45();
				p.backEquOverLat45();
				if (Math.abs(latiDeg.value()) == 90) {
					p.horizonKutub();
				} else {
					p.horizon();
				}
				p.frontObjOverLat45();
				p.frontEquOverLat45();
			}
		}

		p.noStroke();
		p.fill('#000000');
		p.textFont(LatoBold);
		p.textSize(18);

		p.textAlign(p.RIGHT, p.CENTER);
		p.text(arahKiri, 2.5 * pad, lebar / 2 + pad + 2 * elHeight + 3 * pad);

		p.textAlign(p.LEFT, p.CENTER);
		p.text(arahKanan, 4 * pad + lebar, lebar / 2 + pad + 2 * elHeight + 3.5 * pad);

		p.strokeWeight(3);
		p.stroke('#ffffff');
		p.textAlign(p.CENTER, p.CENTER);
		p.text(arahBawah, widthCanvas / 2 - 42, lebar / 2 + pad + 2 * elHeight + 3 * pad + 39);
		p.noFill();
		p.noStroke();
	};
};

let sketDailyPath = new p5(DailyPath, 'SimDailyPath');
