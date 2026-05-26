import os

root = r"D:\agrimain\modeltrain\split_data"

grand_total = 0

for split in ["train", "val", "test"]:

    split_path = os.path.join(root, split)

    print(f"\n{'='*50}")
    print(f"{split.upper()}")
    print(f"{'='*50}")

    split_total = 0

    if not os.path.exists(split_path):
        print(f"{split} folder not found")
        continue

    for class_name in sorted(os.listdir(split_path)):

        class_path = os.path.join(
            split_path,
            class_name
        )

        if not os.path.isdir(class_path):
            continue

        count = len([
            f for f in os.listdir(class_path)
            if f.lower().endswith(
                ('.jpg','.jpeg','.png')
            )
        ])

        split_total += count

        print(
            f"{class_name:<50} {count}"
        )

    grand_total += split_total

    print(f"\nTotal {split}: {split_total}")

print(f"\n{'='*50}")
print(f"Grand Total: {grand_total}")
print(f"{'='*50}")