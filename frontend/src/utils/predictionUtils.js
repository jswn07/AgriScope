export function getSeverity(confidence) {
  if (confidence >= 90) {
    return "High Confidence"
  }

  if (confidence >= 70) {
    return "Medium Confidence"
  }

  return "Low Confidence"
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString()
}