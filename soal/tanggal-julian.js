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
    question: '<p class="kompetensi">&#x2705; mengonversi dari kalender Gregorian atau Julian ke tanggal Julian</p><p>Tanggal Julian untuk 8 November 2021 adalah …</p>',
    answers:
			[
			{ text: 'JD 2459526,5', correct: true },
			{ text: 'JD 2459416,5', correct: false },
			{ text: 'JD 2459676,5', correct: false },
			{ text: 'JD 2459346,5', correct: false }
			]
  },

// 2
  {
    question: '<p class="kompetensi">&#x2705; mengonversi dari kalender Gregorian atau Julian ke tanggal Julian</p><p>Tanggal Julian untuk 1 Mei 1990 pukul 16:00 adalah …</p>',
    answers:
			[
			{ text: 'JD 2448013,17', correct: true },
			{ text: 'JD 2447823,17', correct: false },
			{ text: 'JD 2447913,17', correct: false },
			{ text: 'JD 2447863,17', correct: false }
			]
  },

// 3
  {
    question: '<p class="kompetensi">&#x2705; mengonversi dari tanggal Julian ke kalender Gregorian atau Julian</p><p>Tanggal Julian JD 2459535,5 bertepatan dengan …</p>',
    answers:
			[
			{ text: '17 November 2021 pukul 00:00', correct: true },
			{ text: '27 November 2021 pukul 00:00', correct: false },
			{ text: '1 Desember 2021 pukul 00:00', correct: false },
			{ text: '1 November 2021 pukul 00:00', correct: false }
			]
  },

// 4
  {
    question: '<p class="kompetensi">&#x2705; mengonversi dari tanggal Julian ke kalender Gregorian atau Julian</p><p>Tanggal Julian JD 2458535,25 bertepatan dengan …</p>',
    answers:
			[
			{ text: '20 Februari 2019 pukul 18:00', correct: true },
			{ text: '8 Februari 2019 pukul 18:00', correct: false },
			{ text: '31 Januari 2019 pukul 18:00', correct: false },
			{ text: '6 Maret 2019 pukul 18:00', correct: false }
			]
  },

// 5
  {
    question: '<p class="kompetensi">&#x2705; menghitung selang hari maju ataupun mundur</p><p>Lima ratus hari sebelum 17 Agustus 2021 adalah …</p>',
    answers:
			[
			{ text: '4 April 2020', correct: true },
			{ text: '17 April 2020', correct: false },
			{ text: '24 Maret 2020', correct: false },
			{ text: '22 Maret 2020', correct: false }
			]
  },

// 6
  {
    question: '<p class="kompetensi">&#x2705; menghitung selang hari maju ataupun mundur</p><p>Seribu hari setelah 14 Mei 2016 adalah …</p>',
    answers:
			[
			{ text: '8 Februari 2019', correct: true },
			{ text: '29 Mei 2019', correct: false },
			{ text: '19 Mei 2019', correct: false },
			{ text: '11 Oktober 2019', correct: false }
			]
  },

// 7
  {
    question: '<p class="kompetensi">&#x2705; menghitung selang hari maju ataupun mundur</p><p>Tanggal 20 Oktober 1582 belum lama berselang sejak kalender Gregorian diterapkan.</p><p>Lima ratus hari sebelum 20 Oktober 1582 adalah …</p>',
    answers:
			[
			{ text: '28 Mei 1581', correct: true },
			{ text: '17 Februari 1581', correct: false },
			{ text: '15 September 1581', correct: false },
			{ text: '15 Oktober 1581', correct: false }
			]
  },

// 8
  {
    question: '<p class="kompetensi">&#x2705; menghitung selang hari maju ataupun mundur</p><p>Tanggal 3 Februari 1581 masih menggunakan kalender Julian, bukan Gregorian.</p><p>Seribu hari setelah 3 Februari 1581 adalah …</p>',
    answers:
			[
			{ text: '10 November 1583', correct: true },
			{ text: '2 Agustus 1583', correct: false },
			{ text: '9 Maret 1584', correct: false },
			{ text: '23 Juli 1583', correct: false }
			]
  },

