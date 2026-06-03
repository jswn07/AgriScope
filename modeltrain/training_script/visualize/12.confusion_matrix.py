import os
import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import confusion_matrix, classification_report

# ==================================================
# CONFIG
# ==================================================

BASE_DIR = r"D:\agrimain\modeltrain"
VAL_DIR = os.path.join(BASE_DIR, "split_data", "val")
MODEL_PATH = os.path.join(BASE_DIR, "models", "crop_model_phase2.keras")

IMG_SIZE = (224, 224)
BATCH_SIZE = 32

# ==================================================
# LOAD DATASET
# ==================================================

print("\nLoading validation dataset...\n")

val_ds = tf.keras.preprocessing.image_dataset_from_directory(
    VAL_DIR,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    shuffle=False
)

class_names = val_ds.class_names
num_classes = len(class_names)

print(f"Total Classes: {num_classes}\n")

# ==================================================
# EXTRACT TRUE LABELS
# ==================================================

print("Extracting true labels...\n")

true_labels = np.concatenate([labels.numpy() for _, labels in val_ds])

# ==================================================
# LOAD MODEL
# ==================================================

print("Loading trained model...\n")

model = tf.keras.models.load_model(MODEL_PATH)

# ==================================================
# GENERATE PREDICTIONS
# ==================================================

print("Generating predictions...\n")

predictions = model.predict(val_ds)
predicted_labels = np.argmax(predictions, axis=1)

# ==================================================
# CONFUSION MATRIX
# ==================================================

print("Generating confusion matrix...\n")

cm = confusion_matrix(true_labels, predicted_labels)

# Normalized confusion matrix
cm_normalized = cm.astype('float') / cm.sum(axis=1)[:, np.newaxis]


# PLOT CONFUSION MATRIX

plt.figure(figsize=(24, 20))

sns.heatmap(
    cm_normalized,
    cmap='Blues',
    xticklabels=class_names,
    yticklabels=class_names,
    square=True,
    cbar=True
)

plt.title("Normalized Confusion Matrix", fontsize=22, fontweight='bold')
plt.xlabel("Predicted Label", fontsize=16, fontweight='bold')
plt.ylabel("True Label", fontsize=16, fontweight='bold')

plt.xticks(rotation=90, fontsize=8)
plt.yticks(rotation=0, fontsize=8)

plt.tight_layout()

# Save figure
SAVE_PATH = os.path.join(BASE_DIR, "models", "confusion_matrix.png")
plt.savefig(SAVE_PATH, dpi=300, bbox_inches='tight')
plt.show()

print(f"\nConfusion matrix saved to:\n{SAVE_PATH}")


# CLASSIFICATION REPORT

print("\nClassification Report:\n")

report = classification_report(true_labels, predicted_labels, target_names=class_names)
print(report)