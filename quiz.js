const quizData = [
    {
        question: "What is the main focus of this website?",
        choices: [
            "Climate change awareness",
            "Academic poverty and educational inequality",
            "Technology in education",
            "Social media literacy"
        ],
        correct: 1
    },
    {
        question: "What is one of the main causes of academic poverty?",
        choices: [
            "Overpopulation",
            "Poverty and limited resources",
            "Lack of student motivation",
            "Overuse of technology in schools"
        ],
        correct: 1
    },
    {
        question: "How does poor education affect job opportunities?",
        choices: [
            "It increases job security",
            "It leads to limited job opportunities and lower income",
            "It ensures everyone gets equal pay",
            "It has no effect on employment"
        ],
        correct: 1
    },
    {
        question: "What can schools do to reduce academic poverty?",
        choices: [
            "Limit access to technology",
            "Increase tuition fees",
            "Provide scholarships and resources",
            "Make education optional"
        ],
        correct: 2
    },
    {
        question: "Why is education important in reducing inequality?",
        choices: [
            "It guarantees wealth for everyone",
            "It creates opportunities for social mobility",
            "It removes all forms of discrimination",
            "It eliminates the need for jobs"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded, running script...");

    if (document.getElementById("quiz")) {
        displayQuestion();
    } else {
        console.error("Quiz container NOT found! Check HTML.");
    }
});

function displayQuestion() {
    const questionText = document.getElementById("questionText");
    const choicesContainer = document.getElementById("choicesContainer");
    const nextBtn = document.getElementById("nextBtn");

    if (!questionText || !choicesContainer || !nextBtn) {
        console.error("One or more quiz elements are missing in HTML.");
        return;
    }

    questionText.textContent = quizData[currentQuestion].question;
    choicesContainer.innerHTML = ""; // Clear previous choices

    quizData[currentQuestion].choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.classList.add("choice-btn");
        button.textContent = choice;
        button.onclick = () => checkAnswer(index, button);
        choicesContainer.appendChild(button);
    });

    document.getElementById("nextBtn").classList.add("hidden"); // Hide Next button initially
    document.getElementById("nextBtn").disabled = true;
}

function checkAnswer(selectedIndex, button) {
    const correctIndex = quizData[currentQuestion].correct;
    const resultMessage = document.createElement("p");
    resultMessage.style.fontSize = "1.5rem";
    resultMessage.style.marginTop = "15px";

    if (selectedIndex === correctIndex) {
        button.classList.add("correct");
        score++;
        resultMessage.textContent = "✅ Correct! 😃";
        resultMessage.style.color = "green";
    } else {
        button.classList.add("incorrect");
        resultMessage.textContent = "❌ Incorrect! 😢";
        resultMessage.style.color = "red";
    }

    document.getElementById("choicesContainer").appendChild(resultMessage);
    document.querySelectorAll(".choice-btn").forEach(btn => btn.disabled = true);
    document.getElementById("nextBtn").disabled = false;
    document.getElementById("nextBtn").classList.remove("hidden");
}

document.getElementById("nextBtn").addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        displayQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = `
        <h2>Your score: ${score} out of ${quizData.length} 🎯</h2>
    `;

    document.getElementById("restartBtn").addEventListener("click", () => {
        currentQuestion = 0;
        score = 0;
        displayQuestion();
    });
}
