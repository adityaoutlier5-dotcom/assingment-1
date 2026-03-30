import os
import numpy as np

from tensorflow.keras.models import load_model

MODEL = None
CLASS_NAMES = [
    "Apple Scab",
    "Tomato Early Blight",
    "Potato Late Blight",
    "Healthy"
]


class MockModel:
    def predict(self, image_batch):
        probs = np.array([[0.05, 0.15, 0.70, 0.10]])
        return probs


def get_model():
    global MODEL
    if MODEL is not None:
        return MODEL

    model_path = os.getenv("MODEL_PATH", "models/plant_disease_model.h5")
    if os.path.exists(model_path):
        MODEL = load_model(model_path)
    else:
        MODEL = MockModel()
    return MODEL
