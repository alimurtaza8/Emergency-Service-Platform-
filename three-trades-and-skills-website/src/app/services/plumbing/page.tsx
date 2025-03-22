import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBolt, FaFan, FaHome, FaTools, FaArrowRight, FaPhoneAlt } from 'react-icons/fa';

const HvacServicesPage = () => {
  const services = [
    {
      id: 'general-electric',
      title: 'GAITHERSBURG PlUMBING SERVICES',
    description: 'Do you need professional assistance with installing or repairing plumbing fixtures in your home? Whether your water heater is making strange noises or you need to replace a gas line, our team from GAC Services is here to help.For reliable plumbing services in Gaithersburg, Frederick County, Montgomery County, and Howard County, summit county Colorado, get in contact with our experienced technicians.',
      icon: <FaBolt className="text-blue-600 text-4xl" />,
      image: '/images/p-1.png',
      imageAlt: 'Professional HVAC working',
      cta: 'CONTACT US',
      ctaLink: '/contact'
    },
    {
      id: 'ceiling-fan',
      title: 'PLUMBING FIXTURE INSTALLATION & REPLACEMENT',
      description: 'New plumbing fixtures are considerable investments that require precise handling during installation. No matter what plumbing fixture you need in your home, trust that our plumbers will assist you in finding an affordable unit and installing it in your home.Additionally, our Gaithersburg professional plumbers can help you when you’re looking for any new plumbing appliances. We’ll inspect your home and advise you on the size and model so you have adequately heated water. We can also help you install a sump pump, a device designed to protect your home from flooding.Get in touch with us today and set up an appointment for a plumbing fixture installation or replacement.',
    icon: <FaFan className="text-blue-600 text-4xl" />,
      image: '/images/p-2.jpg',
      imageAlt: 'Technician Installing HVAC',
    //   services: [
    //     'Installation', 
    //     'Repairs', 
    //     'Replacement', 
    //     'Switches and Remote',
    //     'Lighted Fans',
    //     'And More'
    //   ],
      additionalText: 'Call our team to help you choose a fan that fits your style and needs. Then we make it safely and securely for you.'
    },
    {
      id: 'home-electrical',
      title: 'PLUMBING REPAIRS IMMEDIATELY',
        description: 'Is any of your plumbing equipment showing signs of wear and tear? If you hear unusual noises, smell odors, or notice any other signs of trouble, have our experienced plumbers inspect and diagnose your plumbing fixtures.Whether it’s a toilet, water heater, or your pipes, we’ll help you with any and all plumbing repairs that you require. Reach out to us, and we’ll make sure that your fixtures are working properly.',
    icon: <FaHome className="text-blue-600 text-4xl" />,
      image: '/images/p-3.jpg',
      imageAlt: 'Residential hvac panel being serviced',
      additionalText: 'If you are looking to upgrade your home, our team at GAC Services is here to help. We will thoroughly inspect your house and create a plan to make it electrically safe for modern living.',
      cta: 'REQUEST INSPECTION',
      ctaLink: '/contact'
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white text-blue-900 py-16 ">
        <div className="container mx-auto px-4 mt-10">
          <h1 className="text-4xl md:text-4xl font-bold mb-4">PlUMBING SERVICES IN SUMMIT COUNTY, COLORADO</h1>
          <p className="text-xl max-w-3xl">Professional plumbing services for residential and commercial properties. Licensed, insured, and trusted by homeowners since 1995.</p>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-24">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className={`flex flex-col ${index % 2 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}
            >
              {/* Image Section */}
              <div className="w-full lg:w-1/2">
                <div className="relative overflow-hidden rounded-lg shadow-xl">
                  <Image 
                    src={service.image} 
                    alt={service.imageAlt}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full lg:w-1/2">
                <div className="flex items-center gap-4 mb-4">
                  {service.icon}
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-800">{service.title}</h2>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">{service.description}</p>
                
                {/* {service.services && (
                  <div className="mb-6">
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {service.services.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )} */}
                
                {service.additionalText && (
                  <p className="text-gray-700 mb-6 leading-relaxed">{service.additionalText}</p>
                )}
                
                {service.cta && (
                  <Link 
                    href={service.ctaLink} 
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium transition duration-300"
                  >
                    {service.cta}
                    <FaArrowRight />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Banner */}
      <div className="bg-blue-800 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Need Emergency Plumbing Service?</h2>
              <p className="text-blue-100">Our team is available 24/7 for urgent electrical issues</p>
            </div>
            <Link 
              href="/contact" 
              className="flex items-center gap-2 bg-white text-blue-800 hover:bg-blue-100 py-3 px-6 rounded-md font-medium transition duration-300"
            >
              <FaPhoneAlt />
              CALL NOW
            </Link>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Why Choose Our Plumbing Services</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              icon: <FaTools className="text-blue-600 text-3xl" />,
              title: "Licensed & Insured",
              description: "All our technicians are fully certified, licensed and insured for your peace of mind."
            },
            { 
              icon: <FaBolt className="text-blue-600 text-3xl" />,
              title: "Fast Response",
              description: "We pride ourselves on quick response times for both emergency and scheduled services."
            },
            { 
              icon: <FaHome className="text-blue-600 text-3xl" />,
              title: "Residential Experts",
              description: "Specializing in all aspects of home electrical systems from repairs to full rewiring."
            },
            { 
              icon: <FaTools className="text-blue-600 text-3xl" />,
              title: "Quality Guaranteed",
              description: "All our work comes with a satisfaction guarantee and competitive warranties."
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HvacServicesPage;