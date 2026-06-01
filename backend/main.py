from fastapi import FastAPI
from routes.auth import router as auth_router
from routes.chatbot import router as chatbot_router

app = FastAPI()


@app.get("/")
def home():
    return {
        "message": "AGRIMAIN backend running"
    }


app.include_router(auth_router)
app.include_router(chatbot_router)