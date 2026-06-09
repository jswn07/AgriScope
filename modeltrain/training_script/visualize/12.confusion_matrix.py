import os
import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import confusion_matrix, classification_report, accuracy_score

# 1. CONFIGURATION
BASE_DIR = r"D:\agrimain\modeltrain"
TEST_DIR = os.path.join(BASE_DIR, "split_data", "test")
MODEL_PATH = os.path.join(BASE_DIR, "models", "model_phase.keras")
REPORT_PATH = os.path.join(BASE_DIR, "models", "classification_report.txt")
SAVE_PATH = os.path.join(BASE_DIR, "models", "confusion_matrix.png")

IMG_SIZE = (224, 224)
BATCH_SIZE = 32

# 2. LOAD TEST DATASET
print("\nLoading test dataset...\n")
test_ds = tf.keras.preprocessing.image_dataset_from_directory(
    TEST_DIR,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    shuffle=False
)

class_names = test_ds.class_names
num_classes = len(class_names)
print(f"Total Classes: {num_classes}")

# 3. PERFORMANCE OPTIMIZATION
AUTOTUNE = tf.data.AUTOTUNE
test_ds = test_ds.prefetch(AUTOTUNE)

# 4. EXTRACT TRUE LABELS
print("\nExtracting true labels...\n")
true_labels = np.concatenate([labels.numpy() for _, labels in test_ds])

# 5. LOAD MODEL
print("Loading trained model...\n")
model = tf.keras.models.load_model(MODEL_PATH)

# 6. GENERATE PREDICTIONS
print("Generating predictions...\n")
predictions = model.predict(test_ds)
predicted_labels = np.argmax(predictions, axis=1)

# 7. ACCURACY
accuracy = accuracy_score(true_labels, predicted_labels)
print(f"\nOverall Accuracy: {accuracy:.4f}")

# 8. CONFUSION MATRIX
print("\nGenerating confusion matrix...\n")
cm = confusion_matrix(true_labels, predicted_labels)

# Normalize the matrix (handling division by zero safely)
cm_normalized = np.divide(
    cm.astype('float'),
    cm.sum(axis=1)[:, np.newaxis],
    where=cm.sum(axis=1)[:, np.newaxis] != 0
)

# 9. PLOT CONFUSION MATRIX
plt.figure(figsize=(28, 24))

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

# Save and show figure
plt.savefig(SAVE_PATH, dpi=300, bbox_inches='tight')
plt.show()

print(f"\nConfusion matrix saved to:\n{SAVE_PATH}")

# 10. CLASSIFICATION REPORT
print("\nClassification Report:\n")
report = classification_report(true_labels, predicted_labels, target_names=class_names)
print(report)

# Save report
with open(REPORT_PATH, "w") as f:
    f.write(report)

print(f"\nClassification report saved to:\n{REPORT_PATH}")