import os
import random
import matplotlib.pyplot as plt
from PIL import Image

root="dataset"

images=[]

for crop in os.listdir(root):

    crop_path=os.path.join(root,crop)

    for disease in os.listdir(crop_path):

        disease_path=os.path.join(
            crop_path,
            disease
        )

        files=os.listdir(disease_path)

        if files:
            img=random.choice(files)

            images.append(
                (
                    os.path.join(
                        disease_path,
                        img
                    ),
                    disease
                )
            )

plt.figure(figsize=(15,10))

for i,(path,label) in enumerate(images[:9]):

    plt.subplot(3,3,i+1)

    img=Image.open(path)

    plt.imshow(img)

    plt.title(label)

    plt.axis("off")

plt.show()