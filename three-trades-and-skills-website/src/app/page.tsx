"use client";

// Hero Section Man..

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Fan, Droplet } from 'lucide-react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";


// Define hero images
const heroImages = [
  {
    src: "/images/c-1.jpg",
    alt: "Industrial facility with cooling towers"
  },
  {
    src: "/images/c-2.jpg",
    alt: "Modern HVAC system installation"
  },
  {
    src: "/images/c-3.jpg",
    alt: "Electrical technician working on equipment"
  },
  {
    src: "/images/c-4.jpg",
    alt: "Plumbing service professional"
  },
  {
    src: "/images/c-5.jpg",
    alt: "Plumbing service professional"
  },
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Image rotation effect every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <div className="relative w-full h-full">
            <Image
              src={heroImages[currentImageIndex].src}
              alt={heroImages[currentImageIndex].alt}
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
            {/* Overlay to darken the image */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center items-center">
        {/* Logo (AE) */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          {/* <div className="text-white text-6xl font-bold tracking-wider">
            <span className="text-white">A</span>
            <span className="text-white">E</span>
          </div> */}
        </motion.div>

        {/* Main Hero Text */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center max-w-4xl"
        >
          <h1 className="text-white text-4xl md:text-3xl lg:text-5xl font-bold leading-tight mb-6">
            Your Trusted Partner for Cooling, Heating, Electrical, and Plumbing Services in Summit County, Colorado
          </h1>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link href="/contact" className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105">
              Get a Quote
            </Link>
            <Link href="/packages/membership" className="bg-transparent border-2 border-white hover:bg-white hover:text-red-700 text-white font-bold py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105">
              Learn About Memberships
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Blue Bar at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-blue-800 py-4 z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold tracking-wide uppercase">
            Home of the Local Membership Program
          </h2>
        </div>
      </div>
    </section>
  );
};

// export default Hero;

const PackagesSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6 relative inline-block">
            PACKAGES
            <div className="absolute left-0 right-0 h-1 bg-blue-800 bottom-0 transform translate-y-6"></div>
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto mt-8">
            Choose from our comprehensive range of service packages designed to meet your specific needs, whether for business or residential properties.
          </p>
        </div>

        {/* Packages Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Business Package Card */}
          <motion.div 
            className="bg-white rounded-lg overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl"
            variants={itemVariants}
          >
            <div className="relative h-80 w-full overflow-hidden">
              <Image 
                // src="/images/business-package.jpg" 
                src="/images/s-1.jpg"
                alt="Business electrical system maintenance" 
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            <div className="px-8 py-10">
              <h3 className="text-3xl font-bold text-center mb-6">BUSINESS PACKAGES</h3>
              <p className="text-gray-700 mb-8 text-center">
                Comprehensive maintenance and service solutions tailored for commercial properties and businesses of all sizes. Our business packages ensure your operations run smoothly with minimal downtime.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Priority emergency response
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Scheduled maintenance plans
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Compliance certifications
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Extended warranty options
                </li>
              </ul>
              <div className="text-center">
                <Link href="/packages/business" className="inline-block bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105">
                  View Business Packages
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Residential Package Card */}
          <motion.div 
            className="bg-white rounded-lg overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl"
            variants={itemVariants}
          >
            <div className="relative h-80 w-full overflow-hidden">
              <Image 
                // src="/images/residential-package.jpg" 
                src="/images/s-2.jpg"
                alt="Residential plumbing services" 
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            <div className="px-8 py-10">
              <h3 className="text-3xl font-bold text-center mb-6">RESIDENTIAL PACKAGES</h3>
              <p className="text-gray-700 mb-8 text-center">
                Complete home service solutions designed for homeowners and property managers. Our residential packages keep your home systems running efficiently year-round.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  24/7 emergency service
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Seasonal maintenance included
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Exclusive member discounts
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  No overtime charges
                </li>
              </ul>
              <div className="text-center">
                <Link href="/packages/residential" className="inline-block bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105">
                  View Residential Packages
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Membership Banner */}
        {/* <div className="mt-16 bg-blue-800 rounded-lg shadow-xl overflow-hidden">
          <div className="px-8 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">JOIN OUR MEMBERSHIP PROGRAM</h3>
              <p className="text-blue-100">Get exclusive benefits, priority service, and special discounts year-round.</p>
            </div>
            <Link href="/packages/membership" className="whitespace-nowrap bg-white hover:bg-gray-100 text-blue-800 font-bold py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105">
              Learn More
            </Link>
          </div>
        </div> */}
      </div>
    </section>
  );
};



