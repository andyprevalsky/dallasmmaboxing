import Hero from '../components/Hero'
import ClassCard from '../components/ClassCard'
import { NAVIGATION_LINKS } from '../utils/constants'

const Home = () => {
  const disciplines = NAVIGATION_LINKS.slice(2, 6) // Boxing, Muay Thai, MMA, BJJ

  return (
    <div>
      <Hero
        title="Dallas MMA Boxing"
        subtitle="Transform Your Body. Master Your Mind. Unleash Your Potential."
        ctaText="Start Your Journey"
        ctaLink="/schedule"
      />

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-12">Our Disciplines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {disciplines.map((discipline) => (
              <ClassCard
                key={discipline.path}
                title={discipline.name}
                description={`Explore our ${discipline.name} program`}
                link={discipline.path}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-8">Why Choose Dallas MMA Boxing?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="mb-4">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from certified professionals with years of competition and teaching experience
              </p>
            </div>
            <div className="text-center">
              <h3 className="mb-4">State-of-the-Art Facility</h3>
              <p className="text-gray-600">
                Train in a modern gym equipped with professional-grade equipment
              </p>
            </div>
            <div className="text-center">
              <h3 className="mb-4">Community Focused</h3>
              <p className="text-gray-600">
                Join a supportive community of martial artists at all skill levels
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
