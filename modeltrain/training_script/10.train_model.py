import os
import pickle
import tensorflow as tf
from tensorflow.keras import mixed_precision

# 1. GPU OPTIMIZATION & MIXED PRECISION
mixed_precision.set_global_policy('mixed_float16')

gpus = tf.config.experimental.list_physical_devices('GPU')
if gpus:
    for gpu in gpus:
        tf.config.experimental.set_memory_growth(gpu, True)

# 2. CONFIGURATION
BASE_DIR = r"D:\agrimain\modeltrain"
TRAIN_DIR = os.path.join(BASE_DIR, "split_data", "train")
VAL_DIR = os.path.join(BASE_DIR, "split_data", "val")
MODEL_DIR = os.path.join(BASE_DIR, "models")

os.makedirs(MODEL_DIR, exist_ok=True)

MODEL_SAVE_PATH = os.path.join(MODEL_DIR, "model_phase1.keras")
HISTORY_SAVE_PATH = os.path.join(MODEL_DIR, "training_history_phase1.pkl")
CLASS_NAMES_PATH = os.path.join(MODEL_DIR, "class_names.pkl")

IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 10
SEED = 42

# 3. LOAD DATASETS
print("\nLoading datasets...")

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

class_names = train_ds.class_names
num_classes = len(class_names)

print("\nClasses:\n")
for i, name in enumerate(class_names):
    print(f"{i} : {name}")

print(f"\nTotal Classes: {num_classes}")

# Save class names
with open(CLASS_NAMES_PATH, "wb") as f:
    pickle.dump(class_names, f)

# 4. PERFORMANCE OPTIMIZATION
AUTOTUNE = tf.data.AUTOTUNE
train_ds = train_ds.shuffle(1000).prefetch(buffer_size=AUTOTUNE)
val_ds = val_ds.cache().prefetch(buffer_size=AUTOTUNE)

# 5. DATA AUGMENTATION
data_augmentation = tf.keras.Sequential([
    tf.keras.layers.RandomFlip("horizontal"),
    tf.keras.layers.RandomRotation(0.2),
    tf.keras.layers.RandomZoom(0.2),
    tf.keras.layers.RandomContrast(0.2)
])

# 6. LOAD BASE MODEL
print("\nLoading EfficientNetB0...")
base_model = tf.keras.applications.EfficientNetB0(
    include_top=False,
    weights='imagenet',
    input_shape=(IMG_SIZE[0], IMG_SIZE[1], 3)
)
base_model.trainable = False

# 7. BUILD MODEL
inputs = tf.keras.Input(shape=(IMG_SIZE[0], IMG_SIZE[1], 3))

x = data_augmentation(inputs)
x = tf.keras.applications.efficientnet.preprocess_input(x)
x = base_model(x, training=False)
x = tf.keras.layers.GlobalAveragePooling2D()(x)
x = tf.keras.layers.Dropout(0.3)(x)

outputs = tf.keras.layers.Dense(
    num_classes,
    activation='softmax',
    dtype='float32'
)(x)

model = tf.keras.Model(inputs, outputs)

# 8. CALLBACKS
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

reduce_lr = tf.keras.callbacks.ReduceLROnPlateau(
    monitor='val_loss',
    factor=0.2,
    patience=2,
    verbose=1
)

# 9. COMPILE MODEL
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
    loss='sparse_categorical_crossentropy',
    metrics=[
        'accuracy',
        tf.keras.metrics.SparseTopKCategoricalAccuracy(k=3)
    ]
)

model.summary()

# 10. TRAIN MODEL
print("\nStarting Phase 1 Training...\n")
history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=EPOCHS,
    callbacks=[early_stop, checkpoint, reduce_lr]
)

# 11. SAVE HISTORY & WRAP UP
print("\nSaving training history...")
with open(HISTORY_SAVE_PATH, 'wb') as f:
    pickle.dump(history.history, f)

print("\nTraining completed successfully!")
print(f"\nBest model saved to:\n{MODEL_SAVE_PATH}")