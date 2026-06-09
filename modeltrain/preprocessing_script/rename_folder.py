import os
import re

root_dir = "dataset"

for folder in os.listdir(root_dir):

    old_path = os.path.join(root_dir, folder)

    if not os.path.isdir(old_path):
        continue

    # Split crop and disease
    parts = folder.split("___")

    if len(parts) != 2:
        continue

    crop, disease = parts

    # format disease name
    disease = re.sub(
        r'([a-z])([A-Z])',
        r'\1 \2',
        disease
    )

    disease = disease.lower()
    disease = re.sub(r'[\s\-]+', '_', disease)
    disease = re.sub(r'_+', '_', disease)

    new_name = f"{crop.lower()}_{disease}"

    new_path = os.path.join(
        root_dir,
        new_name
    )

    os.rename(old_path, new_path)

    print(f"{folder} --> {new_name}")

print("Done")