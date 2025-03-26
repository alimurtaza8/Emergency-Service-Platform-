"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { IoCallOutline, IoMailOutline, IoLocationOutline } from 'react-icons/io5';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-br from-blue-900 to-blue-950 text-white">
      {/* Top Wave Separator */}
      <div className="w-full overflow-hidden">
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="fill-white w-full h-12">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg> */}
      </div>
      
      <div className="container mx-auto px-4 py-16">
        {/* Top Section with Logo and Main Tagline */}
        <div className="flex flex-col items-center mb-16">
          <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
            <Image 
              src="/images/logo.jpg" 
              alt="GAC Services Logo" 
              width={160} 
              height={80}
              className="mb-4"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-blue-300">
            Experts in Remodels, Heat Tape, Commercial Projects & Service
          </h2>
          <div className="max-w-4xl text-center mb-8">
            <p className="text-lg leading-relaxed text-blue-100 mb-6">
              At GAC Services, we take pride in our expertise across a wide range of electrical, HVAC, and
              plumbing solutions. We specialize in remodels, ensuring seamless upgrades to your home
              or business with precision and care.
            </p>
            <p className="text-lg leading-relaxed text-blue-100">
              Whether you need electrical work for a commercial project or reliable service and
              maintenance, our skilled team is ready to deliver top-quality results. Trust GAC for all your
              installation, repair, and upgrade needs!
            </p>
          </div>
          
          {/* Call to Action Button */}
          <Link href="/contact-us" className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition duration-300 transform hover:scale-105 shadow-lg">
            Request a Quote
          </Link>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-blue-700">ABOUT US</h3>
            <p className="text-blue-100 mb-6">
              GAC Services has been providing top-quality electrical, HVAC, and plumbing solutions since 2005. Our commitment to excellence and customer satisfaction has made us a trusted name in the industry.
            </p>
            <div className="flex mt-2 space-x-3">
              <Link href="https://facebook.com/gacservices" aria-label="Facebook" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition duration-300 flex items-center justify-center w-9 h-9">
                <FaFacebookF className="text-sm" />
              </Link>
              <Link href="https://instagram.com/gacservices" aria-label="Instagram" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition duration-300 flex items-center justify-center w-9 h-9">
                <FaInstagram className="text-sm" />
              </Link>
              <Link href="https://twitter.com/gacservices" aria-label="Twitter" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition duration-300 flex items-center justify-center w-9 h-9">
                <FaTwitter className="text-sm" />
              </Link>
              <Link href="https://linkedin.com/company/gacservices" aria-label="LinkedIn" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition duration-300 flex items-center justify-center w-9 h-9">
                <FaLinkedinIn className="text-sm" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-blue-700">QUICK LINKS</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-blue-100 hover:text-white transition duration-300 flex items-center">
                  <span className="mr-2">›</span> Home
                </Link>
              </li>
              <li>
                <Link href="/packages/residential-packages" className="text-blue-100 hover:text-white transition duration-300 flex items-center">
                  <span className="mr-2">›</span> Residential Packages
                </Link>
              </li>
              <li>
                <Link href="/packages/business-packages" className="text-blue-100 hover:text-white transition duration-300 flex items-center">
                  <span className="mr-2">›</span> Business Packages                 
                  </Link>
              </li>
              {/* <li>
                <Link href="/gallery" className="text-blue-100 hover:text-white transition duration-300 flex items-center">
                  <span className="mr-2">›</span> Project Gallery
                </Link>
              </li> */}
              <li>
                <Link href="/about-us" className="text-blue-100 hover:text-white transition duration-300 flex items-center">
                  <span className="mr-2">›</span> About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-blue-100 hover:text-white transition duration-300 flex items-center">
                  <span className="mr-2">›</span> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-blue-700">SERVICES</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services/electric" className="text-blue-100 hover:text-white transition duration-300 flex items-center">
                  <span className="mr-2">›</span> Electric
                </Link>
              </li>
              <li>
                <Link href="/services/hvac" className="text-blue-100 hover:text-white transition duration-300 flex items-center">
                  <span className="mr-2">›</span> HVAC
                </Link>
              </li>
              <li>
                <Link href="/services/plumbing" className="text-blue-100 hover:text-white transition duration-300 flex items-center">
                  <span className="mr-2">›</span> Plumbing
                </Link>
              </li>
              {/* <li>
                <Link href="/services/heat-tape" className="text-blue-100 hover:text-white transition duration-300 flex items-center">
                  <span className="mr-2">›</span> Heat Tape Installation
                </Link>
              </li>
              <li>
                <Link href="/services/remodels" className="text-blue-100 hover:text-white transition duration-300 flex items-center">
                  <span className="mr-2">›</span> Remodels
                </Link>
              </li>
              <li>
                <Link href="/services/maintenance" className="text-blue-100 hover:text-white transition duration-300 flex items-center">
                  <span className="mr-2">›</span> Maintenance
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-blue-700">CONTACT US</h3>
            <div className="space-y-5">
              <div className="flex items-start space-x-3">
                <IoLocationOutline className="text-blue-300 text-xl mt-1 flex-shrink-0" />
                <address className="not-italic text-blue-100">
                  123 Service Avenue<br />
                  Anytown, ST 12345<br />
                  United States
                </address>
              </div>
              <div className="flex items-center space-x-3">
                <IoCallOutline className="text-blue-300 text-xl flex-shrink-0" />
                <Link href="tel:+15551234567" className="text-blue-100 hover:text-white transition duration-300">
                  (555) 123-4567
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <IoMailOutline className="text-blue-300 text-xl flex-shrink-0" />
                <Link href="mailto:info@gacservices.com" className="text-blue-100 hover:text-white transition duration-300">
                  info@gacservices.com
                </Link>
              </div>
              
              {/* Business Hours */}
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Business Hours:</h4>
                <p className="text-blue-100">Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p className="text-blue-100">Saturday: 9:00 AM - 2:00 PM</p>
                <p className="text-blue-100">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-800 mb-8"></div>

        {/* Copyright Section */}
        <div className="text-center">
          <p className="text-blue-200">
            &copy; {currentYear} GAC Services. All Rights Reserved.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-blue-300">
            <Link href="/privacy-policy" className="hover:text-white transition duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-white transition duration-300">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="hover:text-white transition duration-300">
              Sitemap
            </Link>
            <Link href="/accessibility" className="hover:text-white transition duration-300">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;