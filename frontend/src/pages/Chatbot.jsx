import { useState } from "react"
import axios from "axios"

function Chatbot() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])

  async function sendMessage() {
    if (!message.trim()) return

    const userMessage = {
      sender: "user",
      text: message
    }

    setMessages((prev) => [...prev, userMessage])

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/chat",
        {
          message
        }
      )

      const botMessage = {
        sender: "bot",
        text: response.data.response
      }

      setMessages((prev) => [...prev, botMessage])

      setMessage("")
    }

    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6">
          AGRIMAIN Chatbot
        </h1>

        <div className="h-96 overflow-y-auto border rounded-lg p-4 mb-4 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs ${
                  msg.sender === "user"
                    ? "bg-green-600 text-white"
                    : "bg-gray-300"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Ask something..."

            value={message}

            onChange={(e) =>
              setMessage(e.target.value)
            }

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