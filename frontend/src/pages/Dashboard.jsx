import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function Dashboard() {
  const { user } = useContext(AuthContext)

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">
            Logged In User
          </h2>

          <p className="text-gray-600">
            {user?.email}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">
            Predictions
          </h2>

          <p className="text-4xl font-bold text-green-600">
            0
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">
            Chat Messages
          </h2>

          <p className="text-4xl font-bold text-blue-600">
            0
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard