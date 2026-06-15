import jsPDF from "jspdf"

export function generateDiseaseReport(prediction, disease) {
  const doc = new jsPDF()

  doc.setFontSize(20)
  doc.text("AGRIMAIN Disease Report", 20, 20)

  doc.setFontSize(14)
  doc.text(`Disease: ${prediction.prediction}`, 20, 40)
  doc.text(`Confidence: ${prediction.confidence}%`, 20, 50)
  doc.text(`Description: ${disease.description}`, 20, 70)

  doc.save("disease-report.pdf")
}