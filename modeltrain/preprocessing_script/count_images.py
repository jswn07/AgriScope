import os

root_dir = "dataset"

image_extensions = (
    '.jpg',
    '.jpeg',
    '.png'
)

total = 0

for class_name in sorted(os.listdir(root_dir)):

    class_path = os.path.join(
        root_dir,
        class_name
    )

    if not os.path.isdir(class_path):
        continue

    count = sum(
        1 for f in os.listdir(class_path)
        if f.lower().endswith(image_extensions)
    )

    total += count

    print(f"{class_name:<40} {count}")

print("\nTotal Images:", total)