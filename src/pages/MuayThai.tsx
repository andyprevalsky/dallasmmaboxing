import Hero from '../components/Hero'

const MuayThai = () => {
  return (
    <div>
      <Hero
        title="Muay Thai"
        subtitle="Learn the art of eight limbs from experienced instructors"
        ctaText="View Schedule"
        ctaLink="/schedule"
        backgroundImage="muay-thai"
      />

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-8">What You'll Learn</h2>
          <div className="space-y-6">
            <div>
              <h3 className="mb-2">Traditional Techniques</h3>
              <p className="text-gray-600">
                Master the eight points of contact: punches, elbows, knees, and kicks.
                Learn authentic Thai techniques including the devastating roundhouse kick
                and clinch work.
              </p>
            </div>
            <div>
              <h3 className="mb-2">Clinch Fighting</h3>
              <p className="text-gray-600">
                Develop expertise in the Muay Thai clinch, learning sweeps, throws, and
                devastating knee strikes. Understand control and positioning in close quarters.
              </p>
            </div>
            <div>
              <h3 className="mb-2">Pad Work & Sparring</h3>
              <p className="text-gray-600">
                Practice combinations on Thai pads with partners. Progress to light sparring
                to apply techniques in realistic scenarios under professional supervision.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="mb-6">Class Benefits</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Exceptional full-body conditioning</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Increased flexibility and core strength</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Practical self-defense techniques</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Mental discipline and focus</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Cultural appreciation</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Weight loss and muscle toning</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MuayThai
