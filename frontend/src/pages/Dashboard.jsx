import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { getDashboardStats } from "../services/dashboardService"
import LoadingSpinner from "../components/common/LoadingSpinner"

function Dashboard() {
  const { user } = useContext(AuthContext)

  const [stats, setStats] = useState({
    totalPredictions: 0,
    totalChats: 0,
    averageConfidence: 0,
    mostCommonDisease: "None"
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboardStats(user.uid)
        setStats(data)
      } catch (error) {
        console.error(error)
        setError("Failed to load dashboard data.")
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      loadDashboard()
    }
  }, [user])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>
      
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-semibold">
            Predictions
          </h3>
          <p className="text-4xl font-bold text-green-600">
            {stats.totalPredictions}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-semibold">
            Chat Messages
          </h3>
          <p className="text-4xl font-bold text-blue-600">
            {stats.totalChats}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-semibold">
            Avg Confidence
          </h3>
          <p className="text-4xl font-bold text-purple-600">
            {stats.averageConfidence}%
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-semibold">
            Most Common
          </h3>
          <p className="text-lg font-bold">
            {stats.mostCommonDisease}
          </p>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">
          Recent Predictions
        </h2>
        {stats.predictions
          ?.slice(0, 5)
          .map((item, index) => (
            <div
              key={index}
              className="border-b last:border-none py-3"
            >
              <div className="flex justify-between">
                <span>
                  {item.prediction}
                </span>
                <span>
                  {item.confidence}%
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Dashboard