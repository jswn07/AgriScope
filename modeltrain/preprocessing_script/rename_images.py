import os

root_dir = "dataset"

for class_name in os.listdir(root_dir):

    class_path = os.path.join(root_dir, class_name)

    if not os.path.isdir(class_path):
        continue

    count = 1

    files = sorted(os.listdir(class_path))

    for file in files:

        old_path = os.path.join(class_path, file)

        if not os.path.isfile(old_path):
            continue

        ext = os.path.splitext(file)[1]

        new_name = (
            f"{class_name}_{count:05d}{ext}"
        )

        new_path = os.path.join(
            class_path,
            new_name
        )

        os.rename(old_path, new_path)

        count += 1

    print(f"Completed: {class_name}")

print("\nAll images renamed successfully")