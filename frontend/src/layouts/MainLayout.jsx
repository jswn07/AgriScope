import Sidebar from "../components/layout/Sidebar"
import TopBar from "../components/layout/TopBar"
import { Outlet } from "react-router-dom"

function MainLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-12 py-8">
          <TopBar />
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default MainLayout