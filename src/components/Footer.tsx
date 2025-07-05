// src/components/Footer.tsx
import React from 'react';
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10 mt-16 shadow-inner">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center md:text-left">
          {/* Section 1: About Library Hub */}
          <div className="col-span-1 md:col-span-1">
            <Link to={'/'}><h3 className="text-2xl font-extrabold text-green-400 mb-4">Library Management</h3></Link>
            <p className="text-sm leading-relaxed">
              Your modern solution for streamlined library management. Empowering readers and librarians alike with easy access and organization.
            </p>
            <p className="text-xs text-gray-500 mt-4">
              &copy; {new Date().getFullYear()} Library Hub. All rights reserved.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/all-books" className="hover:text-green-400 transition-colors duration-300">All Books</a></li>
              <li><a href="/add-book" className="hover:text-green-400 transition-colors duration-300">Add Book</a></li>
              <li><a href="/borrow-summary" className="hover:text-green-400 transition-colors duration-300">Borrow Summary</a></li>
              {/* Add more links if needed */}
            </ul>
          </div>

          {/* Section 3: Contact Info */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-center md:justify-start">
                <FaMapMarkerAlt className="mr-3 text-green-700" />
                <address className="not-italic">Sonargaon, Dhaka Division, Bangladesh</address>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <FaPhone className="mr-3 text-green-700" />
                <a href="tel:+8801933946077" className="hover:text-green-400 transition-colors duration-300">+8801933946077</a>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <FaEnvelope className="mr-3 text-green-700" />
                <a href="mailto:azmiruddin05@gmail.com" className="hover:text-green-400 transition-colors duration-300">azmiruddin05@gmail.com</a>
              </li>
            </ul>
          </div>


          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <h3 className="text-lg font-bold text-white mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://github.com/azmiruddin-143" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition-colors duration-300 text-2xl" title="GitHub">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/azmiruddin05" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors duration-300 text-2xl" title="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="https://www.facebook.com/azmiruddin143" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors duration-300 text-2xl" title="Facebook">
                <FaFacebook />
              </a>
            
            </div>
          </div>
        </div>
        
        <hr className="border-gray-700 mt-10 mb-6" />


        <div className="text-center text-sm text-gray-500">
          Crafted with ❤️ by [Azmir Uddin]
        </div>

      </div>
    </footer>
  );
};

export default Footer;