document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('startQuizButton').addEventListener('click', startQuiz);
  document.getElementById('nextQuestion').addEventListener('click', nextQuestion);
  document.getElementById('retakeQuiz').addEventListener('click', retakeQuiz);
});

let currentQuestionIndex = 0;
let userScores = { Heavy: 0, Medium: 0, Light: 0 };
let gunScores = { Shotgun: 0, EnergySMG: 0, MassAR: 0, EnergyAR: 0, SniperRifle: 0, RailGun: 0 };

const questions = [
  { text: "How do you prefer to engage in a battle?", options: { A: "Up close and personal.", B: "From a safe distance with strategic shots.", C: "Absorbing damage and supporting teammates." }, score: { A: "Light", B: "Medium", C: "Heavy" } },
  { text: "What is your playstyle in FPS games?", options: { A: "Fast and aggressive.", B: "Balanced and supportive.", C: "Defensive and team-oriented." }, score: { A: "Light", B: "Medium", C: "Heavy" } },
  { text: "How do you handle high-pressure situations?", options: { A: "Take risks and push forward.", B: "Stay calm and strategize.", C: "Protect and support the team." }, score: { A: "Light", B: "Medium", C: "Heavy" } },
  { text: "Which role do you prefer in a team setting?", options: { A: "Leading the charge.", B: "Coordinating strategies.", C: "Providing backup and defense." }, score: { A: "Light", B: "Medium", C: "Heavy" } },
  { text: "How do you feel about high mobility in games?", options: { A: "Love it, always on the move.", B: "Moderate, moving when necessary.", C: "Prefer stability and defense." }, score: { A: "Light", B: "Medium", C: "Heavy" } },
  { text: "When facing a tough opponent, what’s your strategy?", options: { A: "Outmaneuver and outgun them.", B: "Plan and execute with precision.", C: "Absorb their attacks and outlast them." }, score: { A: "Light", B: "Medium", C: "Heavy" } },
  { text: "How important is a high kill/death ratio to you?", options: { A: "Very important, I aim to dominate.", B: "Somewhat important, balanced with objectives.", C: "Not important, team victory matters more." }, score: { A: "Light", B: "Medium", C: "Heavy" } },
  { text: "What type of weapons do you usually prefer?", options: { A: "High damage, short range.", B: "High precision, long range.", C: "Balanced, versatile range." }, score: { A: "Shotgun", B: "SniperRifle", C: "EnergySMG" } },
  { text: "How do you approach objectives in games?", options: { A: "Aggressively and head-on.", B: "Strategically, with a plan.", C: "Supportively, ensuring team success." }, score: { A: "Light", B: "Medium", C: "Heavy" } },
  { text: "Which describes your gaming style?", options: { A: "Risk-taker and thrill-seeker.", B: "Planner and thinker.", C: "Protector and supporter." }, score: { A: "Light", B: "Medium", C: "Heavy" } },
  { text: "What is your preferred weapon handling style?", options: { A: "High rate of fire, close combat.", B: "Precision shots, long distance.", C: "Versatile, all-around performance." }, score: { A: "EnergySMG", B: "RailGun", C: "MassAR" } },
  { text: "How do you react when plans go awry?", options: { A: "Adapt quickly and improvise.", B: "Stick to the plan and adjust as needed.", C: "Support the team and adjust the strategy." }, score: { A: "Light", B: "Medium", C: "Heavy" } },
  { text: "How do you prefer to be in combat?", options: { A: "In the thick of things, causing chaos.", B: "On the sidelines, making strategic decisions.", C: "At the back, making sure the team is protected." }, score: { A: "Light", B: "Medium", C: "Heavy" } },
  { text: "When playing a game, how do you handle setbacks?", options: { A: "Push through and try again.", B: "Analyze what went wrong and plan better.", C: "Support the team and keep morale high." }, score: { A: "Light", B: "Medium", C: "Heavy" } },
  { text: "What kind of missions do you enjoy most?", options: { A: "High-stakes, intense missions.", B: "Well-planned, strategic missions.", C: "Supportive, team-focused missions." }, score: { A: "Light", B: "Medium", C: "Heavy" } },
  { text: "How do you approach a new challenge?", options: { A: "Head-on and with enthusiasm.", B: "With a careful and thoughtful approach.", C: "With a focus on how it affects the team." }, score: { A: "Light", B: "Medium", C: "Heavy" } },
  { text: "What motivates you in a game?", options: { A: "Achieving personal victories.", B: "Strategic success and planning.", C: "Team success and support." }, score: { A: "Light", B: "Medium", C: "Heavy" } },
  { text: "What is your preferred type of game role?", options: { A: "Attacker or front-line fighter.", B: "Strategist or planner.", C: "Defender or support role." }, score: { A: "Light", B: "Medium", C: "Heavy" } },
  { text: "How do you feel about high-stakes situations?", options: { A: "Thrilled and excited.", B: "Calm and analytical.", C: "Focused on team survival." }, score: { A: "Light", B: "Medium", C: "Heavy" } },
  { text: "How do you prefer to be recognized for your contributions?", options: { A: "For my individual achievements.", B: "For my strategic impact.", C: "For my support to the team." }, score: { A: "Light", B: "Medium", C: "Heavy" } },
  { text: "When facing a new opponent, what’s your strategy?", options: { A: "Dive in and confront them.", B: "Observe and plan an approach.", C: "Prepare to support your team and adjust." }, score: { A: "Light", B: "Medium", C: "Heavy" } },
  { text: "What kind of environment do you thrive in?", options: { A: "Fast-paced and intense.", B: "Structured and strategic.", C: "Supportive and team-oriented." }, score: { A: "Light", B: "Medium", C: "Heavy" } },
  { text: "How do you handle being outnumbered?", options: { A: "Fight harder and faster.", B: "Think and plan strategically.", C: "Protect and support the team." }, score: { A: "Light", B: "Medium", C: "Heavy" } },
  { text: "How do you approach in-game communication?", options: { A: "Quick and direct commands.", B: "Strategic discussions.", C: "Supportive and encouraging." }, score: { A: "Light", B: "Medium", C: "Heavy" } }
];

