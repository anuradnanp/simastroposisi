/* Copyright (C) 2022 Alma Nuradnan Pramudita (email: gocodealpha@gmail.com)

This file is part of SimAstroPosisi.

SimAstroPosisi is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

SimAstroPosisi is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with SimAstroPosisi. If not, see <https://www.gnu.org/licenses/>. */

let Retrograde = function(p) {
	let pad = 10;
	let elHeight = 14;
  let LatoReg, LatoBold;
  let batas, planet, pandang, namaPlanet, lokPandang;
  let planetRadi, planetPeriod, posBumi, posBumiBaru;
  let posPlanet, posPlanetBaru, tengahBaru;
  let posBumi1, posBumi2, posBumi3, posBumi4;
  let posPlanet1, posPlanet2, posPlanet3, posPlanet4;
  let posBumi1Baru, posBumi2Baru, posBumi3Baru, posBumi4Baru;
  let posPlanet1Baru, posPlanet2Baru, posPlanet3Baru, posPlanet4Baru;
  let tengah1Baru, tengah2Baru, tengah3Baru, tengah4Baru;
  let tRegress, saat;

	// just need the fonts as the external assets
	p.preload = function() {
		LatoReg = p.loadFont('../aset/Lato-Regular.ttf');
		LatoBold = p.loadFont('../aset/Lato-Bold.ttf');
// 		LatoReg = p.loadFont('file:///android_asset/aset/Lato-Regular.ttf');
// 		LatoBold = p.loadFont('file:///android_asset/aset/Lato-Bold.ttf'); 
	};

	p.setup = function() {
		p.createCanvas(320, 447);

		// for aesthetic purpose, clipping the sim before the very edge of the canvas
		batas = p.createGraphics(310, 310);

		// the eight planets' position will be displayed, together with the earth's
		// earth's is permanently displayed, while the others' are picked by users
		planet = p.createSlider(0, 6, 2, 1);
		planet.position(2 * pad, 2 * pad + elHeight);
		planet.size(200, elHeight);

		// the center of view can be varied along the line connecting earth and sun
		pandang = p.createSlider(0, 1, 0, 0.1);
		pandang.position(2 * pad, 8 * pad + elHeight);
		pandang.size(200, elHeight);

		p.frameRate(20);
	};

	p.draw = function() {
		p.background('#ffffff');
		p.angleMode(p.RADIANS);

		// assigning names to the slider's values
		switch(planet.value()) {
			case 0:
				namaPlanet = 'Merkurius';
				break;
			case 1:
				namaPlanet = 'Venus';
				break;
			case 2:
				namaPlanet = 'Mars';
				break;
			case 3:
				namaPlanet = 'Jupiter';
				break;
			case 4:
				namaPlanet = 'Saturnus';
				break;
			case 5:
				namaPlanet = 'Uranus';
				break;
			case 6:
				namaPlanet = 'Neptunus';
		}

		// visualizing the center of view so users can imagine it
		if (pandang.value() == 0) {
			lokPandang = 'Matahari';
		} else if (pandang.value() == 0.1) {
			lokPandang = 'Matahari -|--------- Bumi';
		} else if (pandang.value() == 0.2) {
			lokPandang = 'Matahari --|-------- Bumi';
		} else if (pandang.value() == 0.3) {
			lokPandang = 'Matahari ---|------- Bumi';
		} else if (pandang.value() == 0.4) {
			lokPandang = 'Matahari ----|------ Bumi';
		} else if (pandang.value() == 0.5) {
			lokPandang = 'Matahari -----|----- Bumi';
		} else if (pandang.value() == 0.6) {
			lokPandang = 'Matahari ------|---- Bumi';
		} else if (pandang.value() == 0.7) {
			lokPandang = 'Matahari -------|--- Bumi';
		} else if (pandang.value() == 0.8) {
			lokPandang = 'Matahari --------|-- Bumi';
		} else if (pandang.value() == 0.9) {
			lokPandang = 'Matahari ---------|- Bumi';
		} else {
			lokPandang = 'Bumi';
		}

		// parameters of the eight planets, referred to https://nssdc.gsfc.nasa.gov/planetary/factsheet/
		planetRadi = [0.387, 0.723, 1.52, 5.20, 9.57, 19.17, 30.18];
		planetPeriod = [0.241, 0.615, 1.88, 11.9, 29.4, 83.7, 163.7];

		p.fill('#000000');
		p.textFont(LatoReg);
		p.textSize(14);
		p.noStroke();
		p.text('planet yang dilihat dari Bumi : ', pad, 1.5 * pad + elHeight - 5, 200, elHeight);
		p.text('pusat pandang : ', pad, 5.5 * pad + 2 * elHeight, 200, elHeight);
		p.textFont(LatoBold);
		p.text('[' + namaPlanet + ']', 195, 1.5 * pad + elHeight - 5, 50, elHeight);
		p.text('[' + lokPandang + ']', 110, 5.5 * pad + 2 * elHeight, 200, elHeight);

		// planets and their orbits, drawn in clip mask inside canvas
		// the outer path is earth's orbit if an inner planet is selected
		batas.background('#d7eef4');

		// the elapsed time since setup is tracked as parameters of the simulated motion
		saat = p.millis() / 1000;

		// positions of earth and the planets
		// the first condition checks if users pick inner planet then act accordingly
		if (planet.value() <= 1) {

			// the actual simulated position is the variable without number following its name
			// the numbered variables act as trail to simulate the track followed by the planets
			// the formula is simply the resolving of the position along circular track
			// the resulting (x, y) is shifted half of max orbital radius since the original
			// reference is the top-left corner of the canvas
			posBumi4 = [100 * Math.cos(2 * Math.PI * (saat - 0.60) / 10 - Math.PI / 2) + 155, - 100 * Math.sin(2 * Math.PI * (saat - 0.60) / 10 - Math.PI / 2) + 155];
			posBumi3 = [100 * Math.cos(2 * Math.PI * (saat - 0.45) / 10 - Math.PI / 2) + 155, - 100 * Math.sin(2 * Math.PI * (saat - 0.45) / 10 - Math.PI / 2) + 155];
			posBumi2 = [100 * Math.cos(2 * Math.PI * (saat - 0.30) / 10 - Math.PI / 2) + 155, - 100 * Math.sin(2 * Math.PI * (saat - 0.30) / 10 - Math.PI / 2) + 155];
			posBumi1 = [100 * Math.cos(2 * Math.PI * (saat - 0.15) / 10 - Math.PI / 2) + 155, - 100 * Math.sin(2 * Math.PI * (saat - 0.15) / 10 - Math.PI / 2) + 155];
			posBumi = [100 * Math.cos(2 * Math.PI * saat / 10 - Math.PI / 2) + 155, - 100 * Math.sin(2 * Math.PI * saat / 10 - Math.PI / 2) + 155];

			// the formula is similar to the previous part, differing only in the radius and
			// orbital period values, scaled proportionally according to the data
			posPlanet4 = [planetRadi[planet.value()] * 100 * Math.cos(2 * Math.PI * (saat - 0.60) / (10 * planetPeriod[planet.value()]) - Math.PI / 2) + 155, - planetRadi[planet.value()] * 100 * Math.sin(2 * Math.PI * (saat - 0.60) / (10 * planetPeriod[planet.value()]) - Math.PI / 2) + 155];
			posPlanet3 = [planetRadi[planet.value()] * 100 * Math.cos(2 * Math.PI * (saat - 0.45) / (10 * planetPeriod[planet.value()]) - Math.PI / 2) + 155, - planetRadi[planet.value()] * 100 * Math.sin(2 * Math.PI * (saat - 0.45) / (10 * planetPeriod[planet.value()]) - Math.PI / 2) + 155];
			posPlanet2 = [planetRadi[planet.value()] * 100 * Math.cos(2 * Math.PI * (saat - 0.30) / (10 * planetPeriod[planet.value()]) - Math.PI / 2) + 155, - planetRadi[planet.value()] * 100 * Math.sin(2 * Math.PI * (saat - 0.30) / (10 * planetPeriod[planet.value()]) - Math.PI / 2) + 155];
			posPlanet1 = [planetRadi[planet.value()] * 100 * Math.cos(2 * Math.PI * (saat - 0.15) / (10 * planetPeriod[planet.value()]) - Math.PI / 2) + 155, - planetRadi[planet.value()] * 100 * Math.sin(2 * Math.PI * (saat - 0.15) / (10 * planetPeriod[planet.value()]) - Math.PI / 2) + 155];
			posPlanet = [planetRadi[planet.value()] * 100 * Math.cos(2 * Math.PI * saat / (10 * planetPeriod[planet.value()]) - Math.PI / 2) + 155, - planetRadi[planet.value()] * 100 * Math.sin(2 * Math.PI * saat / (10 * planetPeriod[planet.value()]) - Math.PI / 2) + 155];
		}

		// the case of superior planets
		// earth's simulated orbital period is always 10 sec
		// the trails, unlike the case of inner planets, need to be adjusted individually
		// this is because the outer planets' orbital angular velocity vary quite much,
		// drastically less than earth's starting from jupiter outward
		// under constant regress, the gas giants' trails will be too clumped
		// hence the giants' trails are made with longer regress for outer ones
		else {
			switch(planet.value()) {
				case 2:
					tRegress = 0.15;
					break;
				case 3:
					tRegress = 0.90;
					break;
				case 4:
					tRegress = 0.90;
					break;
				case 5:
					tRegress = 2.7;
					break;
				case 6:
					tRegress = 2.7;
			}

			// the outer circle is constant is radius so for the case of outer planets,
			// it's earth's simulated orbital radius that needs adjustment
			posPlanet4 = [100 * Math.cos(2 * Math.PI * (saat - 4 * tRegress) / (10 * planetPeriod[planet.value()]) - Math.PI / 2) + 155, - 100 * Math.sin(2 * Math.PI * (saat - 4 * tRegress) / (10 * planetPeriod[planet.value()]) - Math.PI / 2) + 155];
			posPlanet3 = [100 * Math.cos(2 * Math.PI * (saat - 3 * tRegress) / (10 * planetPeriod[planet.value()]) - Math.PI / 2) + 155, - 100 * Math.sin(2 * Math.PI * (saat - 3 * tRegress) / (10 * planetPeriod[planet.value()]) - Math.PI / 2) + 155];
			posPlanet2 = [100 * Math.cos(2 * Math.PI * (saat - 2 * tRegress) / (10 * planetPeriod[planet.value()]) - Math.PI / 2) + 155, - 100 * Math.sin(2 * Math.PI * (saat - 2 * tRegress) / (10 * planetPeriod[planet.value()]) - Math.PI / 2) + 155];
			posPlanet1 = [100 * Math.cos(2 * Math.PI * (saat - 1 * tRegress) / (10 * planetPeriod[planet.value()]) - Math.PI / 2) + 155, - 100 * Math.sin(2 * Math.PI * (saat - 1 * tRegress) / (10 * planetPeriod[planet.value()]) - Math.PI / 2) + 155];
			posPlanet = [100 * Math.cos(2 * Math.PI * saat / (10 * planetPeriod[planet.value()]) - Math.PI / 2) + 155, - 100 * Math.sin(2 * Math.PI * saat / (10 * planetPeriod[planet.value()]) - Math.PI / 2) + 155];

			posBumi4 = [1 / planetRadi[planet.value()] * 100 * Math.cos(2 * Math.PI * (saat - 4 * tRegress) / 10 - Math.PI / 2) + 155, - 1 / planetRadi[planet.value()] * 100 * Math.sin(2 * Math.PI * (saat - 4 * tRegress) / 10 - Math.PI / 2) + 155];
			posBumi3 = [1 / planetRadi[planet.value()] * 100 * Math.cos(2 * Math.PI * (saat - 3 * tRegress) / 10 - Math.PI / 2) + 155, - 1 / planetRadi[planet.value()] * 100 * Math.sin(2 * Math.PI * (saat - 3 * tRegress) / 10 - Math.PI / 2) + 155];
			posBumi2 = [1 / planetRadi[planet.value()] * 100 * Math.cos(2 * Math.PI * (saat - 2 * tRegress) / 10 - Math.PI / 2) + 155, - 1 / planetRadi[planet.value()] * 100 * Math.sin(2 * Math.PI * (saat - 2 * tRegress) / 10 - Math.PI / 2) + 155];
			posBumi1 = [1 / planetRadi[planet.value()] * 100 * Math.cos(2 * Math.PI * (saat - 1 * tRegress) / 10 - Math.PI / 2) + 155, - 1 / planetRadi[planet.value()] * 100 * Math.sin(2 * Math.PI * (saat - 1 * tRegress) / 10 - Math.PI / 2) + 155];
			posBumi = [1 / planetRadi[planet.value()] * 100 * Math.cos(2 * Math.PI * saat / 10 - Math.PI / 2) + 155, - 1 / planetRadi[planet.value()] * 100 * Math.sin(2 * Math.PI * saat / 10 - Math.PI / 2) + 155];
		}

		// new positions by translation of point of view
		// the first terms of each member of the lists are the pre-translation (x, y)
		// the part of second terms within parentheses are the vector direction of earth
		// the -155 terms come from the fact that the center of the sim is (155, 155)
		posPlanet4Baru = [posPlanet4[0] - pandang.value() * (posBumi4[0] - 155), posPlanet4[1] - pandang.value() * (posBumi4[1] - 155)];
		posPlanet3Baru = [posPlanet3[0] - pandang.value() * (posBumi3[0] - 155), posPlanet3[1] - pandang.value() * (posBumi3[1] - 155)];
		posPlanet2Baru = [posPlanet2[0] - pandang.value() * (posBumi2[0] - 155), posPlanet2[1] - pandang.value() * (posBumi2[1] - 155)];
		posPlanet1Baru = [posPlanet1[0] - pandang.value() * (posBumi1[0] - 155), posPlanet1[1] - pandang.value() * (posBumi1[1] - 155)];
		posPlanetBaru = [posPlanet[0] - pandang.value() * (posBumi[0] - 155), posPlanet[1] - pandang.value() * (posBumi[1] - 155)];

		posBumi4Baru = [posBumi4[0] - pandang.value() * (posBumi4[0] - 155), posBumi4[1] - pandang.value() * (posBumi4[1] - 155)];
		posBumi3Baru = [posBumi3[0] - pandang.value() * (posBumi3[0] - 155), posBumi3[1] - pandang.value() * (posBumi3[1] - 155)];
		posBumi2Baru = [posBumi2[0] - pandang.value() * (posBumi2[0] - 155), posBumi2[1] - pandang.value() * (posBumi2[1] - 155)];
		posBumi1Baru = [posBumi1[0] - pandang.value() * (posBumi1[0] - 155), posBumi1[1] - pandang.value() * (posBumi1[1] - 155)];
		posBumiBaru = [posBumi[0] - pandang.value() * (posBumi[0] - 155), posBumi[1] - pandang.value() * (posBumi[1] - 155)];

		tengah4Baru = [155 - pandang.value() * (posBumi4[0] - 155), 155 - pandang.value() * (posBumi4[1] - 155)];
		tengah3Baru = [155 - pandang.value() * (posBumi3[0] - 155), 155 - pandang.value() * (posBumi3[1] - 155)];
		tengah2Baru = [155 - pandang.value() * (posBumi2[0] - 155), 155 - pandang.value() * (posBumi2[1] - 155)];
		tengah1Baru = [155 - pandang.value() * (posBumi1[0] - 155), 155 - pandang.value() * (posBumi1[1] - 155)];
		tengahBaru = [155 - pandang.value() * (posBumi[0] - 155), 155 - pandang.value() * (posBumi[1] - 155)];

		// sun, too small hence not drawn if uranus or neptune is selected
		batas.strokeWeight(1);
		if (planet.value() < 5) {
			batas.noStroke();
			batas.fill('#ffff88');

			// the trailing positions are displayed as smaller circles
			batas.circle(tengah4Baru[0], tengah4Baru[1], 3);
			batas.fill('#ffff66');
			batas.circle(tengah3Baru[0], tengah3Baru[1], 4);
			batas.fill('#ffff44');
			batas.circle(tengah2Baru[0], tengah2Baru[1], 5);
			batas.fill('#ffff22');
			batas.circle(tengah1Baru[0], tengah1Baru[1], 6);

			batas.stroke('#000000');
			batas.fill('#ffff00');
			batas.circle(tengahBaru[0], tengahBaru[1], 7);
		}

		// drawing the earth
		batas.noStroke();
		batas.fill('#8888ff');
		batas.circle(posBumi4Baru[0], posBumi4Baru[1], 3);
		batas.fill('#6666ff');
		batas.circle(posBumi3Baru[0], posBumi3Baru[1], 4);
		batas.fill('#4444ff');
		batas.circle(posBumi2Baru[0], posBumi2Baru[1], 5);
		batas.fill('#2222ff');
		batas.circle(posBumi1Baru[0], posBumi1Baru[1], 6);

		batas.stroke('#000000');
		batas.strokeWeight(1);
		batas.fill('#0000ff');
		batas.circle(posBumiBaru[0], posBumiBaru[1], 7);

		// drawing the planets
		batas.noStroke();
		batas.fill('#ff8888');
		batas.circle(posPlanet4Baru[0], posPlanet4Baru[1], 3);
		batas.fill('#ff6666');
		batas.circle(posPlanet3Baru[0], posPlanet3Baru[1], 4);
		batas.fill('#ff4444');
		batas.circle(posPlanet2Baru[0], posPlanet2Baru[1], 5);
		batas.fill('#ff2222');
		batas.circle(posPlanet1Baru[0], posPlanet1Baru[1], 6);

		batas.stroke('#000000');
		batas.strokeWeight(1);
		batas.fill('#ff0000');
		batas.circle(posPlanetBaru[0], posPlanetBaru[1], 7);

		// putting the clip onto the canvas
		p.image(batas, 5, 130);
	};
};

let sketRetrograde = new p5(Retrograde, 'SimRetrograde');
