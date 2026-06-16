import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { Search, ArrowRight, Calendar, Activity } from "lucide-react"
import { AuthContext } from "../context/AuthContext"
import { getUserPredictions } from "../services/databaseService"
import { formatDate } from "../utils/predictionUtils"
import { getConfidenceColor } from "../utils/confidenceUtils"


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

  const filteredPredictions = predictions.filter((item) =>
    item.prediction.toLowerCase().includes(search.toLowerCase())
  )

  const averageConfidence = predictions.length
    ? (
        predictions.reduce((sum, p) => sum + Number(p.confidence), 0) /
        predictions.length
      ).toFixed(1)
    : 0

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-black tracking-tight text-foreground">
          Prediction History
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Browse all previous disease analyses.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card border rounded-2xl p-6 flex items-center gap-4">
          <Activity size={32} className="text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Total</p>
            <h2 className="text-3xl font-black">{predictions.length}</h2>
          </div>
        </div>

        <div className="bg-card border rounded-2xl p-6 flex items-center gap-4">
          <Activity size={32} className="text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Avg Conf.</p>
            <h2 className="text-3xl font-black">{averageConfidence}%</h2>
          </div>
        </div>
      </div>

      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          placeholder="Search diseases..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid gap-5">
        {filteredPredictions.length === 0 ? (
          <div className="bg-card border rounded-2xl p-16 text-center">
            <h3 className="text-xl font-semibold mb-2">No Predictions Found</h3>
            <p className="text-muted-foreground">Try another search term.</p>
          </div>
        ) : (
          filteredPredictions.map((item) => (
            <Link key={item.id} to={`/prediction/${item.id}`}>
              <div className="bg-card border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {item.prediction}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={14} />
                      {formatDate(item.createdAt)}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.rawClass}
                    </p>
                  </div>

                  <div className={`px-3 py-1 rounded-full font-semibold ${getConfidenceColor(item.confidence)}`}>
                    {item.confidence}%
                  </div>
                </div>

                <div className="mt-4 flex justify-end items-center gap-2 text-primary font-medium">
                  View Report
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default History