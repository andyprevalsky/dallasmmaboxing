import Hero from '../components/Hero'

const BrazilianJiuJitsu = () => {
  return (
    <div>
      <Hero
        title="Brazilian Jiu-Jitsu"
        subtitle="Master the gentle art and learn leverage-based grappling"
        ctaText="View Schedule"
        ctaLink="/schedule"
        backgroundImage="bjj"
      />

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-8">What You'll Learn</h2>
          <div className="space-y-6">
            <div>
              <h3 className="mb-2">Fundamental Positions</h3>
              <p className="text-gray-600">
                Master the core positions of BJJ including guard, mount, side control, and back control.
                Learn proper body mechanics and weight distribution for effective control.
              </p>
            </div>
            <div>
              <h3 className="mb-2">Submissions & Escapes</h3>
              <p className="text-gray-600">
                Develop a comprehensive understanding of chokes, joint locks, and submission chains.
                Learn escape techniques from disadvantageous positions using leverage and timing.
              </p>
            </div>
            <div>
              <h3 className="mb-2">Positional Sparring</h3>
              <p className="text-gray-600">
                Practice techniques through positional drilling and live rolling. Develop timing,
                pressure, and the ability to remain calm under pressure.
              </p>
            </div>
            <div>
              <h3 className="mb-2">Self-Defense Applications</h3>
              <p className="text-gray-600">
                Learn practical self-defense techniques including takedown defense, striking defense,
                and controlling aggressive opponents regardless of size.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="mb-6">Class Benefits</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Effective self-defense for all sizes</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Full-body functional strength</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Problem-solving and strategy</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Stress management and mindfulness</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Humility and respect</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Belt progression system</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BrazilianJiuJitsu
