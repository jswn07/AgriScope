import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getPredictionById } from "../services/databaseService"
import PredictionReport from "../components/prediction/PredictionReport"
import diseaseData from "../data/diseaseData"
import { formatDate, getSeverity } from "../utils/predictionUtils"
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
    <div className="min-h-screen bg-gray-100 p-10 space-y-6">
      <PredictionReport
        prediction={prediction}
        disease={disease}
      />

      <div className="mt-6 bg-white rounded-xl shadow-md p-6">
        <p>
          <strong>Reliability:</strong> {getSeverity(prediction.confidence)}
        </p>
        <p className="mt-2">
          <strong>Date:</strong> {formatDate(prediction.createdAt)}
        </p>
        <p className="mt-2">
          <strong>Uploaded:</strong> {prediction.imageName}
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <button
          onClick={() => navigate(`/chatbot?disease=${prediction.prediction}`)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg block w-full sm:w-auto text-center"
        >
          Ask Assistant
        </button>

        {prediction.topPredictions && (
          <div className="mt-6 border-t pt-6">
            <h2 className="text-2xl font-bold mb-4">Model Confidence Breakdown</h2>
            {prediction.topPredictions.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>{item.class}</span>
                  <span>{item.confidence}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
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