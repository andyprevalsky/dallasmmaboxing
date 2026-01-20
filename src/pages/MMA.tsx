import Hero from '../components/Hero'

const MMA = () => {
  return (
    <div>
      <Hero
        title="Mixed Martial Arts"
        subtitle="Combine striking and grappling in the ultimate combat sport"
        ctaText="View Schedule"
        ctaLink="/schedule"
        backgroundImage="mma"
      />

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-8">What You'll Learn</h2>
          <div className="space-y-6">
            <div>
              <h3 className="mb-2">Striking Fundamentals</h3>
              <p className="text-gray-600">
                Integrate boxing, Muay Thai, and kickboxing techniques. Learn how to effectively
                strike in an MMA context with proper stance transitions and combinations.
              </p>
            </div>
            <div>
              <h3 className="mb-2">Wrestling & Takedowns</h3>
              <p className="text-gray-600">
                Master wrestling fundamentals including takedowns, takedown defense, and cage work.
                Learn how to control position and dictate where the fight takes place.
              </p>
            </div>
            <div>
              <h3 className="mb-2">Ground Fighting & Submissions</h3>
              <p className="text-gray-600">
                Develop Brazilian Jiu-Jitsu skills for MMA. Learn submissions, escapes, and
                ground-and-pound techniques. Understand positional hierarchy and control.
              </p>
            </div>
            <div>
              <h3 className="mb-2">Fight Strategy</h3>
              <p className="text-gray-600">
                Learn to combine all disciplines seamlessly. Understand game planning, range
                management, and how to exploit your strengths against various opponents.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="mb-6">Class Benefits</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Complete martial arts skill set</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Elite physical conditioning</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Comprehensive self-defense</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Problem-solving under pressure</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Adaptability and versatility</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Competition opportunities</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MMA
