import { useState } from "react"
import api from "../services/api"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { savePrediction } from "../services/databaseService"

function Prediction() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const { user } = useContext(AuthContext)

  function handleImageChange(e) {
    const file = e.target.files[0]

    if (!file) return

    setImage(file)

    setPreview(URL.createObjectURL(file))
  }

  async function handlePredict() {
    if (!image) return

    const formData = new FormData()

    formData.append("file", image)

    try {
      const response = await api.post(
        "/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )

      setResult(response.data)

      await savePrediction({
        userId: user.uid,
        prediction: response.data.prediction,
        confidence: response.data.confidence,
        imageName: image.name,
        createdAt: new Date().toISOString()
      })
    }

    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6">
          Crop Prediction
        </h1>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-80 object-cover rounded-lg mb-4"
          />
        )}

        <button
          onClick={handlePredict}
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Predict
        </button>

        {result && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">
              Prediction Result
            </h2>

            <p>
              <span className="font-semibold">
                Prediction:
              </span>{" "}
              {result.prediction}
            </p>

            <p>
              <span className="font-semibold">
                Confidence:
              </span>{" "}
              {result.confidence}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Prediction