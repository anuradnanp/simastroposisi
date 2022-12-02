/* Copyright (C) 2022 Alma Nuradnan Pramudita (email: gocodealpha@gmail.com)

This file is part of SimAstroPosisi.

SimAstroPosisi is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

SimAstroPosisi is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with SimAstroPosisi. If not, see <https://www.gnu.org/licenses/>. */

let PosPlanet = function(p) {
	let pad = 10;
	let elHeight = 14;
  let LatoReg, LatoBold, batas, planet, pandang;
  let minus1, minus10, minus30, minus100;
  let plus1, plus10, plus30, plus100;
  let saat, jd2nd, z2nd, f2nd, a2nd, alpha2nd, b2nd, c2nd, d2nd;
  let e2nd, day2nd, month2nd, year2nd, namaMonth2nd;
  let gregRes, lokPandang, planetRadi, planetPeriod, geser, i;
  let posBumi, posBumiBaru, tengahBaru;
  let posMerkurius, posVenus, posMars, posJupiter, posSaturnus;
  let posMerkuriusBaru, posVenusBaru, posMarsBaru;
  let posJupiterBaru, posSaturnusBaru;
  let side, theta, sudut;

	// the fonts
	p.preload = function() {
		LatoReg = p.loadFont('../aset/Lato-Regular.ttf');
		LatoBold = p.loadFont('../aset/Lato-Bold.ttf');
// 		LatoReg = p.loadFont('https://anuradnanp.github.iosimastroposisi/aset/Lato-Regular.ttf');
// 		LatoBold = p.loadFont('https://anuradnanp.github.iosimastroposisi/aset/Lato-Bold.ttf');
// 		LatoReg = p.loadFont('file:///android_asset/aset/Lato-Regular.ttf');
// 		LatoBold = p.loadFont('file:///android_asset/aset/Lato-Bold.ttf');
	};

	p.setup = function() {
		p.createCanvas(320, 557);
		batas = p.createGraphics(310, 310);

		planet = p.createRadio();
		planet.option(' planet dalam ');
		planet.option(' planet luar ');
		planet.selected(' planet luar ');
		planet.position(2 * pad, 2 * pad + elHeight);
		planet.size(250, elHeight);
		planet.style('font-family', 'Lato-Regular');
		planet.style('font-size', '14px');

		pandang = p.createSlider(0, 1.1, 0, 0.1);
		pandang.position(2 * pad, 7 * pad + elHeight);
		pandang.size(250, elHeight);

		minus1 = p.createButton('- 1 hari');
		minus1.position(1 * pad, 9 * pad + 2 * elHeight);
		minus1.mousePressed(p.min1);
		minus1.style('font-family', 'Lato-Regular');
		minus1.style('font-size', '14px');
		plus1 = p.createButton('+ 1 hari');
		plus1.position(1 * pad, 11 * pad + 3 * elHeight);
		plus1.mousePressed(p.plu1);
		plus1.style('font-family', 'Lato-Regular');
		plus1.style('font-size', '14px');

		minus10 = p.createButton('- 10 hari');
		minus10.position(2 * pad + 55, 9 * pad + 2 * elHeight);
		minus10.mousePressed(p.min10);
		minus10.style('font-family', 'Lato-Regular');
		minus10.style('font-size', '14px');
		plus10 = p.createButton('+ 10 hari');
		plus10.position(2 * pad + 55, 11 * pad + 3 * elHeight);
		plus10.mousePressed(p.plu10);
		plus10.style('font-family', 'Lato-Regular');
		plus10.style('font-size', '14px');

		minus30 = p.createButton('- 30 hari');
		minus30.position(3 * pad + 120, 9 * pad + 2 * elHeight);
		minus30.mousePressed(p.min30);
		minus30.style('font-family', 'Lato-Regular');
		minus30.style('font-size', '14px');
		plus30 = p.createButton('+ 30 hari');
		plus30.position(3 * pad + 120, 11 * pad + 3 * elHeight);
		plus30.mousePressed(p.plu30);
		plus30.style('font-family', 'Lato-Regular');
		plus30.style('font-size', '14px');

		minus100 = p.createButton('- 100 hari');
		minus100.position(4 * pad + 185, 9 * pad + 2 * elHeight);
		minus100.mousePressed(p.min100);
		minus100.style('font-family', 'Lato-Regular');
		minus100.style('font-size', '14px');
		plus100 = p.createButton('+ 100 hari');
		plus100.position(4 * pad + 185, 11 * pad + 3 * elHeight);
		plus100.mousePressed(p.plu100);
		plus100.style('font-family', 'Lato-Regular');
		plus100.style('font-size', '14px');

		// jd for noon 23 September 2022
		// this is the reference time for the calc in this program
		saat = 2459846;

		p.frameRate(5);
	};

	p.min1 = function() {
		saat = saat - 1;
	};

	p.plu1 = function() {
		saat = saat + 1;
	};

	p.min10 = function() {
		saat = saat - 10;
	};

	p.plu10 = function() {
		saat = saat + 10;
	};

	p.min30 = function() {
		saat = saat - 30;
	};

	p.plu30 = function() {
		saat = saat + 30;
	};

	p.min100 = function() {
		saat = saat - 100;
	};

	p.plu100 = function() {
		saat = saat + 100;
	};

	p.mousePressed = function() {
		if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
			p.frameRate(20);
		}
	};

	p.mouseReleased = function() {
		p.frameRate(5);
	};

	// action time, Julian day to Gregorian or Julian calendar
	p.jd2greg = function() {
		jd2nd = saat + 0.5;
		z2nd = Math.floor(jd2nd);
		f2nd = jd2nd - z2nd;
		if (z2nd < 2299161) {
			a2nd = z2nd;
		} else {
			alpha2nd = Math.floor((z2nd - 1867216.25) / 36524.25);
			a2nd = z2nd + 1 + alpha2nd - Math.floor(alpha2nd / 4);
		}
		b2nd = a2nd + 1524;
		c2nd = Math.floor((b2nd - 122.1) / 365.25);
		d2nd = Math.floor(365.25 * c2nd);
		e2nd = Math.floor((b2nd - d2nd) / 30.6001);
		day2nd = b2nd - d2nd - Math.floor(30.6001 * e2nd);

		if (e2nd < 14) {
			month2nd = e2nd - 1;
		} else if (e2nd == 14 || e2nd == 15) {
			month2nd = e2nd - 13;
		}

		if (month2nd > 2) {
			year2nd = c2nd - 4716;
		} else if (month2nd == 1 || month2nd == 2) {
			year2nd = c2nd - 4715;
		}

		// converting month2nd number to month2nd name
		switch (month2nd) {
			case 1:
				namaMonth2nd = 'Januari';
				break;
			case 2:
				namaMonth2nd = 'Februari';
				break;
			case 3:
				namaMonth2nd = 'Maret';
				break;
			case 4:
				namaMonth2nd = 'April';
				break;
			case 5:
				namaMonth2nd = 'Mei';
				break;
			case 6:
				namaMonth2nd = 'Juni';
				break;
			case 7:
				namaMonth2nd = 'Juli';
				break;
			case 8:
				namaMonth2nd = 'Agustus';
				break;
			case 9:
				namaMonth2nd = 'September';
				break;
			case 10:
				namaMonth2nd = 'Oktober';
				break;
			case 11:
				namaMonth2nd = 'November';
				break;
			case 12:
				namaMonth2nd = 'Desember';
		}

		gregRes = [year2nd, namaMonth2nd, day2nd];
		return gregRes;
	};

	p.draw = function() {
		p.background('#d79922');
		p.angleMode(p.RADIANS);

		switch (pandang.value()) {
			case 0:
				lokPandang = 'Matahari';
				break;
			case 0.1:
				lokPandang = 'Matahari -|--------- Bumi';
				break;
			case 0.2:
				lokPandang = 'Matahari --|-------- Bumi';
				break;
			case 0.3:
				lokPandang = 'Matahari ---|------- Bumi';
				break;
			case 0.4:
				lokPandang = 'Matahari ----|------ Bumi';
				break;
			case 0.5:
				lokPandang = 'Matahari -----|----- Bumi';
				break;
			case 0.6:
				lokPandang = 'Matahari ------|---- Bumi';
				break;
			case 0.7:
				lokPandang = 'Matahari -------|--- Bumi';
				break;
			case 0.8:
				lokPandang = 'Matahari --------|-- Bumi';
				break;
			case 0.9:
				lokPandang = 'Matahari ---------|- Bumi';
				break;
			case 1:
				lokPandang = 'Bumi + orbit';
				break;
			case 1.1:
				lokPandang = 'Bumi + arah + jarak';
		}

		planetRadi = [0.387, 0.723, 1.52, 5.20, 9.57];
		planetPeriod = [0.241, 0.615, 1.88, 11.9, 29.4];

		p.jd2greg();

		p.fill('#000000');
		p.textFont(LatoReg);
		p.textSize(14);
		p.noStroke();
		p.textAlign(p.LEFT, p.TOP);
		p.text('planet yang dilihat dari Bumi : ', pad, pad, 250, elHeight);
		p.text('pusat pandang : ', pad, 5 * pad + elHeight, 200, elHeight);
		p.textFont(LatoBold);
		p.text('[' + lokPandang + ']', 110, 5 * pad + elHeight, 200, elHeight);

		p.textFont(LatoBold);
		p.textAlign(p.RIGHT, p.TOP);
		p.textSize(14);
		p.text('susunan planet-planet pada tanggal', 320 - 2 * pad, 510);
		p.textSize(20);
		p.text(gregRes[2] + ' ' + gregRes[1] + ' ' + gregRes[0], 320 - 2 * pad, 525);

		// planets and their orbits, drawn in clip mask inside canvas
		// outer path is Earth's orbit if an inner planet is selected
		batas.background('#d79922');

		// positions of Earth and the planets
		// the initial position is for 23 September 2022
		// the heliocentric longitudes were taken from
		// http://cosinekitty.com/solar_system.html
		// all orbits are assumed to be circular
		if (planet.value() == " planet dalam ") {
			posBumi = [100 * Math.cos(2 * Math.PI * (saat - 2459846) / 365.24219 + 0.16913 * Math.PI / 180) + 155, - 100 * Math.sin(2 * Math.PI * (saat - 2459846) / 365.24219 + 0.16913 * Math.PI / 180) + 155];

			posMerkurius = [planetRadi[0] * 100 * Math.cos(2 * Math.PI * (saat - 2459846) / (365.24219 * planetPeriod[0]) + 359.89164 * Math.PI / 180) + 155, - planetRadi[0] * 100 * Math.sin(2 * Math.PI * (saat - 2459846) / (365.24219 * planetPeriod[0]) + 359.89164 * Math.PI / 180) + 155];

			posVenus = [planetRadi[1] * 100 * Math.cos(2 * Math.PI * (saat - 2459846) / (365.24219 * planetPeriod[1]) + 161.48632 * Math.PI / 180) + 155, - planetRadi[1] * 100 * Math.sin(2 * Math.PI * (saat - 2459846) / (365.24219 * planetPeriod[1]) + 161.48632 * Math.PI / 180) + 155];
		}

		else {
			posMars = [planetRadi[2] / planetRadi[4] * 150 * Math.cos(2 * Math.PI * (saat - 2459846) / (365.24219 * planetPeriod[2]) + 34.34596 * Math.PI / 180) + 155, - planetRadi[2] / planetRadi[4] * 150 * Math.sin(2 * Math.PI * (saat - 2459846) / (365.24219 * planetPeriod[2]) + 34.34596 * Math.PI / 180) + 155];

			posJupiter = [planetRadi[3] / planetRadi[4] * 150 * Math.cos(2 * Math.PI * (saat - 2459846) / (365.24219 * planetPeriod[3]) + 3.02071 * Math.PI / 180) + 155, - planetRadi[3] / planetRadi[4] * 150 * Math.sin(2 * Math.PI * (saat - 2459846) / (365.24219 * planetPeriod[3]) + 3.02071 * Math.PI / 180) + 155];

			posSaturnus = [150 * Math.cos(2 * Math.PI * (saat - 2459846) / (365.24219 * planetPeriod[4]) + 323.13918 * Math.PI / 180) + 155, - 150 * Math.sin(2 * Math.PI * (saat - 2459846) / (365.24219 * planetPeriod[4]) + 323.13918 * Math.PI / 180) + 155];

			posBumi = [1 / planetRadi[4] * 150 * Math.cos(2 * Math.PI * (saat - 2459846) / 365.24219 + 0.16913 * Math.PI / 180) + 155, - 1 / planetRadi[4] * 150 * Math.sin(2 * Math.PI * (saat - 2459846) / 365.24219 + 0.16913 * Math.PI / 180) + 155];
		}

		// new centers from translation of point of view
		if (pandang.value() == 1.1) {
			geser = 1;
		} else {
			geser = pandang.value();
		}

		posBumiBaru = [(1 - geser) * posBumi[0] + geser * 155, (1 - geser) * posBumi[1] + geser * 155];

		tengahBaru = [155 - geser * posBumi[0] + geser * 155, 155 - geser * posBumi[1] + geser * 155];

		if (planet.value() == " planet dalam ") {
		posMerkuriusBaru = [posMerkurius[0] - geser * posBumi[0] + geser * 155, posMerkurius[1] - geser * posBumi[1] + geser * 155];

		posVenusBaru = [posVenus[0] - geser * posBumi[0] + geser * 155, posVenus[1] - geser * posBumi[1] + geser * 155];
		} else {
		posMarsBaru = [posMars[0] - geser * posBumi[0] + geser * 155, posMars[1] - geser * posBumi[1] + geser * 155];

		posJupiterBaru = [posJupiter[0] - geser * posBumi[0] + geser * 155, posJupiter[1] - geser * posBumi[1] + geser * 155];

		posSaturnusBaru = [posSaturnus[0] - geser * posBumi[0] + geser * 155, posSaturnus[1] - geser * posBumi[1] + geser * 155];
		}

		// shading the night side
		side = 500;
		batas.noStroke();
		theta = batas.atan2(posBumiBaru[1] - tengahBaru[1], posBumiBaru[0] - tengahBaru[0]);

		batas.translate(posBumiBaru[0], posBumiBaru[1]);
		batas.rotate(theta);

		batas.fill('#4753b7');
		batas.rect(0, - 0.5 * side, side, side);

		batas.rotate(-theta);
		batas.translate(-posBumiBaru[0], -posBumiBaru[1]);

		batas.noFill();
		batas.stroke('#ffffff');
		batas.strokeWeight(0.5);

		// drawing the orbits, the outer one's radius is fixed
		// also drawing the distance and direction grid, if selected
		if (pandang.value() < 1.1) {
			if (planet.value() == " planet dalam ") {
				batas.circle(tengahBaru[0], tengahBaru[1], planetRadi[0] * 200);
				batas.circle(tengahBaru[0], tengahBaru[1], planetRadi[1] * 200);
				batas.circle(tengahBaru[0], tengahBaru[1], 200);
			} else {
				batas.circle(tengahBaru[0], tengahBaru[1], 1 / planetRadi[4] * 300);
				batas.circle(tengahBaru[0], tengahBaru[1], planetRadi[2] / planetRadi[4] * 300);
				batas.circle(tengahBaru[0], tengahBaru[1], planetRadi[3] / planetRadi[4] * 300);
				batas.circle(tengahBaru[0], tengahBaru[1], 300);
			}
		} else {
			batas.translate(posBumiBaru[0], posBumiBaru[1]);
			for (i = 0; i < 6; i++) {
				batas.rotate(- i * Math.PI / 6);
				batas.line(-1000, 0, 1000, 0);
				batas.rotate(i * Math.PI / 6);
			}
			batas.translate(- posBumiBaru[0], - posBumiBaru[1]);

			for (i = 1; i < 9; i++) {
				batas.circle(posBumiBaru[0], posBumiBaru[1], i * 50);
			}
		}

		batas.noStroke();
		batas.textSize(12);
		batas.textAlign(batas.CENTER);
		batas.textFont(LatoReg);
		batas.fill('#ffffff');

		sudut = batas.atan2(tengahBaru[0] - posBumiBaru[0], - tengahBaru[1] + posBumiBaru[1]);
		if (planet.value() == ' planet dalam ') {
			batas.push();
			batas.translate(
				0.8 * (- tengahBaru[1] + posBumiBaru[1]) + posBumiBaru[0] - 5 * batas.cos(sudut + batas.PI / 2),
				0.8 * (tengahBaru[0] - posBumiBaru[0]) + posBumiBaru[1] - 5 * batas.sin(sudut + batas.PI / 2)
			);
			batas.rotate(sudut);
			batas.text('fajar\n' + 'akan siang', 0, 0);
			batas.pop();

			batas.push();
			batas.translate(
				0.8 * (tengahBaru[1] - posBumiBaru[1]) + posBumiBaru[0] + 5 * batas.cos(sudut + batas.PI / 2),
				0.8 * (- tengahBaru[0] + posBumiBaru[0]) + posBumiBaru[1] + 5 * batas.sin(sudut + batas.PI / 2)
			);
			batas.rotate(sudut + batas.PI);
			batas.text('senja\n' + 'akan malam', 0, 0);
			batas.pop();

		} else {
			batas.push();
			batas.translate(
				4.8 * (- tengahBaru[1] + posBumiBaru[1]) + posBumiBaru[0] - 5 * batas.cos(sudut + batas.PI / 2),
				4.8 * (tengahBaru[0] - posBumiBaru[0]) + posBumiBaru[1] - 5 * batas.sin(sudut + batas.PI / 2)
			);
			batas.rotate(sudut);
			batas.text('fajar\n' + 'akan siang', 0, 0);
			batas.pop();

			batas.push();
			batas.translate(
				4.8 * (tengahBaru[1] - posBumiBaru[1]) + posBumiBaru[0] + 5 * batas.cos(sudut + batas.PI / 2),
				4.8 * (- tengahBaru[0] + posBumiBaru[0]) + posBumiBaru[1] + 5 * batas.sin(sudut + batas.PI / 2)
			);
			batas.rotate(sudut + batas.PI);
			batas.text('senja\n' + 'akan malam', 0, 0);
			batas.pop();
		}

		// drawing the Sun
		batas.stroke('#000000');
		batas.strokeWeight(1);
		batas.fill('#ffff00');
		batas.circle(tengahBaru[0], tengahBaru[1], 7);

		// drawing the planets
		batas.fill('#0000ff');
		batas.circle(posBumiBaru[0], posBumiBaru[1], 7);

		if (planet.value() == " planet dalam ") {
			batas.fill('#777777');
			batas.circle(posMerkuriusBaru[0], posMerkuriusBaru[1], 7);

			batas.fill('#ff0000');
			batas.circle(posVenusBaru[0], posVenusBaru[1], 7);

			batas.push();
			batas.noStroke();
			batas.fill('#ffffff');

				batas.push();
				if (pandang.value() == 1.1) {
					sudut = batas.atan2(posMerkuriusBaru[1] - 155, posMerkuriusBaru[0] - 155);
				} else {
					sudut = batas.atan2(posMerkuriusBaru[1] - tengahBaru[1], posMerkuriusBaru[0] - tengahBaru[0]);
				}
				batas.translate(posMerkuriusBaru[0] + 12 * batas.cos(sudut), posMerkuriusBaru[1] + 12 * batas.sin(sudut));
				batas.rotate(sudut + batas.PI / 2);
				batas.text('Merkurius', 0, 0);
				batas.pop();

				batas.push();
				if (pandang.value() == 1.1) {
					sudut = batas.atan2(posVenusBaru[1] - 155, posVenusBaru[0] - 155);
				} else {
					sudut = batas.atan2(posVenusBaru[1] - tengahBaru[1], posVenusBaru[0] - tengahBaru[0]);
				}
				batas.translate(posVenusBaru[0] + 12 * batas.cos(sudut), posVenusBaru[1] + 12 * batas.sin(sudut));
				batas.rotate(sudut + batas.PI / 2);
				batas.text('Venus', 0, 0);
				batas.pop();

			batas.pop();

		} else {
			batas.fill('#ff0000');
			batas.circle(posMarsBaru[0], posMarsBaru[1], 7);
			batas.fill('#ff5500');
			batas.circle(posJupiterBaru[0], posJupiterBaru[1], 7);
			batas.fill('#ffaa00');
			batas.circle(posSaturnusBaru[0], posSaturnusBaru[1], 7);

			batas.push();
			batas.noStroke();
			batas.fill('#ffffff');

				batas.push();
				if (pandang.value() == 1.1) {
					sudut = batas.atan2(posMarsBaru[1] - 155, posMarsBaru[0] - 155);
				} else {
					sudut = batas.atan2(posMarsBaru[1] - tengahBaru[1], posMarsBaru[0] - tengahBaru[0]);
				}
				batas.translate(posMarsBaru[0] + 12 * batas.cos(sudut), posMarsBaru[1] + 12 * batas.sin(sudut));
				batas.rotate(sudut + batas.PI / 2);
				batas.text('Mars', 0, 0);
				batas.pop();

				batas.push();
				if (pandang.value() == 1.1) {
					sudut = batas.atan2(posJupiterBaru[1] - 155, posJupiterBaru[0] - 155);
				} else {
					sudut = batas.atan2(posJupiterBaru[1] - tengahBaru[1], posJupiterBaru[0] - tengahBaru[0]);
				}
				batas.translate(posJupiterBaru[0] + 12 * batas.cos(sudut), posJupiterBaru[1] + 12 * batas.sin(sudut));
				batas.rotate(sudut + batas.PI / 2);
				batas.text('Jupiter', 0, 0);
				batas.pop();

				batas.push();
				if (pandang.value() == 1.1) {
					sudut = batas.atan2(posSaturnusBaru[1] - 155, posSaturnusBaru[0] - 155);
				} else {
					sudut = batas.atan2(posSaturnusBaru[1] - tengahBaru[1], posSaturnusBaru[0] - tengahBaru[0]);
				}
				batas.translate(posSaturnusBaru[0] + 12 * batas.cos(sudut), posSaturnusBaru[1] + 12 * batas.sin(sudut));
				batas.rotate(sudut + batas.PI / 2);
				batas.text('Saturnus', 0, 0);
				batas.pop();

			batas.pop();
		}

		p.image(batas, 5, 190);
	};
};

let sketPosPlanet = new p5(PosPlanet, 'CalcPosPlanet');
