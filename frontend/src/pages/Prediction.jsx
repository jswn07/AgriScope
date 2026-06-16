import { useState, useContext } from "react"
import { Upload, Leaf, Sparkles, CheckCircle } from "lucide-react"
import PageHeader from "../components/common/PageHeader"
import api from "../services/api"
import { AuthContext } from "../context/AuthContext"
import { savePrediction } from "../services/databaseService"
import { useNavigate } from "react-router-dom"

function Prediction() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [savedPredictionId, setSavedPredictionId] = useState(null)
  const { user } = useContext(AuthContext)
  const [error, setError] = useState("")
  const [predicting, setPredicting] = useState(false)
  const navigate = useNavigate()

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (!file) return

    setImage(file)
    setPreview(URL.createObjectURL(file))
    setResult(null) // Reset previous results when a new image is uploaded
    setSavedPredictionId(null)
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

      const predictionId = await savePrediction({
        userId: user.uid,
        prediction: response.data.prediction,
        rawClass: response.data.rawClass,
        topPredictions: response.data.top_predictions,
        confidence: response.data.confidence,
        imageName: image.name,
        createdAt: new Date().toISOString()
      })
      
      setSavedPredictionId(predictionId)
      
    } catch (err) {
      console.error(err)
      setError(err.message || "Something went wrong during prediction.")
    } finally {
      setPredicting(false)
    }
  }

  return (
    <div>
      <div
        className="
          max-w-4xl
          mx-auto
          bg-card
          border
          rounded-3xl
          p-8
        "
      >
        <PageHeader
          title="Crop Disease Detection"
          description="Upload a crop leaf image and let the AI model analyze it."
        />

        <label
          className="
            flex
            flex-col
            items-center
            justify-center
            border-2
            border-dashed
            border-primary/30
            rounded-2xl
            p-12
            cursor-pointer
            hover:bg-accent
            transition
          "
        >
          <Upload
            size={48}
            className="text-primary mb-4"
          />

          <p className="font-semibold">
            Click to upload image
          </p>

          <p className="text-sm text-muted-foreground mt-2">
            JPG, PNG, JPEG
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        {image && (
          <p className="mt-4 text-sm text-gray-600">
            Selected: {image.name}
          </p>
        )}

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="
              w-full
              h-96
              object-cover
              rounded-2xl
              border
              mt-6
            "
          />
        )}

        <button
          disabled={predicting}
          onClick={handlePredict}
          className="
            mt-6
            w-full
            bg-primary
            text-primary-foreground
            py-4
            rounded-xl
            font-semibold
            hover:opacity-90
            transition
            disabled:opacity-50
          "
        >
          {predicting ? (
            "Analyzing Image..."
          ) : (
            "Analyze Crop"
          )}
        </button>

        {error && (
          <p className="text-red-500 mt-4 font-medium">
            {error}
          </p>
        )}

        {result && (
          <div
            className="
              mt-8
              bg-card
              border
              rounded-2xl
              p-6
            "
          >
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle
                className="text-primary"
                size={28}
              />
              <h2 className="text-2xl font-bold">
                Prediction Result
              </h2>
            </div>

            <p className="text-lg mb-3">
              <span className="font-semibold">
                Disease:
              </span>{" "}
              {result.prediction}
            </p>

            <p className="text-lg">
              <span className="font-semibold">
                Confidence:
              </span>{" "}
              {result.confidence}%
            </p>

            {savedPredictionId && (
              <button
                onClick={() => navigate(`/prediction/${savedPredictionId}`)}
                className="
                  mt-6
                  w-full
                  border
                  border-primary
                  text-primary
                  py-3
                  rounded-xl
                  font-medium
                  hover:bg-primary
                  hover:text-primary-foreground
                  transition
                "
              >
                View Full Report
              </button>
            )}
          </div>
        )}

        {result?.top_predictions && (
          <div className="mt-6 bg-white rounded-xl shadow-md p-6 border">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles
                size={22}
                className="text-primary"
              />
              <h2 className="text-xl font-semibold">
                Top Predictions
              </h2>
            </div>
            
            {result.top_predictions.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{item.class}</span>
                  <span className="font-medium text-primary">{item.confidence}%</span>
                </div>
                <div
                  className="
                    w-full
                    bg-muted
                    rounded-full
                    h-3
                  "
                >
                  <div
                    className="
                      bg-primary
                      h-3
                      rounded-full
                      transition-all
                    "
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