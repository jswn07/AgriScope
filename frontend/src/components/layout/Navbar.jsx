import { Link, NavLink } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

function Navbar() {
  const { user, logout } = useContext(AuthContext)

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-[#C5D89D]/40">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <Link
          to="/"
          className="text-4xl font-bold tracking-tight text-foreground"
        >
          AgriScope
        </Link>

        {!user ? (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-[#5C6452] hover:text-[#89986D] transition-colors"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-[#89986D] text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? `
                    text-[#2F3328]
                    font-semibold
                    border-b-2
                    border-[#89986D]
                    pb-1
                  `
                  : `
                    text-[#5C6452]
                    hover:text-[#2F3328]
                    transition-colors
                  `
              }
            >
              Dashboard
            </NavLink>

            <div
              className="
                px-3
                py-1
                rounded-full
                bg-[#C5D89D]/40
                text-sm
                font-medium
                text-[#2F3328]
              "
            >
              {user.email.split("@")[0]}
            </div>

            <button
              onClick={logout}
              className="
                border
                border-[#9CAB84]
                text-[#2F3328]
                px-4
                py-2
                rounded-lg
                hover:bg-[#C5D89D]/20
                transition-all
              "
            >
              Logout
            </button>
          </div>
        )}

      </div>
    </nav>
  )
}

export default Navbar