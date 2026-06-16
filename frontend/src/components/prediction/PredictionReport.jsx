import { CheckCircle, Stethoscope, Pill, Shield } from "lucide-react"

function PredictionReport({ prediction, disease }) {
  return (
    <div className="bg-card border rounded-3xl p-8">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-4">
          <CheckCircle size={16} />
          Prediction Complete
        </div>

        <h1 className="text-4xl font-black mb-4">
          {prediction.prediction}
        </h1>
        
        <p className="text-muted-foreground mb-4">
          {prediction.rawClass}
        </p>

        <div className="flex flex-wrap gap-3">
          <div className="px-4 py-2 rounded-full bg-primary text-primary-foreground font-semibold">
            {prediction.confidence}% Confidence
          </div>
          <div className="px-4 py-2 rounded-full bg-accent text-foreground font-semibold">
            AI Diagnosis
          </div>
        </div>
      </div>

      <div className="bg-muted/30 rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-bold mb-3">Description</h2>
        <p className="leading-8 text-base text-muted-foreground">
          {disease?.description}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Stethoscope size={20} className="text-primary" />
            <h2 className="font-bold text-xl">Symptoms</h2>
          </div>

          <ul className="space-y-3">
            {disease?.symptoms?.map((item, index) => (
              <li key={index} className="flex gap-3 p-3 rounded-xl bg-muted/30">
                <span className="text-primary">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card border rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Pill size={20} className="text-primary" />
            <h2 className="font-bold text-xl">Treatment</h2>
          </div>

          <ul className="space-y-3">
            {disease?.treatment?.map((item, index) => (
              <li key={index} className="flex gap-3 p-3 rounded-xl bg-muted/30">
                <span className="text-primary">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 bg-card border rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield size={20} className="text-primary" />
          <h2 className="font-bold text-xl">Prevention</h2>
        </div>

        <ul className="space-y-3">
          {disease?.prevention?.map((item, index) => (
            <li key={index} className="flex gap-3 p-3 rounded-xl bg-muted/30">
              <span className="text-primary">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PredictionReport