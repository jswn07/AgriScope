import os
from PIL import Image
from concurrent.futures import ThreadPoolExecutor

root_dir = "dataset"

bad_files = []

def check_image(path):

    try:
        with Image.open(path) as img:
            img.verify()

    except Exception:
        return path

    return None

image_paths = []

for class_name in os.listdir(root_dir):

    class_path = os.path.join(root_dir, class_name)

    if not os.path.isdir(class_path):
        continue

    for file in os.listdir(class_path):

        if file.lower().endswith(
            ('.jpg', '.jpeg', '.png')
        ):

            image_paths.append(
                os.path.join(class_path, file)
            )

print(f"Checking {len(image_paths)} images...")

with ThreadPoolExecutor(max_workers=16) as executor:

    results = executor.map(
        check_image,
        image_paths
    )

for result in results:

    if result:
        bad_files.append(result)
        print("Corrupted:", result)

print("\nTotal corrupted:", len(bad_files))