import Link from "next/link"
import { Mail, Linkedin, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-revzion rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="font-heading font-bold text-xl text-gray-900">Revzion</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Innovating Products. Empowering Businesses. We build scalable SaaS, AI, and cross-platform solutions for
              startups and enterprises.
            </p>
            <div className="flex space-x-4">
              <Link href="mailto:contact@revzion.com" className="text-gray-400 hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <MessageCircle className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-gray-600 hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              {/* Removed Products link */}
              <li>
                <Link href="/portfolio" className="text-gray-600 hover:text-primary transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary transition-colors">
                  Get in Touch
                </Link>
              </li>
              <li>
                <Link href="mailto:contact@revzion.com" className="text-gray-600 hover:text-primary transition-colors">
                  Email Us
                </Link>
              </li>
              <li>
                <span className="text-gray-600">Free Consultation</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500">© 2024 Revzion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
