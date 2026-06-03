import matplotlib.pyplot as plt
import pickle
import os


BASE_DIR = r"D:\agrimain\modeltrain"
history_path = os.path.join(BASE_DIR, "models", "training_history_phase1.pkl")

# 1. Load the saved history
print("Loading training history...")
with open(history_path, "rb") as file_pi:
    history_dict = pickle.load(file_pi)

# 2. Set up the plotting canvas
plt.figure(figsize=(12, 5))

# 3. Plot Accuracy (Left side)
plt.subplot(1, 2, 1)
plt.plot(history_dict['accuracy'], label='Training Accuracy', color='blue', linewidth=2)
plt.plot(history_dict['val_accuracy'], label='Validation Accuracy', color='orange', linewidth=2)
plt.title("Model Accuracy")
plt.xlabel("Epoch")
plt.ylabel("Accuracy")
plt.legend(loc='lower right')
plt.grid(True, linestyle='--', alpha=0.7)

# 4. Plot Loss (Right side)
plt.subplot(1, 2, 2)
plt.plot(history_dict['loss'], label='Training Loss', color='blue', linewidth=2)
plt.plot(history_dict['val_loss'], label='Validation Loss', color='orange', linewidth=2)
plt.title("Model Loss")
plt.xlabel("Epoch")
plt.ylabel("Loss")
plt.legend(loc='upper right')
plt.grid(True, linestyle='--', alpha=0.7)

# 5. Make it look clean and show it
plt.tight_layout()
plt.show()