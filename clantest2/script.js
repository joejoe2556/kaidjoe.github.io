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
  },
  // Tie-breaker questions
  {
    question: "If you could change one thing about the world, what would it be?",
    answers: { a: 'Make the world a more compassionate and caring place.', b: 'Create opportunities for everyone to be self-reliant and resourceful.', c: 'Bring joy and excitement to people’s lives.' },
    clans: { a: 'EmeraldHand', b: 'Grimbone', c: 'BubblegumViolence' }
  },
  {
    question: "What is your biggest strength?",
    answers: { a: 'Empathy and the ability to connect with others.', b: 'Resourcefulness and the ability to overcome obstacles.', c: 'Creativity and the ability to inspire others.' },
    clans: { a: 'EmeraldHand', b: 'Grimbone', c: 'BubblegumViolence' }
  },
  {
    question: "Which quality do you admire most in others?",
    answers: { a: 'Kindness and the ability to help others.', b: 'Ingenuity and the ability to solve problems.', c: 'Charisma and the ability to entertain.' },
    clans: { a: 'EmeraldHand', b: 'Grimbone', c: 'BubblegumViolence' }
  }
];

const clanDescriptions = {
  Grimbone: 'We\'re the Grimbone clan, sprung from the charred remnants of the old world. We\'re scavengers, living off the scraps raining from the hoity-toity upper cities. We created our mechs from the rubbish... our survival from the junk. Half Kailantian with an eye into the astral realm, half Trakarian mechanical whizzes. A strange blend, but it works for us. We keep the lands near the unions clean, wrestling with nightmares even those in the upper city softies dare not face. We ain\'t as pious as some, but we know the astral realm\'s a wild place. Evil and good both squat here. We\'re survivors, scavengers, and now, we\'re the last line of defense.',
  EmeraldHand: 'We are Emerald Hand. We once called Markling Upper City our home. We are two halves: one part Kailantian, connected to the astral realm, the other Trakarian, masters of science and machinery. We ventured out to protect and guard what others could not see. For Gaia, for the upper city, we became a moving tribe living amidst the radioactivity. Our new home is a testament to our commitment. Our faith in Gaia binds us, guiding us to see and consult with our spirit guardians.',
  BubblegumViolence: 'We are Bubblegum Violence. To the sleepy sheepy citizens, we\'re just a traveling circus. Clowns, acrobats? Assassins and freaks? And we never turn down the chance to put on a show. Just like there ain\'t a city that can keep out the rats... there ain\'t a place that we can\'t reach. We don\'t like details. It\'s more fun when things are a surprise. We are Bubblegum Violence, dancing in the eye of the storm, life is a circus of madness and we\'ll always perform! If we\'re going out, we\'re going out with a bang! BOOM! The client returns to see if her dogs are still alive. She requests an encore. She asks if the job is too crazy. But nothing is crazier than we are.',
};

const clanImages = {
  Grimbone: 'images/grimbone.png',
  EmeraldHand: 'images/emeraldhand.png',
  BubblegumViolence: 'images/bubblegumviolence.png'
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
  // Ensure the text color is black for the questions
  document.getElementById('questionText').style.color = 'black';
  document.querySelectorAll('label').forEach(label => label.style.color = 'black');
}

function nextQuestion() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (selectedAnswer) {
    const answerValue = selectedAnswer.value;
    const clan = questions[currentQuestionIndex].clans[answerValue];
    userScores[clan]++;
    currentQuestionIndex++;
    
    // Debugging: log currentQuestionIndex and question length
    console.log('Current question index:', currentQuestionIndex);
    console.log('Total questions:', questions.length);

    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      handleTieBreaker();
    }
  } else {
    alert('Please select an answer.');
  }
}

function handleTieBreaker() {
  const maxScore = Math.max(...Object.values(userScores));
  const leadingClans = Object.keys(userScores).filter(clan => userScores[clan] === maxScore);
  
  console.log('Leading clans for tie-breaker:', leadingClans); // Debugging: log leading clans

  if (leadingClans.length === 1) {
    showResult(leadingClans[0]);
  } else {
    // Show the first tie-breaker question
    document.getElementById('questionText').textContent = questions[currentQuestionIndex].question;
    document.getElementById('answerA').textContent = questions[currentQuestionIndex].answers.a;
    document.getElementById('answerB').textContent = questions[currentQuestionIndex].answers.b;
    document.getElementById('answerC').textContent = questions[currentQuestionIndex].answers.c;
    document.getElementById('nextQuestion').style.display = 'block';
  }
}

function retakeQuiz() {
  userScores = { Grimbone: 0, EmeraldHand: 0, BubblegumViolence: 0 };
  currentQuestionIndex = 0;
  document.getElementById('results').style.display = 'none';
  document.getElementById('startQuiz').style.display = 'block';
}

function showResult(clan) {
  console.log('Final Clan Result:', clan); // Debugging: log final clan result
  const totalQuestions = questions.length;
  const percentages = Object.fromEntries(
    Object.entries(userScores).map(([c, s]) => [c, (s / totalQuestions * 100).toFixed(2)])
  );

  console.log('Clan Percentages:', percentages); // Debugging: log clan percentages

  document.getElementById('resultClan').textContent = `You are part of the ${clan} clan!`;
  document.getElementById('resultImage').src = clanImages[clan];
  document.getElementById('resultDescription').textContent = clanDescriptions[clan];

  const resultPercentages = `
    <p>Grimbone: ${percentages.Grimbone}%</p>
    <p>Emerald Hand: ${percentages.EmeraldHand}%</p>
    <p>Bubblegum Violence: ${percentages.BubblegumViolence}%</p>
  `;

  document.getElementById('resultPercentages').innerHTML = resultPercentages;

  document.getElementById('quiz').style.display = 'none';
  document.getElementById('results').style.display = 'block';
}
