// components/layout/Footer.tsx - UPDATED VERSION
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="font-bold text-xl">LL</span>
              </div>
              <span className="text-2xl font-bold">LuxeLiving<span className="text-blue-400">Realty</span></span>
            </div>
            <p className="text-gray-400 mb-6">
              Your trusted partner in finding the perfect home. Luxury properties, exceptional service.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-400 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-pink-600 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-700 transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/properties" className="text-gray-400 hover:text-white transition-colors">Properties</Link></li>
              <li><Link href="/agents" className="text-gray-400 hover:text-white transition-colors">Agents</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              <li><Link href="/sell" className="text-gray-400 hover:text-white transition-colors">Sell a Home</Link></li>
              <li><Link href="/buy" className="text-gray-400 hover:text-white transition-colors">Buy a Home</Link></li>
              <li><Link href="/market" className="text-gray-400 hover:text-white transition-colors">Market Analysis</Link></li>
              <li><Link href="/guides" className="text-gray-400 hover:text-white transition-colors">Buyer's Guide</Link></li>
              <li><Link href="/calculator" className="text-gray-400 hover:text-white transition-colors">Mortgage Calculator</Link></li>
              <li><Link href="/saved" className="text-gray-400 hover:text-white transition-colors">Saved Properties</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">123 Luxury Ave, Beverly Hills, CA 90210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">(123) 456-7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">info@luxelivingrealty.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} LuxeLiving Realty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}