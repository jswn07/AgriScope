import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-green-600 mb-6">
          AGRIMAIN
        </h1>

        <p className="text-xl text-gray-700 mb-8">
          AI Powered Agriculture Platform
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="bg-white border px-6 py-3 rounded-lg"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home