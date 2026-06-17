import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { LayoutDashboard, Leaf, History, MessageSquare } from "lucide-react"
import { NavLink } from "react-router-dom"
import { Link } from "react-router-dom"

function Sidebar() {
  const { user, logout } = useContext(AuthContext)

  const links = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard
    },
    {
      label: "Prediction",
      path: "/prediction",
      icon: Leaf
    },
    {
      label: "History",
      path: "/history",
      icon: History
    },
    {
      label: "Chatbot",
      path: "/chatbot",
      icon: MessageSquare
    }
  ]

  return (
    <aside className="w-64 border-r bg-card min-h-screen flex flex-col">
      <div className="p-6 pb-8">
        <Link to="/">
        <h1 className="text-4xl font-extrabold tracking-tight">
          AgriScope
        </h1>
        </Link>
      </div>

      <nav className="px-3">
        {links.map((link) => {
          const Icon = link.icon

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-4
                px-5
                py-4
                rounded-xl
                mb-2
                transition-all

                ${
                  isActive
                    ? `
                      bg-primary
                      text-primary-foreground
                      shadow-sm
                      font-semibold
                    `
                    : `
                      text-foreground/80
                      hover:bg-accent
                      hover:text-foreground
                    `
                }
              `
              }
            >
              <Icon
                size={22}
                strokeWidth={2}
              />

              <span className="text-base font-medium">
                {link.label}
              </span>
            </NavLink>
          )
        })}
      </nav>

      <div className="mt-auto p-4 border-t">
        <div className="mb-4">
          <p className="font-medium text-foreground">
            {user?.email?.split("@")[0]}
          </p>
          <p className="text-sm text-muted-foreground truncate">
            Member
          </p>
        </div>

        <button
          onClick={logout}
          className="
            w-full
            rounded-lg
            px-4
            py-2
            border
            text-foreground
            hover:bg-accent
            transition-all
          "
        >
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar