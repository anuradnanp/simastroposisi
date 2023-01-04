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
    question: '<p class="kompetensi">&#x2705; mengetahui rute terpendek antara dua lokasi dan kiblat shalat muslim</p><p>Santiago, Chili terletak pada 33,5&deg;LS 70,5&deg;BB.</p><p>Darwin, Australia terletak pada 12,5&deg;LS 131&deg;BT.</p><p>Bentuk rute terpendek dari Darwin ke Santiago yaitu …</p>',
    answers:
			[
			{ text: 'menjorok ke selatan', correct: true },
			{ text: 'menjorok ke utara', correct: false },
			{ text: 'membujur tepat timur-barat', correct: false },
			{ text: 'bebas ke segala arah', correct: false }
			]
  },

// 2
  {
    question: '<p class="kompetensi">&#x2705; mengetahui rute terpendek antara dua lokasi dan kiblat shalat muslim</p><p>Florida, AS terletak pada 30&deg;LU 82&deg;BB.</p><p>Yogyakarta, Indonesia terletak pada 8&deg;LS 110,5&deg;BT.</p><p>Bentuk rute terpendek dari Florida ke Yogyakarta yaitu …</p>',
    answers:
			[
			{ text: 'menjorok ke utara', correct: true },
			{ text: 'menjorok ke selatan', correct: false },
			{ text: 'membujur tepat timur-barat', correct: false },
			{ text: 'bebas ke segala arah', correct: false }
			]
  },

// 3
  {
    question: '<p class="kompetensi">&#x2705; mengetahui rute terpendek antara dua lokasi dan kiblat shalat muslim</p><p>Tokyo, Jepang terletak pada 35,5&deg;LU 140&deg;BT.</p><p>Ka&apos;bah, di Mekah, Arab Saudi, terletak pada 21,5&deg;LU 40&deg;BT.</p><p>Kisaran arah kiblat bagi muslim di Tokyo yaitu …</p>',
    answers:
			[
			{ text: 'ke barat laut', correct: true },
			{ text: 'ke timur laut', correct: false },
			{ text: 'ke tenggara', correct: false },
			{ text: 'ke barat daya', correct: false }
			]
  },

// 4
  {
    question: '<p class="kompetensi">&#x2705; mengetahui rute terpendek antara dua lokasi dan kiblat shalat muslim</p><p>Washington DC, AS, terletak pada 39&deg;LU 77&deg;BB.</p><p>Ka&apos;bah, di Mekah, Arab Saudi, terletak pada 21,5&deg;LU 40&deg;BT.</p><p>Kisaran arah kiblat bagi muslim di Washington DC yaitu …</p>',
    answers:
			[
			{ text: 'ke timur laut', correct: true },
			{ text: 'ke barat laut', correct: false },
			{ text: 'ke tenggara', correct: false },
			{ text: 'ke barat daya', correct: false }
			]
  },

// 5
  {
    question: '<p class="kompetensi">&#x2705; mengetahui rute terpendek antara dua lokasi dan kiblat shalat muslim</p><p>Johannesburg, Afrika Selatan terletak pada 26&deg;LS 28&deg;BT.</p><p>San Francisco, AS terletak pada 38&deg;LU 122,5&deg;BB.</p><p>Arah awal rute terpendek dari San Francisco ke Johannesburg yaitu …</p>',
    answers:
			[
			{ text: 'ke timur agak ke utara', correct: true },
			{ text: 'ke barat agak ke selatan', correct: false },
			{ text: 'ke utara agak ke timur', correct: false },
			{ text: 'ke barat agak ke utara', correct: false }
			]
  },

// 6
  {
    question: '<p class="kompetensi">&#x2705; mengetahui rute terpendek antara dua lokasi dan kiblat shalat muslim</p><p>Roma, Italia terletak pada 42&deg;LU 12,5&deg;BT.</p><p>Honolulu, AS terletak pada 21,5&deg;LU 158&deg;BB.</p><p>Arah awal rute terpendek dari Honolulu ke Roma yaitu …</p>',
    answers:
			[
			{ text: 'ke utara agak ke timur', correct: true },
			{ text: 'ke timur agak ke utara', correct: false },
			{ text: 'ke utara agak ke barat', correct: false },
			{ text: 'ke barat agak ke utara', correct: false }
			]
  },

// 7
  {
    question: '<p class="kompetensi">&#x2705; mengetahui antipoda suatu lokasi</p><p class="info-bantu">&#x1f3af; Antipoda yaitu lokasi yang tepat berseberangan terhadap pusat Bumi, arah awal rute terpendeknya bebas ke segala arah.</p><p>Antipoda Jakarta, Indonesia 6&deg;LS 107&deg;BT terletak di …</p>',
    answers:
			[
			{ text: 'kawasan Amerika Tengah', correct: true },
			{ text: 'kawasan Pasifik', correct: false },
			{ text: 'kawasan Amerika Utara', correct: false },
			{ text: 'kawasan Atlantik', correct: false }
			]
  },

