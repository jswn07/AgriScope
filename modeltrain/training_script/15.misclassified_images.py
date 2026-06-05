import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
import os

# 1. CONFIGURATION
BASE_DIR = r"D:\agrimain\modeltrain"
TEST_DIR = os.path.join(BASE_DIR, "split_data", "test")
MODEL_PATH = os.path.join(BASE_DIR, "models", "crop_model_phase2.keras")

IMG_SIZE = (224, 224)
BATCH_SIZE = 32

# 2. LOAD DATASET
print("\nLoading test dataset...")
test_ds = tf.keras.preprocessing.image_dataset_from_directory(
    TEST_DIR,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    shuffle=False
)
class_names = test_ds.class_names

# 3. LOAD MODEL
print("\nLoading trained model...")
model = tf.keras.models.load_model(MODEL_PATH)

# 4. GET PREDICTIONS
print("\nGenerating predictions...")
images_list = []
true_labels = []
predicted_labels = []
confidences = []

for images, labels in test_ds:
    # verbose=0 prevents it from printing a progress bar for every single batch
    predictions = model.predict(images, verbose=0)
    
    preds = np.argmax(predictions, axis=1)
    confs = np.max(predictions, axis=1)
    
    images_list.extend(images.numpy())
    true_labels.extend(labels.numpy())
    predicted_labels.extend(preds)
    confidences.extend(confs)

# 5. FIND WRONG PREDICTIONS
misclassified = [
    i for i in range(len(true_labels)) 
    if true_labels[i] != predicted_labels[i]
]

print(f"\nTotal Misclassified: {len(misclassified)}")

# 6. VISUALIZE
if len(misclassified) > 0:
    print("Plotting misclassified images...")
    
    # Ensures we don't crash if there are fewer than 9 mistakes
    num_images = min(9, len(misclassified)) 
    plt.figure(figsize=(12, 12))
    
    for i, idx in enumerate(misclassified[:num_images]):
        plt.subplot(3, 3, i + 1)
        plt.imshow(images_list[idx].astype("uint8"))
        
        true_class = class_names[true_labels[idx]]
        pred_class = class_names[predicted_labels[idx]]
        confidence = confidences[idx]
        
        plt.title(
            f"TRUE: {true_class}\nPRED: {pred_class}\nCONF: {confidence:.2f}",
            fontsize=10,
            fontweight='bold'
        )
        plt.axis("off")
        
    plt.tight_layout()
    plt.show()
else:
    print("Incredible! 0 misclassified images to display.")