function startQuiz() {
  document.getElementById('startQuiz').style.display = 'none';
  document.getElementById('quiz').style.display = 'block';
  showQuestion();
}

function showQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById('questionText').textContent = question.text;
  document.getElementById('answerA').textContent = question.options.A;
  document.getElementById('answerB').textContent = question.options.B;
  document.getElementById('answerC').textContent = question.options.C;
}

function nextQuestion() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  if (!selectedOption) return;

  const answerValue = selectedOption.value;
  const selectedScore = questions[currentQuestionIndex].score[answerValue];
  if (selectedScore === 'Light' || selectedScore === 'Medium' || selectedScore === 'Heavy') {
    userScores[selectedScore]++;
  } else {
    gunScores[selectedScore]++;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    calculateResults();
  }
}

function calculateResults() {
  document.getElementById('quiz').style.display = 'none';
  document.getElementById('results').style.display = 'block';

  // Determine the highest score for the chassis
  const chassis = Object.keys(userScores);
  const sortedChassis = chassis.sort((a, b) => userScores[b] - userScores[a]);
  const topChassis = sortedChassis[0];
  const topChassisScore = userScores[topChassis];
  const totalChassisScore = Object.values(userScores).reduce((a, b) => a + b, 0);
  const chassisPercentages = chassis.map(type => {
    return { type, percentage: (userScores[type] / totalChassisScore * 100).toFixed(2) };
  });

  // Determine the highest score for the guns
  const guns = Object.keys(gunScores);
  const sortedGuns = guns.sort((a, b) => gunScores[b] - gunScores[a]);
  const topGun = sortedGuns[0];
  const topGunScore = gunScores[topGun];
  const totalGunScore = Object.values(gunScores).reduce((a, b) => a + b, 0);
  const gunPercentages = guns.map(weapon => {
    return { weapon, percentage: (gunScores[weapon] / totalGunScore * 100).toFixed(2) };
  });

  // Display the chassis results
  let resultChassisHTML = '<h3>Chassis Type:</h3><ul>';
  chassisPercentages.forEach(({ type, percentage }) => {
    resultChassisHTML += `<li>${type}: ${percentage}%</li>`;
  });
  resultChassisHTML += '</ul>';
  document.getElementById('resultChassis').innerHTML = resultChassisHTML;

  // Display the gun results
  let resultWeaponsHTML = '<h3>Gun Type:</h3><ul>';
  gunPercentages.forEach(({ weapon, percentage }) => {
    resultWeaponsHTML += `<li>${weapon}: ${percentage}%</li>`;
  });
  resultWeaponsHTML += '</ul>';
  document.getElementById('resultWeapons').innerHTML = resultWeaponsHTML;

  // Display the images and summary
  const chassisImage = `<img src="images/${topChassis}.jpg" alt="${topChassis} Chassis">`;
  const summaryText = `We have thoroughly assessed your skills and temperament and think a ${topChassis} chassis is best for you. We also think you will do well with a ${topGun} as your primary weapon.`;

  document.getElementById('resultImages').innerHTML = `
    <div style="display: flex; justify-content: space-between;">
      <div>${chassisImage}</div>
    </div>
    <p>${summaryText}</p>
  `;
}

function retakeQuiz() {
  currentQuestionIndex = 0;
  userScores = { Heavy: 0, Medium: 0, Light: 0 };
  gunScores = { Shotgun: 0, EnergySMG: 0, MassAR: 0, EnergyAR: 0, SniperRifle: 0, RailGun: 0 };

  document.getElementById('results').style.display = 'none';
  document.getElementById('startQuiz').style.display = 'block';
}
