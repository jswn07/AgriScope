from fastapi import APIRouter
from pydantic import BaseModel
from services.knowledge_service import search_disease

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
def chat(request: ChatRequest):
    disease = search_disease(request.message)

    if disease:
        response = f"""
Disease: {disease['name']}

Description:
{disease['description']}

Treatment:
{", ".join(disease['treatment'])}
"""
        return {"response": response}

    return {"response": "I could not find information about that disease."}