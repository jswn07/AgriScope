import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { getDashboardStats } from "../services/dashboardService"
import LoadingSpinner from "../components/common/LoadingSpinner"
import StatCard from "../components/dashboard/StatCard"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"


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
    <div
      className="min-h-screen px-6 py-8"
      style={{
        backgroundColor: "#F6F0D7"
      }}
    >
      <div className="mb-10">
        <h1 className="text-4xl font-semibold tracking-tight text-[#2F3328]">
          Dashboard
        </h1>
        <p className="mt-2 text-[#5C6452]">
          Monitor predictions, disease trends and activity.
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Predictions"
          value={stats.totalPredictions}
          color="text-[#89986D]"
        />

        <StatCard
          title="Chat Messages"
          value={stats.totalChats}
          color="text-[#89986D]"
        />

        <StatCard
          title="Avg Confidence"
          value={`${stats.averageConfidence}%`}
          color="text-[#89986D]"
        />

        <StatCard
          title="Most Common"
          value={stats.mostCommonDisease}
          color="text-[#2F3328]"
        />
      </div>

      <Card className="mt-8 border-[#C5D89D]/40 shadow-sm">
        <CardHeader>
          <CardTitle>Recent Predictions</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {stats.predictions
            ?.slice(0, 5)
            .map((item, index) => (
              <div
                key={index}
                className="border-b last:border-none py-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#2F3328]">
                    {item.prediction}
                  </span>
                  <span className="text-[#89986D] font-semibold">
                    {item.confidence}%
                  </span>
                </div>
              </div>
            ))}
        </CardContent>
      </Card>

      <Card className="mt-8 border-[#C5D89D]/40 shadow-sm">
        <CardHeader>
          <CardTitle>Most Predicted Diseases</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
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
                  className="flex justify-between items-center border-b last:border-none py-3"
                >
                  <span>{disease}</span>
                  <span
                    className="
                      bg-[#C5D89D]
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      font-medium
                    "
                  >
                    {count}
                  </span>
                </div>
              ))
            ) : (
              <div className="py-10 text-center">
                <p className="text-[#5C6452]">
                  No predictions available yet.
                </p>
              </div>
            )
          })()}
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard