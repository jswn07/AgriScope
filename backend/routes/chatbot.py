from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
def chat(request: ChatRequest):

    user_message = request.message.lower()

    if "rice" in user_message:
        response = "Rice requires warm temperatures and good irrigation."

    elif "fertilizer" in user_message:
        response = "Nitrogen-rich fertilizers are commonly used."

    else:
        response = "AGRIMAIN chatbot received your message."

    return {
        "response": response
    }