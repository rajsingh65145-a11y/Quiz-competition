/**
 * QUIZ COMPETITION - CERTIFICATE CONTROLLER & PDF GENERATOR
 * Generates an official achievement certificate and exports crisp vector PDF.
 */

const username = localStorage.getItem("username") || "Student Candidate";
const studentClass = localStorage.getItem("class") || "Not Specified";
const roll = localStorage.getItem("roll") || "N/A";
const score = localStorage.getItem("score") || "0";
const totalQuestions = localStorage.getItem("totalQuestions") || "50";

// Format Current Date
const today = new Date();
const formattedDate = today.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
});

// Update DOM elements on page load
window.addEventListener("DOMContentLoaded", () => {
    const certTextEl = document.getElementById("certText");
    const nameEl = document.getElementById("certName");
    const classEl = document.getElementById("certClass");
    const rollEl = document.getElementById("certRoll");
    const scoreEl = document.getElementById("certScore");
    const dateEl = document.getElementById("certDate");

    if (certTextEl) {
        certTextEl.innerText = `has successfully completed the Economics Quiz Competition with an official score of ${score} / ${totalQuestions}.`;
    }

    if (nameEl) nameEl.innerText = username;
    if (classEl) classEl.innerText = studentClass;
    if (rollEl) rollEl.innerText = roll;
    if (scoreEl) scoreEl.innerText = `${score} / ${totalQuestions}`;
    if (dateEl) dateEl.innerText = formattedDate;
});

/**
 * Generate and download high-resolution landscape PDF certificate
 */
function downloadCertificate() {
    if (!window.jspdf || !window.jspdf.jsPDF) {
        alert("PDF generator is loading. Please try again in a moment.");
        return;
    }

    const { jsPDF } = window.jspdf;

    // A4 Landscape dimensions: 297mm width x 210mm height
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
    });

    const pageWidth = 297;
    const pageHeight = 210;

    // Clean white background
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // Elegant Outer Border: Soft Blue Accent #E2EAF2 (226, 234, 242)
    doc.setDrawColor(226, 234, 242);
    doc.setLineWidth(1.5);
    doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

    // Inner Fine Hairline Border: #3B6B9B (59, 107, 155)
    doc.setDrawColor(59, 107, 155);
    doc.setLineWidth(0.6);
    doc.rect(16, 16, pageWidth - 32, pageHeight - 32);

    // Corner decorative accents
    doc.setFillColor(59, 107, 155);
    const cornerSize = 4;
    doc.rect(16, 16, cornerSize, cornerSize, "F");
    doc.rect(pageWidth - 16 - cornerSize, 16, cornerSize, cornerSize, "F");
    doc.rect(16, pageHeight - 16 - cornerSize, cornerSize, cornerSize, "F");
    doc.rect(pageWidth - 16 - cornerSize, pageHeight - 16 - cornerSize, cornerSize, cornerSize, "F");

    // Header Badge / Subtitle
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(59, 107, 155); // #3B6B9B
    doc.text("STATE LEVEL ACADEMIC ASSESSMENT", pageWidth / 2, 38, { align: "center" });

    // Main Certificate Title
    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(38, 53, 71); // #263547
    doc.text("Certificate of Achievement", pageWidth / 2, 52, { align: "center" });

    // Subtitle
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(107, 123, 145); // #6B7B91
    doc.text("This is proudly presented to", pageWidth / 2, 70, { align: "center" });

    // Recipient Name
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(38, 53, 71); // #263547
    doc.text(username, pageWidth / 2, 88, { align: "center" });

    // Underline below recipient name
    const textWidth = doc.getTextWidth(username);
    doc.setDrawColor(226, 234, 242);
    doc.setLineWidth(1);
    doc.line((pageWidth / 2) - (textWidth / 2) - 10, 93, (pageWidth / 2) + (textWidth / 2) + 10, 93);

    // Narrative Text
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(107, 123, 145);
    const narrative = `for successfully completing the Economics & Commerce Quiz Competition examination,`;
    const narrative2 = `demonstrating exceptional academic proficiency and dedication.`;
    doc.text(narrative, pageWidth / 2, 108, { align: "center" });
    doc.text(narrative2, pageWidth / 2, 116, { align: "center" });

    // Score Highlight Box
    doc.setFillColor(244, 248, 252); // #F4F8FC
    doc.setDrawColor(226, 234, 242);
    doc.roundedRect((pageWidth / 2) - 45, 126, 90, 16, 3, 3, "FD");

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(59, 107, 155);
    doc.text(`Official Score: ${score} / ${totalQuestions}`, pageWidth / 2, 136.5, { align: "center" });

    // Details Grid (Class, Roll No, Date)
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(107, 123, 145);

    const leftColX = 50;
    const rightColX = pageWidth - 50;
    const metaY = 168;

    // Left Column: Candidate Metadata
    doc.text(`Class / Standard: ${studentClass}`, leftColX, metaY);
    doc.text(`Roll Number: ${roll}`, leftColX, metaY + 8);

    // Right Column: Issue Date & Accreditation
    doc.text(`Date of Issue: ${formattedDate}`, rightColX, metaY, { align: "right" });
    doc.text(`Status: Verified Assessment`, rightColX, metaY + 8, { align: "right" });

    // Footer Dividers & Signature Line
    doc.setDrawColor(226, 234, 242);
    doc.setLineWidth(0.8);
    doc.line(leftColX, metaY + 18, leftColX + 50, metaY + 18);
    doc.line(rightColX - 50, metaY + 18, rightColX, metaY + 18);

    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text("Authorized Examiner", leftColX + 25, metaY + 23, { align: "center" });
    doc.text("Academic Board", rightColX - 25, metaY + 23, { align: "center" });

    // Save PDF
    doc.save("certificate.pdf");
}
