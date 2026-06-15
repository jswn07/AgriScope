const grapeDiseases = {
    grape_black_rot: {
        label: "Grape Black Rot",
        crop: "Grape",
        disease: "Black Rot",
        isHealthy: false,
        description:
            "A fungal disease caused by Guignardia bidwellii that affects grape leaves, shoots, and fruits.",
        symptoms: [
            "Brown circular leaf spots",
            "Black shriveled fruits",
            "Dark lesions on shoots"
        ],
        treatment: [
            "Apply fungicides as recommended",
            "Remove infected fruits and leaves",
            "Prune infected plant parts"
        ],
        prevention: [
            "Ensure vineyard sanitation",
            "Improve airflow through pruning",
            "Avoid prolonged moisture on foliage"
        ]
    },

    "grape_esca_(black_measles)": {
        label: "Grape Esca (Black Measles)",
        crop: "Grape",
        disease: "Esca (Black Measles)",
        isHealthy: false,
        description:
            "A serious grapevine trunk-associated disease complex often linked with foliar striping and berry spotting.",
        symptoms: [
            "Interveinal yellowing or reddening",
            "Tiger-stripe leaf patterns",
            "Dark spotting on berries"
        ],
        treatment: [
            "Prune and remove severely affected wood",
            "Maintain vine vigor",
            "Consult local recommendations for trunk disease management"
        ],
        prevention: [
            "Use healthy planting material",
            "Protect pruning wounds",
            "Avoid unnecessary vine stress"
        ]
    },

    grape_healthy: {
        label: "Healthy Grape",
        crop: "Grape",
        disease: "Healthy",
        isHealthy: true,
        description:
            "The grape plant appears healthy with no visible symptoms of disease.",
        symptoms: [
            "Healthy green leaves",
            "Normal vine growth",
            "No spots, lesions, or fruit rot"
        ],
        treatment: [
            "No treatment required"
        ],
        prevention: [
            "Continue regular vineyard monitoring",
            "Maintain balanced irrigation and nutrition",
            "Follow good pruning and sanitation practices"
        ]
    },

    "grape_leaf_blight_(isariopsis_leaf_spot)": {
        label: "Grape Leaf Blight",
        crop: "Grape",
        disease: "Leaf Blight (Isariopsis Leaf Spot)",
        isHealthy: false,
        description:
            "A fungal disease that causes dark lesions on grape leaves and may weaken the plant.",
        symptoms: [
            "Brown to black leaf spots",
            "Leaf yellowing",
            "Premature defoliation"
        ],
        treatment: [
            "Apply suitable fungicides",
            "Remove infected leaves",
            "Improve canopy airflow"
        ],
        prevention: [
            "Avoid excessive leaf wetness",
            "Maintain field sanitation",
            "Prune for better ventilation"
        ]
    }
}

export default grapeDiseases