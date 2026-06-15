const peachDiseases = {
    peach_bacterial_spot: {
        label: "Peach Bacterial Spot",
        crop: "Peach",
        disease: "Bacterial Spot",
        isHealthy: false,
        description:
            "A bacterial disease that affects peach leaves, twigs, and fruit surfaces.",
        symptoms: [
            "Small dark angular leaf spots",
            "Shot-hole appearance on leaves",
            "Fruit blemishes and cracking"
        ],
        treatment: [
            "Use recommended bactericide sprays",
            "Remove heavily infected plant material",
            "Avoid practices that spread infection"
        ],
        prevention: [
            "Use tolerant varieties where available",
            "Maintain orchard sanitation",
            "Reduce leaf wetness duration"
        ]
    },

    peach_healthy: {
        label: "Healthy Peach",
        crop: "Peach",
        disease: "Healthy",
        isHealthy: true,
        description:
            "The peach plant appears healthy with no visible signs of disease.",
        symptoms: [
            "Healthy leaves and shoots",
            "Normal fruit development",
            "No spotting or discoloration"
        ],
        treatment: [
            "No treatment required"
        ],
        prevention: [
            "Continue orchard monitoring",
            "Maintain balanced fertilization and irrigation",
            "Follow good pruning and hygiene practices"
        ]
    }
}

export default peachDiseases