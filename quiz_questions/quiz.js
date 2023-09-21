let currentQuestionIndex = 0;
let Score = 0;
let question = document.getElementById("ques");
let options = document.getElementById("opt");
let submitButton = document.getElementById("submit-button");
const lineBar = document.getElementById("line-bar");
let selectedbuttonindex = "";
let selectedOption = "";
let numquestion = 1;
let wrongAnswer = false;
let correctAnswersCount = 0;
let wrongAnswersCount = 0;

localStorage.setItem("correctcount", correctAnswersCount);
localStorage.setItem("wrongcount", correctAnswersCount);
localStorage.setItem("name", "");

const AllQuestions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["a. <script>", "b. <js>", "c. <scripting>", "d. <javascript>"],
    correctAnswer: "a. <script>",
  },
  {
    question: "What is the purpose of the 'NaN' value in JavaScript?",
    options: [
      "a. It stands for 'No Action Needed'",
      "b. It denotes 'Null and Nothing'",
      "c.  It signifies 'Negative Number'",
      "d. It represents 'Not a Number'",
    ],
    correctAnswer: "d. It represents 'Not a Number'",
  },
  {
    question:
      "What is the correct way to check the type variable x in JavaScript?",
    options: ["a. x", "b. typeOf x", "c. typeof x", "d. x.type"],
    correctAnswer: "c. typeof x",
  },
  {
    question: "What does 'DOM' stand for in JavaScript?",
    options: [
      "a. Document Object Model",
      "b. Dynamic Object Model",
      "c. Data Object Model",
      "d. Document Order Model",
    ],
    correctAnswer: "a. Document Object Model",
  },
  {
    question:
      "Which of the following methods is used to access HTML elements using Javascript?",
    options: [
      "a. getElementById()",
      "b. getElementByClassName()",
      "c. Both a and b",
      "d. None of the above",
    ],
    correctAnswer: "c. Both a and b",
  },
  {
    question: "Which of the following is not a valid JavaScript data type?",
    options: ["a. String", "b. Boolean", "c. Character", "d. Number"],
    correctAnswer: "c. Character",
  },
  {
    question: "Which of the following are advantages of JavaScript?",
    options: [
      "a. Less server interaction",
      "b. Increased interactivity",
      "c. Richer interfaces",
      "d. All of the above",
    ],
    correctAnswer: "d. All of the above",
  },
  {
    question: "What keyword is used to declare a variable in JavaScript?",
    options: ["a. var", "b. int", "c. declare", "d. variable"],
    correctAnswer: "a. var",
  },
  {
    question: "What is the correct way to write a comment in JavaScript?",
    options: [
      "a. /* This is a comment */",
      "b. // This is a comment",
      "c. <!-- This is a comment -->",
      "d. ''' This is a comment '''",
    ],
    correctAnswer: "b. // This is a comment",
  },
  {
    question:
      "What is the purpose of the addEventListener method in JavaScript?",
    options: [
      "a. To remove an event listener",
      "b. To add a new element to the DOM",
      "c. To attach an event handler to an element",
      "d.To create a new event",
    ],
    correctAnswer: "c. To attach an event handler to an element",
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    options: [
      "a. <script src='xxx.js'>",
      "b. <script href='xxx.js'>",
      "c. <script img='xxx.js'>",
      "d. None of the above",
    ],
    correctAnswer: "a. <script src='xxx.js'>",
  },
  {
    question:
      "Which of the following is used to create an object in JavaScript?",
    options: [
      "a. createObject()",
      "b. newObject()",
      "c. Object.create()",
      "d. object()",
    ],
    correctAnswer: "c. Object.create()",
  },
  {
    question:
      "What is the purpose of the 'break' statement in a JavaScript loop?",
    options: [
      "a. To terminate the loop and continue with the next iteration",
      "b. To skip the current iteration and continue with the loop",
      "c. To exit the loop entirely",
      "d. To pause the loop temporarily",
    ],
    correctAnswer:
      "a. To terminate the loop and continue with the next iteration",
  },
];

const uniqueRandomNumbers = [];
let Questions = [];

while (uniqueRandomNumbers.length < 5) {
  const randomInt = Math.floor(Math.random() * 12);
  if (!uniqueRandomNumbers.includes(randomInt)) {
    uniqueRandomNumbers.push(randomInt);
  }
}
for (let i = 0; i < uniqueRandomNumbers.length; i++) {
  Questions.push(AllQuestions[uniqueRandomNumbers[i]]);
}

let trackQuestion = 0;
const totalQuestions = Questions.length;

function onproceed() {
  let userName = document.getElementsByName("username");
  if (userName[0].value) {
    localStorage.setItem("name", userName[0].value);
    let mainblock = document.getElementById("mainblock");
    let nameblock = document.getElementById("nameblock");
    nameblock.style.display = "None";
    mainblock.style.display = "block";
    countdown();
    loadQuestions();
  }
}

function updateLineBar() {
  const percentageComplete = (trackQuestion / totalQuestions) * 100;
  percentageComplete > 0
    ? (document.getElementById("line-bar-container").style.display = "block")
    : "";
  lineBar.style.width = `${percentageComplete}%`;
}

