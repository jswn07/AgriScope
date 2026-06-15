const strawberryDiseases = {
    strawberry_healthy: {
        label: "Healthy Strawberry",
        crop: "Strawberry",
        disease: "Healthy",
        isHealthy: true,
        description:
            "The strawberry plant appears healthy with no visible signs of disease.",
        symptoms: [
            "Bright green foliage",
            "Normal flowering and fruit development",
            "No scorch or spotting"
        ],
        treatment: [
            "No treatment required"
        ],
        prevention: [
            "Continue regular crop monitoring",
            "Maintain proper irrigation practices",
            "Use clean mulch and field sanitation"
        ]
    },

    strawberry_leaf_scorch: {
        label: "Strawberry Leaf Scorch",
        crop: "Strawberry",
        disease: "Leaf Scorch",
        isHealthy: false,
        description:
            "A fungal disease that causes dark purple spots and scorched leaf margins in strawberry plants.",
        symptoms: [
            "Small dark purple leaf spots",
            "Scorched appearance on leaf edges",
            "Reduced leaf vigor"
        ],
        treatment: [
            "Remove infected leaves where practical",
            "Apply recommended fungicides",
            "Reduce excess moisture on foliage"
        ],
        prevention: [
            "Improve air circulation",
            "Avoid overhead watering",
            "Maintain clean planting beds"
        ]
    }
}

export default strawberryDiseases