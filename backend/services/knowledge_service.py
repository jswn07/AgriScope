import json

with open("data/diseases.json", "r", encoding="utf-8") as f:
    DISEASES = json.load(f)

def search_disease(query):
    query = query.lower()
    for key, value in DISEASES.items():
        disease_name = value["name"].lower()
        if query in disease_name:
            return value
    return None