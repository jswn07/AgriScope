const tomatoDiseases = {
    tomato_bacterial_spot: {
        label: "Tomato Bacterial Spot",
        crop: "Tomato",
        disease: "Bacterial Spot",
        isHealthy: false,
        description:
            "A bacterial disease that affects tomato leaves and fruits.",
        symptoms: [
            "Small dark leaf spots",
            "Yellow halos",
            "Fruit lesions"
        ],
        treatment: [
            "Use copper-based sprays",
            "Remove infected plant material"
        ],
        prevention: [
            "Use certified seeds",
            "Avoid working with wet plants"
        ]
    },

    tomato_early_blight: {
        label: "Tomato Early Blight",
        crop: "Tomato",
        disease: "Early Blight",
        isHealthy: false,
        description:
            "A fungal disease caused by Alternaria species that affects tomato leaves and stems.",
        symptoms: [
            "Brown concentric rings",
            "Yellowing leaves",
            "Defoliation"
        ],
        treatment: [
            "Apply fungicides",
            "Remove infected leaves"
        ],
        prevention: [
            "Crop rotation",
            "Proper plant spacing"
        ]
    },

    tomato_healthy: {
        label: "Healthy Tomato",
        crop: "Tomato",
        disease: "Healthy",
        isHealthy: true,
        description:
            "The tomato plant appears healthy without visible disease symptoms.",
        symptoms: [
            "Healthy green foliage",
            "Normal fruit development"
        ],
        treatment: [
            "No treatment required"
        ],
        prevention: [
            "Regular monitoring",
            "Balanced fertilization"
        ]
    },

    tomato_late_blight: {
        label: "Tomato Late Blight",
        crop: "Tomato",
        disease: "Late Blight",
        isHealthy: false,
        description:
            "A destructive disease caused by Phytophthora infestans that can rapidly destroy tomato crops.",
        symptoms: [
            "Dark greasy lesions",
            "White mold growth",
            "Fruit rot"
        ],
        treatment: [
            "Apply fungicides immediately",
            "Remove infected plants"
        ],
        prevention: [
            "Avoid excessive humidity",
            "Use resistant cultivars"
        ]
    },

    tomato_leaf_mold: {
        label: "Tomato Leaf Mold",
        crop: "Tomato",
        disease: "Leaf Mold",
        isHealthy: false,
        description:
            "A fungal disease commonly found in humid greenhouse conditions.",
        symptoms: [
            "Yellow patches on upper leaf surfaces",
            "Olive-green mold underneath leaves"
        ],
        treatment: [
            "Reduce humidity",
            "Apply fungicides"
        ],
        prevention: [
            "Improve ventilation",
            "Avoid overcrowding"
        ]
    },

    tomato_septoria_leaf_spot: {
        label: "Tomato Septoria Leaf Spot",
        crop: "Tomato",
        disease: "Septoria Leaf Spot",
        isHealthy: false,
        description:
            "A fungal disease causing numerous small spots on tomato leaves.",
        symptoms: [
            "Small circular spots",
            "Dark borders",
            "Leaf yellowing"
        ],
        treatment: [
            "Remove infected leaves",
            "Apply fungicides"
        ],
        prevention: [
            "Crop rotation",
            "Avoid overhead watering"
        ]
    },

    tomato_spider_mites_two_spotted_spider_mite: {
        label: "Tomato Spider Mites",
        crop: "Tomato",
        disease: "Two-Spotted Spider Mite",
        isHealthy: false,
        description:
            "Damage caused by two-spotted spider mites feeding on leaf tissue.",
        symptoms: [
            "Tiny yellow speckles",
            "Leaf bronzing",
            "Webbing on leaves"
        ],
        treatment: [
            "Use miticides",
            "Introduce beneficial insects"
        ],
        prevention: [
            "Monitor regularly",
            "Maintain proper humidity"
        ]
    },

    tomato_target_spot: {
        label: "Tomato Target Spot",
        crop: "Tomato",
        disease: "Target Spot",
        isHealthy: false,
        description:
            "A fungal disease producing circular lesions on leaves and fruits.",
        symptoms: [
            "Dark target-like spots",
            "Premature leaf drop"
        ],
        treatment: [
            "Apply fungicides",
            "Remove infected debris"
        ],
        prevention: [
            "Crop rotation",
            "Field sanitation"
        ]
    },

    tomato_tomato_mosaic_virus: {
        label: "Tomato Mosaic Virus",
        crop: "Tomato",
        disease: "Tomato Mosaic Virus",
        isHealthy: false,
        description:
            "A viral disease that causes mottling and distortion in tomato plants.",
        symptoms: [
            "Mosaic leaf pattern",
            "Leaf curling",
            "Stunted growth"
        ],
        treatment: [
            "Remove infected plants"
        ],
        prevention: [
            "Use resistant varieties",
            "Disinfect tools"
        ]
    },

    tomato_tomato_yellow_leaf_curl_virus: {
        label: "Tomato Yellow Leaf Curl Virus",
        crop: "Tomato",
        disease: "Tomato Yellow Leaf Curl Virus",
        isHealthy: false,
        description:
            "A viral disease transmitted primarily by whiteflies.",
        symptoms: [
            "Yellow curled leaves",
            "Reduced fruit production",
            "Stunted growth"
        ],
        treatment: [
            "Control whiteflies",
            "Remove infected plants"
        ],
        prevention: [
            "Use resistant varieties",
            "Employ insect netting"
        ]
    }
}

export default tomatoDiseases