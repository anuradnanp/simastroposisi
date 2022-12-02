/* Copyright (C) 2022 Alma Nuradnan Pramudita (email: gocodealpha@gmail.com)

This file is part of SimAstroPosisi.

SimAstroPosisi is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

SimAstroPosisi is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with SimAstroPosisi. If not, see <https://www.gnu.org/licenses/>. */

let MercVsSphere = function(p) {

	p.preload = function() {

		// the fonts
		LatoReg = p.loadFont('../aset/Lato-Regular.ttf');
// 		LatoReg = p.loadFont('../aset/Lato-Regular.ttf');
// 		LatoReg = p.loadFont('file:///android_asset/aset/Lato-Regular.ttf');

		// the texture materials, providing surfaces and night shade
		worldWrap = p.loadImage('../aset/world-wrap.png');
		worldWrapTri = p.loadImage('../aset/world-wrap-triple.png');
// 		worldWrap = p.loadImage('https://anuradnanp.github.io/astroposisi/aset/world-wrap.png');
// 		worldWrapTri = p.loadImage('https://anuradnanp.github.io/astroposisi/aset/world-wrap-triple.png');
// 		worldWrap = p.loadImage('file:///android_asset/aset/world-wrap.png');
// 		worldWrapTri = p.loadImage('file:///android_asset/aset/world-wrap-triple.png');
	};

	p.setup = function() {
		merc = p.createCanvas(320, 479);
		merc.position(0, 220);
		merc.style('border-radius', '0');

		bul = p.createGraphics(320, 320, p.WEBGL);
		bul.setAttributes('antialias', true);

		p.createP('lintang posisi A :').style('font-family', 'Lato-Regular').style('font-size', '14px').style('font-weight', 'normal').position(10, 10).style('width', '110px').style('text-align', 'right').style('color', '#ff0000');
		lat1 = p.createSlider(- 90, 90, - 30, 1);
		lat1.size(300, 15).position(10, 30);

		p.createP('bujur posisi A :').style('font-family', 'Lato-Regular').style('font-size', '14px').style('font-weight', 'normal').position(10, 60).style('width', '110px').style('text-align', 'right').style('color', '#ff0000');
		long1 = p.createSlider(- 180, 180, 30, 1);
		long1.size(300, 15).position(10, 80);

		p.createP('lintang posisi B :').style('font-family', 'Lato-Regular').style('font-size', '14px').style('font-weight', 'normal').position(10, 110).style('width', '110px').style('text-align', 'right').style('color', '#0000ff');
		lat2 = p.createSlider(- 90, 90, 45, 1);
		lat2.size(300, 15).position(10, 130);

		p.createP('bujur posisi B :').style('font-family', 'Lato-Regular').style('font-size', '14px').style('font-weight', 'normal').position(10, 160).style('width', '110px').style('text-align', 'right').style('color', '#0000ff');
		long2 = p.createSlider(- 180, 180, - 60, 1);
		long2.size(300, 15).position(10, 180);

		camHor = p.createSlider(0, 2 * p.PI, 3 * p.PI / 4, p.PI / 30);
		camHor.size(280, 15).position(10, 670);

		camVer = p.createSlider(- p.PI / 2 + 0.1, p.PI / 2 - 0.1, p.PI / 4, p.PI / 20);
		camVer.size(280, 15).position(165, 519).style('transform', 'rotate(90deg)');

		p.frameRate(5);

		lat1Val = p.createP('');
		lat1Val.position(130, 10).id('lat1Val').style('font-family', 'Lato-Regular').style('font-size', '14px').style('color', '#ff0000');

		long1Val = p.createP('');
		long1Val.position(130, 60).id('long1Val').style('font-family', 'Lato-Regular').style('font-size', '14px').style('color', '#ff0000');

		lat2Val = p.createP('');
		lat2Val.position(130, 110).id('lat2Val').style('font-family', 'Lato-Regular').style('font-size', '14px').style('color', '#0000ff');

		long2Val = p.createP('');
		long2Val.position(130, 160).id('long2Val').style('font-family', 'Lato-Regular').style('font-size', '14px').style('color', '#0000ff');
	};

	p.dispCoords = function() {
			document.getElementById('lat1Val').textContent = lat1.value() + '\u00b0';
			document.getElementById('long1Val').textContent = long1.value() + '\u00b0';
			document.getElementById('lat2Val').textContent = lat2.value() + '\u00b0';
			document.getElementById('long2Val').textContent = long2.value() + '\u00b0';
	};

	p.draw = function() {
		p.background('#ffffff');
		p.angleMode(p.RADIANS);

		p.dispCoords();

		p.textFont(LatoReg);
		p.textSize(14);
		p.fill('#000000');
		p.noStroke();

		if (p.abs(long1.value() - long2.value()) > 180) {
			long2New = long1.value() + Math.sign(long1.value()) * (360 - p.abs(long1.value() - long2.value()));
		} else {long2New = long2.value();}

		p.push();
		p.image(
			worldWrapTri,
			0, 0,
			320, 159,
			1503 / 3 + (long1.value() + long2New) / 2 / 180 * 1503 / 3 / 2, 0,
			1503 / 3, 250
		);
		p.pop();

		p.push();
		p.fill('#ff0000');
		p.circle(
			(1440 + 4 * (long1.value() - long2New)) / 9,
			(4770 - 53 * lat1.value()) / 60,
			8
		);
		p.fill('#0000ff');
		p.circle(
			(1440 + 4 * (long2New - long1.value())) / 9,
			(4770 - 53 * lat2.value()) / 60,
			8
		);
		p.pop();

		hiA = (90 - lat1.value()) * p.PI / 180;
		hiB = (90 - lat2.value()) * p.PI / 180;
		sepAB = (p.abs(long1.value() - long2New)) * p.PI / 180;
		distAB = p.acos(p.cos(hiA) * p.cos(hiB) + p.sin(hiA) * p.sin(hiB) * p.cos(sepAB));
		dirAToB = p.acos((p.cos(hiB) - p.cos(hiA) * p.cos(distAB)) / p.sin(hiA) / p.sin(distAB));
		dirBToA = p.acos((p.cos(hiA) - p.cos(hiB) * p.cos(distAB)) / p.sin(hiB) / p.sin(distAB));

		for (i = )

			bul.clear();
			bul.background('#ffffff');
			bul.angleMode(p.RADIANS);

			bul.camera(
				250 * p.cos(camHor.value()) * p.cos(camVer.value()),
				- 250 * p.sin(camVer.value()),
				250 * p.sin(camHor.value()) * p.cos(camVer.value()),
				0, 0, 0, 0, 1, 0
			);

			bul.textFont(LatoReg);
			bul.textSize(14);
			bul.noStroke();

			bul.push();
			bul.texture(worldWrap);
			bul.sphere(90);
			bul.pop();

			bul.push();
			bul.noFill();
			bul.stroke('#ff0000');
			bul.strokeWeight(1);
			bul.rotateX(p.PI / 2);
			bul.circle(0, 0, 181);
			bul.pop();

			bul.push();
			bul.fill('#ff0000');
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

			bul.push();
			bul.strokeWeight(1);
			bul.stroke('#ff0000');
			bul.line(-120, 0, 0, 120, 0, 0)
			bul.stroke('#00ff00');
			bul.line(0, -120, 0, 0, 120, 0);
			bul.stroke('#0000ff');
			bul.line(0, 0, -120, 0, 0, 120);
			bul.pop();

		p.image(bul, 0, 159);
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

let SketMercVsSphere = new p5(MercVsSphere, 'SimMercVsSphere');
