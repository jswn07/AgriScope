import os

root_dir = "dataset"

for crop in os.listdir(root_dir):

    crop_path = os.path.join(root_dir, crop)

    if os.path.isdir(crop_path):

        for disease in os.listdir(crop_path):

            disease_path = os.path.join(
                crop_path,
                disease
            )

            if os.path.isdir(disease_path):

                count = 1

                files = sorted(os.listdir(disease_path))

                for file in files:

                    old_path = os.path.join(
                        disease_path,
                        file
                    )

                    # Skip folders
                    if not os.path.isfile(old_path):
                        continue

                    # Keep original extension
                    ext = os.path.splitext(file)[1]

                    new_name = (
                        f"{crop}_"
                        f"{disease}_"
                        f"{count:04d}"
                        f"{ext}"
                    )

                    new_path = os.path.join(
                        disease_path,
                        new_name
                    )

                    os.rename(
                        old_path,
                        new_path
                    )

                    count += 1

                print(
                    f"Completed: {crop}/{disease}"
                )

print("\nAll images renamed successfully")