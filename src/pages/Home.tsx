import Hero from '../components/Hero'
import ClassCard from '../components/ClassCard'
import { NAVIGATION_LINKS, GYM_INFO, CONTACT_INFO } from '../utils/constants'
import { Link } from 'react-router-dom'

const Home = () => {
  const disciplines = NAVIGATION_LINKS.slice(2, 7) // Boxing, Muay Thai, MMA, Wrestling, BJJ

  return (
    <div>
      <Hero
        title="GEORGE PREVALSKY GYM"
        subtitle="Boxing, Muay Thai, Brazilian Jiu-Jitsu and MMA"
        ctaText="View Schedule"
        ctaLink="/schedule"
      />

      {/* About Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-8">About George Prevalsky Gym</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-center mb-6 text-xl font-semibold text-primary-600">
              {GYM_INFO.mission}
            </p>
            <p className="text-gray-700 text-center mb-8 text-lg leading-relaxed">
              {GYM_INFO.description}
            </p>
            <p className="text-gray-700 text-center mb-8 text-lg leading-relaxed">
              In 2010, we relocated to a purpose-built <strong>{GYM_INFO.facilitySize} facility</strong>, designed and built from
              the ground up to be a high-quality Muay Thai and Boxing gym. Our mission is to become{' '}
              <strong>the number one stand-up striking training center in the DFW area</strong>.
            </p>
            <p className="text-gray-700 text-center text-lg leading-relaxed">
              We welcome everyone - whether you're training for <strong>fitness</strong>, learning <strong>self-defense</strong>,
              or competing as an <strong>amateur or professional athlete</strong>. We offer comprehensive programs in{' '}
              <strong>Muay Thai, Boxing, MMA, Wrestling, and Brazilian Jiu-Jitsu</strong>, featuring some of the most
              experienced instructors in the area.
            </p>
          </div>
        </div>
      </section>

      {/* Our Disciplines */}
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

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-12">Why Choose George Prevalsky Gym?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="mb-4">Most Experienced Instructors</h3>
              <p className="text-gray-600">
                Some of the most experienced instructors in the DFW area for Wrestling and Brazilian Jiu-Jitsu,
                plus expert coaching in Muay Thai, Boxing, and MMA
              </p>
            </div>
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="mb-4">Purpose-Built {GYM_INFO.facilitySize} Facility</h3>
              <p className="text-gray-600">
                Our facility was designed and built from the ground up to be a high-quality Muay Thai and Boxing gym,
                equipped with professional-grade equipment and training areas
              </p>
            </div>
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-4">Established Since {GYM_INFO.established}</h3>
              <p className="text-gray-600">
                Over {GYM_INFO.yearsTeaching} years of continuous operations, serving both competitive and recreational
                athletes in the DFW area
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-12">Visit Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-lg overflow-hidden h-80 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-600 font-semibold">Map Coming Soon</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_INFO.fullAddress)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 underline mt-2 inline-block"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Info & Directions */}
            <div className="flex flex-col justify-center">
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Address
                  </h3>
                  <p className="text-gray-700 ml-8">{CONTACT_INFO.fullAddress}</p>
                  <p className="text-gray-600 text-sm ml-8 mt-2">
                    Southeast corner of MacArthur Blvd & Valley Ranch Parkway South, next to Discount Tire and behind CVS.
                    Approximately 2 blocks north of I-635.
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Phone
                  </h3>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="text-primary-600 hover:text-primary-700 ml-8">
                    {CONTACT_INFO.phone}
                  </a>
                </div>
                <div>
                  <h3 className="mb-3 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </h3>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-primary-600 hover:text-primary-700 ml-8 break-all">
                    {CONTACT_INFO.email}
                  </a>
                </div>
                <div className="pt-4">
                  <Link
                    to="/schedule"
                    className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                  >
                    View Class Schedule
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
