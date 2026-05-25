import os

root_dir = "dataset"

for crop in os.listdir(root_dir):

    crop_path = os.path.join(root_dir, crop)

    if os.path.isdir(crop_path):

        print("\n" + crop.upper())

        for disease in os.listdir(crop_path):

            disease_path = os.path.join(
                crop_path,
                disease
            )

            if os.path.isdir(disease_path):

                count = len([
                    f for f in os.listdir(disease_path)
                    if f.lower().endswith(
                        ('.jpg','.jpeg','.png')
                    )
                ])

                print(
                    f"{disease}: {count}"
                )