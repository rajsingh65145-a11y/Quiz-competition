const username = localStorage.getItem("username");
const studentClass = localStorage.getItem("class");
const roll = localStorage.getItem("roll");
const score = localStorage.getItem("score");

document.getElementById("certText").innerText =
    `${username}, आपने Quiz में ${score} marks score kiye hain!`;

function downloadCertificate() {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Certificate of Achievement", 40, 30);

    doc.setFontSize(14);
    doc.text("This is to certify that", 20, 60);


    doc.setFontSize(16);
    doc.text(username, 20, 80);


    doc.setFontSize(14);
    doc.text(`Class: ${studentClass}`, 20, 95);

    doc.text(`Roll No: ${roll}`, 20, 110);


    doc.text(
        "has successfully completed the Quiz Competition",
        20,
        130
    );


    doc.text(`Score: ${score}/50`, 20, 150);


    doc.save("certificate.pdf");
}