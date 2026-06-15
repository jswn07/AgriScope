const potatoDiseases = {
    potato_early_blight: {
        label: "Potato Early Blight",
        crop: "Potato",
        disease: "Early Blight",
        isHealthy: false,
        description:
            "A fungal disease caused by Alternaria solani that affects potato foliage and reduces yield.",
        symptoms: [
            "Brown circular spots with concentric rings",
            "Yellowing around lesions",
            "Premature leaf drop"
        ],
        treatment: [
            "Apply recommended fungicides",
            "Remove infected leaves",
            "Maintain field sanitation"
        ],
        prevention: [
            "Crop rotation",
            "Use certified disease-free seed potatoes",
            "Avoid overhead irrigation"
        ]
    },

    potato_late_blight: {
        label: "Potato Late Blight",
        crop: "Potato",
        disease: "Late Blight",
        isHealthy: false,
        description:
            "A serious disease caused by Phytophthora infestans that spreads rapidly in cool, wet conditions.",
        symptoms: [
            "Dark water-soaked lesions",
            "White fungal growth under leaves",
            "Rapid plant collapse"
        ],
        treatment: [
            "Apply protective fungicides",
            "Destroy infected plants",
            "Monitor neighboring crops"
        ],
        prevention: [
            "Use resistant varieties",
            "Improve air circulation",
            "Avoid excessive moisture"
        ]
    },

    potato_healthy: {
        label: "Healthy Potato",
        crop: "Potato",
        disease: "Healthy",
        isHealthy: true,
        description:
            "The potato plant appears healthy with no visible disease symptoms.",
        symptoms: [
            "Uniform green foliage",
            "Normal growth pattern",
            "No lesions or discoloration"
        ],
        treatment: [
            "No treatment required"
        ],
        prevention: [
            "Continue regular monitoring",
            "Maintain proper irrigation",
            "Follow good agricultural practices"
        ]
    }
}

export default potatoDiseases