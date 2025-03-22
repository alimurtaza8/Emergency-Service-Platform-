import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBolt, FaFan, FaHome, FaTools, FaArrowRight, FaPhoneAlt } from 'react-icons/fa';

const HvacServicesPage = () => {
  const services = [
    {
      id: 'general-electric',
      title: 'GAITHERSBURG HVAC SERVICES',
    //   description: 'Our electricians provide service when electrical fixtures malfunction, electrical systems fail, or homes need rewiring. For routine installations, our team is here to get the job done. With years of experience in the industry, we have the expertise and knowledge to ensure that projects big or small are handled professionally.',
    description: 'If you own a commercial building, you are in charge of the comfort and safety of your tenants and employees. Your HVAC system is the sole provider of heating and cooling throughout the entire building year-round.When you need a new system installed in your building, turn to the expert technicians at GAC Services. We are here to help you safely install and maintain your unit, so you can have a reliable system for years to come. For commercial HVAC services in Frederick County, Montgomery County, and Howard County, summit county Colorado, get in contact with us today and schedule an appointment.',
      icon: <FaBolt className="text-blue-600 text-4xl" />,
      image: '/images/havc-1.webp',
      imageAlt: 'Professional HVAC working',
      cta: 'CONTACT US',
      ctaLink: '/contact'
    },
    {
      id: 'ceiling-fan',
      title: 'COMERCIAL HVAC INSTALLATION',
    //   description: 'Ceiling fans are a great way to keep your house cool while saving on energy bills. The installation process requires technical know-how, which is why you should let the experts handle the job. Our team can offer a wide range of ceiling fan services, including:',
      description: 'Our experts can help you select the right HVAC unit for your building. We will inspect your setup and measure the size of your building, so we can select the best system. Whether you need a rooftop unit or a zone control system installation, we will make sure your entire building can maintain adequate temperatures no matter the season.If you find that your current system is malfunctioning, we can conduct HVAC repairs. We’ll thoroughly inspect your unit and fix any problems it is facing. However, if you need to have your unit replaced, we can help you too. We will carefully remove your old unit from your commercial property and quickly install the new system.',
    icon: <FaFan className="text-blue-600 text-4xl" />,
      image: '/images/h-2.jpg',
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
      title: 'HVAC Maintenance',
    //   description: 'Your home has over 40 years? If yes, it may have an outdated electrical system that needs replacing. Older homes are usually equipped with wiring and electrical systems that can no longer handle modern electrical needs, which can overload the system and cause power outages or electrical fires.',
        description: 'Do you want to avoid breakdowns? At GAC Services, we suggest that you have your HVAC unit regularly serviced every year. Our professionals will clean your unit, inside and out, and find any problems that are affecting your system. These services will keep your unit in proper working condition, preventing any expensive repairs and extending the lifespan of your unit.',
    icon: <FaHome className="text-blue-600 text-4xl" />,
      image: '/images/h-3.jpg',
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
          <h1 className="text-4xl md:text-4xl font-bold mb-4">HVAC SERVICES IN SUMMIT COUNTY, COLORADO</h1>
          <p className="text-xl max-w-3xl">Professional hvac services for residential and commercial properties. Licensed, insured, and trusted by homeowners since 1995.</p>
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
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Need Emergency Hvac Service?</h2>
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
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Why Choose Our Hvac Services</h2>
        
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