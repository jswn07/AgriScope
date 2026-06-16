import { useState, useEffect, useContext, useRef } from "react"
import { useSearchParams } from "react-router-dom"
import api from "../services/api"
import { AuthContext } from "../context/AuthContext"
import { saveChat } from "../services/databaseService"

function Chatbot() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I can help explain crop diseases, treatments and prevention methods."
    }
  ])
  const { user } = useContext(AuthContext)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const [searchParams] = useSearchParams()
  const disease = searchParams.get("disease")
  const bottomRef = useRef(null)

  useEffect(() => {
    if (disease) {
      setMessage(`Tell me about ${disease}`)
    }
  }, [disease])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  async function sendMessage() {
    if (!message.trim()) return
    setError("")
    setLoading(true)

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
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="max-w-4xl mx-auto bg-card border rounded-3xl p-6 h-[calc(100vh-120px)] flex flex-col overflow-hidden">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Agri Assistant</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Ask about diseases, symptoms, treatment and prevention.
          </p>
        </div>

        {disease && (
          <div className="mt-4 bg-primary/10 text-primary px-4 py-3 rounded-xl">
            Discussing: {disease}
          </div>
        )}

        <div className="flex-1 overflow-y-auto border rounded-3xl p-6 bg-muted/20 my-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-3 rounded-2xl max-w-2xl leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {error && (
          <p className="text-red-500 font-medium mb-4">
            {error}
          </p>
        )}

        <div className="flex gap-3 pt-3 border-t">
          <input
            type="text"
            placeholder="Ask something..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage()
              }
            }}
            className="flex-1 border rounded-2xl px-5 py-4 text-base bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            disabled={loading}
            onClick={sendMessage}
            className="bg-primary text-primary-foreground px-8 rounded-2xl font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => setMessage("What causes tomato blight?")}
            className="border rounded-full px-3 py-1 text-sm hover:bg-accent transition"
          >
            Causes
          </button>
          <button
            onClick={() => setMessage("How can I treat this disease?")}
            className="border rounded-full px-3 py-1 text-sm hover:bg-accent transition"
          >
            Treatment
          </button>
          <button
            onClick={() => setMessage("How can I prevent this disease?")}
            className="border rounded-full px-3 py-1 text-sm hover:bg-accent transition"
          >
            Prevention
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chatbot