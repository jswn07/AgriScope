import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function Dashboard() {
  const { user, logout } = useContext(AuthContext)

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4">
          Dashboard
        </h1>

        <p className="mb-4">
          Logged in as:
          <span className="font-semibold ml-2">
            {user?.email}
          </span>
        </p>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Dashboard