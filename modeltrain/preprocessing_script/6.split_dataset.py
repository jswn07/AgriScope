import os
import shutil
from sklearn.model_selection import train_test_split

SOURCE = "dataset"
DEST = "split_data"

for split in ["train", "val", "test"]:
    os.makedirs(os.path.join(DEST, split), exist_ok=True)

for crop in os.listdir(SOURCE):

    crop_path = os.path.join(SOURCE, crop)

    if not os.path.isdir(crop_path):
        continue

    for disease in os.listdir(crop_path):

        disease_path = os.path.join(crop_path, disease)

        if not os.path.isdir(disease_path):
            continue

        # class name becomes crop+disease
        class_name = f"{crop}_{disease}"

        images = [
            os.path.join(disease_path, img)
            for img in os.listdir(disease_path)
            if img.lower().endswith(
                ('.jpg','.jpeg','.png')
            )
        ]

        train_imgs, temp_imgs = train_test_split(
            images,
            test_size=0.30,
            random_state=42
        )

        val_imgs, test_imgs = train_test_split(
            temp_imgs,
            test_size=0.50,
            random_state=42
        )

        for split_name, split_imgs in {
            "train": train_imgs,
            "val": val_imgs,
            "test": test_imgs
        }.items():

            target_dir = os.path.join(
                DEST,
                split_name,
                class_name
            )

            os.makedirs(target_dir, exist_ok=True)

            for img in split_imgs:

                shutil.copy(
                    img,
                    target_dir
                )

print("Dataset split completed")