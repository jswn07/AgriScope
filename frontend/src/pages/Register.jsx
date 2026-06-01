import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../services/firebase"

function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    async function handleRegister(e) {
        e.preventDefault()
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            console.log(userCredential)
            setMessage("User registered successfully")
        } catch (error) {
            console.log(error)
            setMessage(error.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Register
                </h1>
                <form onSubmit={handleRegister} className="space-y-4">
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
                        Register
                    </button>
                    <p className="text-center text-sm text-gray-600">
                        {message}
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register