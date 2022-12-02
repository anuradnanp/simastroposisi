/* Copyright (C) 2022 Alma Nuradnan Pramudita (email: gocodealpha@gmail.com)

This file is part of SimAstroPosisi.

SimAstroPosisi is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

SimAstroPosisi is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with SimAstroPosisi. If not, see <https://www.gnu.org/licenses/>. */

let GregJDCombo = function(p) {
	// defining some basic measures as reference further down the script
	let widthCanvas = 320;
	let pad = 10;
	let elHeight = 14;

	let LatoReg, LatoBold;
	let tahun1st, bulan1st, tanggal1st, jam1st, menit1st, detik1st, namabulan1st;
	let jd1st, d1st, m1st, y1st, a1st, b1st;
  let m1stInit, y1stInit;
	let jdInput, jd2nd, gregRes;
	let z2nd, f2nd, a2nd, alpha2nd, b2nd, c2nd, d2nd, e2nd;
	let day2nd, hourf2nd, hour2nd, minutef2nd, minute2nd, month2nd, year2nd, namaMonth2nd, secondf2nd;

	// preloading the font
	p.preload = function() {
// 		LatoReg = p.loadFont('../aset/Lato-Regular.ttf');
// 		LatoBold = p.loadFont('../aset/Lato-Bold.ttf');
		LatoReg = p.loadFont('https://anuradnanp.github.io/simastroposisi/aset/Lato-Regular.ttf');
		LatoBold = p.loadFont('https://anuradnanp.github.io/simastroposisi/aset/Lato-Bold.ttf');
// 		LatoReg = p.loadFont('file:///android_asset/aset/Lato-Regular.ttf');
// 		LatoBold = p.loadFont('file:///android_asset/aset/Lato-Bold.ttf');
	};

	p.setup = function() {
		// setting the canvas' size
		p.createCanvas(widthCanvas, 15 * elHeight + 16 * pad + 35 + 20);

		p.frameRate(5);

		// input for gregorian year
		tahun1st = p.createInput('2021');
		tahun1st.position(70, 45).addClass('leaveAlone');
		tahun1st.size(100, 1.5 * elHeight);
		tahun1st.style('font-family', 'Lato-Regular');
		tahun1st.style('font-size', '14px');

		// input for gregorian month
		bulan1st = p.createSlider(1, 12, 3, 1);
		bulan1st.position(150, 3 * pad + elHeight + 35);
		bulan1st.size(150, elHeight);

		// input for gregorian day
		tanggal1st = p.createSlider(1, 31, 17, 1);
		tanggal1st.position(150, 4 * pad + 2 * elHeight + 35);
		tanggal1st.size(150, elHeight);

		// input for gregorian hour
		jam1st = p.createSlider(0, 23, 7, 1);
		jam1st.position(150, 5 * pad + 3 * elHeight + 35);
		jam1st.size(150, elHeight);

		// input for gregorian minute
		menit1st = p.createSlider(0, 59, 23, 1);
		menit1st.position(150, 6 * pad + 4 * elHeight + 35);
		menit1st.size(150, elHeight);

		// input for gregorian second
		detik1st = p.createSlider(0, 59, 41, 1);
		detik1st.position(150, 7 * pad + 5 * elHeight + 35);
		detik1st.size(150, elHeight);

		// input for julian date
		jdInput = p.createInput('2459396.50694').addClass('leaveAlone');
		jdInput.position(110, 10 * elHeight + 11 * pad + 35 + 20);
		jdInput.size(150, 1.5 * elHeight);
		jdInput.style('font-family', 'Lato-Regular');
		jdInput.style('font-size', '14px');
	};

	// reserving high framerate only for interaction
	p.mousePressed = function() {
		if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
			p.frameRate(20);
		}
	};

	p.mouseReleased = function() {
		p.frameRate(5);
	};

	// for visual purpose, lol, the displayed unit hour, minute,
	// and second will be preceded by zero, as usually seen
	// i forgot where i got the code from
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

	p.draw = function() {
		p.background('#D79922');
		p.noStroke();

		// assigning name to slider's values, also
		// to be displayed so users can check their input
		switch (bulan1st.value()) {
			case 1:
				namabulan1st = 'Januari';
				break;
			case 2:
				namabulan1st = 'Februari';
				break;
			case 3:
				namabulan1st = 'Maret';
				break;
			case 4:
				namabulan1st = 'April';
				break;
			case 5:
				namabulan1st = 'Mei';
				break;
			case 6:
				namabulan1st = 'Juni';
				break;
			case 7:
				namabulan1st = 'Juli';
				break;
			case 8:
				namabulan1st = 'Agustus';
				break;
			case 9:
				namabulan1st = 'September';
				break;
			case 10:
				namabulan1st = 'Oktober';
				break;
			case 11:
				namabulan1st = 'November';
				break;
			case 12:
				namabulan1st = 'Desember';
		}

		// first calculator label
		p.push();
		p.fill('#ffffff');
		p.textFont(LatoBold);
		p.textSize(10);
		p.textAlign(p.RIGHT);
		p.rotate(0);
		p.text('tahun / bulan / tanggal\n' + 'jam : menit : detik', 145, 10);
		p.textSize(14);
		p.textAlign(p.CENTER, p.CENTER);
		p.text('ke', 160, 20);
		p.textSize(18);
		p.textAlign(p.LEFT, p.CENTER);
		p.text('JD', 175, 20);
		p.pop();

		// putting text as information for user
		// users will see their input and the result
		p.fill('#000000');
		p.textFont(LatoReg);
		p.textSize(14);
		p.textAlign(p.RIGHT, p.TOP);
		p.text('tahun', pad, pad + 40, 50, elHeight);
		p.text('bulan', pad, 3 * pad + elHeight + 40, 50, elHeight);
		p.text('tanggal', pad, 4 * pad + 2 * elHeight + 40, 50, elHeight);
		p.text('jam', pad, 5 * pad + 3 * elHeight + 40, 50, elHeight);
		p.text('menit', pad, 6 * pad + 4 * elHeight + 40, 50, elHeight);
		p.text('detik', pad, 7 * pad + 5 * elHeight + 40, 50, elHeight);

		p.textAlign(p.LEFT, p.TOP);
		p.text(': ' + namabulan1st, 60, 3 * pad + elHeight + 40, 85, elHeight);
		p.text(': ' + tanggal1st.value(), 60, 4 * pad + 2 * elHeight + 40, 85, elHeight);
		p.text(': ' + jam1st.value(), 60, 5 * pad + 3 * elHeight + 40, 85, elHeight);
		p.text(': ' + menit1st.value(), 60, 6 * pad + 4 * elHeight + 40, 85, elHeight);
		p.text(': ' + detik1st.value(), 60, 7 * pad + 5 * elHeight + 40, 85, elHeight);

		// calling the converter, gregorian (or julian) calendar to julian day
		p.greg2jd();

		// putting the conversion result
		p.textFont(LatoBold);
		p.textAlign(p.RIGHT, p.TOP);
		p.textSize(10);
		p.text(tanggal1st.value() + ' ' + namabulan1st + ' ' + tahun1st.value() + ' pukul ' + leadZero(jam1st.value(), 2) + ':' + leadZero(menit1st.value(), 2) + ':' + leadZero(detik1st.value(), 2), pad, 9 * pad + 6 * elHeight + 35, widthCanvas - 2 * pad, 10 / 14 * elHeight);
		p.textSize(20);
		p.text('JD ' + jd1st.round(5), pad, 10 * pad + (6 + 10 / 14) * elHeight + 35, widthCanvas - 2 * pad, 20 / 14 * elHeight);

		// second calculator label
		p.push();
		p.fill('#ffffff');
		p.textFont(LatoBold);
		p.textSize(10);
		p.textAlign(p.LEFT);
		p.rotate(0);
		p.text('tahun / bulan / tanggal\n' + 'jam : menit : detik', 175, 270);
		p.textSize(14);
		p.textAlign(p.CENTER, p.CENTER);
		p.text('ke', 160, 280);
		p.textSize(18);
		p.textAlign(p.RIGHT, p.CENTER);
		p.text('JD', 145, 280);
		p.pop();

		// putting text as information for user
		p.fill('#000000');
		p.textFont(LatoReg);
		p.textSize(14);
		p.textAlign(p.LEFT, p.TOP);
		p.noStroke();
		p.text('tanggal Julian', pad, 10 * elHeight + 11 * pad + 35 + 25, 100, elHeight);

		// calling the converter, julian day to gregorian (or julian) calendar
		p.jd2greg();

		// putting the output of the conversion
		p.textFont(LatoBold);
		p.textAlign(p.RIGHT, p.TOP);
		p.textSize(10);
		p.text('JD ' + jdInput.value(), pad, 13 * pad + 11 * elHeight + 35 + 20, widthCanvas - 2 * pad, 10 / 14 * elHeight);
		p.textSize(20);
		p.text(gregRes[2] + ' ' + gregRes[1] + ' ' + gregRes[0] + '\n' + 'pukul ' + leadZero(gregRes[3], 2) + ':' + leadZero(gregRes[4], 2) + ':' + leadZero(gregRes[5].round(1), 2), pad, 14 * pad + (11 + 10 / 14) * elHeight + 35 + 20, widthCanvas - 2 * pad, 2.5 * 20 / 14 * elHeight);
	};

		// action time, julian day to gregorian or julian calendar
		// the algorithm was based on Meeus
		p.jd2greg = function() {
		jd2nd = parseFloat(jdInput.value()) + 0.5;
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

		// 'f2nd' as ending indicates inclusion of fraction
		// only second is allowed to retain fraction in the final output
		hourf2nd = f2nd * 24;
		hour2nd = Math.floor(hourf2nd);
		minutef2nd = (hourf2nd - hour2nd) * 60;
		minute2nd = Math.floor(minutef2nd);
		secondf2nd = (minutef2nd - minute2nd) * 60;

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

		gregRes = [year2nd, namaMonth2nd, day2nd, hour2nd, minute2nd, secondf2nd];
		return gregRes;
	};

	// rounding any number to specified decimal places
	// big thanks to Lavamantis' answer in StackOverflow
	Number.prototype.round = function(places) {
		if (this < Math.pow(10, -places)) {
			return +(Math.round(0 + "e+" + places) + "e-" + places);
		} else {
			return +(Math.round(this + "e+" + places) + "e-" + places);
		}
	};

	// lol, the steps are much simpler when converting to julian day
	// again, the steps are from Meeus
	p.greg2jd = function() {

		// converting the initial input to number format
		d1st = parseFloat(tanggal1st.value()) + parseFloat(jam1st.value()) / 24 + parseFloat(menit1st.value()) / 1440 + parseFloat(detik1st.value()) / 86400;

		m1stInit = bulan1st.value();
		m1st = m1stInit;

		// converting the year string to number
		y1stInit = parseFloat(tahun1st.value());
		y1st = y1stInit;

		if (m1st <= 2) {
			y1st = y1stInit - 1;
			m1st = m1stInit + 12;
		}

		a1st = Math.floor(y1st / 100);
		b1st = 2 - a1st + Math.floor(a1st / 4.0);

		if (y1stInit < 1582) {
			b1st = 0;
		} else if (y1stInit == 1582 && m1stInit < 10) {
			b1st = 0;
		} else if (y1stInit == 1582 && m1stInit == 10 && d1st < 15) {
			b1st = 0;
		}

		jd1st = Math.floor(365.25 * (y1st + 4716)) + Math.floor(30.6001 * (m1st + 1)) + d1st + b1st - 1524.5;
		return jd1st;
	};
};

let sketGregJDCombo = new p5(GregJDCombo, 'CalcGregJDCombo');
