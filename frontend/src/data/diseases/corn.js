const cornDiseases = {
    "corn_(maize)_cercospora_leaf_spot_gray_leaf_spot": {
        label: "Corn Gray Leaf Spot",
        crop: "Corn (Maize)",
        disease: "Cercospora Leaf Spot / Gray Leaf Spot",
        isHealthy: false,
        description:
            "A fungal disease caused by Cercospora species that affects corn leaves and can reduce yield.",
        symptoms: [
            "Long rectangular gray to tan lesions",
            "Lesions limited by leaf veins",
            "Premature leaf blighting"
        ],
        treatment: [
            "Apply appropriate fungicides when needed",
            "Manage crop residue",
            "Monitor disease spread during humid weather"
        ],
        prevention: [
            "Use resistant hybrids",
            "Practice crop rotation",
            "Improve field airflow where possible"
        ]
    },

    "corn_(maize)_common_rust_": {
        label: "Corn Common Rust",
        crop: "Corn (Maize)",
        disease: "Common Rust",
        isHealthy: false,
        description:
            "A fungal disease caused by Puccinia sorghi that forms rust-colored pustules on leaves.",
        symptoms: [
            "Small reddish-brown pustules on leaves",
            "Leaf yellowing around pustules",
            "Reduced photosynthetic area"
        ],
        treatment: [
            "Apply fungicides if infection is severe",
            "Monitor field conditions",
            "Remove heavily affected debris after harvest"
        ],
        prevention: [
            "Use resistant hybrids",
            "Plant at recommended times",
            "Scout fields regularly"
        ]
    },

    "corn_(maize)_healthy": {
        label: "Healthy Corn",
        crop: "Corn (Maize)",
        disease: "Healthy",
        isHealthy: true,
        description:
            "The corn plant appears healthy with no visible disease symptoms.",
        symptoms: [
            "Green upright leaves",
            "Normal stalk development",
            "No lesions, rust, or blight"
        ],
        treatment: [
            "No treatment required"
        ],
        prevention: [
            "Maintain proper fertilization",
            "Monitor regularly for early disease signs",
            "Follow recommended crop management practices"
        ]
    },

    "corn_(maize)_northern_leaf_blight": {
        label: "Corn Northern Leaf Blight",
        crop: "Corn (Maize)",
        disease: "Northern Leaf Blight",
        isHealthy: false,
        description:
            "A fungal disease caused by Exserohilum turcicum that creates long cigar-shaped lesions on leaves.",
        symptoms: [
            "Long gray-green or tan lesions",
            "Leaf blighting",
            "Reduced photosynthesis and vigor"
        ],
        treatment: [
            "Apply fungicides where economically justified",
            "Remove infected residue",
            "Monitor disease progression"
        ],
        prevention: [
            "Use resistant hybrids",
            "Rotate crops",
            "Avoid continuous corn cultivation when possible"
        ]
    }
}

export default cornDiseases