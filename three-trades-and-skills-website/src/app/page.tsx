"use client";

// Hero Section Man..

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Fan, Droplet } from 'lucide-react';
// import { useRouter } from 'next/navigation';
import Header from '@/components/Header';


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
                <Link href="/packages/business-packages" className="inline-block bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105">
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
                <Link href="/packages/residential-packages" className="inline-block bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105">
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
              href="/about-us"
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
              If you&apos;re looking for HVAC, electrical, or plumbing work, GAC Services can meet your needs. Our family-owned and operated company has been serving Summit County, Colorado for over 30 years. We care about our customers and want to keep them comfortable by providing professional, honest, reliable, and valuable indoor comfort and energy solutions.
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
            &quot;What do our customers want?&quot; It&apos;s a question that drives the way we do business every day. We strive to be more than just an HVAC and electrical contractor—our goal is to improve people&apos;s lives through better comfort, enhanced efficiency, and greater reliability. We are proudly setting new standards in the Aether Electric and Summit County Colorado and electrical market one home at a time! Consider the many reasons why your neighbors love working with GAC:
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



// Define the structure of each step
interface Step {
  title: string;
  description: string;
}

// Define the steps in the user flow
const steps: Step[] = [
  {
    title: 'Visit the Website',
    description: 'Start by visiting our homepage to explore our services.',
  },
  {
    title: 'Choose a Plan',
    description: 'Browse through our available plans and select the one that best fits your needs.',
  },
  {
    title: 'Purchase the Plan',
    description: 'Complete the purchase through our secure checkout process.',
  },
  {
    title: 'Authenticate with ICP',
    description: 'Log in using Internet Computer Protocol (ICP) for secure and decentralized access.',
  },
  {
    title: 'Access Your Dashboard',
    description: 'View your plan details, manage your account, and access exclusive features.',
  },
];

