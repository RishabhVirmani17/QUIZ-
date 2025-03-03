const questions = [
    {
        question: "What is the output of console.log(2 + 2)",
        answers: [{ text: "8", correct: false },
                  { text: "22", correct: false },
                  { text: "4", correct: true },
                  { text: "2", correct: false }]
    },
    {
        question: "Which of the following is not a JavaScript data type?",
        answers: [{ text: "Boolean", correct: false },
                  { text: "String", correct: false },
                  { text: "Float", correct: true },
                  { text: "Number", correct: false }]
    },
    {
        question: "What is the result of the  5 > 3 && 2 < 4 ?",
        answers: [{ text: "true", correct: true },
                  { text: "false", correct: false },
                  { text: "undefined", correct: false },
                  { text: "null", correct: false }]
    },
    {
        question: "What is the output of console.log(Hello + World) ?",
        answers: [{ text: "HelloWorld", correct: true },
                  { text: "Hello World", correct: false },
                  { text: "Hello + World", correct: false },
                  { text: "NaN", correct: false }]
    },
    {
        question: "Which method is used to remove the last element from an array?",
        answers: [{ text: "shift()", correct: false },
                  { text: "pop()", correct: true },
                  { text: "remove()", correct: false },
                  { text: "delete()", correct: false }]
    },
    {
        question: "What is the result of 10 % 3 ?",
        answers: [{ text: "3", correct: false },
                  { text: "1", correct: true },
                  { text: "0", correct: false },
                  { text: "10", correct: false }]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion()
}

function showQuestion() {

    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button); // Fixed variable name
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = "You scored " + score + " out of " + questions.length + " questions";
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
      showScore();
    }
}

nextButton.addEventListener("click", () => {
        if(currentQuestionIndex < questions.length) {
            handleNextButton();
        } else {
            startQuiz();
        }
    });

startQuiz();