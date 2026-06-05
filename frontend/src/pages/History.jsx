import { useEffect, useState, useContext } from "react"

import { AuthContext } from "../context/AuthContext"
import { getUserPredictions } from "../services/databaseService"

function History() {
  const { user } = useContext(AuthContext)

  const [predictions, setPredictions] = useState([])

  useEffect(() => {
    async function fetchPredictions() {
      const data =
        await getUserPredictions(user.uid)

      setPredictions(data)
    }

    fetchPredictions()
  }, [user])

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-8">
        Prediction History
      </h1>

      <div className="space-y-4">
        {predictions.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <p>
              <span className="font-semibold">
                Prediction:
              </span>{" "}
              {item.prediction}
            </p>

            <p>
              <span className="font-semibold">
                Confidence:
              </span>{" "}
              {item.confidence}
            </p>

            <p>
              <span className="font-semibold">
                Image:
              </span>{" "}
              {item.imageName}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default History