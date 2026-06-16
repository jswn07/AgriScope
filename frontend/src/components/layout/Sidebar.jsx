import { LayoutDashboard, Leaf, History, MessageSquare } from "lucide-react"
import { NavLink } from "react-router-dom"

function Sidebar() {
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
    <aside className="w-72 border-r bg-card min-h-screen">
      <div className="p-6">
        <h1 className="text-3xl font-black tracking-tight text-foreground">
          AgriMain
        </h1>
      </div>

      <nav className="px-3">
        {links.map((link) => {
          const Icon = link.icon

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`
              }
            >
              <Icon size={18} />
              {link.label}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar