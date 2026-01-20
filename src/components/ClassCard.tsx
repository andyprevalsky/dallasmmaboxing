import { Link } from 'react-router-dom'

interface ClassCardProps {
  title: string
  description: string
  link: string
  imageUrl?: string
}

const ClassCard = ({ title, description, link, imageUrl }: ClassCardProps) => {
  return (
    <Link to={link} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        <div className={`h-48 bg-gradient-to-br ${getGradientClass(title)}`}>
          {imageUrl && (
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          )}
        </div>
        <div className="p-6">
          <h3 className="mb-2 group-hover:text-primary-600 transition-colors">{title}</h3>
          <p className="text-gray-600">{description}</p>
          <div className="mt-4 text-primary-600 font-semibold">
            Learn More →
          </div>
        </div>
      </div>
    </Link>
  )
}

const getGradientClass = (title: string): string => {
  const gradients: { [key: string]: string } = {
    Boxing: 'from-red-500 to-orange-500',
    'Muay Thai': 'from-blue-500 to-cyan-500',
    MMA: 'from-purple-500 to-pink-500',
    'Brazilian Jiu-Jitsu': 'from-green-500 to-emerald-500',
  }
  return gradients[title] || 'from-gray-500 to-gray-700'
}

export default ClassCard
