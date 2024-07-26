document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('startQuizButton').addEventListener('click', startQuiz);
  document.getElementById('nextQuestion').addEventListener('click', nextQuestion);
  document.getElementById('retakeQuiz').addEventListener('click', retakeQuiz);
});

let currentQuestionIndex = 0;
let userScores = { Grimbone: 0, EmeraldHand: 0, BubblegumViolence: 0 };

const questions = [
  {
    question: "What appeals to you the most?",
    answers: { a: 'Good performance', b: 'Good leadership' , c: 'Innovation'},
    clans: { a: 'BubblegumViolence', b: 'EmeraldHand', c: 'Grimbone' }
  },
  {
    question: "How do you prefer to spend your free time?",
    answers: {
      a: 'Volunteering for community service or spending time in nature.',
      b: 'Attending events or trying out exciting activities.',
      c: 'Tinkering with new inventions, discovering things.'
    },
    clans: {
      a: 'EmeraldHand',
      b: 'BubblegumViolence',
      c: 'Grimbone'
    }
  },
  {
    question: "What is your approach to problem-solving?",
    answers: {
      a: 'Thinking outside the box and using creativity.',
      b: 'Adapting to the situation and finding new approaches.',
      c: 'Collaborating with others and seeking advice from mentors.'
    },
    clans: {
      a: 'BubblegumViolence',
      b: 'Grimbone',
      c: 'EmeraldHand'
    }
  },
  {
    question: "Which environment appeals to you the most?",
    answers: {
      a: 'Quiet parks and nature reserves.',
      b: 'Festivals and bustling urban areas.',
      c: 'Harsh landscapes.'
    },
    clans: {
      a: 'EmeraldHand',
      b: 'BubblegumViolence',
      c: 'Grimbone'
    }
  },
  {
    question: "What is your ideal form of adventure?",
    answers: {
      a: 'Going to music festivals or extreme sports events.',
      b: 'Exploring abandoned places or testing survival scenarios.',
      c: 'Participating in community outreach or conservation projects.'
    },
    clans: {
      a: 'BubblegumViolence',
      b: 'Grimbone',
      c: 'EmeraldHand'
    }
  },
  {
    question: "How do you handle challenges?",
    answers: {
      a: 'With patience and teamwork.',
      b: 'By adapting quickly and finding practical solutions.',
      c: 'With enthusiasm and adaptability.'
    },
    clans: {
      a: 'EmeraldHand',
      b: 'Grimbone',
      c: 'BubblegumViolence'
    }
  },
  {
    question: "What do you want people to say in your funeral?",
    answers: {
      a: 'Kind and always wanted to help the community.',
      b: 'Resilient and always found new ways to solve problems.',
      c: 'Always sought exciting experiences and unforgettable moments.'
    },
    clans: {
      a: 'EmeraldHand',
      b: 'Grimbone',
      c: 'BubblegumViolence'
    }
  },
  {
    question: "What do you value most in a team?",
    answers: {
      a: 'Cooperation and mutual support.',
      b: 'Creativity and spontaneity.',
      c: 'Adaptability and resourcefulness.'
    },
    clans: {
      a: 'EmeraldHand',
      b: 'BubblegumViolence',
      c: 'Grimbone'
    }
  },
  {
    question: "How do you react to conflict?",
    answers: {
      a: 'Facing it head-on with resilience and innovation.',
      b: 'Turning it into an opportunity for excitement and change.',
      c: 'Seeking a balanced and peaceful resolution.'
    },
    clans: {
      a: 'Grimbone',
      b: 'BubblegumViolence',
      c: 'EmeraldHand'
    }
  },
  {
    question: "What is your preferred role in a group setting?",
    answers: {
      a: 'The leader who guides and supports others.',
      b: 'The entertainer who keeps the group engaged and motivated.',
      c: 'The strategist who plans and implements practical solutions.'
    },
    clans: {
      a: 'EmeraldHand',
      b: 'BubblegumViolence',
      c: 'Grimbone'
    }
  },
  // Tie-breaker questions
  {
    question: "If you could change one thing about the world, what would it be?",
    answers: {
      a: 'Create opportunities for everyone to be self-reliant and resourceful.',
      b: 'Bring joy and excitement to people’s lives.',
      c: 'Make the world a more compassionate and caring place.'
    },
    clans: {
      a: 'Grimbone',
      b: 'BubblegumViolence',
      c: 'EmeraldHand'
    }
  },
  {
    question: "What is your biggest strength?",
    answers: {
      a: 'Creativity and the ability to inspire others.',
      b: 'Resourcefulness and the ability to overcome obstacles.',
      c: 'Empathy and the ability to connect with others.'
    },
    clans: {
      a: 'BubblegumViolence',
      b: 'Grimbone',
      c: 'EmeraldHand'
    }
  },
  {
    question: "Which quality do you admire most in others?",
    answers: {
      a: 'Ingenuity and the ability to solve problems.',
      b: 'Charisma and the ability to entertain.',
      c: 'Kindness and the ability to help others.'
    },
    clans: {
      a: 'Grimbone',
      b: 'BubblegumViolence',
      c: 'EmeraldHand'
    }
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

  document.getElementById('resultClan').textContent = `You are best suited for the ${clan} clan!`;
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
