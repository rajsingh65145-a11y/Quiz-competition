const username = localStorage.getItem("username");
const score = localStorage.getItem("score");

document.getElementById("certText").innerText =
    `${username}, आपने Quiz में ${score} marks score kiye hain!`;

function downloadCertificate() {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Certificate of Achievement", 40, 30);

    doc.setFontSize(14);
    doc.text(`This is to certify that`, 20, 60);

    doc.setFontSize(16);
    doc.text(username, 20, 80);

    doc.setFontSize(14);
    doc.text(`has successfully completed the Quiz Competition`, 20, 100);

    doc.text(`Score: ${score}`, 20, 120);

    doc.save("certificate.pdf");
}