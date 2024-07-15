document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('startQuizButton').addEventListener('click', startQuiz);
  document.getElementById('nextQuestion').addEventListener('click', nextQuestion);
  document.getElementById('retakeQuiz').addEventListener('click', retakeQuiz);
});

let currentQuestionIndex = 0;
let userScores = { Grimbone: 0, EmeraldHand: 0, BubblegumViolence: 0 };

const questions = [
  {
    question: "What motivates you the most?",
    answers: { a: 'Helping others and making a positive impact on the community.', b: 'Overcoming challenges and finding new ways to survive and thrive.', c: 'Creating memorable experiences and having fun.' },
    clans: { a: 'EmeraldHand', b: 'Grimbone', c: 'BubblegumViolence' }
  },
  {
    question: "How do you prefer to spend your free time?",
    answers: { a: 'Volunteering for community service or spending time in nature.', b: 'Working on survival skills or tinkering with new inventions.', c: 'Attending events or trying out exciting activities.' },
    clans: { a: 'EmeraldHand', b: 'Grimbone', c: 'BubblegumViolence' }
  },
  {
    question: "What is your approach to problem-solving?",
    answers: { a: 'Collaborating with others and seeking advice from mentors.', b: 'Adapting to the situation and using innovative techniques.', c: 'Thinking outside the box and using creativity.' },
    clans: { a: 'EmeraldHand', b: 'Grimbone', c: 'BubblegumViolence' }
  },
  {
    question: "Which environment appeals to you the most?",
    answers: { a: 'Quiet parks and nature reserves.', b: 'Harsh landscapes that test your resilience and ingenuity.', c: 'Festivals and bustling urban areas.' },
    clans: { a: 'EmeraldHand', b: 'Grimbone', c: 'BubblegumViolence' }
  },
  {
    question: "What is your ideal form of adventure?",
    answers: { a: 'Participating in community outreach or conservation projects.', b: 'Exploring abandoned places or testing survival scenarios.', c: 'Going to music festivals or extreme sports events.' },
    clans: { a: 'EmeraldHand', b: 'Grimbone', c: 'BubblegumViolence' }
  },
  {
    question: "How do you handle challenges?",
    answers: { a: 'With patience and teamwork.', b: 'By adapting quickly and finding practical solutions.', c: 'With enthusiasm and adaptability.' },
    clans: { a: 'EmeraldHand', b: 'Grimbone', c: 'BubblegumViolence' }
  },
  {
    question: "What kind of legacy do you want to leave behind?",
    answers: { a: 'A legacy of kindness and community improvement.', b: 'A legacy of resilience and innovative problem-solving.', c: 'A legacy of exciting experiences and unforgettable moments.' },
    clans: { a: 'EmeraldHand', b: 'Grimbone', c: 'BubblegumViolence' }
  },
  {
    question: "What do you value most in a team?",
    answers: { a: 'Cooperation and mutual support.', b: 'Adaptability and resourcefulness.', c: 'Creativity and spontaneity.' },
    clans: { a: 'EmeraldHand', b: 'Grimbone', c: 'BubblegumViolence' }
  },
  {
    question: "How do you react to conflict?",
    answers: { a: 'Seeking a balanced and peaceful resolution.', b: 'Facing it head-on with resilience and innovation.', c: 'Turning it into an opportunity for excitement and change.' },
    clans: { a: 'EmeraldHand', b: 'Grimbone', c: 'BubblegumViolence' }
  },
  {
    question: "What is your preferred role in a group setting?",
    answers: { a: 'The leader who guides and supports others.', b: 'The strategist who plans and implements practical solutions.', c: 'The entertainer who keeps the group engaged and motivated.' },
    clans: { a: 'EmeraldHand', b: 'Grimbone', c: 'BubblegumViolence' }
  }
];

const clanDescriptions = {
  Grimbone: 'We\'re the Grimbone clan, sprung from the charred remnants of the old world. We\'re scavengers, living off the scraps raining from the hoity-toity upper cities. We created our mechs from the rubbish... our survival from the junk. Half Kailantian with an eye into the astral realm, half Trakarian mechanical whizzes. A strange blend, but it works for us. We keep the lands near the unions clean, wrestling with nightmares even those in the upper city softies dare not face. We ain\'t as pious as some, but we know the astral realm\'s a wild place. Evil and good both squat here. We\'re survivors, scavengers, and now, we\'re the last line of defense.',
  EmeraldHand: 'We are Emerald Hand. We once called Markling Upper City our home. We are two halves: one part Kailantian, connected to the astral realm, the other Trakarian, masters of science and machinery. We ventured out to protect and guard what others could not see. For Gaia, for the upper city, we became a moving tribe living amidst the radioactivity. Our new home is a testament to our commitment. Our faith in Gaia binds us, guiding us to see and consult with our spirit guardians.',
  BubblegumViolence: 'We are Bubblegum Violence. To the sleepy sheepy citizens, we\'re just a traveling circus. Clowns, acrobats? Assassins and freaks? And we never turn down the chance to put on a show. Just like there ain\'t a city that can keep out the rats... there ain\'t a place that we can\'t reach. We don\'t like details. It\'s more fun when things are a surprise. We are Bubblegum Violence, dancing in the eye of the storm, life is a circus of madness and we\'ll always perform! If we\'re going out, we\'re going out with a bang! BOOM! The client returns to see if her dogs are still alive. She requests an encore. She asks if the job is too crazy. But nothing is crazier than we are.',
};

const clanImages = {
  Grimbone: 'kaidjoe.github.io/clantest
/images/grimbone.png',
  EmeraldHand: 'kaidjoe.github.io/clantest
/images/emeraldhand.png',
  BubblegumViolence: 'kaidjoe.github.io/clantest
/images/bubblegumviolence.png'
};

function startQuiz() {
  document.getElementById('startQuiz').style.display = 'none';
  document.getElementById('quiz').style.display = 'block';
  showQuestion();
}

function showQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById('questionText').textContent = question.question;
  document.getElementById('answerA').textContent = question.answers.a;
  document.getElementById('answerB').textContent = question.answers.b;
  document.getElementById('answerC').textContent = question.answers.c;
}

function nextQuestion() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (selectedAnswer) {
    const answerValue = selectedAnswer.value;
    const clan = questions[currentQuestionIndex].clans[answerValue];
    userScores[clan]++;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResults();
    }
  } else {
    alert('Please select an answer.');
  }
}

function showResults() {
  document.getElementById('quiz').style.display = 'none';
  document.getElementById('results').style.display = 'block';

  const sortedClans = Object.entries(userScores).sort((a, b) => b[1] - a[1]);
  const [topClan, topScore] = sortedClans[0];
  const totalQuestions = questions.length;
  const percentages = sortedClans.map(([clan, score]) => ({
    clan,
    percentage: ((score / totalQuestions) * 100).toFixed(2)
  }));

  document.getElementById('resultClan').textContent = `${topClan} Clan`;
  document.getElementById('resultImage').src = clanImages[topClan];  // Set the clan image
  document.getElementById('resultDescription').textContent = clanDescriptions[topClan];
  document.getElementById('resultPercentages').innerHTML = percentages.map(({ clan, percentage }) => `
    <p>${clan}: ${percentage}%</p>
  `).join('');

  document.getElementById('retakeQuiz').style.display = 'block';
}

function retakeQuiz() {
  userScores = { Grimbone: 0, EmeraldHand: 0, BubblegumViolence: 0 };
  currentQuestionIndex = 0;
  document.getElementById('startQuiz').style.display = 'block';
  document.getElementById('results').style.display = 'none';
}
