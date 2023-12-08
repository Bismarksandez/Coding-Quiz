var timerElement = document.querySelector(".timer");
var questionText = document.querySelector(".question");
var optionsArray = document.querySelector(".option");
var startButton = document.querySelector(".startbtn");
var resultTab = document.querySelector(".result");
var finalScore = document.querySelector(".final-score");
var initials = document.querySelector(".initials");
var submitButton = document.querySelector(".submitbtn");
var entrySection = document.querySelector(".main");
var showQuestions = document.querySelector("#show");
var viewHighscorebtn =document.querySelector(".score")
var score = 0;
var timer;
var timerCount = 100;
var currentQuestionIndex = 0;


var questionAnswers = [
  {
    question: "Which of the following keywords is used to define a variable in Javascript?",
    options: ["var", "let", "Both A and B", "None of the above"],
    answer:  2
  },
  {
    question: "How can a datatype be declared to be a constant type?",
    options: ["var", "let", "const", "constant"],
    answer: 2
  },
  {
    question: "What keyword is used to check whether a given property is valid or not?",
    options: ["in", "is in", "exists", "lies"],
    answer: 0
  },
  {
    question: "Javascript is an _______ language?",
    options: ["Object-oriented", "Object-Based", "Procedu", "None of the above"],
    answer: 0
  }];



function startquiz() {
  entrySection.classList.add("hidden")
  
  timerCount = 80;
  startTimer();
  showQuestion()
}


function startTimer() {
  timer = setInterval(function(){
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount === 0) {
      clearInterval(timer);
      endquiz();
    }
  },1000)
}

function showQuestion() {
  showQuestions.classList.remove("hidden")
  var currentQuestion = questionAnswers[currentQuestionIndex];
  var questionNo = currentQuestionIndex + 1;
  questionText.textContent=currentQuestion.question;

  optionsArray.innerHTML = "";
  currentQuestion.options.forEach((option, index) => {
    var button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => selectedAnswer(index));
    optionsArray.appendChild(button);
  });
}

function selectedAnswer(selectedIndex) {
  var currentQuestion = questionAnswers[currentQuestionIndex];
  if (selectedIndex === currentQuestion.answer) {
    score++;
  }
  else {
    timerCount -= 10;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questionAnswers.length){
    showQuestion();
  }
  else {
    endquiz();
  }
}

function endquiz() {
  showQuestions.classList.add("hidden")
  resultTab.classList.remove("hidden");
  finalScore.textContent = score;
}

submitButton.addEventListener("click", function(event) {
  event.preventDefault();
  var highScore = score;
  var name = initials.value

  if (name === ""){
  window.alert("Please type your Initials")
  }
  else {
    localStorage.setItem("name", name)
    localStorage.setItem("score", highScore)
  }
});

function viewHighscore() {
  var highScore = localStorage.getItem("highScore")
  var name = localStorage.getItem("name")
  
}

viewHighscorebtn.addEventListener("click", viewHighscore);

startButton.addEventListener("click", startquiz);