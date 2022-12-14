/* Copyright (C) 2022 Alma Nuradnan Pramudita (email: gocodealpha@gmail.com)

This file is part of SimAstroPosisi.

SimAstroPosisi is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

SimAstroPosisi is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with SimAstroPosisi. If not, see <https://www.gnu.org/licenses/>. */

let Horizon = function(p) {
	let lebarCanvas = 320;
	let pad = 10;
	let elHeight = 15;
	let lebarShadow = 17;

	let lat, long, alph, delt, y, m, mo, d, da, h, mi, s, a, b;
	let jdLoc, jdGMT, diffh, Tsid, lstGMT, lstLoc, lati, ha, delta, posisi, n;
	let altList, azList, latPath, haPath, altPath, azPath;
  let altListEqu, azListEqu, altPathEqu, azPathEqu;
	let img1a, img1b, img2, shade, latar;
	let LatoReg, LatoBold;
	let i, pathList, pathListEqu, az, alt, bujur, namaBulan, outputAltAz;

	p.setup = function() {

		// setting up the canvas size
		p.createCanvas(lebarCanvas, 14 * elHeight + 16 * pad + 2 * (lebarCanvas - 7 * pad) + pad + 2 * elHeight);

		// reducing the load on the system
		p.frameRate(5);

		// drawing the sliders
		// there are spatial and temporal variables
		lat = p.createSlider(-90, 90, 37, 1);
		long = p.createSlider(-180, 180, 97, 1);
		alph = p.createSlider(0, 24, 10, 0.2);
		delt = p.createSlider(-90, 90, 15, 1);
		m = p.createSlider(1, 12, 3, 1);
		d = p.createSlider(1, 31, 20, 1);
		h = p.createSlider(0, 23, 16, 1);
		mi = p.createSlider(0, 59, 37, 1);
		s = p.createSlider(0, 59, 0, 1);

		// the position of the sliders
		lat.position(200, 1 * pad);
		long.position(200, 2 * pad + 1 * elHeight);
		alph.position(200, 3 * pad + 2 * elHeight);
		delt.position(200, 4 * pad + 3 * elHeight);
		m.position(200, 5 * pad + 4 * elHeight);
		d.position(200, 6 * pad + 5 * elHeight);
		h.position(200, 9 * pad + 6 * elHeight + (lebarCanvas - 7 * pad) + pad + 2 * elHeight);
		mi.position(200, 10 * pad + 7 * elHeight + (lebarCanvas - 7 * pad) + pad + 2 * elHeight);
		s.position(200, 11 * pad + 8 * elHeight + (lebarCanvas - 7 * pad) + pad + 2 * elHeight);

		// the size of the sliders
		lat.size(100, elHeight);
		long.size(100, elHeight);
		alph.size(100, elHeight);
		delt.size(100, elHeight);
		m.size(100, elHeight);
		d.size(100, elHeight);
		h.size(100, elHeight);
		mi.size(100, elHeight);
		s.size(100, elHeight);
	};

	p.preload = function() {

		// horizon, shadow, and background images
		// somehow without raster background, transparent raster image is not rendered well
// 		img1a = p.loadImage('../aset/web-celestial-coords-landscape-top-down.png');
// 		img1b = p.loadImage('../aset/web-celestial-coords-landscape-top-down-kutub.png');
// 		img2 = p.loadImage('../aset/web-celestial-coords-landscape-side.png');
// 		shade = p.loadImage('../aset/web-celestial-coords-obj-shadow.png');
// 		latar = p.loadImage('../aset/latar.png');
		img1a = p.loadImage('https://anuradnanp.github.io/simastroposisi/aset/web-celestial-coords-landscape-top-down.png');
		img1b = p.loadImage('https://anuradnanp.github.io/simastroposisi/aset/web-celestial-coords-landscape-top-down-kutub.png');
		img2 = p.loadImage('https://anuradnanp.github.io/simastroposisi/aset/web-celestial-coords-landscape-side.png');
		shade = p.loadImage('https://anuradnanp.github.io/simastroposisi/aset/web-celestial-coords-obj-shadow.png');
		latar = p.loadImage('https://anuradnanp.github.io/simastroposisi/aset/latar.png');
// 		img1a = p.loadImage('file:///android_asset/aset/web-celestial-coords-landscape-top-down.png');
// 		img1b = p.loadImage('file:///android_asset/aset/web-celestial-coords-landscape-top-down-kutub.png');
// 		img2 = p.loadImage('file:///android_asset/aset/web-celestial-coords-landscape-side.png');
// 		shade = p.loadImage('file:///android_asset/aset/web-celestial-coords-obj-shadow.png');
// 		latar = p.loadImage('file:///android_asset/aset/latar.png');

		// the fonts
// 		LatoReg = p.loadFont('../aset/Lato-Regular.ttf');
// 		LatoBold = p.loadFont('../aset/Lato-Bold.ttf');
		LatoReg = p.loadFont('https://anuradnanp.github.io/simastroposisi/aset/Lato-Regular.ttf');
		LatoBold = p.loadFont('https://anuradnanp.github.io/simastroposisi/aset/Lato-Bold.ttf');
// 		LatoReg = p.loadFont('file:///android_asset/aset/Lato-Regular.ttf');
// 		LatoBold = p.loadFont('file:///android_asset/aset/Lato-Bold.ttf');
	};

	// drawing the background
	p.latarWarna = function() {
		p.image(latar, 0, 0, lebarCanvas, 1000);
	};

	// drawing the two view of horizons in a go
	p.horizon = function() {

		// drawing the top-down horizon
		p.image(
			img1a,
			7 * pad / 2,
			8 * pad + 6 * elHeight + 0.5 * pad + elHeight,
			lebarCanvas - 7 * pad,
			lebarCanvas - 7 * pad
		);

		// drawing the side-view horizon
		p.image(
			img2,
			7 * pad / 2,
			5 * pad + 9 * elHeight + lebarCanvas + pad + 2 * elHeight,
			lebarCanvas - 7 * pad, (lebarCanvas - 7 * pad) / 2
		);

		p.noFill();
	};

	// the horizon for both poles
	// I'm so proud of this tiny feature, lol
	p.horizonKutub = function() {

		// drawing the top-down horizon
		p.image(
			img1b,
			7 * pad / 2,
			8 * pad + 6 * elHeight + 0.5 * pad + elHeight,
			lebarCanvas - 7 * pad,
			lebarCanvas - 7 * pad
		);

		// drawing the side-view horizon
		p.image(
			img2,
			7 * pad / 2,
			5 * pad + 9 * elHeight + lebarCanvas + pad + 2 * elHeight,
			lebarCanvas - 7 * pad, (lebarCanvas - 7 * pad) / 2
		);

		p.noFill();
	};

	// plotting the celestial equator and the object's path for the date
	p.obj = function() {
		p.noStroke();

		// plotting the equatorial circle for top-down horizon
		// it is based on the produced list of (altitude, azimuth)
		// the simulated circle will be displayed as ellipse depending on the (alt, az)
		// the way the horizon is oriented in the calc necessitates the initial minus at
		// the beginning of the x component formula, i.e. azimuth of 180 deg will be at positive x
		for (i = 0; i < pathListEqu[0].length; i++) {

			// theoretically, this part is unnecessary, but p5.js somehow
			// doesn't always draw the celestial equator in one of the poles
			// I forgot the exact situation, but this part ensures that
			// celestial equator will always be drawn
			if (Math.abs(lat.value()) == 90) {
				p.fill('#ff0000');
				p.circle(

					// the first term of (lebarCanvas / 2) is the centering in x direction
					// the first term of (8 * pad + 6 * elHeight + 0.5 * pad + elHeight + (lebarCanvas - 7 * pad) / 2) is the centering in y direction
					// relative to the simulated horizon, the simulated circle will have maximum diameter of (lebarCanvas - 7 * pad)
					lebarCanvas / 2 - (lebarCanvas - 7 * pad) / 2 * Math.cos(pathListEqu[1][i] * Math.PI / 180) * Math.cos(pathListEqu[0][i] * Math.PI / 180),
					8 * pad + 6 * elHeight + 0.5 * pad + elHeight + (lebarCanvas - 7 * pad) / 2 - (lebarCanvas - 7 * pad) / 2 * Math.sin(pathListEqu[1][i] * Math.PI / 180) * Math.cos(pathListEqu[0][i] * Math.PI / 180),
					3
				);
				p.noFill();

			// and here is the general case for drawing the celestial equator
			// the very first control ensures that the drawn arc is the one
			// above the horizon, the one under won't be displayed
			} else if (pathListEqu[0][i] > 0) {
				p.fill('#ff0000');
				p.circle(
					lebarCanvas / 2 - (lebarCanvas - 7 * pad) / 2 * Math.cos(pathListEqu[1][i] * Math.PI / 180) * Math.cos(pathListEqu[0][i] * Math.PI / 180),
					8 * pad + 6 * elHeight + 0.5 * pad + elHeight + (lebarCanvas - 7 * pad) / 2 - (lebarCanvas - 7 * pad) / 2 * Math.sin(pathListEqu[1][i] * Math.PI / 180) * Math.cos(pathListEqu[0][i] * Math.PI / 180),
					3
				);
				p.noFill();
			}
		}

		// drawing the object's path viewed from the poles
		// I forgot the how and why, but the case of poles require
		// special treatment since p5.js did something unexpected
		for (i = 0; i < pathList[0].length; i++) {

			// this part is basically the same as celestial equator arc, lol
			if (delt.value() == 0 && Math.abs(lat.value()) == 90) {
				p.fill('#0000ff');
				p.circle(
					lebarCanvas / 2 - (lebarCanvas - 7 * pad) / 2 * Math.cos(pathList[1][i] * Math.PI / 180) * Math.cos(pathList[0][i] * Math.PI / 180),
					8 * pad + 6 * elHeight + 0.5 * pad + elHeight + (lebarCanvas - 7 * pad) / 2 - (lebarCanvas - 7 * pad) / 2 * Math.sin(pathList[1][i] * Math.PI / 180) * Math.cos(pathList[0][i] * Math.PI / 180),
					3
				);
				p.noFill();

			// the generic case, drawing only the arc above the horizon
			} else if (pathList[0][i] > 0) {
				p.fill('#0000ff');
				p.circle(
					lebarCanvas / 2 - (lebarCanvas - 7 * pad) / 2 * Math.cos(pathList[1][i] * Math.PI / 180) * Math.cos(pathList[0][i] * Math.PI / 180),
					8 * pad + 6 * elHeight + 0.5 * pad + elHeight + (lebarCanvas - 7 * pad) / 2 - (lebarCanvas - 7 * pad) / 2 * Math.sin(pathList[1][i] * Math.PI / 180) * Math.cos(pathList[0][i] * Math.PI / 180),
					3
				);
				p.noFill();
			}
		}

		// plotting path for side-view horizon
		// the data plotted is the same as the previous horizon scheme,
		// but different displaying criteria are used this time
		for (i = 0; i < pathListEqu[0].length; i++) {

			// the 180-limiting-value is used to reduce the load of plotting,
			// drawing only those points representing azimuth more than 180 deg
			// the 23, 24, 25, 26, 27-excluding-values are picked to not
			// block the direction label at the bottom-center of the simulated horizon
			// i forgot why the following first criteria is imposed upon pathList
			// instead of pathListEqu and imposing it upon pathListEqu
			// won't display the celestial equator
			if (pathList[1][i] > 180 && i != 23 && i != 24 && i != 25 && i != 26 && i != 27) {

				// setting the color by altitude criteria or latitude at poles
				if (pathListEqu[0][i] >= 0 || Math.abs(lat.value()) == 90) {
					p.fill('#ff0000');
				} else {p.fill('#ffffff');}
				p.circle(

					// the first term of (lebarCanvas / 2) is the centering in x direction
					// the first term of (12 * pad + 9 * elHeight + 3 / 2 * (lebarCanvas - 7 * pad)) is the centering in y direction
					// relative to the simulated horizon, the simulated path will have maximum length of (lebarCanvas - 7 * pad)
					lebarCanvas / 2 - (lebarCanvas - 7 * pad) / 2 * Math.cos(pathListEqu[1][i] * Math.PI / 180) * Math.cos(pathListEqu[0][i] * Math.PI / 180),
					12 * pad + 9 * elHeight + 3 / 2 * (lebarCanvas - 7 * pad) - (lebarCanvas - 7 * pad) / 2 * Math.sin(pathListEqu[0][i] * Math.PI / 180) + pad + 2 * elHeight,
					3
				);
				p.noFill();
			}
		}

		// plotting the path's object
		for (i = 0; i < pathList[0].length; i++) {

			// drawing only those points representing azimuth more than 180 deg
			if (pathList[1][i] > 180) {

				// setting the color by altitude criteria or (latitude at poles + 0 deg declination)
				// the specific criteria on (latitude at pole + 0 deg declination) is necessary
				// for the same reason as celestial equator seen at both poles, the case of
				// which I forgot the how and why, sorry, made them long time ago
				if (pathList[0][i] >= 0 || (delt.value() == 0 && Math.abs(lat.value()) == 90)) {
					p.fill('#0000ff');
				} else {p.fill('#ffffff');}
				p.circle(

				// the first term of (lebarCanvas / 2) is the centering in x direction
				// the first term of (12 * pad + 9 * elHeight + 3 / 2 * (lebarCanvas - 7 * pad)) is the centering in y direction
				// relative to the simulated horizon, the simulated path will have maximum length of (lebarCanvas - 7 * pad)
					lebarCanvas / 2 - (lebarCanvas - 7 * pad) / 2 * Math.cos(pathList[1][i] * Math.PI / 180) * Math.cos(pathList[0][i] * Math.PI / 180),
					12 * pad + 9 * elHeight + 3 / 2 * (lebarCanvas - 7 * pad) - (lebarCanvas - 7 * pad) / 2 * Math.sin(pathList[0][i] * Math.PI / 180) + pad + 2 * elHeight,
					3
				);
				p.noFill();
			}
		}

		// as usual, cases of (poles + 0 deg declination) need specific call of criteria
		if (alt >= 0 || (delt.value() == 0 && Math.abs(lat.value()) == 90)) {
			p.fill('#ffff00');
		} else {p.fill('#ffffff');}

		// drawing the object marker for top-down horizon
		// much simpler with no loop since only a single coord need to be plotted
		p.circle(

			// the first term of (lebarCanvas / 2) is the centering in x direction
			// the first term of (8 * pad + 6 * elHeight + (lebarCanvas - 7 * pad) / 2 + 0.5 * pad + elHeight) is the centering in y direction
			// relative to the simulated horizon, the simulated path will have maximum length of (lebarCanvas - 7 * pad)
			lebarCanvas / 2 - (lebarCanvas - 7 * pad) / 2 * Math.cos(az * Math.PI / 180) * Math.cos(alt * Math.PI / 180),
			8 * pad + 6 * elHeight + (lebarCanvas - 7 * pad) / 2 + 0.5 * pad + elHeight - (lebarCanvas - 7 * pad) / 2 * Math.sin(az * Math.PI / 180) * Math.cos(alt * Math.PI / 180),
			10
		);

		// drawing the object marker for side-view horizon
		p.circle(

			// the first term of (lebarCanvas / 2) is the centering in x direction
			// the first term of (12 * pad + 9 * elHeight + 3 / 2 * (lebarCanvas - 7 * pad) + pad + 2 * elHeight) is the centering in y direction
			// relative to the simulated horizon, the simulated path will have maximum length of (lebarCanvas - 7 * pad)
			lebarCanvas / 2 - (lebarCanvas - 7 * pad) / 2 * Math.cos(az * Math.PI / 180) * Math.cos(alt * Math.PI / 180),
			12 * pad + 9 * elHeight + 3 / 2 * (lebarCanvas - 7 * pad) + pad + 2 * elHeight - (lebarCanvas - 7 * pad) / 2 * Math.sin(alt * Math.PI / 180),
			10
		);

		p.noFill();
	};

	// drawing shadows to the objects for better contrast
	p.shadow = function() {
		p.image(
			shade,

			// the following first two basically repeat the center of the object
			// but reduced half of the shadow image's size since the image's position
			// is calculated with its top-left as reference
			lebarCanvas / 2 - (lebarCanvas - 7 * pad) / 2 * Math.cos(az * Math.PI / 180) * Math.cos(alt * Math.PI / 180) - lebarShadow / 2,
			8 * pad + 6 * elHeight + (lebarCanvas - 7 * pad) / 2 + 0.5 * pad + elHeight - (lebarCanvas - 7 * pad) / 2 * Math.sin(az * Math.PI / 180) * Math.cos(alt * Math.PI / 180) - lebarShadow / 2,
			lebarShadow,
			lebarShadow
		);

		p.image(
			shade,

			// again, repeating the center of the object with slight shift
			lebarCanvas / 2 - (lebarCanvas - 7 * pad) / 2 * Math.cos(az * Math.PI / 180) * Math.cos(alt * Math.PI / 180) - lebarShadow / 2,
			12 * pad + 9 * elHeight + 3 / 2 * (lebarCanvas - 7 * pad) + pad + 2 * elHeight - (lebarCanvas - 7 * pad) / 2 * Math.sin(alt * Math.PI / 180) - lebarShadow / 2,
			lebarShadow,
			lebarShadow
		);
	};

	// here goes the first power engine
	// calculating the altitude and azimuth for given location and date
	p.objPos = function() {

		// the referred year is 2021, any shift in equinox date is ignored for simplicity
		// calculating the Julian day for the date and location
		// the algorithm is based on Meeus
		y = 2021;
		da = d.value() + h.value() / 24 + mi.value() / 1440 + s.value() / 86400;
		if (m.value() <= 2) {
			y = y - 1;
			mo = m.value() + 12;
		} else {
			mo = m.value();
		}

		a = Math.floor(y / 100);
		b = 2 - a + Math.floor(a / 4);
		jdLoc = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (mo + 1)) + da + b - 1524.5;

		// shifting the Julian day to get Greenwich's Julian day, considering only the time zone for reference
		// filtering the case of zero longitude, otherwise division by zero will return error
		if (long.value() != 0) {

			// for any location east of Greenwich, jdGMT is less than local Julian day
			// rounding to zero number after decimal is adequate since time zones are centered
			// on longitudes multiply of 15 deg
			jdGMT = jdLoc - Math.abs(long.value()) / long.value() * (Math.abs(long.value()) / 15).round(0) / 24;
		} else {
			jdGMT = jdLoc;
		}

		// jd 2459293.90069 is 2021 March 20 09:37, one of the equinoxes of 2021
		// diffh is the difference of local and Greenwich Julian day in hours
		diffh = (jdGMT - 2459293.90069) * 24;

		// Tsid is the length of a sidereal day
		Tsid = 23 + 56 / 60 + 4.091 / 3600;

		// 21.4952 is the lst at the march equinox at Greenwich
		lstGMT = (24 / Tsid * diffh + 21.4952) % 24;

		// lstLoc shifts the lst at Greenwich to the specified location's lst
		// the shift doesn't round the calculated value because there is no time zone for lst
		lstLoc = (lstGMT + long.value() / 15) % 24;

		// defining the workaround for polar latitudes
		// somehow, the following calculation breaks down for both poles
		// i'm guessing it's from how javascript handles float for zero value
		if (Math.abs(lat.value()) == 90) {
			lati = Math.abs(lat.value()) / lat.value() * 89.9999 * Math.PI / 180;
		} else {
			lati = lat.value() * Math.PI / 180;
		}

		// calculating some angles and setting them in radians
		// hour angle is always LST minus right ascension
		ha = ((lstLoc - alph.value()) % 24) * Math.PI / 12;
		delta = delt.value() * Math.PI / 180;

		// converting equatorial to horizon coords
		alt = 180 / Math.PI * Math.asin(Math.sin(delta) * Math.sin(lati) + Math.cos(delta) * Math.cos(lati) * Math.cos(ha));
		az = 180 / Math.PI * Math.atan2(-Math.sin(ha) * Math.cos(delta) / Math.cos(alt * Math.PI / 180), (Math.sin(delta) - Math.sin(lati) * Math.sin(alt * Math.PI / 180)) / Math.cos(lati) / Math.cos(alt * Math.PI / 180));

		// negative azimuth works fine, but corrected simply to abide to convention
		if (az < 0) {
			az = az + 360;
		}

		posisi = [alt, az];
		return posisi;
	};

	// here goes the second power engine
	// listing all of the the positions for the asked date
	// that means involving all hour angles
	p.pathArray = function() {

		// n is the number of division for the complete cycle to label the hour angle
		n = 100;
		altList = [];
		azList = [];
		pathList = [];

		// workaround for polar latitudes
		if (Math.abs(lat.value()) == 90) {
			latPath = Math.abs(lat.value()) / lat.value() * 89.9999;
		} else {
			latPath = lat.value();
		}

		// calculating and appending the positions to the corresponding arrays
		for (i = 0; i < n; i++) {

			// the used ha range is 0-24 h, not -12-12 h, for simplicity
			haPath = i * 24 / n;

			// it's basically the good old equatorial-to-horizon formula, but listing all
			// values for the whole daily cycle
			altPath = 180 / Math.PI * Math.asin(Math.sin(delt.value() * Math.PI / 180) * Math.sin(latPath * Math.PI / 180) + Math.cos(delt.value() * Math.PI / 180) * Math.cos(latPath * Math.PI / 180) * Math.cos(haPath * Math.PI / 12));
			azPath = 180 / Math.PI * Math.atan2(-Math.sin(haPath * Math.PI / 12) * Math.cos(delt.value() * Math.PI / 180) / Math.cos(altPath * Math.PI / 180), (Math.sin(delt.value() * Math.PI / 180) - Math.sin(latPath * Math.PI / 180) * Math.sin(altPath * Math.PI / 180)) / Math.cos(latPath * Math.PI / 180) / Math.cos(altPath * Math.PI / 180));

			if (azPath < 0) {
				azPath = azPath + 360;
			}

			altList.push(altPath);
			azList.push(azPath);
		}

		pathList.push(altList);
		pathList.push(azList);
		return pathList;
	};

	// just like the previous function, but for the celestial equator
	p.pathArrayEqu = function() {
		n = 100;
		altListEqu = [];
		azListEqu = [];
		pathListEqu = [];

		// workaround for polar latitudes
		if (Math.abs(lat.value()) == 90) {
			latPath = Math.abs(lat.value()) / lat.value() * 89.9999;
		} else {
			latPath = lat.value();
		}

		// calculating and appending the positions to the corresponding arrays
		for (i = 0; i < n; i++) {
			haPath = i * 24 / n;
			altPathEqu = 180 / Math.PI * Math.asin(Math.sin(0) * Math.sin(latPath * Math.PI / 180) + Math.cos(0) * Math.cos(latPath * Math.PI / 180) * Math.cos(haPath * Math.PI / 12));
			azPathEqu = 180 / Math.PI * Math.atan2(-Math.sin(haPath * Math.PI / 12) * Math.cos(0) / Math.cos(altPathEqu * Math.PI / 180), (Math.sin(0) - Math.sin(latPath * Math.PI / 180) * Math.sin(altPathEqu * Math.PI / 180)) / Math.cos(latPath * Math.PI / 180) / Math.cos(altPathEqu * Math.PI / 180));

			if (azPathEqu < 0) {
				azPath = azPathEqu + 360;
			}

			altListEqu.push(altPathEqu);
			azListEqu.push(azPathEqu);
		}

		pathListEqu.push(altListEqu);
		pathListEqu.push(azListEqu);
		return pathListEqu;
	};

	// preserving the system load, using high framerate
	// only for interation by users
	p.mousePressed = function() {
		if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
			p.frameRate(20);
		}
	};

	p.mouseReleased = function() {
		p.frameRate(5);
	};

	// it's action time, assembling together all drawings and calcs
	p.draw = function() {
		p.background('#ffffff');
		p.angleMode(p.RADIANS);
		p.latarWarna();

		p.objPos();
		alt = posisi[0];
		az = posisi[1];

		// drawing the ground or horizon
		if (Math.abs(lat.value()) == 90) {
			p.horizonKutub();
		} else {
			p.horizon();
		}

		// drawing some label for the sliders
		p.fill('#000000');
		p.textFont(LatoReg);
		p.textAlign(p.LEFT, p.CENTER);
		p.textSize(14);

		p.text('lintang lokasi', pad, pad, 150, elHeight);
		p.text('bujur lokasi', pad, 2 * pad + elHeight, 150, elHeight);
		p.text('asensiorekta objek', pad, 3 * pad + 2 * elHeight, 150, elHeight);
		p.text('deklinasi objek', pad, 4 * pad + 3 * elHeight, 150, elHeight);
		p.text('bulan', pad, 5 * pad + 4 * elHeight, 150, elHeight);
		p.text('tanggal', pad, 6 * pad + 5 * elHeight, 150, elHeight);

		// the hour, minute, and second are put in the mid, separated
		// reduce the load of focus experienced by users
		p.text('jam', pad, 9 * pad + 6 * elHeight + (lebarCanvas - 7 * pad) + pad + 2 * elHeight, 150, elHeight);
		p.text('menit', pad, 10 * pad + 7 * elHeight + (lebarCanvas - 7 * pad) + pad + 2 * elHeight, 150, elHeight);
		p.text('detik', pad, 11 * pad + 8 * elHeight + (lebarCanvas - 7 * pad) + pad + 2 * elHeight, 150, elHeight);

		// naming the months
		switch (m.value()) {
			case 1:
				namaBulan = 'Januari';
				break;
			case 2:
				namaBulan = 'Februari';
				break;
			case 3:
				namaBulan = 'Maret';
				break;
			case 4:
				namaBulan = 'April';
				break;
			case 5:
				namaBulan = 'Mei';
				break;
			case 6:
				namaBulan = 'Juni';
				break;
			case 7:
				namaBulan = 'Juli';
				break;
			case 8:
				namaBulan = 'Agustus';
				break;
			case 9:
				namaBulan = 'September';
				break;
			case 10:
				namaBulan = 'Oktober';
				break;
			case 11:
				namaBulan = 'November';
				break;
			case 12:
				namaBulan = 'Desember';
		}

		// displaying the specified values
		p.text(': ' + lat.value() + '°', 130, pad, 150, elHeight);
		p.text(': ' + long.value() + '°', 130, 2 * pad + elHeight, 150, elHeight);
		p.text(': ' + alph.value() + 'h', 130, 3 * pad + 2 * elHeight, 150, elHeight);
		p.text(': ' + delt.value() + '°', 130, 4 * pad + 3 * elHeight, 150, elHeight);
		p.text(': ' + namaBulan, 80, 5 * pad + 4 * elHeight, 150, elHeight);
		p.text(': ' + d.value(), 80, 6 * pad + 5 * elHeight, 150, elHeight);
		p.text(': ' + h.value(), 80, 9 * pad + 6 * elHeight + (lebarCanvas - 7 * pad) + pad + 2 * elHeight, 150, elHeight);
		p.text(': ' + mi.value(), 80, 10 * pad + 7 * elHeight + (lebarCanvas - 7 * pad) + pad + 2 * elHeight, 150, elHeight);
		p.text(': ' + s.value(), 80, 11 * pad + 8 * elHeight + (lebarCanvas - 7 * pad) + pad + 2 * elHeight, 150, elHeight);

		// setting the content of direction markers in the images
		let arahKiri = 'U';
		let arahKanan = 'S';
		let arahAtas = 'T';
		let arahBawah = 'B';

		// correcting the direction markers in the cases of polar latitudes
		// I love this feature, lol
		if (lat.value() == 90) {
			arahKiri = 'S';
			arahAtas = 'S';
			arahBawah = 'S';
		} else if (lat.value() == -90) {
			arahKanan = 'U';
			arahAtas = 'U';
			arahBawah = 'U';
		}

		// drawing the direction labels
		p.fill('#ffffff');
		p.stroke('#000000');
		p.textSize(18);
		p.textFont(LatoBold);

		p.textAlign(p.CENTER, p.TOP);
		p.text(arahAtas, lebarCanvas / 2, 6 * elHeight + 7 * pad);
		p.text(arahBawah, lebarCanvas / 2, 6 * elHeight + 9 * pad + (lebarCanvas - 7 * pad) + 18 / 14 * elHeight);

		p.textAlign(p.CENTER, p.CENTER);
		p.text(arahBawah, lebarCanvas / 2, 12 * pad + 9 * elHeight + 3 / 2 * (lebarCanvas - 7 * pad) + pad + 2 * elHeight);

		p.textAlign(p.RIGHT, p.CENTER);
		p.text(arahKiri, 2.5 * pad, 8 * pad + 6 * elHeight + (lebarCanvas - 7 * pad) / 2 + 0.5 * pad + elHeight);
		p.text(arahKiri, 2.5 * pad, 12 * pad + 9 * elHeight + 3 / 2 * (lebarCanvas - 7 * pad) + pad + 2 * elHeight);

		p.textAlign(p.LEFT, p.CENTER);
		p.text(arahKanan, (lebarCanvas - 7 * pad) + 4.5 * pad, 8 * pad + 6 * elHeight + (lebarCanvas - 7 * pad) / 2 + 0.5 * pad + elHeight);
		p.text(arahKanan, (lebarCanvas - 7 * pad) + 4.5 * pad, 12 * pad + 9 * elHeight + 3 / 2 * (lebarCanvas - 7 * pad) + pad + 2 * elHeight);

		// drawing all elements
		p.noFill();
		p.shadow();
		p.pathArray();
		p.pathArrayEqu();
		p.obj();

		// filtering the outputs, disabling longitude and azimuth in the cases of polar latitudes
		if (Math.abs(lat.value()) == 90) {
			outputAltAz = '---' + '\n' + 'ketinggian ' + alt.round(1) + '°';
			bujur = '---';
		} else {
			outputAltAz = 'azimut ' + az.round(1) + '°' + '\n' + 'ketinggian ' + alt.round(1) + '°';
			bujur = long.value();
		}

		// confirming the specified values
		p.fill('#000000');
		p.noStroke();
		p.textFont(LatoBold);
		p.textAlign(p.RIGHT, p.TOP);
		p.textSize(10);
		p.text(
			'lokasi: lintang ' + lat.value() + '°' + ', bujur ' + bujur + '°' + '\n' +
			'objek: asensiorekta ' + alph.value() + 'h' + ', deklinasi ' + delt.value() + '°' + '\n' +
			d.value() + ' ' + namaBulan + ' ' + ' pukul ' + leadZero(h.value(), 2) + ':' + leadZero(mi.value(), 2) + ':' + leadZero(s.value(), 2),
			pad,
			2 * lebarCanvas + 9 * elHeight - pad + pad + 2 * elHeight,
			lebarCanvas - 2 * pad,
			11 / 14 * 3 * elHeight
		);

		// displaying the altitude and azimuth
		p.textSize(20);
		p.text(
			outputAltAz,
			pad,
			2 * lebarCanvas + 9 * elHeight - pad / 2 + 11 / 14 * 3 * elHeight + pad + 2 * elHeight,
			lebarCanvas - 2 * pad,
			21 / 14 * 2 * elHeight
		);
	};

	// I forgot where i got the code from
	// the b is the digits displayed, 2 in the case of clock value
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

	// rounding any number to specified decimal places
	// big thanks to Lavamantis' answer in StackOverflow
	Number.prototype.round = function(places) {
		if (Math.abs(this) < Math.pow(10, -places)) {
			return +(Math.round(0 + "e+" + places) + "e-" + places);
		} else {
			return +(Math.round(this + "e+" + places) + "e-" + places);
		}
	};
};

let sketHorizon = new p5(Horizon, 'CalcHorizon');
