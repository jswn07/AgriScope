import tensorflow as tf
import os
import pickle

# 1. GPU OPTIMIZATION
gpus = tf.config.experimental.list_physical_devices('GPU')
if gpus:
    try:
        for gpu in gpus:
            tf.config.experimental.set_memory_growth(gpu, True)
    except RuntimeError as e:
        print(e)

# 2. CONFIGURATION
BASE_DIR = r"D:\agrimain\modeltrain"
TRAIN_DIR = os.path.join(BASE_DIR, "split_data", "train")
VAL_DIR = os.path.join(BASE_DIR, "split_data", "val")

# Save paths
HEAD_MODEL_PATH = os.path.join(BASE_DIR, "models", "model_phase1.keras")
FINE_TUNED_PATH = os.path.join(BASE_DIR, "models", "model_phase2.keras")
HISTORY_SAVE_PATH = os.path.join(BASE_DIR, "models", "training_history_phase2.pkl")

IMG_SIZE = (224, 224)
BATCH_SIZE = 32
FINE_TUNE_EPOCHS = 10
SEED = 42

# 3. LOAD DATASETS
print("\nLoading datasets...\n")
train_ds = tf.keras.preprocessing.image_dataset_from_directory(
    TRAIN_DIR,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    shuffle=True,
    seed=SEED
)

val_ds = tf.keras.preprocessing.image_dataset_from_directory(
    VAL_DIR,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    shuffle=False
)

# 4. PERFORMANCE OPTIMIZATION
AUTOTUNE = tf.data.AUTOTUNE
train_ds = train_ds.shuffle(1000).prefetch(buffer_size=AUTOTUNE)
val_ds = val_ds.cache().prefetch(buffer_size=AUTOTUNE)

# 5. LOAD PHASE 1 MODEL
print("\nLoading Phase 1 model...\n")
model = tf.keras.models.load_model(HEAD_MODEL_PATH)
print("Model loaded successfully!")

# 6. FIND EFFICIENTNET BACKBONE
base_model = None
for layer in model.layers:
    if isinstance(layer, tf.keras.Model) and "efficientnet" in layer.name.lower():
        base_model = layer
        break

if base_model is None:
    raise ValueError("EfficientNet backbone not found.")

print(f"\nFound backbone: {base_model.name}")

# 7. ENABLE FINE TUNING
print("\nEnabling fine-tuning...\n")
base_model.trainable = True

# Freeze lower layers (keep the top 40 awake)
for layer in base_model.layers[:-40]:
    layer.trainable = False

# Keep BatchNorm frozen to protect learned statistics
for layer in base_model.layers:
    if isinstance(layer, tf.keras.layers.BatchNormalization):
        layer.trainable = False

# 8. PRINT TRAINABLE LAYERS
trainable_count = sum(1 for layer in base_model.layers if layer.trainable)
print(f"\nTrainable layers in EfficientNet: {trainable_count}")

# 9. CALLBACKS
early_stop = tf.keras.callbacks.EarlyStopping(
    monitor='val_loss',
    patience=3,
    restore_best_weights=True,
    verbose=1
)

reduce_lr = tf.keras.callbacks.ReduceLROnPlateau(
    monitor='val_loss',
    factor=0.2,
    patience=2,
    verbose=1
)

checkpoint = tf.keras.callbacks.ModelCheckpoint(
    FINE_TUNED_PATH,
    monitor='val_accuracy',
    save_best_only=True,
    verbose=1
)

# 10. RECOMPILE MODEL
print("\nRecompiling model...\n")
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-5),
    loss='sparse_categorical_crossentropy',
    metrics=[
        'accuracy',
        tf.keras.metrics.SparseTopKCategoricalAccuracy(k=3)
    ]
)

model.summary()

# 11. START FINE TUNING
print("\nStarting Phase 2 Fine-Tuning...\n")
history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=FINE_TUNE_EPOCHS,
    callbacks=[early_stop, reduce_lr, checkpoint]
)

# 12. SAVE TRAINING HISTORY
print("\nSaving training history...\n")
with open(HISTORY_SAVE_PATH, 'wb') as file_pi:
    pickle.dump(history.history, file_pi)

print(f"\nTraining history saved to:\n{HISTORY_SAVE_PATH}")

# 13. COMPLETE
print(f"\nFine-tuning complete!\nBest model saved to:\n{FINE_TUNED_PATH}")