// 8
  {
    question: '<p class="kompetensi">&#x2705; mengetahui antipoda suatu lokasi</p><p class="info-bantu">&#x1f3af; Antipoda yaitu lokasi yang tepat berseberangan terhadap pusat Bumi, arah awal rute terpendeknya bebas ke segala arah.</p><p>Antipoda Ankara, Turki 33&deg;LU 40&deg;BT terletak di …</p>',
    answers:
			[
			{ text: 'kawasan Pasifik Selatan', correct: true },
			{ text: 'kawasan Pasifik Utara', correct: false },
			{ text: 'kawasan Australia', correct: false },
			{ text: 'kawasan Amerika Selatan', correct: false }
			]
  },

// 9
  {
    question: '<p class="kompetensi">&#x2705; mengetahui antipoda suatu lokasi</p><p class="info-bantu">&#x1f3af; Antipoda yaitu lokasi yang tepat berseberangan terhadap pusat Bumi, arah awal rute terpendeknya bebas ke segala arah.</p><p>Antipoda Xinjiang, Cina 44,5&deg;LS 86&deg;BT terletak di …</p>',
    answers:
			[
			{ text: 'kawasan Pasifik Selatan', correct: true },
			{ text: 'kawasan Pasifik Utara', correct: false },
			{ text: 'kawasan Australia', correct: false },
			{ text: 'kawasan Amerika Selatan', correct: false }
			]
  },

// 10
  {
    question: '<p class="kompetensi">&#x2705; mengetahui antipoda suatu lokasi</p><p class="info-bantu">&#x1f3af; Antipoda yaitu lokasi yang tepat berseberangan terhadap pusat Bumi, arah awal rute terpendeknya bebas ke segala arah.</p><p>Antipoda Bamako, Mali 12,5&deg;LU 8&deg;BB terletak di …</p>',
    answers:
			[
			{ text: 'kawasan Pasifik Selatan', correct: true },
			{ text: 'kawasan Pasifik Utara', correct: false },
			{ text: 'kawasan Australia', correct: false },
			{ text: 'kawasan Amerika Selatan', correct: false }
			]
  },

// 11
  {
    question: '<p class="kompetensi">&#x2705; mengetahui antipoda suatu lokasi</p><p class="info-bantu">&#x1f3af; Antipoda yaitu lokasi yang tepat berseberangan terhadap pusat Bumi, arah awal rute terpendeknya bebas ke segala arah.</p><p>Antipoda Lima, Peru 12&deg;LS 77&deg;BB terletak di …</p>',
    answers:
			[
			{ text: 'kawasan Asia Tenggara', correct: true },
			{ text: 'kawasan Asia Timur', correct: false },
			{ text: 'kawasan Australia', correct: false },
			{ text: 'kawasan Samudera Hindia', correct: false }
			]
  },

// 12
  {
    question: '<p class="kompetensi">&#x2705; mengetahui antipoda suatu lokasi</p><p class="info-bantu">&#x1f3af; Antipoda yaitu lokasi yang tepat berseberangan terhadap pusat Bumi, arah awal rute terpendeknya bebas ke segala arah.</p><p>Antipoda Kerala, India 11&deg;LU 76,5&deg;BT terletak di …</p>',
    answers:
			[
			{ text: 'kawasan Pasifik Selatan', correct: true },
			{ text: 'kawasan Pasifik Utara', correct: false },
			{ text: 'kawasan Australia', correct: false },
			{ text: 'kawasan Amerika Selatan', correct: false }
			]
  },

// 13
  {
    question: '<p class="kompetensi">&#x2705; mengetahui besar sisi dan sudut pada segitiga bola</p><p>Jika sisi segitiga bola panjangnya 60&deg; dan 38&deg; serta sudut pisah keduanya 50&deg;, sisi lainnya pasti …</p>',
    answers:
			[
			{ text: '42,5°', correct: true },
			{ text: '44,2°', correct: false },
			{ text: '101,2°', correct: false },
			{ text: '50°', correct: false }
			]
  },

// 14
  {
    question: '<p class="kompetensi">&#x2705; mengetahui besar sisi dan sudut pada segitiga bola</p><p>Jika sudut 62&deg; berhadapan dengan sisi 56&deg;, kemungkinan sisi-sisi lainnya …</p>',
    answers:
			[
			{ text: '60° dan 69°', correct: true },
			{ text: '67,2° dan 83,7°', correct: false },
			{ text: '60° dan 67,2°', correct: false },
			{ text: '69° dan 83,7°', correct: false }
			]
  },

// 15
  {
    question: '<p class="kompetensi">&#x2705; mengetahui besar sisi dan sudut pada segitiga bola</p><p>Jumlah total semua sudut pada segitiga bola …</p>',
    answers:
			[
			{ text: 'pasti lebih besar dari 180°', correct: true },
			{ text: 'pasti lebih kecil dari 180°', correct: false },
			{ text: 'pasti selalu tepat 180°', correct: false },
			{ text: 'pasti lebih kecil dari 90°', correct: false }
			]
  },

// 16
  {
    question: '<p class="kompetensi">&#x2705; mengetahui besar sisi dan sudut pada segitiga bola</p><p>Jika sudut-sudut segitiga bola 46,5&deg;, 55,7&deg;, dan 108,7&deg;, sisi-sisinya pasti …</p>',
    answers:
			[
			{ text: '49,5°, 60°, dan 83,5°', correct: true },
			{ text: '46,5°, 55,7°, dan 83,5°', correct: false },
			{ text: '46,5°, 60°, dan 108,7°', correct: false },
			{ text: '49,5°, 55,7°, dan 108,7°', correct: false }
			]
  }
];
