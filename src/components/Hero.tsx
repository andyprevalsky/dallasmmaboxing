import { Link } from 'react-router-dom'

interface HeroProps {
  title: string
  subtitle: string
  ctaText?: string
  ctaLink?: string
  backgroundImage?: string
}

const Hero = ({ title, subtitle, ctaText, ctaLink, backgroundImage }: HeroProps) => {
  const bgClass = backgroundImage
    ? `bg-gradient-to-r from-gray-900/90 to-gray-900/70`
    : 'bg-gradient-to-r from-primary-600 to-primary-800'

  return (
    <section className={`${bgClass} text-white py-20 px-4`}>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="mb-6">{title}</h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-100">{subtitle}</p>
        {ctaText && ctaLink && (
          <Link
            to={ctaLink}
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  )
}

export default Hero
