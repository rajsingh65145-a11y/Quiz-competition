/**
 * QUIZ COMPETITION - CLIENT LOGIC & TIMER CONTROLLER
 * Handles question loading, option selection, state persistence, and timer.
 */

let index = 0;
let answers = [];

// Initialize answers array
try {
    const savedAnswers = localStorage.getItem("answers");
    if (savedAnswers) {
        answers = JSON.parse(savedAnswers);
    } else {
        answers = new Array(questions.length).fill(null);
    }
} catch (e) {
    answers = new Array(questions.length).fill(null);
}

// Ensure answers array length matches questions
if (!Array.isArray(answers) || answers.length !== questions.length) {
    answers = new Array(questions.length).fill(null);
}

/**
 * Load and render the question at current index
 */
function loadQuestion() {
    const q = questions[index];
    if (!q) return;

    // Render Question Statement with Gujarati font support
    const questionEl = document.getElementById("question");
    if (questionEl) {
        questionEl.innerText = `${index + 1}. ${q.question}`;
    }

    // Update Counter Badges
    const currentQEl = document.getElementById("currentQNum");
    const totalQEl = document.getElementById("totalQNum");
    if (currentQEl) currentQEl.innerText = index + 1;
    if (totalQEl) totalQEl.innerText = questions.length;

    // Render Options List
    const optionLabels = ["A", "B", "C", "D"];
    let optionsHtml = "";

    q.options.forEach((opt, i) => {
        const isSelected = (answers[index] === i);
        const letter = optionLabels[i] || `${i + 1}`;
        optionsHtml += `
            <label class="option-label ${isSelected ? 'selected' : ''}" onclick="selectOption(${i})">
                <input type="radio" name="option" value="${i}" ${isSelected ? 'checked' : ''}>
                <span class="option-key">${letter}</span>
                <span class="option-text">${opt}</span>
            </label>
        `;
    });

    const optionsContainer = document.getElementById("options");
    if (optionsContainer) {
        optionsContainer.innerHTML = optionsHtml;
    }

    // Update Progress Bar
    const progressBar = document.getElementById("progressBar");
    if (progressBar) {
        const progressPercent = ((index + 1) / questions.length) * 100;
        progressBar.style.width = `${progressPercent}%`;
    }

    // Update Navigation Button States
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    if (prevBtn) prevBtn.disabled = (index === 0);
    if (nextBtn) nextBtn.disabled = (index === questions.length - 1);
}

/**
 * Handle Option Selection
 * @param {number} optIndex - The selected option index (0-3)
 */
function selectOption(optIndex) {
    answers[index] = optIndex;

    // Visual feedback for selected option
    const labels = document.querySelectorAll(".option-label");
    labels.forEach((label, i) => {
        const radio = label.querySelector('input[type="radio"]');
        if (i === optIndex) {
            label.classList.add("selected");
            if (radio) radio.checked = true;
        } else {
            label.classList.remove("selected");
            if (radio) radio.checked = false;
        }
    });

    // Save answer state locally
    try {
        localStorage.setItem("answers", JSON.stringify(answers));
    } catch (e) {}
}

/**
 * Save current answer from DOM if user checked radio directly
 */
function saveAnswer() {
    const selected = document.querySelector('input[name="option"]:checked');
    if (selected) {
        answers[index] = parseInt(selected.value, 10);
        try {
            localStorage.setItem("answers", JSON.stringify(answers));
        } catch (e) {}
    }
}

/**
 * Navigate to next question
 */
function next() {
    saveAnswer();
    if (index < questions.length - 1) {
        index++;
        loadQuestion();
    }
}

/**
 * Navigate to previous question
 */
function prev() {
    saveAnswer();
    if (index > 0) {
        index--;
        loadQuestion();
    }
}

/**
 * Submit the complete quiz
 */
function submitQuiz() {
    saveAnswer();

    try {
        localStorage.setItem("answers", JSON.stringify(answers));
        localStorage.setItem("questions", JSON.stringify(questions));
    } catch (e) {}

    window.location.href = "result.html";
}

// Initial load
loadQuestion();

// ==========================================================================
// COUNTDOWN TIMER (30 Minutes)
// ==========================================================================
let totalSeconds = 30 * 60; // 30 minutes
let timeRemaining = totalSeconds;

// Restore remaining time if continuing active session
try {
    const savedTime = localStorage.getItem("quizTimeRemaining");
    if (savedTime && !isNaN(parseInt(savedTime, 10))) {
        timeRemaining = Math.max(1, parseInt(savedTime, 10));
    }
} catch (e) {}

const timerInterval = setInterval(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const formattedTime = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

    const timerEl = document.getElementById("timer");
    if (timerEl) {
        timerEl.innerText = formattedTime;
    }

    timeRemaining--;

    // Periodically sync remaining time
    if (timeRemaining % 5 === 0) {
        try {
            localStorage.setItem("quizTimeRemaining", timeRemaining.toString());
        } catch (e) {}
    }

    // Timeout condition
    if (timeRemaining < 0) {
        clearInterval(timerInterval);
        try {
            localStorage.removeItem("quizTimeRemaining");
        } catch (e) {}
        alert("Time Over!");
        submitQuiz();
    }
}, 1000);
