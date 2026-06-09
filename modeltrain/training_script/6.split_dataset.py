import os
import shutil
from sklearn.model_selection import train_test_split

SOURCE = "dataset"
DEST = "split_data"

# =========================
# CREATE OUTPUT FOLDERS
# =========================

for split in ["train", "val", "test"]:

    os.makedirs(
        os.path.join(DEST, split),
        exist_ok=True
    )

# =========================
# PROCESS EACH CLASS
# =========================

for class_name in os.listdir(SOURCE):

    class_path = os.path.join(
        SOURCE,
        class_name
    )

    # skip non-folders
    if not os.path.isdir(class_path):
        continue

    # collect images
    images = [

        os.path.join(class_path, img)

        for img in os.listdir(class_path)

        if img.lower().endswith(
            ('.jpg', '.jpeg', '.png')
        )
    ]

    # skip empty folders
    if len(images) == 0:
        continue

    # =========================
    # SPLIT DATA
    # =========================

    train_imgs, temp_imgs = train_test_split(
        images,
        test_size=0.30,
        random_state=42,
        shuffle=True
    )

    val_imgs, test_imgs = train_test_split(
        temp_imgs,
        test_size=0.50,
        random_state=42,
        shuffle=True
    )

    # =========================
    # COPY FILES
    # =========================

    splits = {
        "train": train_imgs,
        "val": val_imgs,
        "test": test_imgs
    }

    for split_name, split_imgs in splits.items():

        target_dir = os.path.join(
            DEST,
            split_name,
            class_name
        )

        os.makedirs(target_dir, exist_ok=True)

        for img in split_imgs:

            shutil.copy2(
                img,
                target_dir
            )

    # =========================
    # PRINT COUNTS
    # =========================

    print(
        f"{class_name} | "
        f"Train: {len(train_imgs)} | "
        f"Val: {len(val_imgs)} | "
        f"Test: {len(test_imgs)}"
    )

print("\nDataset split completed!")