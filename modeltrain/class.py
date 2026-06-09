import pickle

with open(r"D:\agrimain\modeltrain\models\class_names.pkl", "rb") as f:
    class_names = pickle.load(f)

print(class_names)