/* Copyright (C) 2022 Alma Nuradnan Pramudita (email: gocodealpha@gmail.com)

This file is part of SimAstroPosisi.

SimAstroPosisi is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

SimAstroPosisi is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with SimAstroPosisi. If not, see <https://www.gnu.org/licenses/>. */

let MoonPhase = function(p) {
	let pad = 10;
	let elHeight = 14;
	let LatoReg, LatoBold;
  let dayNight, worldWrap, MoonWrap, kanvas;
  let posBulLabel, posBul, posMatLabel, posMat;
  let posNodeLabel, posNode, posView, posCamHeight;
  let xBul, zBul, locBul, locMat, BulUmbraLength;
  let SunMoon, SunEarth, elong, BumUmbraLength, EarthSun;
  let EarthMoon, tahap, fase;

	p.preload = function() {

		// the fonts
		LatoReg = p.loadFont('../aset/Lato-Regular.ttf');
		LatoBold = p.loadFont('../aset/Lato-Bold.ttf');
// 		LatoReg = p.loadFont('https://anuradnanp.github.io/astroposisi/aset/Lato-Regular.ttf');
// 		LatoBold = p.loadFont('https://anuradnanp.github.io/astroposisi/aset/Lato-Bold.ttf');
// 		LatoReg = p.loadFont('file:///android_asset/aset/Lato-Regular.ttf');
// 		LatoBold = p.loadFont('file:///android_asset/aset/Lato-Bold.ttf'); 

		// the texture materials, providing surfaces and night shade
		dayNight = p.loadImage('../aset/day-night.png');
		worldWrap = p.loadImage('../aset/world-wrap.png');
		MoonWrap = p.loadImage('../aset/moon-wrap.png');
// 		dayNight = p.loadImage('https://anuradnanp.github.io/astroposisi/aset/day-night.png');
// 		worldWrap = p.loadImage('https://anuradnanp.github.io/astroposisi/aset/world-wrap.png');
// 		MoonWrap = p.loadImage('https://anuradnanp.github.io/astroposisi/aset/moon-wrap.png');
// 		dayNight = p.loadImage('file:///android_asset/aset/day-night.png');
// 		worldWrap = p.loadImage('file:///android_asset/aset/world-wrap.png');
// 		MoonWrap = p.loadImage('file:///android_asset/aset/moon-wrap.png'); 
	};

	p.setup = function() {
		p.setAttributes('antialias', true);

		// first time having offset canvas
		kanvas = p.createCanvas(320, 320, p.WEBGL);
		kanvas.position(0, 180);
		kanvas.style('border-radius', '0');

		// alternating drawing of labels and sliders
		// the stylings need to be declared explicitly
		// to override those provided by bootstrap's css
		posBulLabel = p.createP('posisi Bulan terhadap Bumi');
		posBulLabel.style('font-family', 'Lato-Regular');
		posBulLabel.style('font-size', '14px');
		posBulLabel.style('font-weight', 'normal');
		posBulLabel.position(pad, pad);

		posBul = p.createSlider(0, 2 * p.PI, 2 * p.PI * 14 / 60, 2 * p.PI / 60);
		posBul.size(260, elHeight);
		posBul.position(pad, 2 * pad + elHeight);

		posMatLabel = p.createP('posisi Matahari dari Bumi');
		posMatLabel.style('font-family', 'Lato-Regular');
		posMatLabel.style('font-size', '14px');
		posMatLabel.style('font-weight', 'normal');
		posMatLabel.position(pad, 3 * pad + 2 * elHeight);

		posMat = p.createSlider(0, 2 * p.PI, 2 * p.PI * 14 / 60, 2 * p.PI / 60);
		posMat.size(260, elHeight);
		posMat.position(pad, 4 * pad + 3 * elHeight);

		posNodeLabel = p.createP('arah bidang orbit Bulan');
		posNodeLabel.style('font-family', 'Lato-Regular');
		posNodeLabel.style('font-size', '14px');
		posNodeLabel.style('font-weight', 'normal');
		posNodeLabel.position(pad, 5 * pad + 4 * elHeight);

		posNode = p.createSlider(0, 2 * p.PI, 2 * p.PI * 14 / 60, 2 * p.PI / 60);
		posNode.size(260, elHeight);
		posNode.position(pad, 6 * pad + 5 * elHeight);

		posView = p.createSlider(0, 2 * p.PI, 2 * p.PI * 14 / 60, 2 * p.PI / 60);
		posView.size(260, elHeight);
		posView.position(35, 465);

		posCamHeight = p.createSlider(-70, 60, -60, 1);
		posCamHeight.size(250, elHeight);
		posCamHeight.position(180, 330);
		posCamHeight.style('transform', 'rotate(90deg)');

		p.frameRate(20);
	};

	p.drawMoon = function() {

		// the sphere to display the moon's surface
		// the 1st rotateZ is to ensure the moon's face's orientation to
		// the ecliptic doesn't change under the 2nd rotateZ
		// the 1st rotateY is to ensure the proper side faces the earth
		// the translation is to put the moon to the specified position
		// on orbit without tilt, only x and z coords will vary
		// the last rotateZ is to put the moon on the proper, tilted orbit,
		// the final x, y, z coords are automatically determined
		// the last rotateY is to precess the moon's orbital axis
		// the moon's linear size is not to scale, it's only 3/4 of
		// earth's, lol, to enable clear apparition from vantage point
		// far from earth's surface
		p.push();
		p.texture(MoonWrap);
		p.noStroke();
		p.rotateY(- posNode.value());
		p.rotateZ(- 20 * p.PI / 180);
		p.translate(
			240 * p.cos(posBul.value()),
			0,
			240 * p.sin(posBul.value())
		);
		p.rotateY(- posBul.value() + p.PI / 2);
		p.rotateZ(20 * p.PI / 180);
		p.sphere(9.5);
		p.pop();

		// the sphere to display the moon's night side
		// the orienting work differs from the moon's surface since the
		// reference is the sun's direction, not moon's position
		// further complication arises since moon's orbital axis can change,
		// specified by user with slider
		// the first rotateY is to orient the night side with proper correlation
		// to the sun's direction and moon's orbital plane's orientation
		// later, the night side sphere must be put onto the tilted orbit
		// using rotation, the sphere won't keep its supposed parallel
		// orientation to the ecliptic, i've tried several sequences of rotateZ
		// and rotateY with various parameters to no avail
		// i resorted to not using any rotateZ, at all
		// the positioning on the tilted orbit is handled by manual rotation
		// formula, the on-ecliptic (x, 0, z) will be on-tilted (x', y', z),
		// implemented as translation operation
		p.push();
		p.noStroke();
		p.rotateY(- posNode.value());
		p.translate(
			240 * p.cos(posBul.value()) * p.cos(- 20 * p.PI / 180),
			240 * p.cos(posBul.value()) * p.sin(- 20 * p.PI / 180),
			240 * p.sin(posBul.value())
		);
		p.rotateY(- posMat.value() + posNode.value());
		p.texture(dayNight);
		p.sphere(10);
		p.pop();

		xBul = 240 * p.cos(posBul.value()) * p.cos(- 20 * p.PI / 180);
		zBul = 240 * p.sin(posBul.value());

		return locBul = [
			xBul * p.cos(posNode.value()) - zBul * p.sin(posNode.value()),
			240 * p.cos(posBul.value()) * p.sin(- 20 * p.PI / 180),
			xBul * p.sin(posNode.value()) + zBul * p.cos(posNode.value())
		];
	};

	p.drawEarth = function() {

		// the sphere to display the earth's surface
		// the rotateY is to simulate rotation
		// the rotateZ is to tilt the rotation axis
		// the line is drawn to visualize the rotation axis
		p.push();
		p.strokeWeight(1);
		p.noFill();
		p.rotateZ(23.44 * p.PI / 180);
		p.stroke('#ff0000');
		p.line(0, 20, 0, 0, 30, 0);
		p.line(0, - 20, 0, 0, - 30, 0);
		p.push();
		p.rotateX(p.PI / 2);
		p.circle(0, 0, 39);
		p.pop();
		p.rotateY(p.millis() / 1000);
		p.texture(worldWrap);
		p.noStroke();
		p.sphere(19.5);
		p.pop();

		// the sphere to display the earth's night side
		// the rotateY correlates to the specified sun's direction
		p.push();
		p.rotateY(- posMat.value());
		p.texture(dayNight);
		p.noStroke();
		p.sphere(20);
		p.pop();
	};

	p.drawSun = function() {

		// the sphere to simulate sun, not to scale, emphasizing
		// its position, but still much larger and further than
		// the sphere simulating the moon
		p.push();
		p.noStroke();
		p.fill('#ffff00');

		// the distance was set to be 50 times further than
		//the simulated moon, instead of the to-scale ~400 times,
		// to conserve performance since enabling rendering more
		// distant object requires more computing power
		p.translate(
			- 24000 * p.cos(posMat.value()), 0, - 24000 * p.sin(posMat.value())
		);

		// the size was set to ensures sun's angular size
		// equals moon's as seen from earth's position
		// sacrificing accuracy in favor of clarity of concept,
		// i discarded the to-scale 1 : 400 in size and distance,
		// opting for 1 : 60 in size and distance
		// seen from the cam's position, though, the angular size
		// of sun and moon won't be the same
		p.sphere(1000);
		p.pop();

		return locMat = [
			- 24000 * p.cos(posMat.value()), 0, - 24000 * p.sin(posMat.value())
		];
	};

	// here is the theme of the sim, drawing of umbra of moon and earth
	p.umbra = function() {

		// the divisor was based on two similar right tringle
		// the smaller triangle's base is the moon's radius
		// the bigger triangle's base is the sun's radius
		// the hypotenuses are the umbra's length and (umbra's length
		// + moon-sun distance)
		// sun's simulated radius was already set as 100 times of moon's
		BulUmbraLength = p.dist(
			locBul[0], locBul[1], locBul[2],
			locMat[0], locMat[1], locMat[2]
		) / 99;

		// moon's umbra will be drawn only in two situations
		// first, the max elongation is 90 deg
		// second, if the elongation is more than 90 deg, the angular
		// separation of earth-moon is greater than the angular size of earth
		if ((p.abs(SunMoon.angleBetween(SunEarth)) > p.asin(20 / 24000) && elong > p.PI / 2) || elong <= p.PI / 2) {
			p.push();
			p.noStroke();
			p.fill('#00000044');
			p.translate(locBul[0], locBul[1], locBul[2]);

			// the rotateY is to orient the umbra away from the sun
			p.rotateY(- posMat.value() + p.PI);
			p.rotateZ(p.PI / 2);

			// the translation is required since p5.js' cone is
			// always created with midheigth at (0, 0, 0)
			p.translate(0, BulUmbraLength / 2, 0);
			p.cone(10, BulUmbraLength, 24, 1, false);
			p.pop();
		}

		// proceed to earth's umbra
		// much simpler since the umbra will always be drawn
		BumUmbraLength = 24000 / 49;

		p.push();
		p.noStroke();
		p.fill('#00000044');
		p.rotateY(- posMat.value() + p.PI);
		p.rotateZ(p.PI / 2);
		p.translate(0, 4 * BumUmbraLength / 2, 0);
		p.cone(20, 4 * BumUmbraLength, 24, 1, false);
		p.pop();
	};

	p.draw = function() {
		p.background('#d7eef4');
		p.angleMode(p.RADIANS);

		// this one is for the cam's fixed y, close-up view
		// the cam's (x, z) correlates to the specified viewing point
		if (posCamHeight.value() > - 61) {
			p.camera(
				200 * p.cos(posView.value()),
				posCamHeight.value(),
				200 * p.sin(posView.value()),
				0, 0, 0,
				0, 1, 0
			);

		// and this is for the over-the-plane view
		// the (x, z) change gradually until they reach zero at the
		// highest position, 10 times higher than the close up view
		} else {
			p.camera(
				(20 * posCamHeight.value() + 1400) * p.cos(posView.value()),
				54 * posCamHeight.value() + 3180,
				(20 * posCamHeight.value() + 1400) * p.sin(posView.value()),
				0, 0, 0,
				p.cos(posView.value()), 0, p.sin(posView.value())
			);
		}

		// the last argument limits the furthest object that can be
		// displayed, with greater values enable displaying more distant
		// objects at the cost of greater load on users' devices
		// hence the not-to-scale distance of the simulated sun
		p.perspective(
			p.PI / 3,
			1,
			160 / p.tan(p.PI / 6) / 10,
			160 / p.tan(p.PI / 6) * 90
		);

		// the moon's orbit is assumed to be circular centered on earth
		// the size is not to scale and shrunk since if scaled properly,
		// the moon will be too small in angular size
		// the purpose of the sim is to demonstrate how lunar phase and
		// eclipse work, not how they look from earth's surface
		// the tilt is also exaggerated to make possible moon's linear
		// height not causing eclipse above the ecliptic plane
		p.push();
		p.noFill();
		p.stroke('#0000ff');
		p.strokeWeight(1);
		p.rotateY(- posNode.value());
		p.rotateZ(- 20 * p.PI / 180);
		p.rotateX(p.PI / 2);
		p.circle(0, 0, 480);
		p.pop();

		// a segment of earth's orbit, to emphasize the geocentric
		// perspective of a heliocentric system
		p.push();
		p.noFill();
		p.stroke('#ffff00');
		p.strokeWeight(1);
		p.rotateY(- posMat.value());
		p.line(0, 0, 500, 0, 0, - 500);
		p.pop();

		// the ecliptic plane, to emphasize the moon's orbit's tilt
		p.push();
		p.noFill();
		p.stroke('#00ff00');
		p.strokeWeight(1);
		p.rotateX(p.PI / 2);
		p.circle(0, 0, 480);
		p.pop();

		// drawing the three spheres
		p.drawSun();
		p.drawMoon();
		p.drawEarth();

		// vectors and angle to determine the moon's phases
		// looks like angleBetween behaves a little differently for
		// 2d and 3d vectors
		// to be safe, i forced angleBetween to be always positive with abs
		EarthSun = p.createVector(locMat[0], 0, locMat[2]);
		EarthMoon = p.createVector(locBul[0], 0, locBul[2]);
		elong = p.abs(EarthMoon.angleBetween(EarthSun));
		tahap = EarthSun.cross(EarthMoon);

		// the short phases (new, quarters, full) are set to within
		// + 4 deg from 0 and +- 4 deg from 90, 180 deg of elongation
		// the tahap vector is to differentiate between early and later stage
		// since elong is always positive
		// special allowance is made in the case of new moon, permitting
		// 2 deg before moon conjunction to be categorized as new moon
		// this is to accomodate the precision limitation of the renderer,
		// without such there'll be eclipses labelled as later crescent phase
		if ((elong < 2 * p.PI / 90 && tahap.y > 0) || elong < p.PI / 90) {
			fase = 'Baru';
		} else if (elong < 43 * p.PI / 90) {
			if (tahap.y > 0) {fase = 'Sabit Awal';}
			else {fase = 'Sabit Akhir';}
		} else if (elong < 47 * p.PI / 90) {
			if (tahap.y > 0) {fase = 'Kuartal Pertama';}
			else {fase = 'Kuartal Ketiga';}
		} else if (elong < 88 * p.PI / 90) {
			if (tahap.y > 0) {fase = 'Cembung Awal';}
			else {fase = 'Cembung Akhir';}
		} else {fase = 'Purnama';}

		// the label for the phases is drawn only for close-up view
		p.push();
		p.fill('#000000');
		p.rectMode(p.CENTER);
		p.textFont(LatoBold);
		p.textSize(20);
		p.textAlign(p.CENTER, p.CENTER);
		if (posCamHeight.value() > - 61) {
			p.translate(locBul[0], locBul[1] - 35, locBul[2]);
		} else {
			p.translate(
				(posCamHeight.value() + 80) * locBul[0] / 20,
				(posCamHeight.value() + 80) * locBul[1] / 20 - 35,
				(posCamHeight.value() + 80) * locBul[2] / 20
			);
		}
		p.rotateY(- posView.value() + p.PI / 2);
		if (posCamHeight.value() < - 60) {
			p.rotateX(p.PI / 20 * (60 - posCamHeight.value()));
		}
		p.text(fase, 0, 0);
		p.pop();

		// vectors as references for determining when to draw the umbras
		SunEarth = p.createVector(- locMat[0], - locMat[1], - locMat[2]);
		SunMoon = p.createVector(
			locBul[0] - locMat[0],
			locBul[1] - locMat[1],
			locBul[2] - locMat[2]
		);

		// transparent objects should be drawn last since webgl's sorting
		// makes it as if transparent objects won't let any objects drawn
		// later to be seen through
		p.umbra();
	};
};

let sketMoonPhase = new p5(MoonPhase, 'SimMoonPhase');
