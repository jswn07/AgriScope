import Sidebar from "../components/layout/Sidebar"
import { Outlet } from "react-router-dom"

function MainLayout() {
  return (
    <div className="flex">

      <Sidebar />

      <main
        className="
          flex-1
          min-h-screen
          bg-background
        "
      >
        <Outlet />
      </main>

    </div>
  )
}

export default MainLayout