import numpy as np
from PIL import Image
from tensorflow.keras.applications.efficientnet import preprocess_input


def preprocess_image(file):
    image = Image.open(file)
    image = image.convert("RGB")
    image = image.resize((224, 224))
    image = np.array(image)
    image = preprocess_input(image)
    image = np.expand_dims(image, axis=0)

    return image