import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getPredictionById } from "../services/databaseService"
import PredictionReport from "../components/prediction/PredictionReport"
import diseaseData from "../data/diseaseData"
import { formatDate, getSeverity } from "../utils/predictionUtils"
import { getConfidenceColor } from "../utils/confidenceUtils"
import { generateDiseaseReport } from "../utils/pdfUtils"

function PredictionDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [prediction, setPrediction] = useState(null)

  useEffect(() => {
    async function loadPrediction() {
      const data = await getPredictionById(id)
      setPrediction(data)
    }
    loadPrediction()
  }, [id])

  if (!prediction) {
    return <div className="p-10">Loading...</div>
  }

  const disease = diseaseData[prediction.rawClass]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-5xl font-black tracking-tight">Disease Report</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Detailed analysis and treatment guidance.
        </p>
      </div>

      <button
        onClick={() => navigate("/history")}
        className="border rounded-xl px-4 py-2 hover:bg-accent transition"
      >
        ← Back to History
      </button>

      <PredictionReport
        prediction={prediction}
        disease={disease}
      />

      <div className="bg-card border rounded-3xl p-6">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className={`px-4 py-2 rounded-full font-semibold ${getConfidenceColor(prediction.confidence)}`}>
            {getSeverity(prediction.confidence)}
          </span>

          <span className="px-4 py-2 rounded-full bg-accent text-foreground">
            {prediction.confidence}%
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Prediction Date</p>
            <p className="font-semibold">{formatDate(prediction.createdAt)}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Uploaded Image</p>
            <p className="font-semibold">{prediction.imageName}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate(`/chatbot?disease=${prediction.prediction}`)}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition"
          >
            Ask AI Assistant
          </button>

          <button
            onClick={() => generateDiseaseReport(prediction, disease)}
            className="bg-outline border px-6 py-3 rounded-2xl font-semibold hover:bg-muted transition"
          >
            Download PDF Report
          </button>
        </div>

        {prediction.topPredictions && (
          <div className="mt-6 border-t pt-6">
            <h2 className="text-3xl font-black mb-6">Model Confidence Breakdown</h2>
            {prediction.topPredictions.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>{item.class}</span>
                  <span>{item.confidence}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-primary h-3 rounded-full"
                    style={{ width: `${item.confidence}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PredictionDetails