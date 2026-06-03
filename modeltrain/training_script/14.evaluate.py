import tensorflow as tf
import os

BASE_DIR = r"D:\agrimain\modeltrain"

model = tf.keras.models.load_model(
    os.path.join(
        BASE_DIR,
        "models",
        "crop_model.keras"
    )
)

test_ds = tf.keras.preprocessing.image_dataset_from_directory(

    os.path.join(BASE_DIR,"split_data","test"),

    image_size=(224,224),

    batch_size=32
)

loss, accuracy = model.evaluate(test_ds)

print("\nTest Accuracy:", accuracy)
print("Test Loss:", loss)