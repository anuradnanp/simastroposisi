/* Copyright (C) 2022 Alma Nuradnan Pramudita (email: gocodealpha@gmail.com)

This file is part of SimAstroPosisi.

SimAstroPosisi is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

SimAstroPosisi is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with SimAstroPosisi. If not, see <https://www.gnu.org/licenses/>. */

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = "";
  questionElement.insertAdjacentHTML('beforeend', '<p class="nomor-soal"><b>soal ' + parseInt(currentQuestionIndex + 1) + ' dari ' + questions.length + '</b></p>');
  questionElement.insertAdjacentHTML('beforeend', question.question);
	shuffle(question.answers);
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn-soal');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Ulangi latihan';
    startButton.classList.remove('hide');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

// taken from stackoverflow.com/questions/2450954/how-to-randomize-shuffle-javascript-array
function shuffle(array) {
	let currentIndex = array.length, randomIndex;

	// while there remain elements to shuffle
	while (currentIndex != 0) {

		// pick a remaining element
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// swap with the current element
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
}

const questions = [

// 1
  {
    question: '<p class="kompetensi">&#x2705; mengetahui urutan dan kisaran durasi fase Bulan</p><p>Urutan yang benar fase Bulan dalam satu siklusnya yaitu …</p>',
    answers:
			[
			{ text: 'baru → sabit → kuartal pertama → cembung → purnama → cembung → kuartal ketiga → sabit → baru', correct: true },
			{ text: 'baru → cembung → kuartal pertama → sabit → purnama → sabit → kuartal ketiga → cembung → baru', correct: false },
			{ text: 'baru → sabit → kuartal pertama → cembung → purnama → sabit → kuartal ketiga → cembung → baru', correct: false },
			{ text: 'baru → cembung → kuartal pertama → sabit → purnama → cembung → kuartal ketiga → sabit → baru', correct: false }
			]
  },

// 2
  {
    question: '<p class="kompetensi">&#x2705; mengetahui urutan dan kisaran durasi fase Bulan</p><p>Urutan yang benar fase Bulan dalam satu siklusnya yaitu …</p>',
    answers:
			[
			{ text: 'kuartal pertama → cembung → purnama → cembung → kuartal ketiga → sabit → baru → sabit → kuartal pertama', correct: true },
			{ text: 'kuartal pertama → sabit → purnama → sabit → kuartal ketiga → cembung → baru → cembung → kuartal pertama', correct: false },
			{ text: 'kuartal pertama → cembung → purnama → sabit → kuartal ketiga → cembung → baru → sabit → kuartal pertama', correct: false },
			{ text: 'kuartal pertama → sabit → purnama → cembung → kuartal ketiga → sabit → baru → cembung → kuartal pertama', correct: false }
			]
  },

// 3
  {
    question: '<p class="kompetensi">&#x2705; mengetahui urutan dan kisaran durasi fase Bulan</p><p class="info-bantu">&#x1f3af; Satu siklus fase Bulan yaitu durasi untuk kembali ke fase yang sama.</p><p>Setengah siklus sejak Bulan sabit yaitu …</p>',
    answers:
			[
			{ text: 'Bulan cembung', correct: true },
			{ text: 'Bulan purnama', correct: false },
			{ text: 'Bulan kuartal', correct: false },
			{ text: 'Bulan baru', correct: false }
			]
  },

// 4
  {
    question: '<p class="kompetensi">&#x2705; mengetahui urutan dan kisaran durasi fase Bulan</p><p class="info-bantu">&#x1f3af; Satu siklus fase Bulan yaitu durasi untuk kembali ke fase yang sama.</p><p>Seperempat siklus sejak Bulan kuartal yaitu …</p>',
    answers:
			[
			{ text: 'Bulan baru atau purnama', correct: true },
			{ text: 'Bulan sabit atau cembung', correct: false },
			{ text: 'selalu Bulan sabit', correct: false },
			{ text: 'selalu bulan purnama', correct: false }
			]
  },

// 5
  {
    question: '<p class="kompetensi">&#x2705; mengetahui urutan dan kisaran durasi fase Bulan</p><p>Durasi dari Bulan kuartal awal ke purnama hampir sama dengan …</p>',
    answers:
			[
			{ text: 'dari Bulan cembung awal ke cembung akhir', correct: true },
			{ text: 'dari Bulan sabit awal ke sabit akhir', correct: false },
			{ text: 'dari Bulan baru ke purnama', correct: false },
			{ text: 'dari Bulan purnama ke sabit akhir', correct: false }
			]
  },

// 6
  {
    question: '<p class="kompetensi">&#x2705; mengetahui urutan dan kisaran durasi fase Bulan</p><p>Durasi dari Bulan purnama ke baru hampir sama dengan …</p>',
    answers:
			[
			{ text: 'dari Bulan sabit awal ke cembung akhir', correct: true },
			{ text: 'dari Bulan sabit awal ke cembung awal', correct: false },
			{ text: 'dari Bulan baru ke kuartal akhir', correct: false },
			{ text: 'dari Bulan purnama ke cembung awal', correct: false }
			]
  },

// 7
  {
    question: '<p class="kompetensi">&#x2705; mengetahui kaitan antara fase dan sudut elongasi Bulan</p><p class="info-bantu">&#x1f3af; Sudut elongasi Bulan yaitu sudut yang dibentuk oleh Bulan, Bumi, dan Matahari.</p><p>Bulan baru terjadi ketika sudut elongasi Bulan …</p>',
    answers:
			[
			{ text: 'hampir 0°', correct: true },
			{ text: 'hampir 90°', correct: false },
			{ text: 'hampir 180°', correct: false },
			{ text: 'antara 0° dan 90°', correct: false }
			]
  },

// 8
  {
    question: '<p class="kompetensi">&#x2705; mengetahui kaitan antara fase dan sudut elongasi Bulan</p><p class="info-bantu">&#x1f3af; Sudut elongasi Bulan yaitu sudut yang dibentuk oleh Bulan, Bumi, dan Matahari.</p><p>Bulan kuartal terjadi ketika sudut elongasi Bulan …</p>',
    answers:
			[
			{ text: 'hampir 90°', correct: true },
			{ text: 'hampir 0°', correct: false },
			{ text: 'hampir 180°', correct: false },
			{ text: 'antara 90° dan 180°', correct: false }
			]
  },

// 9
  {
    question: '<p class="kompetensi">&#x2705; mengetahui kaitan antara fase dan sudut elongasi Bulan</p><p class="info-bantu">&#x1f3af; Sudut elongasi Bulan yaitu sudut yang dibentuk oleh Bulan, Bumi, dan Matahari.</p><p>Bulan sabit terjadi ketika sudut elongasi Bulan …</p>',
    answers:
			[
			{ text: 'antara 0° dan 90°', correct: true },
			{ text: 'hampir 90°', correct: false },
			{ text: 'hampir 0°', correct: false },
			{ text: 'hampir 180°', correct: false }
			]
  },

// 10
  {
    question: '<p class="kompetensi">&#x2705; mengetahui kaitan antara fase dan sudut elongasi Bulan</p><p class="info-bantu">&#x1f3af; Sudut elongasi Bulan yaitu sudut yang dibentuk oleh Bulan, Bumi, dan Matahari.</p><p>Ketika sudut elongasi Bulan antara antara 0° dan 90°, fasenya …</p>',
    answers:
			[
			{ text: 'sabit', correct: true },
			{ text: 'cembung', correct: false },
			{ text: 'kuartal', correct: false },
			{ text: 'purnama', correct: false }
			]
  },

// 11
  {
    question: '<p class="kompetensi">&#x2705; mengetahui kaitan antara fase dan sudut elongasi Bulan</p><p class="info-bantu">&#x1f3af; Sudut elongasi Bulan yaitu sudut yang dibentuk oleh Bulan, Bumi, dan Matahari.</p><p>Ketika sudut elongasi Bulan hampir 180°, fasenya …</p>',
    answers:
			[
			{ text: 'purnama', correct: true },
			{ text: 'sabit', correct: false },
			{ text: 'cembung', correct: false },
			{ text: 'kuartal', correct: false }
			]
  },

// 12
  {
    question: '<p class="kompetensi">&#x2705; mengetahui kaitan antara fase dan sudut elongasi Bulan</p><p class="info-bantu">&#x1f3af; Sudut elongasi Bulan yaitu sudut yang dibentuk oleh Bulan, Bumi, dan Matahari.</p><p>Ketika sudut elongasi Bulan antara 90° dan 180°, fasenya …</p>',
    answers:
			[
			{ text: 'cembung', correct: true },
			{ text: 'sabit', correct: false },
			{ text: 'baru', correct: false },
			{ text: 'purnama', correct: false }
			]
  },

// 13
  {
    question: '<p class="kompetensi">&#x2705; mengetahui fase Bulan untuk tanggal tertentu</p><p>Pada 22 April 2022, terjadi fase Bulan …</p>',
    answers:
			[
			{ text: 'cembung akhir', correct: true },
			{ text: 'sabit awal', correct: false },
			{ text: 'kuartal akhir', correct: false },
			{ text: 'purnama', correct: false }
			]
  },

// 14
  {
    question: '<p class="kompetensi">&#x2705; mengetahui fase Bulan untuk tanggal tertentu</p><p>Pada 1 Oktober 2021, terjadi fase Bulan …</p>',
    answers:
			[
			{ text: 'sabit akhir', correct: true },
			{ text: 'sabit awal', correct: false },
			{ text: 'cembung awal', correct: false },
			{ text: 'cembung akhir', correct: false }
			]
  },

// 15
  {
    question: '<p class="kompetensi">&#x2705; mengetahui fase Bulan untuk tanggal tertentu</p><p>Pada 13 Oktober 2021, terjadi fase Bulan …</p>',
    answers:
			[
			{ text: 'kuartal awal', correct: true },
			{ text: 'kuartal akhir', correct: false },
			{ text: 'purnama', correct: false },
			{ text: 'baru', correct: false }
			]
  },

// 16
  {
    question: '<p class="kompetensi">&#x2705; mengetahui fase Bulan untuk tanggal tertentu</p><p>Pada 24 Mei 2023, terjadi fase Bulan …</p>',
    answers:
			[
			{ text: 'sabit awal', correct: true },
			{ text: 'kuartal akhir', correct: false },
			{ text: 'sabit akhir', correct: false },
			{ text: 'kuartal awal', correct: false }
			]
  },

// 17
  {
    question: '<p class="kompetensi">&#x2705; mengetahui hubungan posisi dan fase Bulan dengan gerhana</p><p>Gerhana terjadi ketika posisi Bulan …</p>',
    answers:
			[
			{ text: 'dekat dengan titik simpul naik-turun', correct: true },
			{ text: 'dekat dengan titik tertinggi di atas ekliptika', correct: false },
			{ text: 'dekat dengan titik terendah di bawah ekliptika', correct: false },
			{ text: 'dekat dengan ekuator langit', correct: false }
			]
  },

// 18
  {
    question: '<p class="kompetensi">&#x2705; mengetahui hubungan posisi dan fase Bulan dengan gerhana</p><p>Gerhana Matahari terjadi saat fase …</p>',
    answers:
			[
			{ text: 'Bulan baru', correct: true },
			{ text: 'Bulan sabit', correct: false },
			{ text: 'Bulan kuartal', correct: false },
			{ text: 'Bulan cembung', correct: false }
			]
  },

// 19
  {
    question: '<p class="kompetensi">&#x2705; mengetahui hubungan posisi dan fase Bulan dengan gerhana</p><p>Gerhana Bulan terjadi saat fase …</p>',
    answers:
			[
			{ text: 'Bulan purnama', correct: true },
			{ text: 'Bulan cembung', correct: false },
			{ text: 'Bulan kuartal', correct: false },
			{ text: 'Bulan sabit', correct: false }
			]
  },

// 20
  {
    question: '<p class="kompetensi">&#x2705; mengetahui hubungan posisi dan fase Bulan dengan gerhana</p><p>Saat fase Bulan purnama dan Bulan pada posisi terendah di bawah ekliptika, …</p>',
    answers:
			[
			{ text: 'tidak akan terjadi gerhana', correct: true },
			{ text: 'akan terjadi gerhana Bulan', correct: false },
			{ text: 'akan terjadi gerhana Matahari', correct: false },
			{ text: 'akan terjadi gerhana Bulan dan Matahari secara bersamaan', correct: false }
			]
  },

// 21
  {
    question: '<p class="kompetensi">&#x2705; mengetahui hubungan posisi dan fase Bulan dengan gerhana</p><p>Pada 14 Desember 2001, terjadi gerhana Matahari di …</p>',
    answers:
			[
			{ text: 'kawasan Pasifik', correct: true },
			{ text: 'kawasan Eropa', correct: false },
			{ text: 'kawasan Asia', correct: false },
			{ text: 'kawasan Afrika', correct: false }
			]
  },

// 22
  {
    question: '<p class="kompetensi">&#x2705; mengetahui hubungan posisi dan fase Bulan dengan gerhana</p><p>Pada 4 Desember 2021, terjadi gerhana Matahari di …</p>',
    answers:
			[
			{ text: 'kawasan Antartika', correct: true },
			{ text: 'kawasan Eropa', correct: false },
			{ text: 'kawasan Pasifik', correct: false },
			{ text: 'kawasan Afrika', correct: false }
			]
  },

// 23
  {
    question: '<p class="kompetensi">&#x2705; mengetahui hubungan posisi dan fase Bulan dengan gerhana</p><p>Pada 15 Juni 2011, puncak gerhana Bulan terjadi di …</p>',
    answers:
			[
			{ text: 'kawasan Afrika, Asia, dan Australia', correct: true },
			{ text: 'kawasan Amerika, Afrika, dan Eropa Barat', correct: false },
			{ text: 'kawasan Pasifik dan Amerika', correct: false },
			{ text: 'kawasan Pasifik, Australia, Siberia, dan Asia', correct: false }
			]
  },

// 24
  {
    question: '<p class="kompetensi">&#x2705; mengetahui hubungan posisi dan fase Bulan dengan gerhana</p><p>Pada 7 September 2025, puncak gerhana Bulan terjadi di …</p>',
    answers:
			[
			{ text: 'kawasan Afrika, Asia, dan Australia', correct: true },
			{ text: 'kawasan Amerika, Afrika, dan Eropa Barat', correct: false },
			{ text: 'kawasan Pasifik dan Amerika', correct: false },
			{ text: 'kawasan Pasifik, Australia, Siberia, dan Asia', correct: false }
			]
  },

// 25
  {
    question: '<p class="kompetensi">&#x2705; mengetahui kisaran periode peristiwa seputar fase Bulan dan gerhana</p><p>Bulan tuntas sekali beredar pada orbitnya dalam …</p>',
    answers:
			[
			{ text: 'sekitar 27 hari', correct: true },
			{ text: 'sekitar 25 hari', correct: false },
			{ text: 'sekitar 29 hari', correct: false },
			{ text: 'sekitar 31 hari', correct: false }
			]
  },

// 26
  {
    question: '<p class="kompetensi">&#x2705; mengetahui kisaran periode peristiwa seputar fase Bulan dan gerhana</p><p>Fase Bulan kuartal awal ke kuartal awal berikutnya berselang …</p>',
    answers:
			[
			{ text: 'sekitar 29 hari', correct: true },
			{ text: 'sekitar 25 hari', correct: false },
			{ text: 'sekitar 27 hari', correct: false },
			{ text: 'sekitar 31 hari', correct: false }
			]
  },

// 27
  {
    question: '<p class="kompetensi">&#x2705; mengetahui kisaran periode peristiwa seputar fase Bulan dan gerhana</p><p class="info-bantu">&#x1f3af; Lokasi titik simpul naik-turun Bulan selalu bergeser.</p><p>Titik simpul naik-turun Bulan akan kembali pada posisi semula tiap …</p>',
    answers:
			[
			{ text: 'sekitar 18 tahun', correct: true },
			{ text: 'sekitar 16 tahun', correct: false },
			{ text: 'sekitar 20 tahun', correct: false },
			{ text: 'sekitar 22 tahun', correct: false }
			]
  },

// 28
  {
    question: '<p class="kompetensi">&#x2705; mengetahui kisaran periode peristiwa seputar fase Bulan dan gerhana</p><p class="info-bantu">&#x1f3af; Titik sublunar yaitu lokasi di permukaan Bumi yang tepat di bawah Bulan.</p><p>Titik sublunar kembali ke bujur geografis yang sama dalam …</p>',
    answers:
			[
			{ text: 'sekitar 25 jam', correct: true },
			{ text: 'sekitar 27 jam', correct: false },
			{ text: 'sekitar 23 jam', correct: false },
			{ text: 'sekitar 21 jam', correct: false }
			]
  }
];