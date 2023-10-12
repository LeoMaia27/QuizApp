const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const content = document.querySelector(".content");
const textFinish = document.querySelector(".textFinish");
const contentFinish = document.querySelector(".finish");
const spanQtd = document.querySelector(".spanQtd");
const buttonRestart = document.querySelector(".finish button");
const correctOrIncorrect = document.querySelector(".correctOrIncorrect");

import questions from './questions.js'; //questions retorna array de obj onde cada índice é uma question

let currentQuestion = 0;
let questionsCorrect = 0;

const loadQuestion = () => {
    spanQtd.innerHTML = `${currentQuestion + 1} / ${questions.length}`;
    const item = questions[currentQuestion];
    answers.innerHTML = "";
    question.innerHTML = item.question;

    item.answers.forEach(answer => {
        const div = document.createElement("div");

        div.innerHTML = `
        <button class="answer" data-correct="${answer.correct}">
        ${answer.option}
        </button>`;

        answers.appendChild(div);
    });

    document.querySelectorAll(".answer").forEach(item => {
        item.addEventListener("click", nextQuestion);
    })
}

const nextQuestion = event => {
    
    if (event.target.getAttribute("data-correct") === "true") {
        questionsCorrect++;
        correctOrIncorrect.style.background = "green";
    } 
    else {
        correctOrIncorrect.style.background = "red";
    }

    if (currentQuestion < questions.length - 1) { // verificando se é a ultima questão
        currentQuestion++;
        setTimeout(() => {
            loadQuestion();
            correctOrIncorrect.style.background = "gray";
        }, 2000);
    }
    else {
        setTimeout(() => finish(), 1500);
    }
}

const finish = () => {
    textFinish.innerHTML = questionsCorrect >= 8 ? 
        `Parabéns! Você acertou ${questionsCorrect} de ${questions.length}` :
        `Você acertou ${questionsCorrect} de ${questions.length}`;

    content.style.display = "none";
    contentFinish.style.display = "flex";
}

buttonRestart.onclick = () => {
    content.style.display = "flex";
    contentFinish.style.display = "none";
    correctOrIncorrect.style.background = "gray";

    currentQuestion = 0;
    questionsCorrect = 0;
    loadQuestion();
}

console.log(questions);

loadQuestion()