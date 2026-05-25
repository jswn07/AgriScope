import tensorflow as tf

IMG_SIZE=(224,224)
BATCH_SIZE=32

train_ds=tf.keras.preprocessing.image_dataset_from_directory(
    "split_data/train",
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE
)

val_ds=tf.keras.preprocessing.image_dataset_from_directory(
    "split_data/val",
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE
)

test_ds=tf.keras.preprocessing.image_dataset_from_directory(
    "split_data/test",
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE
)

print("\nClasses:\n")
print(train_ds.class_names)