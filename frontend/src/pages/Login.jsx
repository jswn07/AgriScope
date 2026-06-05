import { useState } from "react"
import { useNavigate } from "react-router-dom"
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Login
                </h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border rounded-lg"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border rounded-lg"
                    />
                    <button className="w-full bg-green-600 text-white p-3 rounded-lg">
                        Login
                    </button>
                    <p className="text-center text-sm text-gray-600">
                        {message}
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login