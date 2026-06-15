import { useState, useEffect, useContext } from "react"
import api from "../services/api"
import { AuthContext } from "../context/AuthContext"
import { saveChat } from "../services/databaseService"
import { useSearchParams } from "react-router-dom"


function Chatbot() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const { user } = useContext(AuthContext)
  const [error, setError] = useState("")

  const [searchParams] = useSearchParams()
  const disease = searchParams.get("disease")

  useEffect(() => {
    if (disease) {
      setMessage(`Tell me about ${disease}`)
    }
  }, [disease])

  async function sendMessage() {
    if (!message.trim()) return
    setError("")

    const userMessage = {
      sender: "user",
      text: message
    }

    setMessages((prev) => [...prev, userMessage])

    try {
      const response = await api.post("/chat", { message })

      const botMessage = {
        sender: "bot",
        text: response.data.response
      }

      setMessages((prev) => [...prev, botMessage])

      await saveChat({
        userId: user.uid,
        message,
        response: response.data.response,
        createdAt: new Date().toISOString()
      })

      setMessage("")
    } catch (err) {
      console.error(err)
      setError(err.message || "Something went wrong.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6">AGRIMAIN Chatbot</h1>

        <div className="h-96 overflow-y-auto border rounded-lg p-4 mb-4 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs ${
                  msg.sender === "user" ? "bg-green-600 text-white" : "bg-gray-300"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {error && (
          <p className="text-red-500 mb-4 font-medium">
            {error}
          </p>
        )}

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Ask something..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border rounded-lg p-3"
          />

          <button
            onClick={sendMessage}
            className="bg-green-600 text-white px-6 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chatbot