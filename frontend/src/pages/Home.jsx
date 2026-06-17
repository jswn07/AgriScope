import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-farm.jpg')" }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-sm font-medium mb-6">
                AI-Powered Crop Intelligence
              </div>

              <h1 className="text-6xl md:text-7xl font-black leading-tight mb-6 text-white">
                Detect Crop Diseases <span className="text-[#C5D89D]">Instantly</span>
              </h1>

              <p className="text-xl text-white/90 mb-8 max-w-xl">
                Upload a crop image and receive AI-powered disease detection,
                treatment recommendations, prevention strategies, and expert guidance.
              </p>

              <div className="flex gap-4">
                <Link
                  to="/register"
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-semibold hover:opacity-90 transition"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="border px-8 py-4 rounded-2xl font-semibold hover:bg-accent transition bg-white/10 text-white backdrop-blur-sm border-white/20 hover:text-black"
                >
                  Login
                </Link>
              </div>
            </div>

            <div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
                <h3 className="font-bold text-2xl mb-6 text-white">Sample Analysis</h3>

                <div className="bg-white rounded-2xl p-5 mb-4">
                  <p className="font-semibold text-black">Tomato Late Blight</p>
                  <p className="text-primary font-medium">97.4% Confidence</p>
                </div>

                <div className="space-y-3 text-white/90">
                  <div className="flex justify-between">
                    <span>Late Blight</span>
                    <span className="font-medium text-white">97.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Early Blight</span>
                    <span className="font-medium text-white">2.1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Healthy</span>
                    <span className="font-medium text-white">0.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-8 py-20 relative z-10 bg-background">
        <h2 className="text-4xl font-black text-center mb-12">
          Everything Farmers Need
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card border rounded-3xl p-8">
            <h3 className="font-bold text-2xl mb-3">Disease Detection</h3>
            <p className="text-muted-foreground">
              Identify crop diseases using advanced AI models trained on thousands of agricultural images.
            </p>
          </div>

          <div className="bg-card border rounded-3xl p-8">
            <h3 className="font-bold text-2xl mb-3">AI Assistant</h3>
            <p className="text-muted-foreground">
              Ask questions about symptoms, treatment plans, prevention methods and crop health.
            </p>
          </div>

          <div className="bg-card border rounded-3xl p-8">
            <h3 className="font-bold text-2xl mb-3">Detailed Reports</h3>
            <p className="text-muted-foreground">
              View disease descriptions, confidence analysis and recommended actions.
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="max-w-6xl mx-auto px-8 py-20 bg-background relative z-10">
        <h2 className="text-4xl font-black text-center mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card border rounded-3xl p-8 text-center font-bold text-xl">
            Upload Image
          </div>
          <div className="bg-card border rounded-3xl p-8 text-center font-bold text-xl">
            AI Analysis
          </div>
          <div className="bg-card border rounded-3xl p-8 text-center font-bold text-xl">
            Receive Report
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center bg-background relative z-10">
        <h2 className="text-5xl font-black mb-6">
          Start Protecting Your Crops Today
        </h2>
        <Link
          to="/register"
          className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-semibold hover:opacity-90 transition inline-block"
        >
          Get Started Free
        </Link>
      </section>
    </div>
  )
}

export default Home