const questions = [
  {
    question: "What is HTML?",
    answers: ["A programming language", "HyperText Markup Language", "A database system"],
    correct: 1
  },
  {
    question: "What does CSS stand for?",
    answers: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System"],
    correct: 1
  },
  {
    question: "Which tag is used for the largest heading?",
    answers: ["<h6>", "<h1>", "<heading>"],
    correct: 1
  },
  {
    question: "What does JavaScript do?",
    answers: ["Styles web pages", "Adds interactivity to web pages", "Stores data on server"],
    correct: 1
  },
  {
    question: "Which is a correct way to start a list?",
    answers: ["<ol>", "<li>", "<list>"],
    correct: 0
  },
  {
    question: "What is the purpose of the <div> tag?",
    answers: ["Create a line break", "Create a container for content", "Create a table"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

function showQuestion() {
  const question = questions[currentQuestion];
  const questionDiv = document.getElementById('question');
  const answersDiv = document.getElementById('answers');
  const currentQuestionSpan = document.getElementById('current-question');
  
  currentQuestionSpan.textContent = currentQuestion + 1;
  questionDiv.textContent = question.question;
  answersDiv.innerHTML = '';
  selectedAnswer = null;
  
  question.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.textContent = answer;
    button.className = 'answer-btn';
    button.onclick = () => selectAnswer(index, button);
    answersDiv.appendChild(button);
  });
  
  document.getElementById('next-btn').disabled = true;
}

function selectAnswer(index, button) {
  selectedAnswer = index;
  const allButtons = document.querySelectorAll('.answer-btn');
  allButtons.forEach(btn => btn.classList.remove('selected'));
  button.classList.add('selected');
  document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
  if (selectedAnswer === null) {
    alert('Please select an answer!');
    return;
  }
  
  if (selectedAnswer === questions[currentQuestion].correct) {
    score++;
  }
  
  currentQuestion++;
  
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  document.getElementById('question').style.display = 'none';
  document.getElementById('answers').style.display = 'none';
  document.getElementById('next-btn').style.display = 'none';
  document.getElementById('progress').style.display = 'none';
  
  const scoreContainer = document.getElementById('score-container');
  scoreContainer.style.display = 'block';
  document.getElementById('final-score').textContent = score;
  
  const percentage = (score / questions.length) * 100;
  const messageElement = document.getElementById('score-message');
  
  if (percentage === 100) {
    messageElement.textContent = 'Perfect! You are a quiz master! 🎉';
  } else if (percentage >= 80) {
    messageElement.textContent = 'Great job! You did very well! 👏';
  } else if (percentage >= 60) {
    messageElement.textContent = 'Good effort! Keep practicing! 📚';
  } else {
    messageElement.textContent = 'Nice try! Review the material and try again! 💪';
  }
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  selectedAnswer = null;
  
  document.getElementById('question').style.display = 'block';
  document.getElementById('answers').style.display = 'block';
  document.getElementById('next-btn').style.display = 'block';
  document.getElementById('progress').style.display = 'block';
  document.getElementById('score-container').style.display = 'none';
  
  showQuestion();
}

document.getElementById('next-btn').addEventListener('click', nextQuestion);
document.getElementById('restart-btn').addEventListener('click', restartQuiz);

showQuestion();
