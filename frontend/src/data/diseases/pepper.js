const pepperDiseases = {
    "pepper,_bell_bacterial_spot": {
        label: "Bell Pepper Bacterial Spot",
        crop: "Bell Pepper",
        disease: "Bacterial Spot",
        isHealthy: false,
        description:
            "A bacterial disease that affects bell pepper leaves and fruits, especially in warm and wet conditions.",
        symptoms: [
            "Small dark water-soaked spots",
            "Yellow halos around lesions",
            "Raised scabby fruit spots"
        ],
        treatment: [
            "Apply copper-based bactericides where recommended",
            "Remove infected plant debris",
            "Avoid overhead irrigation when possible"
        ],
        prevention: [
            "Use certified disease-free seeds",
            "Rotate crops",
            "Avoid handling wet plants"
        ]
    },

    "pepper,_bell_healthy": {
        label: "Healthy Bell Pepper",
        crop: "Bell Pepper",
        disease: "Healthy",
        isHealthy: true,
        description:
            "The bell pepper plant appears healthy without visible disease symptoms.",
        symptoms: [
            "Uniform healthy leaves",
            "Normal flowering and fruit set",
            "No spots or lesions"
        ],
        treatment: [
            "No treatment required"
        ],
        prevention: [
            "Monitor regularly",
            "Maintain proper spacing and irrigation",
            "Use clean cultivation practices"
        ]
    }
}

export default pepperDiseases