import React from 'react';
import type { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="bg-gray-300 dark:bg-gray-900 text-gray-700 dark:text-gray-300 gradient-blend-top from-dark-to-gray">
      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          {/* Column 1: Brand Info */}
          <div>
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-agri-green to-agri-blue flex items-center justify-center">
                <i className="fas fa-seedling text-white"></i>
              </div>
              <span className="font-heading text-xl font-bold text-gray-800 dark:text-white">AgriBlu</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Revolutionizing agriculture with intelligent aeroponics for a sustainable future.
            </p>
          </div>

          {/* Column 2: Company Details */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-gray-800 dark:text-white mb-4">Company Information</h3>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">AGRIBLU LIMITED</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Company number: 16481432</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">SIC: 01610 - Support activities for crop production</p>
            <address className="text-sm text-gray-600 dark:text-gray-400 mt-2 not-italic">
              Registered Address:<br />
              Unit 7 Acorn Industrial Estate,<br />
              Riverview Road, Beverley,<br />
              England, HU17 0LD
            </address>
          </div>

          {/* Column 3: Social Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-gray-800 dark:text-white mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-6">
              <a href="#" aria-label="Twitter" className="text-gray-500 dark:text-gray-400 hover:text-agri-green transition-transform duration-300 hover:scale-110">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-500 dark:text-gray-400 hover:text-agri-green transition-transform duration-300 hover:scale-110">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-500 dark:text-gray-400 hover:text-agri-green transition-transform duration-300 hover:scale-110">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-400 dark:border-gray-700 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} AgriBlu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;