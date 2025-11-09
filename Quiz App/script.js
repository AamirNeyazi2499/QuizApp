const questions = [
    {
        question: "Who is the goat of football?",
        answers: [
            { text: "Cristiano", correct: false },
            { text: "Messi", correct: true },
            { text: "Neymar", correct: false },
            { text: "Maradona", correct: false }
        ]
    },
    {
        question: "Which country has won the most FIFA World Cups?",
        answers: [
            { text: "Germany", correct: false },
            { text: "Argentina", correct: false },
            { text: "Brazil", correct: true },
            { text: "Italy", correct: false }
        ]
    },
    {
        question: "Who won the Ballon d'Or in 2021?",
        answers: [
            { text: "Cristiano Ronaldo", correct: false },
            { text: "Lionel Messi", correct: true },
            { text: "Robert Lewandowski", correct: false },
            { text: "Kylian Mbappé", correct: false }
        ]
    },
    {
        question: "Which player is known as 'El Fenomeno'?",
        answers: [
            { text: "Ronaldinho", correct: false },
            { text: "Ronaldo Nazário", correct: true },
            { text: "Kaká", correct: false },
            { text: "Romário", correct: false }
        ]
    },
    {
        question: "Which cricket player also known as KING?",
        answers: [
            { text: "Kohli", correct: true }, // Corrected answer
            { text: "Rohit", correct: false },
            { text: "Dhoni", correct: false },
            { text: "Sachin", correct: false }
        ]
    },
    {
        question: "Who scored the Hand of God goal?",
        answers: [
            { text: "Pelé", correct: false },
            { text: "Diego Maradona", correct: true },
            { text: "Messi", correct: false },
            { text: "Zinedine Zidane", correct: false }
        ]
    },
    {
        question: "Which Bollywood actor is also known as Mr. Perfectionist?",
        answers: [ // Corrected answers
            { text: "Shah Rukh Khan", correct: false },
            { text: "Salman Khan", correct: false },
            { text: "Aamir Khan", correct: true },
            { text: "Akshay Kumar", correct: false }
        ]
    },
    {
        question: "Which player has scored the most goals in World Cup history?",
        answers: [
            { text: "Miroslav Klose", correct: true },
            { text: "Pelé", correct: false },
            { text: "Ronaldo Nazário", correct: false },
            { text: "Messi", correct: false }
        ]
    },
    {
        question: "Which team is known as 'The Red Devils'?",
        answers: [
            { text: "Liverpool", correct: false },
            { text: "Manchester United", correct: true },
            { text: "Arsenal", correct: false },
            { text: "Bayern Munich", correct: false }
        ]
    },
    {
        question: "Who won the Golden Boot at the 2022 FIFA World Cup?",
        answers: [
            { text: "Lionel Messi", correct: false },
            { text: "Kylian Mbappé", correct: true },
            { text: "Olivier Giroud", correct: false },
            { text: "Julián Álvarez", correct: false }
        ]
    }
];

// FIX 1: Changed "question" to "questions"
const questionElement = document.getElementById("questions");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score  = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    // FIX 5: Removed redundant line
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        
        // FIX 2: Changed "append.appendChild" to "appendChild"
        answerButtons.appendChild(button); 

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();