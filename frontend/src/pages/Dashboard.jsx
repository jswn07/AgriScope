import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { getDashboardStats } from "../services/dashboardService"
import LoadingSpinner from "../components/common/LoadingSpinner"
import StatCard from "../components/dashboard/StatCard"
import PageHeader from "../components/common/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Leaf, MessageSquare, Activity, TrendingUp, Clock3, BarChart3 } from "lucide-react"
import { Link } from "react-router-dom"

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
    <div>
      <div className="max-w-7xl mx-auto px-6 pt-4 pb-8">
        <PageHeader
          title="Dashboard"
          description="Monitor predictions, disease trends, and activity."
        />

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">
            {error}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Predictions"
            value={stats.totalPredictions}
            color="text-primary"
            icon={Leaf}
          />

          <StatCard
            title="Chat Messages"
            value={stats.totalChats}
            color="text-primary"
            icon={MessageSquare}
          />

          <StatCard
            title="Avg Confidence"
            value={`${stats.averageConfidence}%`}
            color="text-primary"
            icon={Activity}
          />

          <StatCard
            title="Most Common"
            value={stats.mostCommonDisease}
            color="text-foreground"
            icon={TrendingUp}
          />
        </div>

        <Card className="mt-8 border-border shadow-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Clock3 size={20} className="text-primary" />
                Recent Predictions
              </CardTitle>
              <Link
                to="/history"
                className="text-primary text-sm hover:underline"
              >
                View All
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {stats.predictions?.length > 0 ? (
              stats.predictions.slice(0, 5).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-4 border-b last:border-0"
                >
                  <span className="font-medium text-foreground">
                    {item.prediction}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    {item.confidence}%
                  </span>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center py-16">
                <Leaf className="w-12 h-12 text-primary mb-4" />
                <p className="font-medium text-foreground">
                  No predictions yet
                </p>
                <p className="text-base text-muted-foreground mt-2">
                  Upload a crop image to get started.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-8 border-border shadow-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2 text-xl">
                <BarChart3 size={20} className="text-primary" />
                Most Predicted Diseases
              </CardTitle>
              <Link
                to="/history"
                className="text-primary text-sm hover:underline"
              >
                View History
              </Link>
            </div>
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
                    className="flex items-center justify-between py-4 border-b last:border-0"
                  >
                    <span className="font-medium text-foreground">
                      {disease}
                    </span>
                    <span className="h-9 w-9 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                      {count}
                    </span>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center py-16">
                  <Leaf className="w-12 h-12 text-primary mb-4" />
                  <p className="font-medium text-foreground">
                    No predictions yet
                  </p>
                  <p className="text-base text-muted-foreground mt-2">
                    Upload a crop image to get started.
                  </p>
                </div>
              )
            })()}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard