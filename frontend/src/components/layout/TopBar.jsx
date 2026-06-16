import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

function TopBar() {
  const { user } = useContext(AuthContext)

  return (
    <div className="flex justify-end mb-8">
      <div className="flex items-center gap-3 px-4 py-2 rounded-xl border bg-card">
        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
          {user?.email?.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm">
          {user?.email?.split("@")[0]}
        </span>
      </div>
    </div>
  )
}

export default TopBar