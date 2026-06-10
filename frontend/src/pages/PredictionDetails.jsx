import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPredictionById } from "../services/databaseService"
import diseaseData from "../data/diseaseData.json"

function PredictionDetails() {
  const disease = diseaseData[prediction.rawClass]
  const { id } = useParams()
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

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-4">{prediction.prediction}</h1>
        <p>Confidence: {prediction.confidence}%</p>
        <p>Uploaded: {prediction.imageName}</p>
        <p>Date: {prediction.createdAt}</p>

        {disease && (
          <div className="mt-6 border-t pt-6">
            <h2 className="text-2xl font-bold mb-4">Disease Information</h2>
            <p className="mb-4">{disease.description}</p>

            <h3 className="font-bold">Symptoms</h3>
            <ul className="list-disc ml-6 mb-4">
              {disease.symptoms.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3 className="font-bold">Treatment</h3>
            <ul className="list-disc ml-6 mb-4">
              {disease.treatment.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3 className="font-bold">Prevention</h3>
            <ul className="list-disc ml-6">
              {disease.prevention.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default PredictionDetails