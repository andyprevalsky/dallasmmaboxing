import Hero from '../components/Hero'

const Wrestling = () => {
  return (
    <div>
      <Hero
        title="Wrestling"
        subtitle="Build a strong foundation with expert wrestling instruction"
        ctaText="View Schedule"
        ctaLink="/schedule"
        backgroundImage="wrestling"
      />

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-8">What You'll Learn</h2>
          <div className="space-y-6">
            <div>
              <h3 className="mb-2">Takedowns & Throws</h3>
              <p className="text-gray-600">
                Master single legs, double legs, and high-percentage takedowns. Learn to control distance,
                set up entries, and execute throws with proper technique and timing.
              </p>
            </div>
            <div>
              <h3 className="mb-2">Positional Control</h3>
              <p className="text-gray-600">
                Develop superior top and bottom control. Learn how to maintain dominant positions,
                apply pressure, and escape from bad positions using wrestling fundamentals.
              </p>
            </div>
            <div>
              <h3 className="mb-2">Conditioning & Strength</h3>
              <p className="text-gray-600">
                Build explosive power, endurance, and functional strength through wrestling-specific drills.
                Develop the mental toughness required for competitive grappling.
              </p>
            </div>
            <div>
              <h3 className="mb-2">MMA Applications</h3>
              <p className="text-gray-600">
                Learn how to apply wrestling techniques in MMA contexts, including cage work,
                takedown defense against strikes, and ground-and-pound positioning.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="mb-6">Class Benefits</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Elite physical conditioning and cardio</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Explosive power and strength development</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Superior takedown and defensive skills</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Mental toughness and discipline</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Competition preparation</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Expert instruction from experienced coaches</span>
              </li>
            </ul>
          </div>

          <div className="mt-12 bg-primary-50 p-8 rounded-lg">
            <h3 className="mb-4 text-center">Experienced Wrestling Instructors</h3>
            <p className="text-gray-700 text-center">
              Our wrestling program features some of the most experienced instructors in the DFW area,
              bringing years of competitive and coaching experience to help you develop your skills.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Wrestling
