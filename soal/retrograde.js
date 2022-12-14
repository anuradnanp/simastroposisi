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
    question: '<p class="kompetensi">&#x2705; mengenali sifat gerak retrograde planet dalam dan luar</p><p>Untuk planet dalam, …</p>',
    answers:
			[
			{ text: 'gerak retrograde-nya selalu di sekitar arah Matahari', correct: true },
			{ text: 'gerak retrograde-nya selalu jauh dari arah Matahari', correct: false },
			{ text: 'gerak retrograde-nya bisa di sekitar ataupun jauh dari arah Matahari', correct: false },
			{ text: 'gerak retrograde tidak pernah terjadi', correct: false }
			]
  },

// 2
  {
    question: '<p class="kompetensi">&#x2705; mengenali sifat gerak retrograde planet dalam dan luar</p><p>Untuk planet luar, …</p>',
    answers:
			[
			{ text: 'gerak retrograde-nya bisa di sekitar ataupun jauh dari arah Matahari', correct: true },
			{ text: 'gerak retrograde-nya selalu di sekitar arah Matahari', correct: false },
			{ text: 'gerak retrograde-nya selalu jauh dari arah Matahari', correct: false },
			{ text: 'gerak retrograde tidak pernah terjadi', correct: false }
			]
  },

// 3
  {
    question: '<p class="kompetensi">&#x2705; menghitung jumlah gerak retrograde dalam setahun</p><p class="info-bantu">&#x1f3af; Setahun atau sekitar 365 hari ditandai dengan kembalinya Matahari ke posisi semula dilihat dari Bumi.</p><p>Dalam 365 hari, Merkurius mengalami gerak retrogade sebanyak …</p>',
    answers:
			[
			{ text: '4 kali', correct: true },
			{ text: '1 kali', correct: false },
			{ text: '2 kali', correct: false },
			{ text: '3 kali', correct: false }
			]
  },

// 4
  {
    question: '<p class="kompetensi">&#x2705; menghitung jumlah gerak retrograde dalam setahun</p><p class="info-bantu">&#x1f3af; Setahun atau sekitar 365 hari ditandai dengan kembalinya Matahari ke posisi semula dilihat dari Bumi.</p><p>Dalam 365 hari, Jupiter mengalami gerak retrogade sebanyak …</p>',
    answers:
			[
			{ text: '1 kali', correct: true },
			{ text: '2 kali', correct: false },
			{ text: '3 kali', correct: false },
			{ text: '4 kali', correct: false }
			]
  },

// 5
  {
    question: '<p class="kompetensi">&#x2705; mengetahui kapan planet bisa diamati</p><p class="info-bantu">&#x1f3af; Planet dapat diamati jika ada pada langit malam atau arahnya cukup jauh di atas Matahari ketika fajar atau senja.</p><p>Pada tanggal-tanggal tertentu, planet dalam dapat diamati ketika …</p>',
    answers:
			[
			{ text: 'fajar atau senja', correct: true },
			{ text: 'siang', correct: false },
			{ text: 'malam', correct: false },
			{ text: 'fajar, senja, siang, atau malam', correct: false }
			]
  },

// 6
  {
    question: '<p class="kompetensi">&#x2705; mengetahui kapan planet bisa diamati</p><p class="info-bantu">&#x1f3af; Planet dapat diamati jika ada pada langit malam atau arahnya cukup jauh di atas Matahari ketika fajar atau senja.</p><p>Planet luar dapat diamati ketika …</p>',
    answers:
			[
			{ text: 'fajar, senja, siang, atau malam pada tanggal-tanggal tertentu', correct: true },
			{ text: 'fajar atau senja saja', correct: false },
			{ text: 'siang saja', correct: false },
			{ text: 'malam saja', correct: false }
			]
  },

// 7
  {
    question: '<p class="kompetensi">&#x2705; mengetahui kapan planet bisa diamati</p><p class="info-bantu">&#x1f3af; Planet dapat diamati jika ada pada langit malam atau arahnya cukup jauh di atas Matahari ketika fajar atau senja.</p><p>Pada 23 September 2022, planet Jupiter …</p>',
    answers:
			[
			{ text: 'dapat diamati karena berseberangan dengan arah Matahari', correct: true },
			{ text: 'tidak dapat diamati karena di sekitar arah Matahari', correct: false },
			{ text: 'hanya bisa diamati saat fajar', correct: false },
			{ text: 'hanya bisa diamati saat senja', correct: false }
			]
  },

// 8
  {
    question: '<p class="kompetensi">&#x2705; mengetahui kapan planet bisa diamati</p><p class="info-bantu">&#x1f3af; Planet dapat diamati jika ada pada langit malam atau arahnya cukup jauh di atas Matahari ketika fajar atau senja.</p><p>Pada 27 Maret 2022, planet Venus …</p>',
    answers:
			[
			{ text: 'dapat diamati saat fajar', correct: true },
			{ text: 'dapat diamati saat senja', correct: false },
			{ text: 'dapat diamati saat malam', correct: false },
			{ text: 'tidak dapat diamati sepanjang hari', correct: false }
			]
  },

// 9
  {
    question: '<p class="kompetensi">&#x2705; mengetahui kapan planet bisa diamati</p><p class="info-bantu">&#x1f3af; Planet dapat diamati jika ada pada langit malam atau arahnya cukup jauh di atas Matahari ketika fajar atau senja.</p><p>Pada 9 Agustus 2023, planet Mars …</p>',
    answers:
			[
			{ text: 'dapat diamati saat senja', correct: true },
			{ text: 'dapat diamati saat fajar', correct: false },
			{ text: 'dapat diamati saat malam', correct: false },
			{ text: 'tidak dapat diamati sepanjang hari', correct: false }
			]
  },

