const slider = document.querySelector(".slider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const slideDescriptions = document.querySelectorAll(".slide-description");
const slidedesc = document.getElementById("slide-description");
const slideimg = document.getElementById("slide-image");

let currentIndex = 0;

const quiz = [
  {
    image: "assets/capname.PNG",
    desc: "This is the first screen of the quiz. Here, users are prompted to enter their name before they can proceed. Once they've provided their name, they will be able to start the quiz and view the scores.",
  },
  {
    image: "assets/cap1normal.PNG",
    desc: "This is the questions screen users will see when they land on the quiz app, featuring a timer, the number of questions, and options for them to choose from.",
  },
  {
    image: "assets/cap2Selected.PNG",
    desc: "When a user chooses an answer, the background will shift to a blue color, and the corresponding radio button will be marked as selected. This action will enable the 'Submit' button, allowing the user to confirm their answer.",
  },
  {
    image: "assets/cap2correct.PNG",
    desc: "When a user selects the correct answer, the background will change to green, and a tickmark will be displayed. Additionally, the 'Submit' button will be replaced with a 'Next' button, allowing the user to proceed to the next question.",
  },
  {
    image: "assets/cap4wrong.PNG",
    desc: "If a user selects the wrong answer, the background will turn red, and a cross icon will be displayed. Furthermore, the correct answer will be revealed to the user. As a penalty, the timer will be reduced to 30 seconds to add a time constraint for the subsequent questions.",
  },
  {
    image: "assets/capscore.PNG",
    desc: "After finishing all the questions, you'll see the 'Quiz Completed' page, where you can check your total score, correct answers, wrong answers, and any penalties.",
  },
  {
    image: "assets/scoreboard.PNG",
    desc: "On the previous page, you'll find a 'Score Board' button. Click it to check the scores and see who achieved the highest score among all quiz participants.",
  },
];

function showSlide(index) {
  const currentSlide = quiz[index];
  const slideDescription = slideDescriptions[0];
  const slideImage = document.getElementById("slide-image");

  slideDescription.textContent = currentSlide.desc;
  slideImage.src = currentSlide.image;
}
// Event listener for the "Next" button
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % quiz.length;
  showSlide(currentIndex);
});

// Event listener for the "Previous" button
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + quiz.length) % quiz.length;
  showSlide(currentIndex);
});

// Initial load of the first slide
showSlide(currentIndex);
