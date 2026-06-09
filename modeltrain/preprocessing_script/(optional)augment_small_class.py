from tensorflow.keras.preprocessing.image import ImageDataGenerator
import os
from tensorflow.keras.utils import load_img,img_to_array

root="dataset"

datagen=ImageDataGenerator(
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    brightness_range=[0.8,1.2],
    fill_mode='nearest'
)

threshold=250

for crop in os.listdir(root):

    crop_path=os.path.join(root,crop)

    for disease in os.listdir(crop_path):

        disease_path=os.path.join(
            crop_path,
            disease
        )

        files=os.listdir(disease_path)

        count=len(files)

        if count < threshold:

            needed=threshold-count

            print(
                f"{disease}: generating {needed}"
            )

            generated=0

            for file in files:

                if generated>=needed:
                    break

                path=os.path.join(
                    disease_path,
                    file
                )

                img=load_img(path)

                x=img_to_array(img)

                x=x.reshape((1,)+x.shape)

                for batch in datagen.flow(
                    x,
                    batch_size=1,
                    save_to_dir=disease_path,
                    save_prefix='aug',
                    save_format='jpg'
                ):

                    generated+=1

                    if generated>=needed:
                        break