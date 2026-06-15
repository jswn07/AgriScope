import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { getDashboardStats } from "../services/dashboardService"
import LoadingSpinner from "../components/common/LoadingSpinner"
import StatCard from "../components/dashboard/StatCard"

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
        <StatCard
          title="Predictions"
          value={stats.totalPredictions}
          color="text-green-600"
        />

        <StatCard
          title="Chat Messages"
          value={stats.totalChats}
          color="text-blue-600"
        />

        <StatCard
          title="Avg Confidence"
          value={`${stats.averageConfidence}%`}
          color="text-purple-600"
        />

        <StatCard
          title="Most Common"
          value={stats.mostCommonDisease}
          color="text-lg font-bold"
        />
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

      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">
          Most Predicted Diseases
        </h2>
        {(() => {
          const counts = {}
          stats.predictions?.forEach((item) => {
            counts[item.prediction] = (counts[item.prediction] || 0) + 1
          })
          const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
          return sorted.length > 0 ? (
            sorted.map(([disease, count]) => (
              <div
                key={disease}
                className="flex justify-between border-b last:border-none py-3"
              >
                <span>{disease}</span>
                <span className="font-bold">{count}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No predictions yet.</p>
          )
        })()}
      </div>
    </div>
  )
}

export default Dashboard