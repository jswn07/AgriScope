import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { loginUser } from "../services/authService"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    try {
      await loginUser(email, password)
      navigate("/dashboard")
    } catch (error) {
      console.log(error)
      setMessage(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-card border rounded-3xl shadow-xl p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="text-muted-foreground mt-2">Sign in to continue.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-14 px-4 rounded-2xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-14 px-4 rounded-2xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <button className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition">
            Login
          </button>

          {message && (
            <p className="text-center text-sm text-red-500">{message}</p>
          )}

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?
            <Link to="/register" className="ml-2 text-primary font-semibold">
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login