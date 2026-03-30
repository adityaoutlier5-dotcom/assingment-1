from io import BytesIO
from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.predictor import predict_disease

router = APIRouter()


@router.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid image format")

    content = await file.read()
    result = predict_disease(BytesIO(content))
    return result
