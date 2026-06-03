import tensorflow as tf
import matplotlib.pyplot as plt
import os

BASE_DIR=r"D:\agrimain\modeltrain"

train_ds=tf.keras.preprocessing.image_dataset_from_directory(
    os.path.join(BASE_DIR,"split_data","train"),
    image_size=(224,224),
    batch_size=32
)

class_names=train_ds.class_names

plt.figure(figsize=(12,12))

for images,labels in train_ds.take(1):

    for i in range(9):

        ax=plt.subplot(3,3,i+1)

        plt.imshow(images[i].numpy().astype("uint8"))

        plt.title(
            class_names[
                labels[i]
            ]
        )

        plt.axis("off")

plt.show()