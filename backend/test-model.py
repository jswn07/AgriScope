from utils.image_preprocessing import preprocess_image
from services.model_service import predict_image

with open("tomato_leaf_mold_00112.JPG", "rb") as f:
    image = preprocess_image(f)

result = predict_image(image)

print(result)