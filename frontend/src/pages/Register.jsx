import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { registerUser } from "../services/authService"

function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  async function handleRegister(e) {
    e.preventDefault()
    try {
      await registerUser(email, password)
      setMessage("Account created successfully!")
      
      setTimeout(() => {
        navigate("/login")
      }, 1500)
    } catch (error) {
      console.log(error)
      setMessage(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-card border rounded-3xl shadow-xl p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Create Account</h2>
          <p className="text-muted-foreground mt-2">
            Start protecting your crops with AI.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
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
            Register
          </button>

          {message && (
            <p
              className={`text-center text-sm font-medium ${
                message.includes("successfully") ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?
            <Link to="/login" className="ml-2 text-primary font-semibold">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register