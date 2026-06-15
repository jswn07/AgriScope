const appleDiseases = {
    apple_apple_scab: {
        label: "Apple Scab",
        crop: "Apple",
        disease: "Apple Scab",
        isHealthy: false,
        description:
            "A common fungal disease caused by Venturia inaequalis that affects apple leaves and fruits.",
        symptoms: [
            "Olive-green to dark velvety spots on leaves",
            "Scabby lesions on fruits",
            "Premature leaf drop"
        ],
        treatment: [
            "Apply recommended fungicides",
            "Remove infected leaves and fallen debris",
            "Prune for better air circulation"
        ],
        prevention: [
            "Use resistant varieties",
            "Maintain orchard sanitation",
            "Avoid prolonged leaf wetness"
        ]
    },

    apple_black_rot: {
        label: "Apple Black Rot",
        crop: "Apple",
        disease: "Black Rot",
        isHealthy: false,
        description:
            "A fungal disease caused by Botryosphaeria obtusa that can affect leaves, fruit, and bark.",
        symptoms: [
            "Purple spots on leaves",
            "Brown to black fruit rot",
            "Cankers on twigs and branches"
        ],
        treatment: [
            "Prune and destroy infected plant parts",
            "Apply appropriate fungicides",
            "Remove mummified fruits"
        ],
        prevention: [
            "Keep orchard clean",
            "Avoid plant stress",
            "Prune regularly to improve airflow"
        ]
    },

    apple_cedar_apple_rust: {
        label: "Cedar Apple Rust",
        crop: "Apple",
        disease: "Cedar Apple Rust",
        isHealthy: false,
        description:
            "A fungal disease caused by Gymnosporangium juniperi-virginianae that alternates between apple and cedar hosts.",
        symptoms: [
            "Bright yellow or orange spots on leaves",
            "Swollen leaf lesions",
            "Early defoliation in severe infections"
        ],
        treatment: [
            "Apply fungicides during susceptible periods",
            "Remove nearby alternate hosts where practical",
            "Prune infected plant parts"
        ],
        prevention: [
            "Plant resistant cultivars",
            "Monitor during wet spring weather",
            "Maintain good orchard hygiene"
        ]
    },

    apple_healthy: {
        label: "Healthy Apple",
        crop: "Apple",
        disease: "Healthy",
        isHealthy: true,
        description:
            "The apple plant appears healthy with no visible signs of disease.",
        symptoms: [
            "Uniform green leaves",
            "Normal fruit and shoot development",
            "No visible lesions or discoloration"
        ],
        treatment: [
            "No treatment required"
        ],
        prevention: [
            "Continue regular monitoring",
            "Maintain proper nutrition and irrigation",
            "Follow good orchard management practices"
        ]
    }
}

export default appleDiseases