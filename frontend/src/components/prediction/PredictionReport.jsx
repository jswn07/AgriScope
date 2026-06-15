function PredictionReport({ prediction, disease }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-3xl font-bold mb-4">
        {prediction.prediction}
      </h2>

      <p className="mb-4">
        Confidence: {prediction.confidence}%
      </p>

      <h3 className="font-bold mb-2">
        Description
      </h3>
      <p className="mb-4">
        {disease?.description}
      </p>

      <h3 className="font-bold mb-2">
        Symptoms
      </h3>
      <ul className="list-disc ml-6 mb-4">
        {disease?.symptoms?.map((item, index) => (
          <li key={index}>
            {item}
          </li>
        ))}
      </ul>

      <h3 className="font-bold mb-2">
        Treatment
      </h3>
      <ul className="list-disc ml-6 mb-4">
        {disease?.treatment?.map((item, index) => (
          <li key={index}>
            {item}
          </li>
        ))}
      </ul>

      <h3 className="font-bold mb-2">
        Prevention
      </h3>
      <ul className="list-disc ml-6">
        {disease?.prevention?.map((item, index) => (
          <li key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PredictionReport