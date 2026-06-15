const cherryDiseases = {
    "cherry_(including_sour)_healthy": {
        label: "Healthy Cherry",
        crop: "Cherry",
        disease: "Healthy",
        isHealthy: true,
        description:
            "The cherry plant appears healthy without visible signs of disease.",
        symptoms: [
            "Uniform green foliage",
            "Normal growth pattern",
            "No powdery growth or lesions"
        ],
        treatment: [
            "No treatment required"
        ],
        prevention: [
            "Continue regular monitoring",
            "Maintain balanced nutrition",
            "Follow good orchard care practices"
        ]
    },

    "cherry_(including_sour)_powdery_mildew": {
        label: "Cherry Powdery Mildew",
        crop: "Cherry",
        disease: "Powdery Mildew",
        isHealthy: false,
        description:
            "A fungal disease that produces a white powdery coating on leaves and young tissues.",
        symptoms: [
            "White powdery growth on leaves",
            "Leaf curling or distortion",
            "Reduced vigor in new growth"
        ],
        treatment: [
            "Apply suitable fungicides",
            "Remove heavily infected plant parts",
            "Improve air circulation around plants"
        ],
        prevention: [
            "Avoid overcrowding",
            "Prune regularly",
            "Monitor during humid conditions"
        ]
    }
}

export default cherryDiseases