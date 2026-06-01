from fastapi import APIRouter

router = APIRouter()


@router.get("/chat")
def chat():

    return {
        "response": "Chatbot route working"
    }