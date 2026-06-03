import tensorflow as tf
import os
import pickle

# 1. CONFIGURATION
BASE_DIR = r"D:\agrimain\modeltrain"
TRAIN_DIR = os.path.join(BASE_DIR, "split_data", "train")
VAL_DIR = os.path.join(BASE_DIR, "split_data", "val")

# Save paths
MODEL_SAVE_PATH = os.path.join(BASE_DIR, "models", "crop_model_phase1.keras")
HISTORY_SAVE_PATH = os.path.join(BASE_DIR, "models", "training_history_phase1.pkl")

IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 10  # Callbacks will stop this early if needed

# 2. LOAD & OPTIMIZE DATASETS
print("\nLoading Datasets...")
train_ds = tf.keras.preprocessing.image_dataset_from_directory(
    TRAIN_DIR, image_size=IMG_SIZE, batch_size=BATCH_SIZE
)
val_ds = tf.keras.preprocessing.image_dataset_from_directory(
    VAL_DIR, image_size=IMG_SIZE, batch_size=BATCH_SIZE
)

class_names = train_ds.class_names
num_classes = len(class_names)

AUTOTUNE = tf.data.AUTOTUNE
train_ds = train_ds.prefetch(buffer_size=AUTOTUNE)
val_ds = val_ds.prefetch(buffer_size=AUTOTUNE)

# 3. DATA AUGMENTATION
data_augmentation = tf.keras.Sequential([
    tf.keras.layers.RandomFlip("horizontal"),
    tf.keras.layers.RandomRotation(0.2),
    tf.keras.layers.RandomZoom(0.2),
    tf.keras.layers.RandomContrast(0.2)
])

# 4. LOAD BASE MODEL (100% FROZEN)
print("\nLoading EfficientNet...")
base_model = tf.keras.applications.EfficientNetB0(
    include_top=False,
    weights='imagenet',
    input_shape=(224, 224, 3)
)

base_model.trainable = False

# 5. BUILD MODEL (FUNCTIONAL API)
inputs = tf.keras.Input(shape=(224, 224, 3))

# Augment and format exactly as EfficientNet expects
x = data_augmentation(inputs)
x = tf.keras.applications.efficientnet.preprocess_input(x)

# Pass through frozen model (training=False protects BatchNormalization)
x = base_model(x, training=False)

# Flatten and add Dropout (30% for safety)
x = tf.keras.layers.GlobalAveragePooling2D()(x)
x = tf.keras.layers.Dropout(0.3)(x)

# Final Predictions
outputs = tf.keras.layers.Dense(num_classes, activation='softmax')(x)

model = tf.keras.Model(inputs, outputs)

# 6. CALLBACKS & COMPILE
early_stop = tf.keras.callbacks.EarlyStopping(
    monitor='val_loss',
    patience=3,
    restore_best_weights=True
)

checkpoint = tf.keras.callbacks.ModelCheckpoint(
    MODEL_SAVE_PATH,
    monitor='val_accuracy',
    save_best_only=True
)

model.compile(
    optimizer='adam', # Default 1e-3 is perfect for Phase 1
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

model.summary()

# 7. TRAIN PHASE 1
print("\nStarting Phase 1 Training (Warmup)...\n")
history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=EPOCHS,
    callbacks=[early_stop, checkpoint]
)

# 8. SAVE HISTORY & WRAP UP
print(f"\nPhase 1 best model saved automatically to: {MODEL_SAVE_PATH}")

print("Saving training history for plotting...")
with open(HISTORY_SAVE_PATH, 'wb') as file_pi:
    pickle.dump(history.history, file_pi)

print(f"History saved successfully to: {HISTORY_SAVE_PATH}")
print("Phase 1 complete! You are ready to plot or proceed to Fine-Tuning.")