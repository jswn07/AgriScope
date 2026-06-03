import tensorflow as tf
import os
import pickle

# 1. CONFIGURATION
BASE_DIR = r"D:\agrimain\modeltrain"
TRAIN_DIR = os.path.join(BASE_DIR, "split_data", "train")
VAL_DIR = os.path.join(BASE_DIR, "split_data", "val")

HEAD_MODEL_PATH = os.path.join(BASE_DIR, "models", "crop_model_phase1.keras")
FINE_TUNED_PATH = os.path.join(BASE_DIR, "models", "crop_model_phase2.keras")
HISTORY_SAVE_PATH = os.path.join(BASE_DIR, "models", "training_history_phase2.pkl")

IMG_SIZE = (224, 224)
BATCH_SIZE = 32
FINE_TUNE_EPOCHS = 10

# 2. LOAD & OPTIMIZE DATA
print("\nLoading datasets...")
train_ds = tf.keras.preprocessing.image_dataset_from_directory(
    TRAIN_DIR, image_size=IMG_SIZE, batch_size=BATCH_SIZE
)
val_ds = tf.keras.preprocessing.image_dataset_from_directory(
    VAL_DIR, image_size=IMG_SIZE, batch_size=BATCH_SIZE
)

# Optimize performance
AUTOTUNE = tf.data.AUTOTUNE
train_ds = train_ds.prefetch(buffer_size=AUTOTUNE)
val_ds = val_ds.prefetch(buffer_size=AUTOTUNE)

# 3. LOAD PREVIOUS MODEL & FIND BASE MODEL
print("\nLoading Phase 1 Model...")
model = tf.keras.models.load_model(HEAD_MODEL_PATH)

base_model = None
for layer in model.layers:
    if isinstance(layer, tf.keras.Model):
        base_model = layer
        break

if base_model is None:
    raise ValueError("Could not find EfficientNet in the loaded model.")

# 4. ENABLE FINE TUNING (THE SURGERY)
print("\nUnfreezing top 20 layers of EfficientNet...")
base_model.trainable = True

# Freeze most layers, leave the top 20 awake
for layer in base_model.layers[:-20]:
    layer.trainable = False

# 5. CALLBACKS & RECOMPILE
early_stop = tf.keras.callbacks.EarlyStopping(
    monitor='val_loss', patience=3, restore_best_weights=True
)
reduce_lr = tf.keras.callbacks.ReduceLROnPlateau(
    monitor='val_loss', factor=0.2, patience=2
)
checkpoint = tf.keras.callbacks.ModelCheckpoint(
    FINE_TUNED_PATH, monitor='val_accuracy', save_best_only=True
)

# Recompile is CRITICAL to apply the unfreezing
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-5),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# 6. FINE TUNE
print("\nStarting Phase 2: Fine Tuning...\n")
history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=FINE_TUNE_EPOCHS,
    callbacks=[early_stop, reduce_lr, checkpoint]
)

# 7. SAVE HISTORY
print("\nSaving Phase 2 training history...")
with open(HISTORY_SAVE_PATH, 'wb') as file_pi:
    pickle.dump(history.history, file_pi)

print(f"Phase 2 complete! Best model saved to: {FINE_TUNED_PATH}")