// Functional component to display the user flow
const UserFlowGuide = () => {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">How It Works</h2>*/}
      {/* <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6 relative inline-block">
            HOW IT WORKS
            <div className="absolute left-0 right-0 h-1 bg-blue-800 bottom-0 transform translate-y-6"></div>
          </h2> */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6 relative inline-block">
            HOW IT WORKS
            <div className="absolute left-0 right-0 h-1 bg-blue-800 bottom-0 transform translate-y-6"></div>
          </h2>
          {/* <p className="text-gray-700 text-lg max-w-2xl mx-auto mt-8">
            Choose from our comprehensive range of service packages designed to meet your specific needs, whether for business or residential properties.
          </p> */}
        </div>
      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
              {index + 1}
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-1 text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



export default function HomePage() {
  return (
    <div>
      <Header />
      <HeroSection />
      <PackagesSection />
      <UserFlowGuide />
      {/* {/* <TestimonialsSection /> */}
      <AboutUsSection />
      <TrustedNeighborsSection />
    </div>
  )
}


// export default function HomePage() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
  
//   const handleLogin = (e: React.MouseEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     // Redirect to login page
//     router.push('/login');
//   };
  
//   const handleSignup = (e: React.MouseEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     // Redirect to signup page
//     router.push('/register');
//   };
  
//   const handleEmergency = (e: React.MouseEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     // For demo purposes, we'll log in as a user and redirect to emergency page
//     fetch('/api/auth/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         username: 'user@test.com',
//         password: 'user123',
//       }),
//     })
//       .then(response => response.json())
//       .then(data => {
//         if (data.success) {
//           router.push('/emergency/request');
//         } else {
//           console.error('Login failed');
//           setIsLoading(false);
//         }
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         setIsLoading(false);
//       });
//   };
  
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <header className="pt-6 pb-4">
//           <nav className="flex items-center justify-between">
//             <div className="flex items-center">
//               <div className="text-2xl font-bold text-blue-800">Three Trades & Skills</div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={handleLogin}
//                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 Log In
//               </button>
//               <button
//                 onClick={handleSignup}
//                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 Sign Up
//               </button>
//             </div>
//           </nav>
//         </header>
        
//         {/* Hero Section */}
//         <main>
//           <div className="py-12 md:py-20">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//               <div className="flex flex-col justify-center">
//                 <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
//                   Emergency Services on the Blockchain
//                 </h1>
//                 <p className="mt-5 text-xl text-gray-500">
//                   Get immediate assistance from verified professionals for plumbing, electrical, and HVAC emergencies.
//                 </p>
//                 <div className="mt-8 flex flex-col sm:flex-row">
//                   <div className="mb-4 sm:mb-0 sm:mr-4">
//                     <button
//                       onClick={handleEmergency}
//                       disabled={isLoading}
//                       className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white ${
//                         isLoading ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'
//                       } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 md:py-4 md:text-lg md:px-10`}
//                     >
//                       {isLoading ? 'Loading...' : 'Request Emergency Service'}
//                     </button>
//                   </div>
//                   <div>
//                     <a
//                       href="#features"
//                       className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 md:py-4 md:text-lg md:px-10"
//                     >
//                       Learn More
//                     </a>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex justify-center">
//                 <div className="relative w-full h-64 sm:h-72 md:h-96">
//                   <div className="absolute inset-0 bg-blue-500 rounded-lg shadow-lg transform skew-y-6 sm:skew-y-0 sm:-rotate-6 opacity-25"></div>
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg">
//                     <div className="absolute inset-0 flex items-center justify-center p-8">
//                       <div className="max-w-md text-white">
//                         <h2 className="text-2xl font-bold mb-4">24/7 Emergency Service</h2>
//                         <ul className="space-y-2">
//                           <li className="flex items-center">
//                             <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                             </svg>
//                             Verified Professionals
//                           </li>
//                           <li className="flex items-center">
//                             <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                             </svg>
//                             Secure Blockchain Payments
//                           </li>
//                           <li className="flex items-center">
//                             <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                             </svg>
//                             Quick Response Time
//                           </li>
//                           <li className="flex items-center">
//                             <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                             </svg>
//                             Satisfaction Guaranteed
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* Features Section */}
//           <div id="features" className="py-12 bg-white rounded-lg shadow-lg">
//             <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
//               <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
//                 Our Emergency Services
//               </h2>
//               <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//                 <div className="bg-blue-50 rounded-lg p-6 hover:shadow-md transition-shadow">
//                   <div className="h-12 w-12 rounded-md bg-blue-500 flex items-center justify-center mb-4">
//                     <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                     </svg>
//                   </div>
//                   <h3 className="text-lg font-medium text-gray-900">Electrical</h3>
//                   <p className="mt-2 text-base text-gray-500">
//                     From power outages to electrical failures, our certified electricians are available 24/7.
//                   </p>
//                 </div>
                
//                 <div className="bg-blue-50 rounded-lg p-6 hover:shadow-md transition-shadow">
//                   <div className="h-12 w-12 rounded-md bg-blue-500 flex items-center justify-center mb-4">
//                     <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                   <h3 className="text-lg font-medium text-gray-900">Plumbing</h3>
//                   <p className="mt-2 text-base text-gray-500">
//                     Water leaks, burst pipes, clogged drains - our plumbers are ready to help.
//                   </p>
//                 </div>
                
//                 <div className="bg-blue-50 rounded-lg p-6 hover:shadow-md transition-shadow">
//                   <div className="h-12 w-12 rounded-md bg-blue-500 flex items-center justify-center mb-4">
//                     <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                     </svg>
//                   </div>
//                   <h3 className="text-lg font-medium text-gray-900">HVAC</h3>
//                   <p className="mt-2 text-base text-gray-500">
//                     Heating or cooling emergencies are handled by our experienced HVAC technicians.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
        
//         {/* Footer */}
//         <footer className="bg-white py-12 mt-12">
//           <div className="max-w-7xl mx-auto px-4 overflow-hidden sm:px-6 lg:px-8">
//             <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
//               <div className="px-5 py-2">
//                 <a href="#" className="text-base text-gray-500 hover:text-gray-900">
//                   About
//                 </a>
//               </div>
//               <div className="px-5 py-2">
//                 <a href="#" className="text-base text-gray-500 hover:text-gray-900">
//                   Services
//                 </a>
//               </div>
//               <div className="px-5 py-2">
//                 <a href="#" className="text-base text-gray-500 hover:text-gray-900">
//                   Pricing
//                 </a>
//               </div>
//               <div className="px-5 py-2">
//                 <a href="#" className="text-base text-gray-500 hover:text-gray-900">
//                   Contact
//                 </a>
//               </div>
//               <div className="px-5 py-2">
//                 <a href="#" className="text-base text-gray-500 hover:text-gray-900">
//                   Terms & Conditions
//                 </a>
//               </div>
//               <div className="px-5 py-2">
//                 <a href="#" className="text-base text-gray-500 hover:text-gray-900">
//                   Privacy
//                 </a>
//               </div>
//             </nav>
//             <p className="mt-8 text-center text-base text-gray-400">
//               &copy; 2023 Three Trades & Skills. All rights reserved.
//             </p>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// }