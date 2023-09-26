var currentURL = window.location.href;

let score = localStorage.getItem("score");
let correctAnswer = localStorage.getItem("correctcount");
let wrongAnswer = localStorage.getItem("wrongcount");

let memberDetails = JSON.parse(localStorage.getItem("members"));

let scoremessge = document.getElementById("scoremsg");
let scorepoints = document.getElementById("scorepoints");
let playername = localStorage.getItem("name");

if (score >= 40) {
  scoremessge.innerHTML = "Excellent work! You're a quiz pro.";
} else if (score >= 30 && score < 40) {
  scoremessge.innerHTML = "Great job! You're doing well.";
} else if (score >= 30 && score < 40) {
  scoremessge.innerHTML = "Nice effort! You're halfway there.";
} else if (score >= 30 && score < 40) {
  scoremessge.innerHTML = "You've got potential. Keep trying!";
} else {
  scoremessge.innerHTML = "Keep practicing! You're just getting started.";
}
scorepoints.innerHTML = `${playername} Your Score is ${score}`;

let main = document.getElementById("scoremain");

const messages = [
  `Out of 5 questions you got ${correctAnswer} correct and ${wrongAnswer} wrong answers.`,
  `Correct Answers Score : ${correctAnswer} x 10 = ${correctAnswer * 10}`,
  `Wrong answers : ${wrongAnswer} x 10 = ${wrongAnswer * 10}`,
  `Penalty : ${wrongAnswer} x 5 = ${wrongAnswer * 5}`,
  `Total Score : 50 - ${wrongAnswer * 10} - ${wrongAnswer * 5} = ${
    50 - wrongAnswer * 10 - wrongAnswer * 5
  }`,
];

const create = document.createElement("div");
create.id = "score_row";

messages.forEach((message, index) => {
  const msg = document.createElement("div");
  msg.textContent = message;

  if (index === 0) {
    msg.style.color = "#FF7900";
    msg.style.fontFamily = "monospace";
  }
  create.appendChild(msg);
});

main.appendChild(create);

if (currentURL.includes("#scoreboard")) {
  document.getElementById("scoreboard").style.display = "block";
  document.getElementById("scorecal").style.display = "none";
  onproceed();
}

function onproceed() {
  document.getElementById("scoreboard").style.display = "block";
  document.getElementById("scorecal").style.display = "none";
  const cardContainer = document.getElementById("card-container");
  const cardContainer1 = document.getElementById("card-container1");
  const highcard = document.createElement("div");
  const highscore = document.createElement("div");
  let maxscore = 0;
  let maxscorePlayerName = "";

  if (memberDetails != null) {
    memberDetails.forEach((content) => {
      const card = document.createElement("div");

      highcard.classList = "card1";
      card.className = "card";
      const userNameElement = document.createElement("div");
      userNameElement.textContent = content.userName;
      userNameElement.classList.add("cardname");

      const scoreElement = document.createElement("div");
      scoreElement.textContent = `(Score: ${content.score})`;
      scoreElement.classList.add("cardscore");
      if (content.score > maxscore && memberDetails.length >= 2) {
        maxscore = content.score;
        maxscorePlayerName = content.userName;
      }
      card.appendChild(userNameElement);
      card.appendChild(scoreElement);
      cardContainer.appendChild(card);
    });
    if (memberDetails.length >= 2) {
      highscore.textContent = `${maxscorePlayerName} scores highest score ${maxscore} out of all the players`;
      highscore.classList.add("cardname");
      highcard.appendChild(highscore);
      cardContainer1.appendChild(highcard);
    }
  } else {
    const nomembers = document.createElement("div");
    nomembers.textContent =
      "There are currently no members who have taken the quiz. Please take the quiz, and then come back to view the scores";
    nomembers.classList.add("nomem");
    cardContainer.appendChild(nomembers);
  }
}
