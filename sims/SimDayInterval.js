/* Copyright (C) 2022 Alma Nuradnan Pramudita (email: gocodealpha@gmail.com)

This file is part of SimAstroPosisi.

SimAstroPosisi is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

SimAstroPosisi is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with SimAstroPosisi. If not, see <https://www.gnu.org/licenses/>. */

let DayInterval = function(p) {
	// defining some basic measures as reference further down the script
	let canWidth = 320;
	let pad = 8;
	let boxWidth = canWidth - 2 * pad;
	let textBoxHeight = 15;
	let boxHeight = 2 * textBoxHeight + 2 * pad;
	let intervalLineHeight = 20;
	let selang = 11 / 13 * textBoxHeight + pad;

	let LatoReg, LatoBold;
	let color1, color2, color3, color4, color5, color6, color7, color8;
	let intervalColorList, boxYList;
	let x1, x2, x3, x4, x5, x6, x7, x8, y1, y2, y3, y4, y5, y6, y7, y8;
	let jdTexty1, jdTexty2, jdTexty3, jdTexty4, jdTexty5, jdTexty6, jdTexty7;
	let jdList;

	// listing the events + dates + MJDs
	let eventList = [
		['Jerman menginvasi Polandia, mengawali Perang Dunia II. | 1 September 1939 | ', 'JD 24 29 507,5', 29507.5],
		['Pesawat ulang-alik Challenger meledak. | 28 Januari 1986 | ', 'JD 24 46 458,5', 46458.5],
		['Tim Berners-Lee menyiarkan halaman web pertama. | 20 Desember 1990 | ', 'JD 24 48 245,5', 48245.5],
		['Pesawat buatan Indonesia, N250, kali pertama diterbangkan. | 10 Agustus 1995 | ', 'JD 24 49 939,5', 49939.5],
		['Soeharto mundur dari kepresidenan. | 21 Mei 1998 | ', 'JD 24 50 954,5', 50954.5],
		['Tsunami menerjang Aceh dan sekeliling Samudera Hindia. | 26 Desember 2004 | ', 'JD 24 53 365,5', 53365.5],
		['Apple Inc. merilis iPhone. | 9 Januari 2007 | ', 'JD 24 54 109,5', 54109.5],
		['Diumumkan kasus pertama covid-19 di Indonesia. | 2 Maret 2020 | ', 'JD 24 58 910,5', 58910.5]
	];

	// preloading the fonts
	p.preload = function() {
// 		LatoReg = p.loadFont('../aset/Lato-Regular.ttf');
// 		LatoBold = p.loadFont('../aset/Lato-Bold.ttf');
		LatoReg = p.loadFont('https://anuradnanp.github.io/simastroposisi/aset/Lato-Regular.ttf');
		LatoBold = p.loadFont('https://anuradnanp.github.io/simastroposisi/aset/Lato-Bold.ttf');
// 		LatoReg = p.loadFont('file:///android_asset/aset/Lato-Regular.ttf');
// 		LatoBold = p.loadFont('file:///android_asset/aset/Lato-Bold.ttf');
	};

	p.setup = function() {
		p.createCanvas(canWidth, 8 * boxHeight + 19 * pad + 2 * intervalLineHeight + 7.5 * textBoxHeight);

		p.frameRate(5);

		// setting the boxes' initial color
		color1 = '#f2f2f2';
		color2 = '#f2f2f2';
		color3 = '#f2f2f2';
		color4 = '#f2f2f2';
		color5 = '#f2f2f2';
		color6 = '#f2f2f2';
		color7 = '#f2f2f2';
		color8 = '#f2f2f2';

		// colors for each day interval visualization box
		intervalColorList = [
			'#ff4b3c', '#62ee72', '#ff8d4a', '#54a8ed',
			'#efd536', '#9a5aff', '#e286d0'
		];

		// the position of the boxes
		x1 = pad;
		y1 = 2 * pad + intervalLineHeight;
		x2 = pad;
		y2 = 3 * pad + intervalLineHeight + boxHeight + selang;
		x3 = pad;
		y3 = 4 * pad + intervalLineHeight + 2 * boxHeight + 2 * selang;
		x4 = pad;
		y4 = 5 * pad + intervalLineHeight + 3 * boxHeight + 3 * selang;
		x5 = pad;
		y5 = 6 * pad + intervalLineHeight + 4 * boxHeight + 4 * selang;
		x6 = pad;
		y6 = 7 * pad + intervalLineHeight + 5 * boxHeight + 5 * selang;
		x7 = pad;
		y7 = 8 * pad + intervalLineHeight + 6 * boxHeight + 6 * selang;
		x8 = pad;
		y8 = 9 * pad + intervalLineHeight + 7 * boxHeight + 7 * selang;

		// the interval day texts' vertical position
		jdTexty1 = y1 + pad + boxHeight;
		jdTexty2 = y2 + pad + boxHeight;
		jdTexty3 = y3 + pad + boxHeight;
		jdTexty4 = y4 + pad + boxHeight;
		jdTexty5 = y5 + pad + boxHeight;
		jdTexty6 = y6 + pad + boxHeight;
		jdTexty7 = y7 + pad + boxHeight;
	};

	// increasing the framerate to improve users' experience when interacting with the sim
	p.mousePressed = function() {
		if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
			p.frameRate(20);
		}
	};

	// no animation in the sim hence the adequacy of low framerate if no interaction happens
	p.mouseReleased = function() {
		p.frameRate(5);
	};

	p.draw = function() {
		p.background('#ffffff');
		p.noStroke();

		// one by one, putting the boxes onto the canvas
		// the positions and sizes are already adjusted in the setup
		p.fill(color1);
		p.rect(x1, y1, boxWidth, boxHeight);
		p.fill(color2);
		p.rect(x2, y2, boxWidth, boxHeight);
		p.fill(color3);
		p.rect(x3, y3, boxWidth, boxHeight);
		p.fill(color4);
		p.rect(x4, y4, boxWidth, boxHeight);
		p.fill(color5);
		p.rect(x5, y5, boxWidth, boxHeight);
		p.fill(color6);
		p.rect(x6, y6, boxWidth, boxHeight);
		p.fill(color7);
		p.rect(x7, y7, boxWidth, boxHeight);
		p.fill(color8);
		p.rect(x8, y8, boxWidth, boxHeight);

		// laying the texts on top of the boxes
		p.textSize(13);
		p.textAlign(p.LEFT, p.TOP);
		p.textFont(LatoReg);
		p.fill('#000000');
		p.text(
			eventList[0][0] + eventList[0][1],
			x1 + pad,
			y1 + pad,
			boxWidth - 2 * pad,
			2 * textBoxHeight
		);

		p.text(eventList[1][0] + eventList[1][1],
			x2 + pad,
			y2 + pad,
			boxWidth - 2 * pad,
			2 * textBoxHeight
		);

		p.text(eventList[2][0] + eventList[2][1],
			x3 + pad,
			y3 + pad,
			boxWidth - 2 * pad,
			2 * textBoxHeight
		);

		p.text(eventList[3][0] + eventList[3][1],
			x4 + pad,
			y4 + pad,
			boxWidth - 2 * pad,
			2 * textBoxHeight
		);

		p.text(eventList[4][0] + eventList[4][1],
			x5 + pad,
			y5 + pad,
			boxWidth - 2 * pad,
			2 * textBoxHeight
		);

		p.text(eventList[5][0] + eventList[5][1],
			x6 + pad,
			y6 + pad,
			boxWidth - 2 * pad,
			2 * textBoxHeight
		);

		p.text(
			eventList[6][0] + eventList[6][1],
			x7 + pad,
			y7 + pad,
			boxWidth - 2 * pad,
			2 * textBoxHeight
		);

		p.text(
			eventList[7][0] + eventList[7][1],
			x8 + pad,
			y8 + pad,
			boxWidth - 2 * pad,
			2 * textBoxHeight
		);

		p.textSize(10);
		p.textFont(LatoBold);
		p.textAlign(p.CENTER, p.TOP);

		// putting the summary of day interval between two chosen events
		p.fill('#999999');
		p.text(eventList[1][1] + ' - ' + eventList[0][1] + ' | selang ' + (eventList[1][2] - eventList[0][2]) + ' hari',
			pad,
			jdTexty1,
			boxWidth - 2 * pad,
			selang
		);

		p.text(eventList[2][1] + ' - ' + eventList[1][1] + ' | selang ' + (eventList[2][2] - eventList[1][2]) + ' hari',
			pad,
			jdTexty2,
			boxWidth - 2 * pad,
			selang
		);

		p.text(eventList[3][1] + ' - ' + eventList[2][1] + ' | selang ' + (eventList[3][2] - eventList[2][2]) + ' hari',
			pad,
			jdTexty3,
			boxWidth - 2 * pad,
			selang
		);

		p.text(eventList[4][1] + ' - ' + eventList[3][1] + ' | selang ' + (eventList[4][2] - eventList[3][2]) + ' hari',
			pad,
			jdTexty4,
			boxWidth - 2 * pad,
			selang
		);

		p.text(eventList[5][1] + ' - ' + eventList[4][1] + ' | selang ' + (eventList[5][2] - eventList[4][2]) + ' hari',
			pad,
			jdTexty5,
			boxWidth - 2 * pad,
			selang
		);

		p.text(eventList[6][1] + ' - ' + eventList[5][1] + ' | selang ' + (eventList[6][2] - eventList[5][2]) + ' hari',
			pad,
			jdTexty6,
			boxWidth - 2 * pad,
			selang
		);

		p.text(eventList[7][1] + ' - ' + eventList[6][1] + ' | selang ' + (eventList[7][2] - eventList[6][2]) + ' hari',
			pad,
			jdTexty7,
			boxWidth - 2 * pad,
			selang
		);

		// setting the cursor to pointing hand, providing cues of clickable areas
		if ((p.mouseX >= x1 && p.mouseX <= x1 + boxWidth &&
				p.mouseY >= y1 && p.mouseY <= y1 + boxHeight) ||
			(p.mouseX >= x2 && p.mouseX <= x2 + boxWidth &&
				p.mouseY >= y2 && p.mouseY <= y2 + boxHeight) ||
			(p.mouseX >= x3 && p.mouseX <= x3 + boxWidth &&
				p.mouseY >= y3 && p.mouseY <= y3 + boxHeight) ||
			(p.mouseX >= x4 && p.mouseX <= x4 + boxWidth &&
				p.mouseY >= y4 && p.mouseY <= y4 + boxHeight) ||
			(p.mouseX >= x5 && p.mouseX <= x5 + boxWidth &&
				p.mouseY >= y5 && p.mouseY <= y5 + boxHeight) ||
			(p.mouseX >= x6 && p.mouseX <= x6 + boxWidth &&
				p.mouseY >= y6 && p.mouseY <= y6 + boxHeight) ||
			(p.mouseX >= x7 && p.mouseX <= x7 + boxWidth &&
				p.mouseY >= y7 && p.mouseY <= y7 + boxHeight) ||
			(p.mouseX >= x8 && p.mouseX <= x8 + boxWidth &&
				p.mouseY >= y8 && p.mouseY <= y8 + boxHeight)
		) {p.cursor(p.HAND);} else {p.cursor(p.ARROW);}

		// listing and recording the selected jds
		// the jds are stored in jdList
		// the boxYList is used to draw punch holes on each box to draw
		// lines to visualize the color corresponding to the interval
		jdList = [];
		boxYList = [];
		if (color1 == '#5cdb94') {
			jdList.push(eventList[0][2]);
			boxYList.push(y1);
		}
		if (color2 == '#5cdb94') {
			jdList.push(eventList[1][2]);
			boxYList.push(y2);
		}
		if (color3 == '#5cdb94') {
			jdList.push(eventList[2][2]);
			boxYList.push(y3);
		}
		if (color4 == '#5cdb94') {
			jdList.push(eventList[3][2]);
			boxYList.push(y4);
		}
		if (color5 == '#5cdb94') {
			jdList.push(eventList[4][2]);
			boxYList.push(y5);
		}
		if (color6 == '#5cdb94') {
			jdList.push(eventList[5][2]);
			boxYList.push(y6);
		}
		if (color7 == '#5cdb94') {
			jdList.push(eventList[6][2]);
			boxYList.push(y7);
		}
		if (color8 == '#5cdb94') {
			jdList.push(eventList[7][2]);
			boxYList.push(y8);
		}

		for (let i = 0; i < (boxYList.length - 1); i++) {
			p.noStroke();
			p.fill('#ffffff');

			// the punch holes are always made in pair, one for
			// each sides of consecutive boxes
			// here is the left bottom of the earlier event box
			p.circle(2.5 * pad, boxYList[i] + boxHeight - 2, 8);

			// here is the left top of the later event box
			p.circle(2.5 * pad, boxYList[i + 1] + 3, 8);

			// here is the right bottom of the earlier event box
			p.circle(canWidth - 2.5 * pad, boxYList[i] + boxHeight - 2, 8);

			// here is the right top of the later event box
			p.circle(canWidth - 2.5 * pad, boxYList[i + 1] + 3, 8);
			p.noFill();

			// drawing lines with no color as background for
			// the color ones
			p.strokeCap(p.ROUND);
			p.stroke('#ffffff');
			p.strokeWeight(8);
			p.line(2.5 * pad, boxYList[i] + boxHeight - 2, 2.5 * pad, boxYList[i + 1] + 3);
			p.line(canWidth - 2.5 * pad, boxYList[i] + boxHeight - 2, canWidth - 2.5 * pad, boxYList[i + 1] + 3);

			// drawing lines, marking the visualized interval with color
			// the weight is less than the white background lines to
			// provide contrast to the other elements
			p.stroke(intervalColorList[i]);
			p.strokeWeight(4);
			p.line(2.5 * pad, boxYList[i] + boxHeight - 2, 2.5 * pad, boxYList[i + 1] + 3);
			p.line(canWidth - 2.5 * pad, boxYList[i] + boxHeight - 2, canWidth - 2.5 * pad, boxYList[i + 1] + 3);
		}
		p.noStroke();

		// context for the visualization
		p.fill('#999999');
		p.textSize(10);
		p.textFont(LatoBold);
		p.textAlign(p.CENTER, p.CENTER);
		p.text('VISUALISASI PERBANDINGAN SELANG HARI\nKEJADIAN YANG DIPILIH',
			pad, y8 + boxHeight + pad,
			boxWidth, 2 * 10 / 13 * textBoxHeight);

		// putting default visual when the list is not long enough
		if (jdList.length == 0 || jdList.length == 1) {
			p.fill('#bbbbbb');
			p.rect(pad, pad,
				boxWidth, intervalLineHeight);
			p.rect(pad, y8 + boxHeight + 2 * pad + 2 * 10 / 13 * textBoxHeight,
				boxWidth, intervalLineHeight);
		}

		// putting the visual for day intervals
		// the later interval is drawn before the preceding one
		// the visual for earliest interval is always full in width
		// this one goes in the beginning of the sim
		p.fill(intervalColorList[6]);
		p.rect(pad, pad, boxWidth - (p.max(jdList) - jdList[7]) / (p.max(jdList) - p.min(jdList)) * boxWidth, intervalLineHeight);

		p.fill(intervalColorList[5]);
		p.rect(pad, pad, boxWidth - (p.max(jdList) - jdList[6]) / (p.max(jdList) - p.min(jdList)) * boxWidth, intervalLineHeight);

		p.fill(intervalColorList[4]);
		p.rect(pad, pad, boxWidth - (p.max(jdList) - jdList[5]) / (p.max(jdList) - p.min(jdList)) * boxWidth, intervalLineHeight);

		p.fill(intervalColorList[3]);
		p.rect(pad, pad, boxWidth - (p.max(jdList) - jdList[4]) / (p.max(jdList) - p.min(jdList)) * boxWidth, intervalLineHeight);

		p.fill(intervalColorList[2]);
		p.rect(pad, pad, boxWidth - (p.max(jdList) - jdList[3]) / (p.max(jdList) - p.min(jdList)) * boxWidth, intervalLineHeight);

		p.fill(intervalColorList[1]);
		p.rect(pad, pad, boxWidth - (p.max(jdList) - jdList[2]) / (p.max(jdList) - p.min(jdList)) * boxWidth, intervalLineHeight);

		p.fill(intervalColorList[0]);
		p.rect(pad, pad, boxWidth - (p.max(jdList) - jdList[1]) / (p.max(jdList) - p.min(jdList)) * boxWidth, intervalLineHeight);

		// this one goes in the end of the sim
		p.fill(intervalColorList[6]);
		p.rect(pad, y8 + boxHeight + 2 * pad + 2 * 10 / 13 * textBoxHeight, boxWidth - (p.max(jdList) - jdList[7]) / (p.max(jdList) - p.min(jdList)) * boxWidth, intervalLineHeight);

		p.fill(intervalColorList[5]);
		p.rect(pad, y8 + boxHeight + 2 * pad + 2 * 10 / 13 * textBoxHeight, boxWidth - (p.max(jdList) - jdList[6]) / (p.max(jdList) - p.min(jdList)) * boxWidth, intervalLineHeight);

		p.fill(intervalColorList[4]);
		p.rect(pad, y8 + boxHeight + 2 * pad + 2 * 10 / 13 * textBoxHeight, boxWidth - (p.max(jdList) - jdList[5]) / (p.max(jdList) - p.min(jdList)) * boxWidth, intervalLineHeight);

		p.fill(intervalColorList[3]);
		p.rect(pad, y8 + boxHeight + 2 * pad + 2 * 10 / 13 * textBoxHeight, boxWidth - (p.max(jdList) - jdList[4]) / (p.max(jdList) - p.min(jdList)) * boxWidth, intervalLineHeight);

		p.fill(intervalColorList[2]);
		p.rect(pad, y8 + boxHeight + 2 * pad + 2 * 10 / 13 * textBoxHeight, boxWidth - (p.max(jdList) - jdList[3]) / (p.max(jdList) - p.min(jdList)) * boxWidth, intervalLineHeight);

		p.fill(intervalColorList[1]);
		p.rect(pad, y8 + boxHeight + 2 * pad + 2 * 10 / 13 * textBoxHeight, boxWidth - (p.max(jdList) - jdList[2]) / (p.max(jdList) - p.min(jdList)) * boxWidth, intervalLineHeight);

		p.fill(intervalColorList[0]);
		p.rect(pad, y8 + boxHeight + 2 * pad + 2 * 10 / 13 * textBoxHeight, boxWidth - (p.max(jdList) - jdList[1]) / (p.max(jdList) - p.min(jdList)) * boxWidth, intervalLineHeight);
	};

	// listening to the mouse clicking on the event boxes
	p.mouseClicked = function() {

		// switching the color upon clicking
		if (p.mouseX >= x1 && p.mouseX <= x1 + boxWidth &&
			p.mouseY >= y1 && p.mouseY <= y1 + boxHeight) {
			if (color1 == '#f2f2f2') {
				color1 = '#5cdb94';
			} else {
				color1 = '#f2f2f2';
			}
		}

		if (p.mouseX >= x2 && p.mouseX <= x2 + boxWidth &&
			p.mouseY >= y2 && p.mouseY <= y2 + boxHeight) {
			if (color2 == '#f2f2f2') {
				color2 = '#5cdb94';
			} else {
				color2 = '#f2f2f2';
			}
		}

		if (p.mouseX >= x3 && p.mouseX <= x3 + boxWidth &&
			p.mouseY >= y3 && p.mouseY <= y3 + boxHeight) {
			if (color3 == '#f2f2f2') {
				color3 = '#5cdb94';
			} else {
				color3 = '#f2f2f2';
			}
		}

		if (p.mouseX >= x4 && p.mouseX <= x4 + boxWidth &&
			p.mouseY >= y4 && p.mouseY <= y4 + boxHeight) {
			if (color4 == '#f2f2f2') {
				color4 = '#5cdb94';
			} else {
				color4 = '#f2f2f2';
			}
		}

		if (p.mouseX >= x5 && p.mouseX <= x5 + boxWidth &&
			p.mouseY >= y5 && p.mouseY <= y5 + boxHeight) {
			if (color5 == '#f2f2f2') {
				color5 = '#5cdb94';
			} else {
				color5 = '#f2f2f2';
			}
		}

		if (p.mouseX >= x6 && p.mouseX <= x6 + boxWidth &&
			p.mouseY >= y6 && p.mouseY <= y6 + boxHeight) {
			if (color6 == '#f2f2f2') {
				color6 = '#5cdb94';
			} else {
				color6 = '#f2f2f2';
			}
		}

		if (p.mouseX >= x7 && p.mouseX <= x7 + boxWidth &&
			p.mouseY >= y7 && p.mouseY <= y7 + boxHeight) {
			if (color7 == '#f2f2f2') {
				color7 = '#5cdb94';
			} else {
				color7 = '#f2f2f2';
			}
		}

		if (p.mouseX >= x8 && p.mouseX <= x8 + boxWidth &&
			p.mouseY >= y8 && p.mouseY <= y8 + boxHeight) {
			if (color8 == '#f2f2f2') {
				color8 = '#5cdb94';
			} else {
				color8 = '#f2f2f2';
			}
		}
	};
};

let sketDayInterval = new p5(DayInterval, 'SimDayInterval');
