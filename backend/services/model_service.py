# pyrefly: ignore [untyped-import]
import tensorflow as tf
import numpy as np

MODEL_PATH = "model/model_phase1.keras"

model = tf.keras.models.load_model(MODEL_PATH)

CLASS_NAMES = [
    "apple_apple_scab",
    "apple_black_rot",
    "apple_cedar_apple_rust",
    "apple_healthy",
    "blueberry_healthy",
    "cherry_(including_sour)_healthy",
    "cherry_(including_sour)_powdery_mildew",
    "corn_(maize)_cercospora_leaf_spot_gray_leaf_spot",
    "corn_(maize)_common_rust_",
    "corn_(maize)_healthy",
    "corn_(maize)_northern_leaf_blight",
    "grape_black_rot",
    "grape_esca_(black_measles)",
    "grape_healthy",
    "grape_leaf_blight_(isariopsis_leaf_spot)",
    "orange_haunglongbing_(citrus_greening)",
    "peach_bacterial_spot",
    "peach_healthy",
    "pepper,_bell_bacterial_spot",
    "pepper,_bell_healthy",
    "potato_early_blight",
    "potato_healthy",
    "potato_late_blight",
    "raspberry_healthy",
    "soybean_healthy",
    "squash_powdery_mildew",
    "strawberry_healthy",
    "strawberry_leaf_scorch",
    "tomato_bacterial_spot",
    "tomato_early_blight",
    "tomato_healthy",
    "tomato_late_blight",
    "tomato_leaf_mold",
    "tomato_septoria_leaf_spot",
    "tomato_spider_mites_two_spotted_spider_mite",
    "tomato_target_spot",
    "tomato_tomato_mosaic_virus",
    "tomato_tomato_yellow_leaf_curl_virus"
]

def format_prediction(name):
    return name.replace("_", " ").title()

def predict_image(image):
    predictions = model.predict(image, verbose=0)[0]
    class_index = np.argmax(predictions)
    confidence = float(predictions[class_index])
    top_indices = np.argsort(predictions)[-3:][::-1]

    top_predictions = []
    for idx in top_indices:
        top_predictions.append({
            "class": format_prediction(CLASS_NAMES[idx]),
            "confidence": round(float(predictions[idx]) * 100, 2)
        })

    if confidence < 0.50:
        return {
            "prediction": "Unknown",
            "confidence": round(confidence * 100, 2),
            "message": "Low confidence prediction"
        }
        
    return {
        
        "prediction": format_prediction(CLASS_NAMES[class_index]),
        "rawClass": CLASS_NAMES[class_index],
        "confidence": round(confidence * 100, 2),
        "top_predictions": top_predictions
    }