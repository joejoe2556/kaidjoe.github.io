document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('startQuizButton').addEventListener('click', startQuiz);
  document.getElementById('nextQuestion').addEventListener('click', nextQuestion);
  document.getElementById('retakeQuiz').addEventListener('click', retakeQuiz);
});

let currentQuestionIndex = 0;
let userScores = { Grimbone: 0, EmeraldHand: 0, BubblegumViolence: 0 };

const questions = [
  // Array of question objects
];

const clanDescriptions = {
  Grimbone: 'We\'re the Grimbone clan, sprung from the charred remnants of the old world...',
  EmeraldHand: 'We are Emerald Hand. We once called Markling Upper City our home...',
  BubblegumViolence: 'We are Bubblegum Violence. To the sleepy sheepy citizens, we\'re just a traveling circus...'
};

const clanImages = {
  Grimbone: 'images/grimbone.png',
  EmeraldHand: 'images/emeraldhand.png',
  BubblegumViolence: 'images/bubblegumviolence.png'
};

function startQuiz() {
  document.getElementById('startQuiz').style.display = 'none';
  document.getElementById('quiz').style.display = 'block';
  loadQuestion();
}

function loadQuestion() {
  // Load current question
}

function nextQuestion() {
  // Process answer and move to next question
}

function retakeQuiz() {
  // Reset quiz and show the start screen
}
