import os
import re

root_dir = "dataset"

for crop in os.listdir(root_dir):

    crop_path = os.path.join(root_dir, crop)

    if os.path.isdir(crop_path):

        for disease in os.listdir(crop_path):

            old_path = os.path.join(crop_path, disease)

            if os.path.isdir(old_path):

                new_name = disease

                # Remove crop prefixes like Tomato___
                new_name = re.sub(
                    rf'^{crop}_+', '',
                    new_name,
                    flags=re.IGNORECASE
                )

                # Convert CamelCase → spaces
                new_name = re.sub(
                    r'([a-z])([A-Z])',
                    r'\1 \2',
                    new_name
                )

                # Lowercase + underscore
                new_name = new_name.lower()
                new_name = re.sub(r'[\s\-]+', '_', new_name)

                # Remove duplicate underscores
                new_name = re.sub(r'_+', '_', new_name)

                new_path = os.path.join(
                    crop_path,
                    new_name
                )

                os.rename(old_path, new_path)

                print(f"{disease} --> {new_name}")

print("Done")