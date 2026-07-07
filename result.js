let username = localStorage.getItem("username");
let answers = JSON.parse(localStorage.getItem("answers"));
let questions = JSON.parse(localStorage.getItem("questions"));

document.getElementById("user").innerText = "Name: " + username;

let score = 0;

// score calculation
for (let i = 0; i < questions.length; i++) {
    if (answers[i] === questions[i].answer) {
        score++;
    }
}

document.getElementById("score").innerText =
    "Your Score: " + score + " / " + questions.length;

function gocertificate() {
    localStorage.setItem("score", score);
    window.location.href = "certificate.html";
}