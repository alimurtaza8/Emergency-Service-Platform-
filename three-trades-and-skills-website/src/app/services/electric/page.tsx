import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBolt, FaFan, FaHome, FaTools, FaArrowRight } from 'react-icons/fa';
import Header from '@/components/Header';


const ElectricalServices = () => {
  const services = [
    {
      id: 'general-electric',
      title: 'GAITHERSBURG ELECTRIC SERVICES',
      description: 'Our electricians provide service when electrical fixtures malfunction, electrical systems fail, or homes need rewiring. For routine installations, our team is here to get the job done. With years of experience in the industry, we have the expertise and knowledge to ensure that projects big or small are handled professionally.',
      icon: <FaBolt className="text-blue-600 text-4xl" />,
      image: '/images/electrical-panel.jpg',
      imageAlt: 'Professional electrician working on electrical panel',
      cta: 'CONTACT US',
      ctaLink: '/contact-us'
    },
    {
      id: 'ceiling-fan',
      title: 'CEILING FAN INSTALLATION',
      description: 'Ceiling fans are a great way to keep your house cool while saving on energy bills. The installation process requires technical know-how, which is why you should let the experts handle the job. Our team can offer a wide range of ceiling fan services, including:',
      icon: <FaFan className="text-blue-600 text-4xl" />,
      image: '/images/low-angle.png',
      imageAlt: 'Technician installing a ceiling fan',
      services: [
        'Installation', 
        'Repairs', 
        'Replacement', 
        'Switches and Remote',
        'Lighted Fans',
        'And More'
      ],
      additionalText: 'Call our team to help you choose a fan that fits your style and needs. Then we make it safely and securely for you.'
    },
    {
      id: 'home-electrical',
      title: 'HOME\'S ELECTRICAL SYSTEM',
      description: 'Your home has over 40 years? If yes, it may have an outdated electrical system that needs replacing. Older homes are usually equipped with wiring and electrical systems that can no longer handle modern electrical needs, which can overload the system and cause power outages or electrical fires.',
      icon: <FaHome className="text-blue-600 text-4xl" />,
      image: '/images/panel.png',
      imageAlt: 'Residential electrical panel being serviced',
      additionalText: 'If you are looking to upgrade your home, our team at GAC Services is here to help. We will thoroughly inspect your house and create a plan to make it electrically safe for modern living.',
      cta: 'REQUEST INSPECTION',
      ctaLink: '/contact-us'
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white text-blue-900 py-16 ">
        <div className="container mx-auto px-4 mt-10">
          <h1 className="text-4xl md:text-4xl font-bold mb-4">ELECTRIC SERVICES IN SUMMIT COUNTY, COLORADO</h1>
          <p className="text-xl max-w-3xl">Professional electrical services for residential and commercial properties. Licensed, insured, and trusted by homeowners since 1995.</p>
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
                
                {service.services && (
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
                )}
                
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
      {/* <div className="bg-blue-800 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Need Emergency Electrical Service?</h2>
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
      </div> */}

      {/* Why Choose Us Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Why Choose Our Electrical Services</h2>
        
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

// export default ElectricalServicesPage;
export default function ElectricalServicesPage() {
  return (
    <div>
      <Header />
      <ElectricalServices /> 
    </div>
  )
}