// 9
  {
    question: '<p class="kompetensi">&#x2705; mengonversi dari kalender Gregorian atau Julian ke tanggal Julian</p><p>Tanggal 10 April 1500 masih menggunakan kalender Julian, bukan Gregorian.</p><p>Tanggal Julian untuk 10 April 1500 adalah …</p>',
    answers:
			[
			{ text: 'JD 2269032,5', correct: true },
			{ text: 'JD 2269222,5', correct: false },
			{ text: 'JD 2269192,5', correct: false },
			{ text: 'JD 2269202,5', correct: false }
			]
  },

// 10
  {
    question: '<p class="kompetensi">&#x2705; mengonversi dari kalender Gregorian atau Julian ke tanggal Julian</p><p>Tanggal 20 Oktober 1300 masih menggunakan kalender Julian, bukan Gregorian.<p></p>Tanggal Julian untuk 20 Oktober 1300 pukul 11:00 adalah …</p>',
    answers:
			[
			{ text: 'JD 2196175,96', correct: true },
			{ text: 'JD 2196055,96', correct: false },
			{ text: 'JD 2196355,96', correct: false },
			{ text: 'JD 2195985,96', correct: false }
			]
  },

// 11
  {
    question: '<p class="kompetensi">&#x2705; mengonversi dari tanggal Julian ke kalender Gregorian atau Julian</p><p>Tanggal Julian JD 2100000 bertepatan dengan …</p>',
    answers:
			[
			{ text: '27 Juni 1037 pukul 12:00', correct: true },
			{ text: '10 Juli 1037 pukul 12:00', correct: false },
			{ text: '12 Juli 1037 pukul 12:00', correct: false },
			{ text: '16 Juni 1037 pukul 12:00', correct: false }
			]
  },

// 12
  {
    question: '<p class="kompetensi">&#x2705; mengonversi dari tanggal Julian ke kalender Gregorian atau Julian</p><p>Tanggal Julian JD 2297159,75 bertepatan dengan …</p>',
    answers:
			[
			{ text: '13 April 1577 pukul 6:00', correct: true },
			{ text: '25 April 1577 pukul 6:00', correct: false },
			{ text: '2 April 1577 pukul 6:00', correct: false },
			{ text: '31 Maret 1577 pukul 6:00', correct: false }
			]
  },

// 13
  {
    question: '<p class="kompetensi">&#x2705; menghitung selang hari maju ataupun mundur</p><p>Dua ribu hari sebelum 23 September 2021 adalah …</p>',
    answers:
			[
			{ text: '2 April 2016', correct: true },
			{ text: '31 Juli 2016', correct: false },
			{ text: '14 November 2015', correct: false },
			{ text: '20 Agustus 2016', correct: false }
			]
  },

// 14
  {
    question: '<p class="kompetensi">&#x2705; menghitung selang hari maju ataupun mundur</p><p>Empat ribu hari setelah 23 September 2010 adalah …</p>',
    answers:
			[
			{ text: '5 September 2021', correct: true },
			{ text: '28 April 2021', correct: false },
			{ text: '14 Desember 2021', correct: false },
			{ text: '8 April 2021', correct: false }
			]
  },

// 15
  {
    question: '<p class="kompetensi">&#x2705; menghitung selang hari maju ataupun mundur</p><p>Dua ribu hari sebelum 20 November 1583 adalah …</p>',
    answers:
			[
			{ text: '20 Mei 1578', correct: true },
			{ text: '27 September 1578', correct: false },
			{ text: '30 Januari 1578', correct: false },
			{ text: '17 Oktober 1578', correct: false }
			]
  },

// 16
  {
    question: '<p class="kompetensi">&#x2705; menghitung selang hari maju ataupun mundur</p><p>Tanggal 7 Juni 1400 masih menggunakan kalender Julian, bukan Gregorian.</p><p>Empat ribu hari setelah 7 Juni 1400 adalah …</p>',
    answers:
			[
			{ text: '21 Mei 1411', correct: true },
			{ text: '18 September 1411', correct: false },
			{ text: '10 Februari 1411', correct: false },
			{ text: '31 Januari 1411', correct: false }
			]
  }
];