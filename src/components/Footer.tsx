import { Link } from 'react-router-dom'
import { SITE_NAME, NAVIGATION_LINKS } from '../utils/constants'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">{SITE_NAME}</h3>
            <p className="text-gray-400 text-sm">
              Premier martial arts training facility in Dallas, Texas. Transform your body,
              master your mind, and unleash your potential.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>123 Main Street</li>
              <li>Dallas, TX 75201</li>
              <li>Phone: (214) 555-0100</li>
              <li>Email: info@dallasmmaboxing.com</li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-bold mb-4">Hours</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Monday - Friday: 6:00 AM - 10:00 PM</li>
              <li>Saturday: 8:00 AM - 8:00 PM</li>
              <li>Sunday: 9:00 AM - 6:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} {SITE_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
