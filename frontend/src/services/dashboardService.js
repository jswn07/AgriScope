import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "./firebase"

//helper function to find the most common disease from a list of predictions
function getMostCommonDisease(predictions) {
  const counts = {}

  predictions.forEach(item => {
    const disease = item.prediction
    counts[disease] = (counts[disease] || 0) + 1
  })

  let maxDisease = "None"
  let maxCount = 0

  for (const disease in counts) {
    if (counts[disease] > maxCount) {
      maxDisease = disease
      maxCount = counts[disease]
    }
  }

  return maxDisease
}

export async function getDashboardStats(userId) {
  const predictionQuery = query(collection(db, "predictions"), where("userId", "==", userId))
  const chatQuery = query(collection(db, "chatHistory"), where("userId", "==", userId))

  const predictionSnapshot = await getDocs(predictionQuery)
  const chatSnapshot = await getDocs(chatQuery)

  const predictions = predictionSnapshot.docs.map(doc => doc.data())
  const totalPredictions = predictions.length
  const totalChats = chatSnapshot.size

  const averageConfidence = totalPredictions > 0
    ? (predictions.reduce((sum, item) => sum + item.confidence, 0) / totalPredictions).toFixed(2)
    : 0
  const mostCommonDisease = getMostCommonDisease(predictions)

  return {
    totalPredictions,
    totalChats,
    averageConfidence,
    mostCommonDisease,
    predictions
  }
}