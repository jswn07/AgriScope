import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/common/ProtectedRoute"
import Navbar from "./components/layout/Navbar"
import Chatbot from "./pages/Chatbot"
import Prediction from "./pages/Prediction"
import History from "./pages/History"
import PredictionDetails from "./pages/PredictionDetails"
import MainLayout from "./layouts/MainLayout"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
            </>
          }
        />

        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <Register />
            </>
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/prediction"
            element={<Prediction />}
          />

          <Route
            path="/history"
            element={<History />}
          />

          <Route
            path="/chatbot"
            element={<Chatbot />}
          />

          <Route
            path="/prediction/:id"
            element={<PredictionDetails />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App