// 10
  {
    question: '<p class="kompetensi">&#x2705; mengetahui kapan planet bisa diamati</p><p class="info-bantu">&#x1f3af; Planet dapat diamati jika ada pada langit malam atau arahnya cukup jauh di atas Matahari ketika fajar atau senja.</p><p>Pada 25 Februari 2024, planet Saturnus …</p>',
    answers:
			[
			{ text: 'tidak dapat diamati sepanjang hari', correct: true },
			{ text: 'dapat diamati saat senja', correct: false },
			{ text: 'dapat diamati saat fajar', correct: false },
			{ text: 'dapat diamati saat malam', correct: false }
			]
  },

// 11
  {
    question: '<p class="kompetensi">&#x2705; menjejaki perubahan posisi untuk menetapkan apakah planet sedang mengalami retrograde</p><p>Pada 22 Januari 2023, planet Merkurius …</p>',
    answers:
			[
			{ text: 'retrograde menjauh dari Bumi', correct: true },
			{ text: 'retrograde mendekat ke Bumi', correct: false },
			{ text: 'prograde menjauh dari Bumi', correct: false },
			{ text: 'prograde mendekat ke Bumi', correct: false }
			]
  },

// 12
  {
    question: '<p class="kompetensi">&#x2705; menjejaki perubahan posisi untuk menetapkan apakah planet sedang mengalami retrograde</p><p>Pada 11 September 2024, planet Venus …</p>',
    answers:
			[
			{ text: 'prograde mendekat ke Bumi', correct: true },
			{ text: 'prograde menjauh dari Bumi', correct: false },
			{ text: 'retrograde menjauh dari Bumi', correct: false },
			{ text: 'retrograde mendekat ke Bumi', correct: false }
			]
  },

// 13
  {
    question: '<p class="kompetensi">&#x2705; menjejaki perubahan posisi untuk menetapkan apakah planet sedang mengalami retrograde</p><p>Pada 18 April 2024, planet Mars …</p>',
    answers:
			[
			{ text: 'prograde mendekat ke Bumi', correct: true },
			{ text: 'prograde menjauh dari Bumi', correct: false },
			{ text: 'retrograde menjauh dari Bumi', correct: false },
			{ text: 'retrograde mendekat ke Bumi', correct: false }
			]
  },

// 14
  {
    question: '<p class="kompetensi">&#x2705; menjejaki perubahan posisi untuk menetapkan apakah planet sedang mengalami retrograde</p><p>Pada 14 Oktober 2024, planet Jupiter …</p>',
    answers:
			[
			{ text: 'retrograde mendekat ke Bumi', correct: true },
			{ text: 'prograde mendekat ke Bumi', correct: false },
			{ text: 'prograde menjauh dari Bumi', correct: false },
			{ text: 'retrograde menjauh dari Bumi', correct: false }
			]
  },

// 15
  {
    question: '<p class="kompetensi">&#x2705; mengetahui kisaran periode orbit planet</p><p>Merkurius sekali mengelilingi Matahari dalam …</p>',
    answers:
			[
			{ text: 'sekitar 88 hari', correct: true },
			{ text: 'sekitar 98 hari', correct: false },
			{ text: 'sekitar 78 hari', correct: false },
			{ text: 'sekitar 68 hari', correct: false }
			]
  },

// 16
  {
    question: '<p class="kompetensi">&#x2705; mengetahui kisaran periode orbit planet</p><p>Venus sekali mengelilingi Matahari dalam …</p>',
    answers:
			[
			{ text: 'sekitar 225 hari', correct: true },
			{ text: 'sekitar 215 hari', correct: false },
			{ text: 'sekitar 235 hari', correct: false },
			{ text: 'sekitar 205 hari', correct: false }
			]
  },

// 17
  {
    question: '<p class="kompetensi">&#x2705; mengetahui kisaran periode orbit planet</p><p>Bumi sekali mengelilingi Matahari dalam …</p>',
    answers:
			[
			{ text: 'sekitar 365 hari', correct: true },
			{ text: 'sekitar 335 hari', correct: false },
			{ text: 'sekitar 395 hari', correct: false },
			{ text: 'sekitar 305 hari', correct: false }
			]
  },

// 18
  {
    question: '<p class="kompetensi">&#x2705; mengetahui kisaran periode orbit planet</p><p>Mars sekali mengelilingi Matahari dalam …</p>',
    answers:
			[
			{ text: 'sekitar 687 hari', correct: true },
			{ text: 'sekitar 657 hari', correct: false },
			{ text: 'sekitar 717 hari', correct: false },
			{ text: 'sekitar 627 hari', correct: false }
			]
  },

// 19
  {
    question: '<p class="kompetensi">&#x2705; mengetahui kisaran periode orbit planet</p><p>Jupiter sekali mengelilingi Matahari dalam …</p>',
    answers:
			[
			{ text: 'sekitar 12 tahun', correct: true },
			{ text: 'sekitar 13 tahun', correct: false },
			{ text: 'sekitar 14 tahun', correct: false },
			{ text: 'sekitar 11 tahun', correct: false }
			]
  },

// 20
  {
    question: '<p class="kompetensi">&#x2705; mengetahui kisaran periode orbit planet</p><p>Saturnus sekali mengelilingi Matahari dalam …</p>',
    answers:
			[
			{ text: 'sekitar 29 tahun', correct: true },
			{ text: 'sekitar 28 tahun', correct: false },
			{ text: 'sekitar 27 tahun', correct: false },
			{ text: 'sekitar 30 tahun', correct: false }
			]
  }
];
