import { useState, useContext } from "react"
import api from "../services/api"
import { AuthContext } from "../context/AuthContext"
import { savePrediction } from "../services/databaseService"

function Prediction() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const { user } = useContext(AuthContext)
  const [error, setError] = useState("")
  const [predicting, setPredicting] = useState(false)

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (!file) return

    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  async function handlePredict() {
    if (!image) return
    setError("")
    setPredicting(true)

    const formData = new FormData()
    formData.append("file", image)

    try {
      const response = await api.post("/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      setResult(response.data)

      await savePrediction({
        userId: user.uid,
        prediction: response.data.prediction,
        rawClass: response.data.rawClass,
        topPredictions: response.data.top_predictions,
        confidence: response.data.confidence,
        imageName: image.name,
        createdAt: new Date().toISOString()
      })
    } catch (err) {
      console.error(err)
      setError(err.message || "Something went wrong during prediction.")
    } finally {
      setPredicting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Crop Prediction</h1>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />

        {image && (
          <p className="mb-4 text-sm text-gray-600">
            Selected: {image.name}
          </p>
        )}

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-80 object-cover rounded-lg mb-4"
          />
        )}

        <button
          disabled={predicting}
          onClick={handlePredict}
          className="bg-green-600 text-white px-6 py-3 rounded-lg disabled:opacity-50"
        >
          {predicting ? "Predicting..." : "Predict"}
        </button>

        {error && (
          <p className="text-red-500 mt-4 font-medium">
            {error}
          </p>
        )}

        {result && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Prediction Result</h2>
            <p>
              <span className="font-semibold">Prediction:</span> {result.prediction}
            </p>
            <p>
              <span className="font-semibold">Confidence:</span> {result.confidence}
            </p>
          </div>
        )}

        {result?.top_predictions && (
          <div className="mt-6 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Top Predictions</h2>
            {result.top_predictions.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>{item.class}</span>
                  <span>{item.confidence}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full"
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

export default Prediction