let index = 0;
let answers = new Array(questions.length).fill(null);

function loadQuestion() {
    let q = questions[index];

    document.getElementById("question").innerText =
        (index + 1) + ". " + q.question;

    let optionsHtml = "";

    q.options.forEach((opt, i) => {
        optionsHtml += `
        <label>
            <input type="radio" name="option" value="${i}"
            ${answers[index] === i ? "checked" : ""}>
            ${opt}
        </label><br>
        `;
    });

    document.getElementById("options").innerHTML = optionsHtml;

    document.getElementById("progressBar").style.width =
((index+1)/questions.length)*100+"%";
}

function next() {
    saveAnswer();
    if (index < questions.length - 1) {
        index++;
        loadQuestion();
    }
}

function prev() {
    saveAnswer();
    if (index > 0) {
        index--;
        loadQuestion();
    }
}

function saveAnswer() {
    let selected = document.querySelector('input[name="option"]:checked');
    if (selected) {
        answers[index] = parseInt(selected.value);
    }
}

function submitQuiz() {
    saveAnswer();

    localStorage.setItem("answers", JSON.stringify(answers));
    localStorage.setItem("questions", JSON.stringify(questions));

    window.location.href = "result.html";
}

loadQuestion();

let time = 30 * 60; // 30 min

setInterval(() => {
    let min = Math.floor(time / 60);
    let sec = time % 60;

    document.getElementById("timer").innerText =
`${min}:${sec < 10 ? "0" + sec : sec}`;

    time--;

    if (time < 0) {
        alert("Time Over!");
        submitQuiz();
    }
}, 1000);

