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
    question: '<p class="kompetensi">&#x2705; menyebutkan nama dan rentang nilai komponen koordinat geografis, ekuatorial, dan horizon</p><p>Komponen koordinat geografis lokasi di Bumi yaitu …</p>',
    answers:
			[
			{ text: 'lintang dan bujur', correct: true },
			{ text: 'deklinasi dan asensiorekta', correct: false },
			{ text: 'azimut dan ketinggian', correct: false },
			{ text: 'x dan y', correct: false }
			]
  },

// 2
  {
    question: '<p class="kompetensi">&#x2705; menyebutkan nama dan rentang nilai komponen koordinat geografis, ekuatorial, dan horizon</p><p>Komponen koordinat ekuatorial yaitu …</p>',
    answers:
			[
			{ text: 'deklinasi dan asensiorekta', correct: true },
			{ text: 'lintang dan bujur', correct: false },
			{ text: 'azimut dan ketinggian', correct: false },
			{ text: 'x dan y', correct: false }
			]
  },

// 3
  {
    question: '<p class="kompetensi">&#x2705; menyebutkan nama dan rentang nilai komponen koordinat geografis, ekuatorial, dan horizon</p><p>Komponen koordinat horizon yaitu …</p>',
    answers:
			[
			{ text: 'azimut dan ketinggian', correct: true },
			{ text: 'deklinasi dan asensiorekta', correct: false },
			{ text: 'lintang dan bujur', correct: false },
			{ text: 'x dan y', correct: false }
			]
  },

// 4
  {
    question: '<p class="kompetensi">&#x2705; menyebutkan nama dan rentang nilai komponen koordinat geografis, ekuatorial, dan horizon</p><p>Rentang nilai deklinasi dan asensiorekta berturut-turut yaitu …</p>',
    answers:
			[
			{ text: '(-90°)–(+90°) dan 0h–360h', correct: true },
			{ text: '0°–360° dan (-90°)–(+90°)', correct: false },
			{ text: '(-90°)–(+90°) dan (-180°)–(+180°)', correct: false },
			{ text: '(-90°)–(+90°) dan (-90°)–(+90°)', correct: false }
			]
  },

// 5
  {
    question: '<p class="kompetensi">&#x2705; menyebutkan nama dan rentang nilai komponen koordinat geografis, ekuatorial, dan horizon</p><p>Rentang nilai azimut dan ketinggian berturut-turut yaitu …</p>',
    answers:
			[
			{ text: '0°–360° dan (-90°)–(+90°)', correct: true },
			{ text: '(-90°)–(+90°) dan 0h–360h', correct: false },
			{ text: '(-90°)–(+90°) dan (-180°)–(+180°)', correct: false },
			{ text: '(-90°)–(+90°) dan (-90°)–(+90°)', correct: false }
			]
  },

// 6
  {
    question: '<p class="kompetensi">&#x2705; menyebutkan nama dan rentang nilai komponen koordinat geografis, ekuatorial, dan horizon</p><p>Rentang nilai lintang dan bujur geografis berturut-turut yaitu …</p>',
    answers:
			[
			{ text: '(-90°)–(+90°) dan (-180°)–(+180°)', correct: true },
			{ text: '(-90°)–(+90°) dan 0h–360h', correct: false },
			{ text: '0°–360° dan (-90°)–(+90°)', correct: false },
			{ text: '(-90°)–(+90°) dan (-90°)–(+90°)', correct: false }
			]
  },

// 7
  {
    question: '<p class="kompetensi">&#x2705; menafsirkan garis edar benda langit berdasarkan deklinasi dan lintang</p><p>Diamati dari lintang lokasi 70°, benda langit dengan deklinasi 60° …</p>',
    answers:
			[
			{ text: 'selalu berada di atas horizon', correct: true },
			{ text: 'selalu berada di bawah horizon', correct: false },
			{ text: 'lebih lama berada di atas horizon', correct: false },
			{ text: 'lebih lama berada di bawah horizon', correct: false }
			]
  },

