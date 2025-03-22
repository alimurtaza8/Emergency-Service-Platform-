// components/Header/Header.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center ">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative h-16 w-48">
            <Image 
              src="/images/logo.png" 
              alt="3 Skilled Trades and Services" 
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-800 font-semibold hover:text-red-800 transition-colors">
            HOME
          </Link>
          <div className="relative group">
            <Link href="/#" className="text-gray-800 font-semibold hover:text-red-700 transition-colors flex items-center">
              SERVICES
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
             {/* <p  className="text-gray-800 font-semibold hover:text-red-700 transition-colors flex items-center">
              SERVICES
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </p> */}
            <div className="absolute left-0 mt-1 w-48 bg-white shadow-lg rounded-md hidden group-hover:block">
              <div className="py-1">
                {/* <Link href="/services/plumbing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Heating</Link> */}
                <Link href="/services/electric" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Electrical</Link>
                <Link href="/services/hvac" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Hvac</Link>
                {/* <Link href="/services/electric" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Electrical</Link> */}
                <Link href="/services/plumbing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Plumbing</Link>
              </div>
            </div>
          </div>
          <div className="relative group">
            <Link href="/#" className="text-gray-800 font-semibold hover:text-red-700 transition-colors flex items-center">
              PACKAGES
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="absolute left-0 mt-1 w-48 bg-white shadow-lg rounded-md hidden group-hover:block">
              <div className="py-1">
                <Link href="/packages/residential-packages" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Residential</Link>
                <Link href="/packages/business-packages" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Business</Link>
              </div>
            </div>
          </div>
          <Link href="/about-us" className="text-gray-800 font-semibold hover:text-red-700 transition-colors">
            ABOUT US
          </Link>
          <Link href="/contact-us" className="text-gray-800 font-semibold hover:text-red-700 transition-colors">
            CONTACT US
          </Link>
        </nav>

        {/* Shopping Cart */}
        <div className="flex items-center">
          <Link href="/cart" className="flex items-center text-gray-800 hover:text-red-700 transition-colors">
            <span className="mr-2 font-semibold">$0.00</span>
            <div className="relative">
              <FaShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-red-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">0</span>
            </div>
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className="ml-4 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white"
        >
          <div className="px-4 py-2 space-y-1">
            <Link href="/" className="block py-2 text-red-700 font-semibold">HOME</Link>
            <div className="py-2">
              <button 
                className="flex items-center justify-between w-full text-gray-800 font-semibold"
                onClick={(e) => {
                  e.preventDefault();
                  const submenu = e.currentTarget.nextElementSibling;
                  if (submenu) submenu.classList.toggle('hidden');
                }}
              >
                SERVICES
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="pl-4 mt-1 hidden">
                <Link href="/services/electric" className="block py-2 text-sm text-gray-700">Electrical</Link>
                <Link href="/services/hvac" className="block py-2 text-sm text-gray-700">Hvac</Link>
                <Link href="/services/plumbing" className="block py-2 text-sm text-gray-700">Plumbing</Link>
              </div>
            </div>
            <div className="py-2">
              <button 
                className="flex items-center justify-between w-full text-gray-800 font-semibold"
                onClick={(e) => {
                  e.preventDefault();
                  const submenu = e.currentTarget.nextElementSibling;
                  if (submenu) submenu.classList.toggle('hidden');
                }}
              >
                PACKAGES
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="pl-4 mt-1 hidden">
                <Link href="/packages/residential-packages" className="block py-2 text-sm text-gray-700">Residential</Link>
                <Link href="/packages/business-packages" className="block py-2 text-sm text-gray-700">Business</Link>
                {/* <Link href="/packages/membership" className="block py-2 text-sm text-gray-700">Membership</Link> */}
              </div>
            </div>
            <Link href="/about-us" className="block py-2 text-gray-800 font-semibold">ABOUT US</Link>
            <Link href="/contact-us" className="block py-2 text-gray-800 font-semibold">CONTACT US</Link>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;