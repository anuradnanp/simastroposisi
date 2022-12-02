/* Copyright (C) 2022 Alma Nuradnan Pramudita (email: gocodealpha@gmail.com)

This file is part of SimAstroPosisi.

SimAstroPosisi is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

SimAstroPosisi is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with SimAstroPosisi. If not, see <https://www.gnu.org/licenses/>. */

let Eclipse = function(p) {
	let pad = 10;
	let elHeight = 14;
	let LatoReg;
  let dayNight, worldWrap, MoonWrap, kanvas;
  let alpha2nd, a2nd, b2nd, c2nd, d2nd, day2nd, month2nd;
  let jd2nd, e2nd, f2nd, z2nd, isiTanggal, isiJam, gregRes;
  let namaMonth2nd, year2nd, minute2nd, minutef2nd, hour2nd, hourf2nd;
  let posViewCalc, minus1mnt, plus1mnt, minus10mnt, plus10mnt;
  let minus1j, plus1j, minus6j, plus6j, minus100h, plus100h;
  let minus1h, plus1h, minus10h, plus10h, minus30h, plus30h;
  let posCamHeightCalc, saatInit, saat, THariSid, saatInitBum;
  let angleBumInit, tanggal, jam;
  let Lamb1, Bet1, Lamb2, Bet2, R1, R2, Obl, M1;
  let locMat, locBul, lineMatColor, lineBulColor;
  let MoonToSun, sumbuRotColor, orbBul;
  let umBulLen, umBumLen, umColor, MoonToEarth;
  let penBulLen, penBumLen, penCircColor, days, t, SunToMoon;
  let SunToEarth, EarthToSun, EarthToMoon;
  let umCircColor, penColor;

	p.preload = function() {

		// the font
		LatoReg = p.loadFont('../aset/Lato-Regular.ttf');
		LatoBold = p.loadFont('../aset/Lato-Bold.ttf');
// 		LatoReg = p.loadFont('file:///android_asset/aset/Lato-Regular.ttf');
// 		LatoReg = p.loadFont('file:///android_asset/aset/Lato-Bold.ttf');

		// the texture materials, providing surfaces and night shade
		dayNight = p.loadImage('../aset/day-night.png');
		worldWrap = p.loadImage('../aset/world-wrap.png');
		MoonWrap = p.loadImage('../aset/moon-wrap-mono.png');
// 		dayNight = p.loadImage('file:///android_asset/aset/day-night.png');
// 		worldWrap = p.loadImage('file:///android_asset/aset/world-wrap.png');
// 		MoonWrap = p.loadImage('file:///android_asset/aset/moon-wrap-mono.png');
	};

	p.setup = function() {
		p.setAttributes('antialias', true);

		kanvas = p.createCanvas(300, 300, p.WEBGL);
		kanvas.position(0, 155);
		kanvas.style('border-radius', '0');

		// the time increment buttons
		minus1mnt = p.createButton('- 1 menit');
		minus1mnt.position(pad, pad);
		minus1mnt.mousePressed(p.min1menit);
		minus1mnt.style('font-family', 'Lato-Regular');
		minus1mnt.style('font-size', '14px');
		plus1mnt = p.createButton('+ 1 menit');
		plus1mnt.position(pad, 3 * pad + elHeight);
		plus1mnt.mousePressed(p.plu1menit);
		plus1mnt.style('font-family', 'Lato-Regular');
		plus1mnt.style('font-size', '14px');

		minus10mnt = p.createButton('- 10 menit');
		minus10mnt.position(2 * pad + 65, pad);
		minus10mnt.mousePressed(p.min10menit);
		minus10mnt.style('font-family', 'Lato-Regular');
		minus10mnt.style('font-size', '14px');
		plus10mnt = p.createButton('+ 10 menit');
		plus10mnt.position(2 * pad + 65, 3 * pad + elHeight);
		plus10mnt.mousePressed(p.plu10menit);
		plus10mnt.style('font-family', 'Lato-Regular');
		plus10mnt.style('font-size', '14px');

		minus1j = p.createButton('- 1 jam');
		minus1j.position(3 * pad + 137, pad);
		minus1j.mousePressed(p.min1jam);
		minus1j.style('font-family', 'Lato-Regular');
		minus1j.style('font-size', '14px');
		plus1j = p.createButton('+ 1 jam');
		plus1j.position(3 * pad + 137, 3 * pad + elHeight);
		plus1j.mousePressed(p.plu1jam);
		plus1j.style('font-family', 'Lato-Regular');
		plus1j.style('font-size', '14px');

		minus6j = p.createButton('- 6 jam');
		minus6j.position(4 * pad + 188, pad);
		minus6j.mousePressed(p.min6jam);
		minus6j.style('font-family', 'Lato-Regular');
		minus6j.style('font-size', '14px');
		plus6j = p.createButton('+ 6 jam');
		plus6j.position(4 * pad + 188, 3 * pad + elHeight);
		plus6j.mousePressed(p.plu6jam);
		plus6j.style('font-family', 'Lato-Regular');
		plus6j.style('font-size', '14px');

		minus1h = p.createButton('- 1 hari');
		minus1h.position(pad, 5 * pad + 2 * elHeight);
		minus1h.mousePressed(p.min1hari);
		minus1h.style('font-family', 'Lato-Regular');
		minus1h.style('font-size', '14px');
		plus1h = p.createButton('+ 1 hari');
		plus1h.position(pad, 7 * pad + 3 * elHeight);
		plus1h.mousePressed(p.plu1hari);
		plus1h.style('font-family', 'Lato-Regular');
		plus1h.style('font-size', '14px');

		minus10h = p.createButton('- 10 hari');
		minus10h.position(2 * pad + 54, 5 * pad + 2 * elHeight);
		minus10h.mousePressed(p.min10hari);
		minus10h.style('font-family', 'Lato-Regular');
		minus10h.style('font-size', '14px');
		plus10h = p.createButton('+ 10 hari');
		plus10h.position(2 * pad + 54, 7 * pad + 3 * elHeight);
		plus10h.mousePressed(p.plu10hari);
		plus10h.style('font-family', 'Lato-Regular');
		plus10h.style('font-size', '14px');

		minus30h = p.createButton('- 30 hari');
		minus30h.position(3 * pad + 117, 5 * pad + 2 * elHeight);
		minus30h.mousePressed(p.min30hari);
		minus30h.style('font-family', 'Lato-Regular');
		minus30h.style('font-size', '14px');
		plus30h = p.createButton('+ 30 hari');
		plus30h.position(3 * pad + 117, 7 * pad + 3 * elHeight);
		plus30h.mousePressed(p.plu30hari);
		plus30h.style('font-family', 'Lato-Regular');
		plus30h.style('font-size', '14px');

		minus100h = p.createButton('- 100 hari');
		minus100h.position(4 * pad + 179, 5 * pad + 2 * elHeight);
		minus100h.mousePressed(p.min100hari);
		minus100h.style('font-family', 'Lato-Regular');
		minus100h.style('font-size', '14px');
		plus100h = p.createButton('+ 100 hari');
		plus100h.position(4 * pad + 179, 7 * pad + 3 * elHeight);
		plus100h.mousePressed(p.plu100hari);
		plus100h.style('font-family', 'Lato-Regular');
		plus100h.style('font-size', '14px');

		// the cam's horizontal position
		posViewCalc = p.createSlider(0, 2 * p.PI, 2 * p.PI * 14 / 60, 2 * p.PI / 120);
		posViewCalc.size(260, elHeight);
		posViewCalc.position(20, 440);

		// the cam's vertical position
		posCamHeightCalc = p.createSlider(-70, 70, -60, 0.5);
		posCamHeightCalc.size(250, elHeight);
		posCamHeightCalc.position(170, 295);
		posCamHeightCalc.style('transform', 'rotate(90deg)');

		// Julian day for 8 November 2022 06:07:39 GMT,
		// this is the moment when Moon is at the ecliptic,
		saatInit = 2459891.5 + 6 / 24 + 8 / 60 / 24;
		saat = saatInit;

		// Julian day for 8 November 2022 08:49:53 GMT
		// this is the moment when 0-deg-north-0-deg-east's zenith
		// is at 180-deg-ecliptic-longitude
		THariSid = (23 + 56 / 60 + 4.0905 / 3600) / 24;
		saatInitBum = 2459891.5 + 8 / 24 + 49 / 60 / 24 + 53 / 3600 / 24;
		angleBumInit = p.PI - 2 * p.PI / THariSid * (saatInitBum - saatInit);

		// the element for date, month, year
		tanggal = p.createP('');
		tanggal.size(300, 20);
		tanggal.position(pad, 468);
		tanggal.id('tanggal');
		tanggal.style('text-align', 'right');
		tanggal.style('font-family', 'Lato-Bold');
		tanggal.style('font-size', '15px');

		// the element for hour and minute
		jam = p.createP('');
		jam.size(300, 20);
		jam.position(pad, 488);
		jam.id('jam');
		jam.style('text-align', 'right');
		jam.style('font-family', 'Lato-Bold');
		jam.style('font-size', '19px');

		// reducing the rendering load
		p.frameRate(5);
	};

	// here we go, the first engine
	// calculating the Sun's position
	p.posMat = function(x) {
    var L1, C1, V1, Ec1, Th1, Om1, Lam1;
    var Ra1, Dec1;

		// Sun formulas
		// L1 = Mean longitude, M1 = Mean anomaly, C1 = Equation of centre, V1 = True anomaly
		// Ec1 = Eccentricity, R1 = Sun distance, Th1	= Theta (true longitude)
		// Om1 = Long Asc Node (Omega), Lam1 = Lambda (apparent longitude)
		// Obl = Obliquity of ecliptic, Ra1 = Right Ascension, Dec1 = Declination
		L1 = p.range(280.466 + 36000.8 * x);
		M1 = p.range(357.52999 + 35999 * x - 0.0001536 * x ** 2 + x ** 3 / 24490000);
		C1 = (1.915 - 0.004817 * x - 0.000014 * x ** 2) * p.sin(M1 * p.PI / 180);
		C1 = C1 + (0.01999 - 0.000101 * x) * p.sin(2 * M1 * p.PI / 180);
		C1 = C1 + 0.00029 * p.sin(3 * M1 * p.PI / 180);
		V1 = M1 + C1;
		Ec1 = 0.01671 - 0.00004204 * x - 0.0000001236 * x ** 2;
		R1 = 0.99972 / (1 + Ec1 * p.cos(V1 * p.PI / 180));
		Th1 = L1 + C1;
		Om1 = p.range(125.04 - 1934.1 * x);
		Lam1 = Th1 - 0.00569 - 0.00478 * p.sin(Om1 * p.PI / 180);
		Obl = (84381.448 - 46.815 * x) / 3600;
		Ra1 = p.atan2(p.sin(Th1 * p.PI / 180) * p.cos(Obl * p.PI / 180) - p.tan(0 * p.PI / 180) * p.sin(Obl * p.PI / 180), p.cos(Th1 * p.PI / 180));
		Dec1 = p.asin(p.sin(0 * p.PI / 180) * p.cos(Obl * p.PI / 180) + p.cos(0 * p.PI / 180) * p.sin(Obl * p.PI / 180) * p.sin(Th1 * p.PI / 180));
		Lamb1 = p.atan2(p.sin(Ra1) * p.cos(Obl * p.PI / 180) + p.tan(Dec1) * p.sin(Obl * p.PI / 180), p.cos(Ra1));
		Bet1 = p.asin(p.sin(Dec1) * p.cos(Obl * p.PI / 180) - p.cos(Dec1) * p.sin(Obl * p.PI / 180) * p.sin(Ra1));

		// the final product to be referred later, basically
		// the conversion from ecliptic coords to (x, y, z)
		return [
			R1 * 149597870.7 / 6371 * 20 * p.cos(- Bet1) * p.cos(- Lamb1),
			R1 * 149597870.7 / 6371 * 20 * p.sin(- Bet1),
			R1 * 149597870.7 / 6371 * 20 * p.cos(- Bet1) * p.sin(- Lamb1)
		];
	};

	// the second engine
	// calculating the Moon's position
	p.posBul = function(x) {
    var F, L2, Om2, M2, D, D2, R3;
    var Bm, Lm, Ra2, Dec2;

		//	Moon formulas
		//	F = Argument of latitude (F), L2 = Mean longitude (L'), Om2 = Long. Asc. Node (Om')
		//	M2 = Mean anomaly (M'), D = Mean elongation (D), D2 = 2 * D
		//	R2 = Lunar distance (Earth = Moon distance), R3 = Distance ratio (Sun / Moon)
		//	Bm = Geocentric Latitude of Moon, Lm = Geocentric Longitude of Moon
		//	HLm = Heliocentric longitude, HBm = Heliocentric latitude
		//	Ra2 = Lunar Right Ascension, Dec2 = Declination
		F = p.range(93.2721 + 483202 * x - 0.003403 * x ** 2 - x ** 3 / 3526000);
		L2 = p.range(218.316 + 481268 * x);
		Om2 = p.range(125.045 - 1934.14 * x + 0.002071 * x ** 2 + x ** 3 / 450000);
		M2 = p.range(134.963 + 477199 * x + 0.008997 * x ** 2 + x ** 3 / 69700);
		D = p.range(297.85 + 445267 * x - 0.00163 * x ** 2 + x ** 3 / 545900);
		D2 = 2 * D;
		R2 = 1 + (- 20954 * p.cos(M2 * p.PI / 180) - 3699 * p.cos((D2 - M2) * p.PI / 180) - 2956 * p.cos(D2 * p.PI / 180)) / 385000;
		R3 = (R2 / R1) / 379.168831168831;
		Bm = 5.128 * p.sin(F * p.PI / 180) + 0.2806 * p.sin((M2 + F) * p.PI / 180);
		Bm = Bm + 0.2777 * p.sin((M2 - F) * p.PI / 180) + 0.1732 * p.sin((D2 - F) * p.PI / 180);
		Lm = 6.289 * p.sin(M2 * p.PI / 180) + 1.274 * p.sin((D2 -M2) * p.PI / 180) + 0.6583 * p.sin(D2 * p.PI / 180); 
		Lm = Lm + 0.2136 * p.sin(2 * M2 * p.PI / 180) - 0.1851 * p.sin(M1 * p.PI / 180) - 0.1143 * p.sin(2 * F * p.PI / 180); 
		Lm = Lm + 0.0588 * p.sin((D2 - 2 * M2) * p.PI / 180);
		Lm = Lm + 0.0572 * p.sin((D2 - M1 - M2) * p.PI / 180) + 0.0533 * p.sin((D2 + M2) * p.PI / 180);
		Lm = Lm + L2;
		Ra2 = p.atan2(p.sin(Lm * p.PI / 180) * p.cos(Obl * p.PI / 180) - p.tan(Bm * p.PI / 180) * p.sin(Obl * p.PI / 180), p.cos(Lm * p.PI / 180));
		Dec2 = p.asin(p.sin(Bm * p.PI / 180) * p.cos(Obl * p.PI / 180) + p.cos(Bm * p.PI / 180) * p.sin(Obl * p.PI / 180) * p.sin(Lm * p.PI / 180));
		Lamb2 = p.atan2(p.sin(Ra2) * p.cos(Obl * p.PI / 180) + p.tan(Dec2) * p.sin(Obl * p.PI / 180), p.cos(Ra2));
		Bet2 = p.asin(p.sin(Dec2) * p.cos(Obl * p.PI / 180) - p.cos(Dec2) * p.sin(Obl * p.PI / 180) * p.sin(Ra2));

		// again, the conversion from ecliptic coords to (x, y, z)
		return [
			R2 * 60.268511 * 20 * p.cos(- Bet2) * p.cos(- Lamb2),
			R2 * 60.268511 * 20 * p.sin(- Bet2),
			R2 * 60.268511 * 20 * p.cos(- Bet2) * p.sin(- Lamb2)
		];
	};

	// drawing the Sun
	p.drawSun = function() {
		p.push();
		p.noStroke();
		p.translate(locMat[0], locMat[1], locMat[2]);
		p.fill(255);

		// the Sun's scaled radius based on Earth's
		p.sphere(696340 / 6371 * 20);
		p.pop();

		// drawing line to guide user to the Sun's position
		p.push();
		lineMatColor = p.color(255, 255, 0);

		// the line is unnecessary for small FOV
		// hence the decreasing alpha for smaller FOV
		// the FOV gets smaller as users get more focused to the Moon
		if (p.abs(posCamHeightCalc.value()) > 60) {
			lineMatColor.setAlpha((3570 - 51 * p.abs(posCamHeightCalc.value())) / 2);
		} else {
			lineMatColor.setAlpha(255);
		}
		p.stroke(lineMatColor);
		p.strokeWeight(1);

		// the final end of the line is just 1/100 of
		// the Sun-Earth distance because the full length
		// puts too much burden on the rendering, making the
		// line disappears occasionally
		if (p.abs(posCamHeightCalc.value()) < 70) {
			p.line(0, 0, 0, 0.01 * locMat[0], 0.01 * locMat[1], 0.01 * locMat[2]);
		}
		p.pop();
	};

	// the star of the show :)
	p.drawMoon = function() {
		p.push();
		p.noStroke();
		p.translate(locBul[0], locBul[1], locBul[2]);

		// the rotateY fixes the Moon's side facing the Earth
		p.rotateY(Lamb2 + p.PI / 2);
		p.texture(MoonWrap);

		// the Moon's scaled radius
		p.sphere(1737 / 6371 * 19.5);
		p.pop();

		p.push();
		p.noStroke();
		p.translate(locBul[0], locBul[1], locBul[2]);

		// the rotateY makes sure that the day side always faces the Sun
		p.rotateY(p.atan2(SunToMoon.x, SunToMoon.z) - p.PI / 2);

		// this rotateZ takes into account that Moon
		// isn't always at ecliptic so the terminator
		// must pitch accordingly
		// in practice, the pitch in unnoticeable because
		// the Sun-Moon distance is very, very large compared
		// Moon's orbital radius
		p.rotateZ(p.asin(SunToMoon.y / SunToMoon.mag()));
		p.texture(dayNight);
		p.sphere(1737 / 6371 * 20);
		p.pop();

		// a line to guide users to find the Moon
		// it disappears gradually the more focused to the Moon
		// the view is
		p.push();
		lineBulColor = p.color(255, 0, 0);
		if (p.abs(posCamHeightCalc.value()) > 60) {
			lineBulColor.setAlpha((3570 - 51 * p.abs(posCamHeightCalc.value())) / 2);
		} else {
			lineBulColor.setAlpha(255);
		}

		p.stroke(lineBulColor);
		p.strokeWeight(1);
		if (p.abs(posCamHeightCalc.value()) < 70) {
			p.line(0, 0, 0, locBul[0], locBul[1], locBul[2]);
		}
		p.pop();
	};

	// home sweet home
	p.drawEarth = function() {
		p.push();
		p.strokeWeight(1);
		p.noFill();

		// tilting the Earth's rotation axis
		p.rotateZ(Obl * p.PI / 180);

		// making the axis more transparent for more
		// more focused view to the Moon so as not to
		// obstruct the view
		sumbuRotColor = p.color(0, 0, 0);
		if (p.abs(posCamHeightCalc.value()) > 60) {
			sumbuRotColor.setAlpha((3570 - 51 * p.abs(posCamHeightCalc.value())) / 2);
		} else {
			sumbuRotColor.setAlpha(255);
		}
		p.stroke(sumbuRotColor);
		if (p.abs(posCamHeightCalc.value()) < 70) {
			p.line(0, 20, 0, 0, 30, 0);
			p.line(0, - 20, 0, 0, - 30, 0);
		}

		p.rotateY(2 * p.PI / THariSid * (saat - saatInit) + angleBumInit - p.PI / 2);
		p.texture(worldWrap);
		p.noStroke();
		p.sphere(19.5);
		p.pop();

		// the circle of equator, also tilted, of course
		p.push();
		p.stroke('#ff0000');
		p.noFill();
		p.rotateZ(Obl * p.PI / 180);
		p.rotateX(p.PI / 2);
		p.circle(0, 0, 39);
		p.pop();

		p.push();
		p.noStroke();

		// making sure the day side always face the Sun
		p.rotateY(Lamb1 + p.PI);

		// making sure the pitch of the terminator
		// corresponds to the Sun's ecliptic latitude,
		// which is zero, lol, so it's practically meaningless
		// nevertheless, it's good conceptually, also
		// to confirm that Sun is at the ecliptic
		p.rotateZ(Bet1);
		p.texture(dayNight);
		p.sphere(20);
		p.pop();

		// the ecliptic, the radius of whose is set
		// almost the same as Moon's orbital radius to give better
		// illustration for Moon's orbital nodes
		// setting the ecliptic radius to be the same as Sun-Earth
		// distance is correct, cenceptually, but eliminates
		// the users' ability to identify Moon's orbital nodes when
		// viewed from near Earth
		// the whole situation arises from the replacement of
		// ecliptic plane with ecliptic line since line
		// has better contrast
		p.push();
		p.stroke('#00ff00');
		p.noFill();
		p.strokeWeight(1);
		p.rotateX(p.PI / 2);
		p.circle(0, 0, 2 * R2 * 60.268511 * 20 + 4 * 1737 / 6371 * 20);
		p.pop();
	};

	// hohoho, this is one of the two main features
	// here comes the umbra, for both Moon and Earth
	p.drawUmbra = function() {

		// the formula is from simple analysis of similar right triangles
		// for Moon's, the bigger tri has Sun's radius as base and
		// Sun-Moon distance + umbra as hypotenuse, the smaller tri has
		// Moon's radius as base and umbra as hypotenuse
		umBulLen = 1737 / (696340 - 1737) * p.dist(locBul[0], locBul[1], locBul[2], locMat[0], locMat[1], locMat[2]);

		// for Earth's, the bigger tri has Sun's radius as base and
		// Sun-Earth distance + umbra as hypotenuse, the smaller tri has
		// Earth's radius as base and umbra as hypotenuse
		umBumLen = 6371 / (696340 - 6371) * R1 * 149597870.7 / 6371 * 20;

		// no need to draw umbra when focusing to the Moon so the
		// opacity is gradually reduced the more focused the view is
		umColor = p.color(0, 0, 0);
		if (p.abs(posCamHeightCalc.value()) > 60) {
			umColor.setAlpha((3360 - 48 * p.abs(posCamHeightCalc.value())) / 5);
		} else {
			umColor.setAlpha(96);
		}

		// this is for Earth's umbra replacement for focused view
		// the consideration is explained later
		umCircColor = p.color(0, 0, 0);
		if (p.abs(posCamHeightCalc.value()) > 60) {
			umCircColor.setAlpha((48 * p.abs(posCamHeightCalc.value()) - 2880) / 5);
		} else {
			umCircColor.setAlpha(0);
		}

		p.push();
		if (p.abs(posCamHeightCalc.value()) < 70) {

			// the umbra is drawn only if the Sun isn't blocked by Earth
			if (p.abs(MoonToEarth.angleBetween(MoonToSun)) > p.asin(1 / R2 / 60.268511)) {
				p.noStroke();
				p.translate(locBul[0], locBul[1], locBul[2]);
				p.rotateY(p.atan2(SunToMoon.x, SunToMoon.z) + p.PI / 2);
				p.rotateZ(p.asin(SunToMoon.y / SunToMoon.mag()));
				p.rotateZ(p.PI / 2);
				p.translate(0, umBulLen / 2, 0);
				p.fill(umColor);
				p.cone(1737 / 6371 * 20, umBulLen, 40, 1);
			}
		}
		p.pop();

		// p5.js' primitives are surfaces; the dark, transparent
		// space happens only at the surface
		// meanwhile, umbra's dark region fills the space, not just
		// the surface
		// letting the umbra drawn as cone surface, lunar eclipse can't
		// be visualized well since there'll no Moon darkening in the
		// umbra when viewed from near the cone's height axis
		// as workaround, the umbral cone is replaced with circle whose
		// radius is the same as the umbra at the simulated distance
		// the distance is set a bit nearer than Moon, just shy 1.2
		// Moon's radius shorter than the Moon-Earth distance
		if (p.abs(posCamHeightCalc.value()) > 60) {
			p.push();
			p.noStroke();
			p.fill(umCircColor);

			// putting the umbral circle at the specified distance
			// the referred coords are Sun's negatives, but scaled
			// to reach near the Moon-Earth distance
			p.translate(
				- locMat[0] * (R2 * 60.268511 * 6371 - 1.2 * 1737) / (R1 * 149597870.7),
				- locMat[1] * (R2 * 60.268511 * 6371 - 1.2 * 1737) / (R1 * 149597870.7),
				- locMat[2] * (R2 * 60.268511 * 6371 - 1.2 * 1737) / (R1 * 149597870.7)
			);

			// these two rots make sure the umbral cone always face away
			// from the Sun, in both latitude and longitude
			p.rotateY(Lamb1 + p.PI / 2);
			p.rotateX(Bet1);
			p.circle(0, 0, 2 * 20 * (5 * umBumLen - 5 * R2 * 60.268511 * 20 + 6 * 1737 / 6371 * 20) / 5 / umBumLen);
			p.pop();
		}

		// the dafult umbra, will disappear gradually in focused view
		// to be replaced with umbral circle
		p.push();
		p.noStroke();
		if (p.abs(posCamHeightCalc.value()) < 70) {
			p.rotateY(Lamb1);
			p.rotateZ(p.PI / 2 - Bet1);
			p.translate(0, umBumLen / 2, 0);
			p.fill(umColor);
			p.cone(20, umBumLen, 40, 1);
		}
		p.pop();
	};

	// the second main feature :)
	p.drawPenumbra = function() {

		// for Moon's, the bigger tri has Sun's radius as base and
		// Sun-Moon distance - penumbra as hypotenuse, the smaller tri has
		// Moon's radius as base and penumbra as hypotenuse
		penBulLen = 1737 / (696340 + 1737) * p.dist(locBul[0], locBul[1], locBul[2], locMat[0], locMat[1], locMat[2]);

		// for Earth's, the bigger tri has Sun's radius as base and
		// Sun-Earth distance - penumbra as hypotenuse, the smaller tri has
		// Earth's radius as base and penumbra as hypotenuse
		penBumLen = 6371 / (696340 + 6371) * R1 * 149597870.7 / 6371 * 20;

		// as with umbra, the opacity is reduced for focused view
		// the base opacity is less than umbra's since penumbra is
		// brighter than umbra
		penColor = p.color(0, 0, 0);
		if (p.abs(posCamHeightCalc.value()) > 60) {
			penColor.setAlpha((1680 - 24 * p.abs(posCamHeightCalc.value())) / 5);
		} else {
			penColor.setAlpha(48);
		}

		penCircColor = p.color(0, 0, 0);
		if (p.abs(posCamHeightCalc.value()) > 60) {
			penCircColor.setAlpha((24 * p.abs(posCamHeightCalc.value()) - 1440) / 5);
		} else {
			penCircColor.setAlpha(0);
		}

		// here goes for the Moon
		p.push();
		p.noStroke();
		if (p.abs(posCamHeightCalc.value()) < 70) {

			// the umbra is drawn only if the Sun isn't blocked by Earth
			if (p.abs(MoonToEarth.angleBetween(MoonToSun)) > p.asin(1 / R2 / 60.268511)) {
				p.translate(locBul[0], locBul[1], locBul[2]);

				// making sure the penumbra always faces away from the Sun
				p.rotateY(p.atan2(SunToMoon.x, SunToMoon.z) - p.PI / 2);
				p.rotateZ(p.asin(SunToMoon.y / SunToMoon.mag()));
				p.rotateZ(p.PI / 2);
				p.translate(0, - R2 * 60.268511 * 20 / 2, 0);
				p.fill(penColor);

				p.truncatedCone(

					// the excess 0.2 is to make the penumbra's base a bit
					// larger than umbra's for better visual, without such
					// the rendering will produce undesired blank regions
					1737 / 6371 * 20 + 0.2,

					// the larger radius is from, again, similar triangle
					// analysis, the height of the penumbral truncated cone
					// is set to be the same as Moon-Earth distance
					1737 / 6371 * 20 * (penBulLen + R2 * 60.268511 * 20) / penBulLen,
					R2 * 60.268511 * 20,
					20
				);
			}
		}
		p.pop();

		// this one is for Earth, replacement for penumbral
		// truncated cone for focused view
		// the distance is set a bit nearer than Moon, just shy 1.3
		// Moon's radius shorter than the Moon-Earth distance
		if (p.abs(posCamHeightCalc.value()) > 60) {
			p.push();
			p.noStroke();
			p.fill(penCircColor);
			p.translate(
				- locMat[0] * (R2 * 60.268511 * 6371 - 1.3 * 1737) / (R1 * 149597870.7),
				- locMat[1] * (R2 * 60.268511 * 6371 - 1.3 * 1737) / (R1 * 149597870.7),
				- locMat[2] * (R2 * 60.268511 * 6371 - 1.3 * 1737) / (R1 * 149597870.7)
			);
			p.rotateY(Lamb1 + p.PI / 2);
			p.rotateX(Bet1);
			p.circle(0, 0, 2 * 20 * (10 * penBumLen + 10 * R2 * 60.268511 * 20 - 13 * 1737 / 6371 * 20) / 10 / penBumLen);
			p.pop();
		}

		// the default penumbral truncated cone
		p.push();
		p.noStroke();
		if (p.abs(posCamHeightCalc.value()) < 70) {
			p.rotateY(Lamb1 + p.PI);
			p.rotateZ(p.PI / 2 + Bet1);
			p.translate(0, - penBumLen / 2, 0);
			p.fill(penColor);
			p.truncatedCone(20.2, 2 * 20, penBumLen, 20);
		}
		p.pop();
	};

	// placement of date, month, and year
	p.dispTanggal = function() {
		isiTanggal = document.getElementById('tanggal');
		isiTanggal.textContent = gregRes[2] + ' ' + gregRes[1] + ' ' + gregRes[0];
	};

	// placement of hour and minute
	p.dispJam = function() {
		isiJam = document.getElementById('jam');
		isiJam.textContent = 'pukul ' + leadZero(gregRes[3], 2) + ':' + leadZero(gregRes[4], 2) + ' GMT';
	};

	p.draw = function() {
		p.background('#d79922');
		p.angleMode(p.RADIANS);

		// the ephemeris formulas use JD2000.0
		days = saat - 2451545;

		// the Julian century
		t = days / 36525;

		// the Moon's orbit, somehow the position function must
		// be called here, before calling it to draw the Moon
		p.push();
		p.noFill();
		p.stroke(0, 0, 255);
		p.strokeWeight(1);
		p.beginShape();
		for (var i = 0; i < 27.2; i = i + 0.5) {
			orbBul = p.posBul(t - i / 36525);
			p.vertex(

				// each segment is placed at the Moon-Earth distance
				// plus Moon radius
				orbBul[0] * (60.268511 + 1) / 60.268511,
				orbBul[1] * (60.268511 + 1) / 60.268511,
				orbBul[2] * (60.268511 + 1) / 60.268511
			);
		}
		p.endShape(p.CLOSE);
		p.pop();

		// ready to be plotted in the drawing
		locMat = p.posMat(t);
		locBul = p.posBul(t);

		// turning off horizontal viewing angle in focused view
		if (p.abs(posCamHeightCalc.value()) > 60) {
			posViewCalc.style('visibility', 'hidden');
		} else {posViewCalc.style('visibility', 'visible');}

		// for the most of it, the vertical slider sets the cam's
		// y-coord, while its (x, z) are set with the horizontal
		// slider, so basically, the cam moves on a cylindrical
		// surface while keeping its sight to (0, 0, 0) while
		// maintaining that negative-y axis is always up
		// the radius of the cylinder is 200 and its height is 120,
		// comprising 60 up and 60 down
		if (p.abs(posCamHeightCalc.value()) <= 60) {
			p.camera(
				200 * p.cos(posViewCalc.value()),
				posCamHeightCalc.value(),
				200 * p.sin(posViewCalc.value()),
				0, 0, 0,
				0, 1, 0
			);

		// but the end parts of the slider set the focused view
		// the (x, z) changes gradually to be (0, 0) at the very end
		// meanwhile, the y-coord changes gradually from +-60 to +-21
		// the sight direction changes too, gradually from (0, 0, 0) to
		// the Moon's coords
		// the result is that wherever users set the view to initially,
		// they'll be guided until Moon gets to the center of view
		} else {
			p.camera(
				(- p.abs(posCamHeightCalc.value()) + 70) * 20 * p.cos(posViewCalc.value()),
				(Math.sign(posCamHeightCalc.value()) * 5940 - 79 * posCamHeightCalc.value()) / 20,
				(- p.abs(posCamHeightCalc.value()) + 70) * 20 * p.sin(posViewCalc.value()),
				(p.abs(posCamHeightCalc.value()) - 60) * locBul[0] / 10,
				(p.abs(posCamHeightCalc.value()) - 60) * locBul[1] / 10,
				(p.abs(posCamHeightCalc.value()) - 60) * locBul[2] / 10,
				0, 1, 0
			);
		}

		// the inital, whole view spans 36 deg, too large to focus
		// the Moon, hence along with the gradual focused view, the FOV
		// decreases to mere 2 deg, filling the view with the Moon
		if (p.abs(posCamHeightCalc.value()) <= 60) {
			p.perspective(
				p.PI / 5,
				1,
				160 / p.tan(p.PI / 6) / 100,
				160 / p.tan(p.PI / 6) * 1800
			);
		} else {
			p.perspective(
				- p.PI / 900 * (p.abs(17 * posCamHeightCalc.value()) - 1200),
				1,
				160 / p.tan(p.PI / 6) / 100,
				160 / p.tan(p.PI / 6) * 1800
			);
		}

		// vectors are very useful to adjust directions
		MoonToSun = p.createVector(
			locMat[0] - locBul[0],
			locMat[1] - locBul[1],
			locMat[2] - locBul[2]
		);
		MoonToEarth = p.createVector(- locBul[0], - locBul[1], - locBul[2]);
		SunToMoon = p.createVector(
			locBul[0] - locMat[0],
			locBul[1] - locMat[1],
			locBul[2] - locMat[2]
		);
		SunToEarth = p.createVector(- locMat[0], - locMat[1], - locMat[2]);
		EarthToSun = p.createVector(locMat[0], locMat[1], locMat[2]);
		EarthToMoon = p.createVector(locBul[0], locBul[1], locBul[2]);

		// must be in such sequence, else the transparency won't be
		// sorted properly, that's one of the drawbacks of WebGL
		p.drawEarth();
		p.drawMoon();
		p.drawSun();

		p.drawUmbra();
		p.drawPenumbra();

		p.jd2greg();
		p.dispTanggal();
		p.dispJam();

	};

	// penumbra's shape is truncated cone, the smaller radius
	// is at the object, and the bigger one is at any distance we want
	p.truncatedCone = function(r, R, h, n) {
		p.beginShape(p.TRIANGLE_STRIP);
		for (var i = 0; i < n + 1; i++) {
			p.vertex(r * p.cos(2 * p.PI / n * i), h / 2, r * p.sin(2 * p.PI / n * i));
			p.vertex(R * p.cos(2 * p.PI / n * i), - h / 2, R * p.sin(2 * p.PI / n * i));
		}
		p.endShape();
	};

	// the actions of time increment
	p.min1menit = function() {
		saat = saat - 1 / 60 / 24;
	};

	p.plu1menit = function() {
		saat = saat + 1 / 60 / 24;
	};

	p.min10menit = function() {
		saat = saat - 10 / 60 / 24;
	};

	p.plu10menit = function() {
		saat = saat + 10 / 60 / 24;
	};

	p.min1jam = function() {
		saat = saat - 1 / 24;
	};

	p.plu1jam = function() {
		saat = saat + 1 / 24;
	};

	p.min6jam = function() {
		saat = saat - 6 / 24;
	};

	p.plu6jam = function() {
		saat = saat + 6 / 24;
	};

	p.min1hari = function() {
		saat = saat - 1;
	};

	p.plu1hari = function() {
		saat = saat + 1;
	};

	p.min10hari = function() {
		saat = saat - 10;
	};

	p.plu10hari = function() {
		saat = saat + 10;
	};

	p.min30hari = function() {
		saat = saat - 30;
	};

	p.plu30hari = function() {
		saat = saat + 30;
	};

	p.min100hari = function() {
		saat = saat - 100;
	};

	p.plu100hari = function() {
		saat = saat + 100;
	};

	p.mousePressed = function() {
		if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > - 150 && p.mouseY < 315) {
			p.frameRate(20);
		}
	};

	p.mouseReleased = function() {
		p.frameRate(5);
	};

	// for visual purpose, the displayed unit hour, minute,
	// and second will be preceded by zero, as usually seen
	// I forgot where i got the code from
	// the b is the digits displayed, 2 in this case of clock value
	function leadZero(a, b) {
		if (a >= 0) {
			let c = Math.floor(a);
			let d = a - c;
			c = c.toString();
			while (c.length < b) c = "0" + c;
			if (d != 0) {
				d = Math.round(d * Math.pow(10, b)) / Math.pow(10, b);
				d = d.toString();
				c = c + d.substr(1, d.length - 1);
			}
			return c;
		} else {
			a = Math.abs(a);
			let c = Math.floor(a);
			let d = a - c;
			c = c.toString();
			while (c.length < b) c = "0" + c;
			if (d != 0) {
				d = Math.round(d * Math.pow(10, b)) / Math.pow(10, b);
				d = d.toString();
				c = c + d.substr(1, d.length - 1);
			}
			c = "-" + c;
			return c;
		}
	}

	// retrieving closer integer closer to zero
	p.ipart = function(x) {
		var a;

		if (x > 0) {
			a = Math.floor(x);
		} else {
			a = Math.ceil(x);
		}

		return a;
	};

	// making sure the resulted angle is min 0 deg and max 360 deg
	p.range = function(x) {
		var a, b;

		b = x / 360;
		a = 360 * (b - p.ipart(b));

		if (a < 0) {
			a = a + 360;
		}

		return a;
	};

	// Julian day to Gregorian or Julian calendar
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

		// '... f2nd' as ending indicates inclusion of fraction
		// the displayed time stops at minute
		hourf2nd = f2nd * 24;
		hour2nd = Math.floor(hourf2nd);
		minutef2nd = (hourf2nd - hour2nd) * 60;
		minute2nd = Math.round(minutef2nd);

		if (minute2nd == 60) {
			hour2nd = hour2nd + 1;
			minute2nd = 0;
		}

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

		// converting month2nd from number to name
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

		gregRes = [year2nd, namaMonth2nd, day2nd, hour2nd, minute2nd];
		return gregRes;
	};
};

let sketEclipse = new p5(Eclipse, 'CalcEclipse');
