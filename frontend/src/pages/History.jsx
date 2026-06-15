import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { getUserPredictions } from "../services/databaseService"
import { Link } from "react-router-dom"
import { formatDate } from "../utils/predictionUtils"

function History() {
  const { user } = useContext(AuthContext)
  const [predictions, setPredictions] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    async function fetchPredictions() {
      const data = await getUserPredictions(user.uid)
      setPredictions(data)
    }
    fetchPredictions()
  }, [user])

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-8">Prediction History</h1>

      <input
        type="text"
        placeholder="Search predictions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-3 rounded-lg w-full mb-6"
      />

      <div className="space-y-4">
        {predictions.filter(item => item.prediction.toLowerCase().includes(search.toLowerCase())).map((item) => (
          <Link to={`/prediction/${item.id}`} key={item.id} className="block">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <p>
                <strong>Prediction:</strong> {item.prediction}
              </p>
              <p>
                <strong>Confidence:</strong> {item.confidence}
              </p>
              <p className="text-sm text-gray-500">
                {formatDate(item.createdAt)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default History