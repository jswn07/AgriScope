export function getConfidenceColor(confidence) {
  if (confidence >= 90)
    return "bg-green-100 text-green-700"

  if (confidence >= 70)
    return "bg-yellow-100 text-yellow-700"

  return "bg-red-100 text-red-700"
}