// 8
  {
    question: '<p class="kompetensi">&#x2705; menafsirkan garis edar benda langit berdasarkan deklinasi dan lintang</p><p>Diamati dari lintang lokasi 60°, benda langit dengan deklinasi -30° …</p>',
    answers:
			[
			{ text: 'lebih lama berada di bawah horizon', correct: true },
			{ text: 'selalu berada di atas horizon', correct: false },
			{ text: 'selalu berada di bawah horizon', correct: false },
			{ text: 'lebih lama berada di atas horizon', correct: false }
			]
  },

// 9
  {
    question: '<p class="kompetensi">&#x2705; menafsirkan garis edar benda langit berdasarkan deklinasi dan lintang</p><p>Diamati dari lintang lokasi -40°, benda langit dengan deklinasi 60° …</p>',
    answers:
			[
			{ text: 'selalu berada di bawah horizon', correct: true },
			{ text: 'selalu berada di atas horizon', correct: false },
			{ text: 'lebih lama berada di atas horizon', correct: false },
			{ text: 'lebih lama berada di bawah horizon', correct: false }
			]
  },

// 10
  {
    question: '<p class="kompetensi">&#x2705; menafsirkan garis edar benda langit berdasarkan deklinasi dan lintang</p><p>Diamati dari lintang lokasi -30°, benda langit dengan deklinasi -30° …</p>',
    answers:
			[
			{ text: 'lebih lama berada di atas horizon', correct: true },
			{ text: 'selalu berada di bawah horizon', correct: false },
			{ text: 'selalu berada di atas horizon', correct: false },
			{ text: 'lebih lama berada di bawah horizon', correct: false }
			]
  },

// 11
  {
    question: '<p class="kompetensi">&#x2705; menafsirkan komponen koordinat horizon terkait orientasi pada bidang pengamatan</p><p>Ketinggian benda langit 30° berarti posisinya …</p>',
    answers:
			[
			{ text: 'sedang di atas horizon', correct: true },
			{ text: 'sedang di bawah horizon', correct: false },
			{ text: 'sedang di belahan langit timur', correct: false },
			{ text: 'sedang di belahan langit barat', correct: false }
			]
  },

// 12
  {
    question: '<p class="kompetensi">&#x2705; menafsirkan komponen koordinat horizon terkait orientasi pada bidang pengamatan</p><p>Azimut benda langit 120° berarti posisinya …</p>',
    answers:
			[
			{ text: 'sedang di belahan langit timur', correct: true },
			{ text: 'sedang di atas horizon', correct: false },
			{ text: 'sedang di bawah horizon', correct: false },
			{ text: 'sedang di belahan langit barat', correct: false }
			]
  },

// 13
  {
    question: '<p class="kompetensi">&#x2705; menafsirkan komponen koordinat horizon terkait orientasi pada bidang pengamatan</p><p>Azimut benda langit 70° berarti posisinya …</p>',
    answers:
			[
			{ text: 'lebih dekat ke timur daripada utara', correct: true },
			{ text: 'lebih dekat ke timur daripada selatan', correct: false },
			{ text: 'lebih dekat ke barat daripada utara', correct: false },
			{ text: 'lebih dekat ke barat daripada selatan', correct: false }
			]
  },

// 14
  {
    question: '<p class="kompetensi">&#x2705; menafsirkan komponen koordinat horizon terkait orientasi pada bidang pengamatan</p><p>Ketinggian benda langit -60° berarti posisinya …</p>',
    answers:
			[
			{ text: 'sedang di bawah horizon', correct: true },
			{ text: 'sedang di belahan langit timur', correct: false },
			{ text: 'sedang di atas horizon', correct: false },
			{ text: 'sedang di belahan langit barat', correct: false }
			]
  },

