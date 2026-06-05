from fastapi import APIRouter, UploadFile, File

router = APIRouter()

@router.post("/predict")
async def predict(file: UploadFile = File(...)):

    return {
        "filename": file.filename,
        "prediction": "Rice Disease",
        "confidence": "94%"
    }