function loadQuestions() {
  const currentQuestion = Questions[currentQuestionIndex];

  question.innerHTML = Questions[currentQuestionIndex].question;
  options.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const radio = document.createElement("button");
    radio.id = `button-${index}`;
    const radioButton = document.createElement("input");

    radioButton.type = "radio";
    radioButton.name = "options";
    radioButton.id = `option-${index}`;
    radioButton.value = option;

    const radioLabel = document.createElement("label");
    radioLabel.textContent = option;
    radioLabel.setAttribute("for", `option-${index}`);
    radio.classList.add("buttonstyles");

    radio.appendChild(radioLabel);
    radio.appendChild(radioButton);
    options.appendChild(radio);

    if (radioButton.checked) {
      radio.classList.add("radiochecked");
    } else {
      radio.classList.remove("radiochecked");
    }

    radio.addEventListener("click", () => {
      submitButton.disabled = false;
      submitButton.classList.add("submit_enable");
      document.querySelectorAll(".buttonstyles").forEach((button) => {
        button.classList.remove("radiochecked");
      });

      radio.classList.add("radiochecked");
      selectOption(index);
    });
  });
}

updateLineBar();
updateQuestionNumber();

function selectOption(index) {
  const radioButton = document.getElementById(`option-${index}`);
  radioButton.checked = true;
  selectedOption = Questions[currentQuestionIndex].options[index];
  selectedbuttonindex = index;
}

submitButton.addEventListener("click", () => onSubmit());

function onSubmit() {
  const submitOrNext = document.getElementById("submit-button").innerHTML;

  if (submitOrNext == "Submit") {
    const buttonindex = document.getElementById(
      `button-${selectedbuttonindex}`
    );

    const checkedRadioButton = document.querySelector(
      'input[name="options"]:checked'
    );
    const radioButtons = document.querySelectorAll(
      '.options input[type="radio"]'
    );

    radioButtons.forEach((radioButton) => {
      radioButton.disabled = true;
    });

    const buttons = document.querySelectorAll(".buttonstyles");
    buttons.forEach((buttonElement) => {
      buttonElement.classList.add("pointerevents");
    });

    const currentQuestion = Questions[currentQuestionIndex];

    const checkmarkIcon = document.createElement("span");
    checkmarkIcon.className = "checkmark-icon";
    checkmarkIcon.innerHTML = "&#10004;";

    const wrongIcon = document.createElement("span");
    wrongIcon.className = "wrong-icon";
    wrongIcon.innerHTML = "&#10006;";

    buttonindex.classList.remove("radiochecked");

    if (selectedOption == Questions[currentQuestionIndex].correctAnswer) {
      checkedRadioButton.style.display = "none";
      buttonindex.classList.add("correct_radiochecked");
      buttonindex.appendChild(checkmarkIcon);
      Score += 10;
      correctAnswersCount += 1;
      localStorage.setItem("correctcount", correctAnswersCount);
      localStorage.setItem("score", Score);
    } else {
      wrongAnswer = true;
      checkedRadioButton.style.display = "none";
      buttonindex.classList.add("incorrect_radiochecked");
      buttonindex.appendChild(wrongIcon);
      Score -= 5;
      wrongAnswersCount += 1;
      localStorage.setItem("wrongcount", wrongAnswersCount);
      localStorage.setItem("score", Score);
      const correctOption = document.querySelector(
        `input[value="${currentQuestion.correctAnswer}"]`
      );
      const parrentNode = correctOption.closest("button");
      if (parrentNode) {
        correctOption.style.display = "none";
        parrentNode.classList.add("correct_radiochecked");
        parrentNode.appendChild(checkmarkIcon);
      }
    }
    if (currentQuestionIndex < Questions.length - 1) {
      let submitId = document.getElementById("submit-button");
      submitId.innerHTML = "Next";
      submitButton.classList.add("next_enable");
    } else {
      document.getElementById("submit-button").style.display = "None";
      document.getElementById("complete-button").style.display = "Block";
    }
    trackQuestion++;
    if (trackQuestion <= totalQuestions) {
      updateLineBar();
    }
  } else if (submitOrNext == "Next") {
    currentQuestionIndex++;
    numquestion++;
    if (currentQuestionIndex < Questions.length) {
      loadQuestions();
      updateQuestionNumber();
    }
    let submitId = document.getElementById("submit-button");
    submitId.innerHTML = "Submit";
    submitButton.disabled = true;
    submitButton.classList.remove("submit_enable");
    submitButton.classList.remove("next_enable");
  }
}

function completeQuiz() {
  let memScoreDetails = [];
  memScoreDetails = JSON.parse(localStorage.getItem("members")) || [];

  memScoreDetails.push({
    userName: localStorage.getItem("name"),
    score: Score,
  });
  localStorage.setItem("members", JSON.stringify(memScoreDetails));
  window.location.href = "../quiz_score/quizscore.html";
}

var interval;

function countdown() {
  clearInterval(interval);
  interval = setInterval(function () {
    var timer = document.getElementById("js-timeout").innerHTML;
    timer = timer.split(":");
    var minutes = timer[0];
    var seconds = timer[1];
    seconds -= 1;
    if (wrongAnswer == true && !(minutes == "0" && seconds < 30)) {
      seconds = seconds - 30;
      wrongAnswer = false;
    }
    if (minutes < 0) return;
    else if (seconds < 0 && minutes != 0) {
      minutes -= 1;
      seconds = 59;
    } else if (seconds < 10 && length.seconds != 2) seconds = "0" + seconds;

    document.getElementById("js-timeout").innerHTML = minutes + ":" + seconds;

    if (minutes == 0 && seconds == 0) {
      clearInterval(interval);
      const timeupdiv = "";
      document.getElementsByClassName("quiz-card1")[0].style.display = "None";
      document.getElementsByClassName("main")[0].style.display = "None";
      document.getElementById("timeupcard").style.display = "Block";
    }
  }, 1000);
}

function updateQuestionNumber() {
  const initialNum = document.getElementById("questionnum");
  initialNum.innerHTML = `Question : ${numquestion}/${totalQuestions}`;
}
function tryagain() {
  window.location.href = "../index.html";
}
