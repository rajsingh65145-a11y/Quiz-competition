/**
 * QUIZ COMPETITION - RESULT EVALUATOR
 * Reads candidate responses, calculates score and accuracy, and prepares certificate data.
 */

const username = localStorage.getItem("username") || "Student Candidate";
let answers = [];
let questionsData = [];

try {
    answers = JSON.parse(localStorage.getItem("answers")) || [];
    questionsData = JSON.parse(localStorage.getItem("questions")) || [];
} catch (e) {
    answers = [];
    questionsData = [];
}

// Fallback to questions.js if questions was not in localStorage
if ((!questionsData || !questionsData.length) && typeof questions !== "undefined") {
    questionsData = questions;
}

const totalQuestions = questionsData.length || 50;

// Score calculation
let score = 0;
for (let i = 0; i < questionsData.length; i++) {
    if (answers && answers[i] === questionsData[i].answer) {
        score++;
    }
}

const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

// Update DOM elements on page load
window.addEventListener("DOMContentLoaded", () => {
    const userEl = document.getElementById("user");
    const scoreEl = document.getElementById("score");
    const percentageEl = document.getElementById("scorePercentage");

    if (userEl) {
        userEl.innerText = `Candidate: ${username}`;
    }

    if (scoreEl) {
        scoreEl.innerText = `${score} / ${totalQuestions}`;
    }

    if (percentageEl) {
        percentageEl.innerText = `${accuracy}% Overall Accuracy`;
    }
});

/**
 * Save final score and navigate to Certificate page
 */
function gocertificate() {
    try {
        localStorage.setItem("score", score.toString());
        localStorage.setItem("totalQuestions", totalQuestions.toString());
    } catch (e) {}

    window.location.href = "certificate.html";
}
