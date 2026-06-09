from fastapi import APIRouter, UploadFile, File
from utils.image_preprocessing import preprocess_image
from services.model_service import predict_image


router = APIRouter()

@router.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        return {"error": "Please upload an image"}

    image = preprocess_image(file.file)
    return predict_image(image)