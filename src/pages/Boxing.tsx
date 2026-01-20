import Hero from '../components/Hero'

const Boxing = () => {
  return (
    <div>
      <Hero
        title="Boxing"
        subtitle="Master the sweet science with our professional boxing program"
        ctaText="View Schedule"
        ctaLink="/schedule"
        backgroundImage="boxing"
      />

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-8">What You'll Learn</h2>
          <div className="space-y-6">
            <div>
              <h3 className="mb-2">Fundamentals</h3>
              <p className="text-gray-600">
                Master proper stance, footwork, and basic punches (jab, cross, hook, uppercut).
                Learn defensive techniques including blocking, slipping, and rolling.
              </p>
            </div>
            <div>
              <h3 className="mb-2">Conditioning</h3>
              <p className="text-gray-600">
                Build cardiovascular endurance, power, and speed through boxing-specific drills
                and exercises. Improve hand-eye coordination and reaction time.
              </p>
            </div>
            <div>
              <h3 className="mb-2">Sparring & Application</h3>
              <p className="text-gray-600">
                Practice your skills in controlled sparring sessions. Learn ring generalship,
                timing, and strategy from experienced coaches.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="mb-6">Class Benefits</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Full-body workout and cardio conditioning</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Improved coordination and reflexes</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Self-defense skills</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Stress relief and mental toughness</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Confidence building</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Community and camaraderie</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Boxing
