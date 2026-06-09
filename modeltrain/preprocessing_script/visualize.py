import os
import random
import matplotlib.pyplot as plt
from PIL import Image

# 1. CONFIGURATION
ROOT_DIR = "dataset"
images = []

# 2. COLLECT RANDOM IMAGES FROM EACH CLASS
for class_name in os.listdir(ROOT_DIR):
    class_path = os.path.join(ROOT_DIR, class_name)

    # Skip if it's not a directory
    if not os.path.isdir(class_path):
        continue

    # Filter for valid image files
    files = [
        f for f in os.listdir(class_path)
        if f.lower().endswith(('.jpg', '.jpeg', '.png'))
    ]

    # Pick one random image from this class
    if files:
        random_img = random.choice(files)
        images.append((os.path.join(class_path, random_img), class_name))

# 3. SHUFFLE IMAGES
random.shuffle(images)

# 4. VISUALIZE
plt.figure(figsize=(15, 10))

# Plot up to 9 images in a 3x3 grid
for i, (path, label) in enumerate(images[:9]):
    plt.subplot(3, 3, i + 1)
    
    img = Image.open(path)
    plt.imshow(img)
    
    plt.title(label, fontsize=12, fontweight='bold')
    plt.axis("off")

plt.tight_layout()
plt.show()