from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class User(BaseModel):
    email: str
    password: str


@router.post("/register")
def register(user: User):

    return {
        "message": "User registered successfully",
        "email": user.email
    }