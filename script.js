"use strict";

// Question & Answer Data
const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Markup Language"],
        correctAnswer: 0
    },
    {
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets", "Creative Style Sheets"],
        correctAnswer: 0
    },
    {
        question: "What does JS stand for?",
        options: ["JavaStyle", "JavaScript", "JustScript", "JScript"],
        correctAnswer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const progressBar = document.getElementById('progress-bar');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const scoreContainer = document.getElementById('score-container');

// Displaying Questions
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => selectOption(index));
        optionsElement.appendChild(button);
    });
    updateProgressBar();
    highlightSelectedAnswer();
}

// Highlight selected option
function selectOption(index) {
    userAnswers[currentQuestionIndex] = index;
    highlightSelectedAnswer();
}

// Highlight the user's selected answer
function highlightSelectedAnswer() {
    const buttons = optionsElement.querySelectorAll('button');
    buttons.forEach((button, index) => {
        button.classList.remove('selected');
        if (userAnswers[currentQuestionIndex] === index) {
            button.classList.add('selected');
        }
    });
}

// Navigating Questions
prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        calculateScore();
        displayScore();
    }
});

// Update progress bar
const updateProgressBar = () => {
    progressBar.style.width = ((currentQuestionIndex + 1) / questions.length) * 100 + '%';
}

// Scoring
function calculateScore() {
    score = userAnswers.reduce((acc, answer, index) => {
        return acc + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
}

// Display score and feedback
function displayScore() {
    const percentage = (score / questions.length) * 100;
    let feedback;
    if (percentage >= 80) {
        feedback = "Excellent!";
    } else if (percentage >= 50) {
        feedback = "Good job!";
    } else {
        feedback = "Keep Practicing.";
    }
    scoreContainer.innerHTML = `You scored ${score} out of ${questions.length}. ${feedback}`;
    nextBtn.disabled = true;
}

// Initialize quiz
function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    nextBtn.disabled = false;
    loadQuestion();
    scoreContainer.innerHTML = '';
}

// Call initQuiz on page load
window.onload = initQuiz;
