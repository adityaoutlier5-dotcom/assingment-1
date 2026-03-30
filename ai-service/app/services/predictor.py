import numpy as np
from PIL import Image

from app.core.model_loader import CLASS_NAMES, get_model

TREATMENTS = {
    "Apple Scab": "Spray captan or myclobutanil and remove fallen leaves.",
    "Tomato Early Blight": "Use copper-based fungicide and maintain crop rotation.",
    "Potato Late Blight": "Apply mancozeb and avoid overhead irrigation.",
    "Healthy": "No disease detected; continue balanced nutrition and monitoring."
}


def predict_disease(file_bytes: bytes):
    model = get_model()
    image = Image.open(file_bytes).convert("RGB").resize((224, 224))
    arr = np.array(image) / 255.0
    arr = np.expand_dims(arr, axis=0)

    predictions = model.predict(arr)
    idx = int(np.argmax(predictions[0]))
    confidence = float(predictions[0][idx] * 100)
    disease = CLASS_NAMES[idx]

    return {
        "disease": disease,
        "confidence": round(confidence, 2),
        "treatment": TREATMENTS.get(disease, "Consult local agriculture officer.")
    }