// 15
  {
    question: '<p class="kompetensi">&#x2705; menafsirkan komponen koordinat horizon terkait orientasi pada bidang pengamatan</p><p>Azimut benda langit 230° berarti posisinya …</p>',
    answers:
			[
			{ text: 'sedang di belahan langit barat', correct: true },
			{ text: 'sedang di bawah horizon', correct: false },
			{ text: 'sedang di belahan langit timur', correct: false },
			{ text: 'sedang di atas horizon', correct: false }
			]
  },

// 16
  {
    question: '<p class="kompetensi">&#x2705; menafsirkan komponen koordinat horizon terkait orientasi pada bidang pengamatan</p><p>Azimut benda langit 280° berarti posisinya …</p>',
    answers:
			[
			{ text: 'lebih dekat ke barat daripada utara', correct: true },
			{ text: 'lebih dekat ke barat daripada selatan', correct: false },
			{ text: 'lebih dekat ke timur daripada utara', correct: false },
			{ text: 'lebih dekat ke timur daripada selatan', correct: false }
			]
  },

// 17
  {
    question: '<p class="kompetensi">&#x2705; mengonversi dari koordinat ekuatorial ke horizon untuk lokasi dan tanggal tertentu</p><p>Suatu lokasi lintangnya 50° dan bujurnya 70°.</p><p>Suatu benda langit deklinasinya 20° dan asensiorektanya 10h.</p><p>Pada 20 Maret pukul 20:00, posisi benda langit tersebut …</p>',
    answers:
			[
			{ text: 'di atas horizon di antara timur dan selatan', correct: true },
			{ text: 'di atas horizon di antara barat dan utara', correct: false },
			{ text: 'di bawah horizon di antara timur dan selatan', correct: false },
			{ text: 'di bawah horizon di antara barat dan utara', correct: false }
			]
  },

// 18
  {
    question: '<p class="kompetensi">&#x2705; mengonversi dari koordinat ekuatorial ke horizon untuk lokasi dan tanggal tertentu</p><p>Suatu lokasi lintangnya -40° dan bujurnya 30°.</p><p>Suatu benda langit deklinasinya 20° dan asensiorektanya 18h.</p><p>Pada 20 Maret pukul 20:00, posisi benda langit tersebut …</p>',
    answers:
			[
			{ text: 'di bawah horizon di antara timur dan selatan', correct: true },
			{ text: 'di bawah horizon di antara barat dan utara', correct: false },
			{ text: 'di atas horizon di antara timur dan selatan', correct: false },
			{ text: 'di atas horizon di antara barat dan utara', correct: false }
			]
  },

// 19
  {
    question: '<p class="kompetensi">&#x2705; mengonversi dari koordinat ekuatorial ke horizon untuk lokasi dan tanggal tertentu</p><p>Suatu lokasi lintangnya 30° dan bujurnya -20°.</p><p>Suatu benda langit deklinasinya -50° dan asensiorektanya 5h.</p><p>Pada 20 September pukul 03:00, posisi benda langit tersebut …</p>',
    answers:
			[
			{ text: 'di atas horizon di antara timur dan selatan', correct: true },
			{ text: 'di atas horizon di antara barat dan utara', correct: false },
			{ text: 'di bawah horizon di antara timur dan selatan', correct: false },
			{ text: 'di bawah horizon di antara barat dan utara', correct: false }
			]
  },

// 20
  {
    question: '<p class="kompetensi">&#x2705; mengonversi dari koordinat ekuatorial ke horizon untuk lokasi dan tanggal tertentu</p><p>Suatu lokasi lintangnya -70° dan bujurnya -20°.</p><p>Suatu benda langit deklinasinya -50° dan asensiorektanya 3h.</p><p>Pada 20 September pukul 00:00, posisi benda langit tersebut …</p>',
    answers:
			[
			{ text: 'di atas horizon di antara timur dan utara', correct: true },
			{ text: 'di atas horizon di antara barat dan selatan', correct: false },
			{ text: 'di bawah horizon di antara timur dan utara', correct: false },
			{ text: 'di bawah horizon di antara barat dan selatan', correct: false }
			]
  }
];