const AboutUsSection = () => {
  return (
    <section className="w-full py-16 bg-gray-50">
      {/* About Us Container */}
      <div className="container mx-auto px-4 max-w-6xl">
        {/* About Us Content */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-8">
            ABOUT US
          </h2>
          <p className="text-gray-700 text-center max-w-4xl mx-auto mb-8 leading-relaxed">
            With over 20 years of dedicated service, our company has established itself as a leader in the
            electrical contracting industry in Summit County. As a fully licensed and insured business, we
            specialize in delivering comprehensive electrical services across various sectors, including
            residential, commercial, and industrial. Our team is committed to providing high-quality, reliable
            solutions tailored to meet the unique needs of each client.
          </p>
          <div className="flex justify-center">
            <Link 
              href="/about"
              className="border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white px-8 py-2 rounded transition-colors duration-300 font-medium"
            >
              VIEW MORE
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service Card 1 */}
          <div className="bg-blue-800 rounded-lg text-white p-8 flex flex-col items-center">
            <Wrench size={64} className="mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-center">ELECTRIC SERVICES</h3>
            <p className="text-center mb-8">
              Our electricians provide services year-round for various problems you may face. Whether your home or business needs repairs or multiple installations.
            </p>
            <div className="mt-auto">
              <Link 
                href="/services/electric"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-800 px-8 py-2 rounded transition-colors duration-300 font-medium"
              >
                VIEW MORE
              </Link>
            </div>
          </div>

          {/* Service Card 2 */}
          <div className="bg-blue-800 rounded-lg text-white p-8 flex flex-col items-center">
            <Fan size={64} className="mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-center">COMMERCIAL HVAC</h3>
            <p className="text-center mb-8">
              If you own a commercial building, you are in charge of the comfort and safety of your tenants and employees. Your HVAC system is the sole...
            </p>
            <div className="mt-auto">
              <Link 
                href="/services/hvac"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-800 px-8 py-2 rounded transition-colors duration-300 font-medium"
              >
                VIEW MORE
              </Link>
            </div>
          </div>

          {/* Service Card 3 */}
          <div className="bg-blue-800 rounded-lg text-white p-8 flex flex-col items-center">
            <Droplet size={64} className="mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-center">PLUMBING SERVICES</h3>
            <p className="text-center mb-8">
              Do you need professional assistance with installing or repairing plumbing fixtures in your home? Whether your water heater is making strange noises...
            </p>
            <div className="mt-auto">
              <Link 
                href="/services/plumbing"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-800 px-8 py-2 rounded transition-colors duration-300 font-medium"
              >
                VIEW MORE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


const TrustedNeighborsSection = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const staggerChildren = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const benefits = [
    { id: 1, text: "On-Time Service" },
    { id: 2, text: "100% Satisfaction" },
    { id: 3, text: "Up-Front Pricing" },
    { id: 4, text: "Factory-Trained Technicians" },
    { id: 5, text: "Fully-Stocked Trucks" },
    { id: 6, text: "Respect For Your Home" }
  ];

  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Trusted By Your Neighbors Section */}
        <div className="flex flex-col lg:flex-row bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-lg overflow-hidden mb-24">
          <motion.div 
            className="lg:w-1/2 p-8 lg:p-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
              TRUSTED BY YOUR NEIGHBORS IN SUMMIT COUNTY, COLORADO
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              If you're looking for HVAC, electrical, or plumbing work, GAC Services can meet your needs. Our family-owned and operated company has been serving Summit County, Colorado for over 30 years. We care about our customers and want to keep them comfortable by providing professional, honest, reliable, and valuable indoor comfort and energy solutions.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href="/contact"
                className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg transition-colors duration-300 font-medium shadow-md"
              >
                CONTACT US
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 relative h-[300px] lg:h-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/images/t-1.jpg" 
              alt="HVAC Technician working" 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>

        {/* Why Choose GAC Section */}
        <div className="flex flex-col-reverse lg:flex-row bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-lg overflow-hidden">
          <motion.div 
            className="lg:w-1/2 relative h-[300px] lg:h-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/images/t-2.jpg" 
              alt="Electrician working" 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 p-8 lg:p-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
              WHY CHOOSE GAC?
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              "What do our customers want?" It's a question that drives the way we do business every day. We strive to be more than just an HVAC and electrical contractor—our goal is to improve people's lives through better comfort, enhanced efficiency, and greater reliability. We are proudly setting new standards in the Aether Electric and Summit County Colorado and electrical market one home at a time! Consider the many reasons why your neighbors love working with GAC:
            </p>
            
            <motion.ul 
              className="space-y-3 pl-2"
              variants={staggerChildren}
            >
              {benefits.map((benefit) => (
                <motion.li 
                  key={benefit.id} 
                  className="flex items-center gap-3"
                  variants={fadeInUp}
                >
                  <motion.div 
                    className="h-2 w-2 bg-blue-600 rounded-full"
                    whileHover={{ scale: 1.5 }}
                  />
                  <span className="text-gray-800 font-medium">{benefit.text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


export default function Home() {
  return (
    <div>
      {/* <Header /> */}
      <HeroSection />
      <PackagesSection />
      <AboutUsSection /> 
      <TrustedNeighborsSection />
      {/* <Footer /> */}
    </div>
  )
}