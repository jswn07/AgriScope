import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function Navbar() {
  const { user, logout } = useContext(AuthContext)

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <Link
        to="/"
        className="text-2xl font-bold text-green-600"
      >
        AGRIMAIN
      </Link>

      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-green-600"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="font-medium text-gray-700">
              {user.email}
            </span>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar