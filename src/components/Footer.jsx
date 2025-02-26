import React from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer= () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-[#007BFF] transition-colors">About Us</a></li>
              <li><a href="/how-it-works" className="hover:text-[#007BFF] transition-colors">How PeerShip Works</a></li>
              <li><a href="/careers" className="hover:text-[#007BFF] transition-colors">Careers</a></li>
              <li><a href="/press" className="hover:text-[#007BFF] transition-colors">Press</a></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="/help" className="hover:text-[#007BFF] transition-colors">Help Center</a></li>
              <li><a href="/safety" className="hover:text-[#007BFF] transition-colors">Safety</a></li>
              <li><a href="/terms" className="hover:text-[#007BFF] transition-colors">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-[#007BFF] transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="/delivery" className="hover:text-[#007BFF] transition-colors">Local Delivery</a></li>
              <li><a href="/business" className="hover:text-[#007BFF] transition-colors">Business Solutions</a></li>
              <li><a href="/pricing" className="hover:text-[#007BFF] transition-colors">Pricing</a></li>
              <li><a href="/cities" className="hover:text-[#007BFF] transition-colors">Cities</a></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a href="#" className="hover:text-[#007BFF] transition-colors"><Facebook className="w-6 h-6" /></a>
              <a href="#" className="hover:text-[#007BFF] transition-colors"><Twitter className="w-6 h-6" /></a>
              <a href="#" className="hover:text-[#007BFF] transition-colors"><Instagram className="w-6 h-6" /></a>
              <a href="#" className="hover:text-[#007BFF] transition-colors"><Youtube className="w-6 h-6" /></a>
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Payment Methods</h4>
              <div className="flex space-x-2 justify-center md:justify-start">
                <img src="/placeholder.svg?height=30&width=40" alt="Visa" className="h-8" />
                <img src="/placeholder.svg?height=30&width=40" alt="Mastercard" className="h-8" />
                <img src="/placeholder.svg?height=30&width=40" alt="PayPal" className="h-8" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-center items-center">
          <p className="text-sm text-gray-400">© 2024 PeerShip. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0 md:ml-8">
            <a href="/terms" className="text-sm text-gray-400 hover:text-[#007BFF] transition-colors">Terms</a>
            <a href="/privacy" className="text-sm text-gray-400 hover:text-[#007BFF] transition-colors">Privacy</a>
            <a href="/cookies" className="text-sm text-gray-400 hover:text-[#007BFF] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;