import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaMedal, FaUsers, FaTools, FaShieldAlt, FaBolt, FaCertificate } from 'react-icons/fa';

const AboutUsPage = () => {
  const stats = [
    { value: '20+', label: 'Years Experience', icon: <FaMedal className="text-blue-600" /> },
    { value: '500+', label: 'Projects Completed', icon: <FaBolt className="text-blue-600" /> },
    { value: '24', label: 'Skilled Electricians', icon: <FaUsers className="text-blue-600" /> },
    { value: '98%', label: 'Customer Satisfaction', icon: <FaShieldAlt className="text-blue-600" /> },
  ];

  const values = [
    { 
      title: 'Quality Workmanship', 
      description: 'We never compromise on the quality of our work. Every project is completed to the highest industry standards.',
      icon: <FaTools className="text-blue-600 text-3xl group-hover:text-white transition-colors duration-300" />
    },
    { 
      title: 'Safety First', 
      description: 'The safety of our clients and team members is paramount in every project we undertake.',
      icon: <FaShieldAlt className="text-blue-600 text-3xl group-hover:text-white transition-colors duration-300" />
    },
    { 
      title: 'Client Satisfaction', 
      description: 'We work closely with our clients to ensure their needs are met and expectations exceeded.',
      icon: <FaUsers className="text-blue-600 text-3xl group-hover:text-white transition-colors duration-300" />
    },
    { 
      title: 'Certified Excellence', 
      description: 'Our team consists of fully licensed electricians who regularly update their skills and certifications.',
      icon: <FaCertificate className="text-blue-600 text-3xl group-hover:text-white transition-colors duration-300" />
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[500px]">
        <div className="absolute inset-0">
          <Image 
            src="/images/c-1.jpg" 
            alt="Our electrical team" 
            fill
            className="object-cover"
            priority
          />
          {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-black/50"></div> */}
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">About Our Company</h1>
          <div className="w-20 h-1 bg-blue-500 mb-8"></div>
          <p className="text-xl text-white max-w-2xl">Summit County's trusted contractors since 2003. Excellence in residential, commercial, and industrial services.</p>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-blue-600"></div>
                <Image 
                  src="/images/company.jpg" 
                  alt="Company history" 
                  width={600} 
                  height={400} 
                  className="rounded-lg shadow-xl relative z-10"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-blue-600"></div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <div className="w-16 h-1 bg-blue-600 mb-8"></div>
              <p className="text-gray-700 leading-relaxed mb-6">
                With over 20 years of dedicated service, our company has established itself as a leader in the electrical contracting industry in Summit County. As a fully licensed and insured business, we specialize in delivering comprehensive electrical services across various sectors, including residential, commercial, and industrial. Our team is committed to providing high-quality, reliable solutions tailored to meet the unique needs of each client.
              </p>
              <p className="text-gray-700 leading-relaxed mb-8">
                Our expertise spans a wide range of electrical services from basic home installations and maintenance to complex industrial projects and commercial build-outs. We pride ourselves on our meticulous attention to detail and our unwavering commitment to safety and efficiency. Thanks to decades of experience, our skilled electricians ensure that every project, big or small, is executed with professionalism and precision.
              </p>
              <Link 
                href="/services" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition duration-300"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl font-bold text-blue-800 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed">
              These principles guide everything we do, from how we interact with clients to the quality of our workmanship.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="group bg-white border border-gray-200 hover:bg-blue-600 rounded-lg p-8 shadow-sm hover:shadow-lg transition duration-300"
              >
                <div className="mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-white mb-4 transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-600 group-hover:text-blue-100 transition-colors duration-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Leadership Team</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Our experienced leadership team brings decades of electrical expertise to every project.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                name: 'Robert Johnson', 
                position: 'Founder & CEO', 
                bio: 'With over 30 years in the industry, Robert founded our company with a vision to provide unmatched electrical services.',
                image: '/images/team-member-1.jpg'
              },
              { 
                name: 'Sarah Miller', 
                position: 'Operations Director', 
                bio: 'Sarah ensures every project runs smoothly from start to finish with meticulous planning and execution.',
                image: '/images/team-member-2.jpg'
              },
              { 
                name: 'Michael Thompson', 
                position: 'Lead Electrical Engineer', 
                bio: 'Michael specializes in complex electrical systems and brings innovative solutions to our most challenging projects.',
                image: '/images/team-member-3.jpg'
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300">
                <div className="h-64 relative">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.position}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Certifications & Affiliations */}
      {/* <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Certifications & Affiliations</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              We maintain the highest industry standards through ongoing education and professional affiliations.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-12">
            {['certification-1.png', 'certification-2.png', 'certification-3.png', 'certification-4.png'].map((logo, index) => (
              <div key={index} className="grayscale hover:grayscale-0 transition duration-300">
                <Image 
                  src={`/images/${logo}`} 
                  alt={`Certification logo ${index + 1}`} 
                  width={150} 
                  height={80}
                  className="h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Call to Action */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Work With Summit County's Premier Electrical Contractor?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-blue-100">
            Contact us today to discuss your electrical project needs. Our team is ready to provide expert guidance and solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-white text-blue-900 hover:bg-blue-100 font-medium py-3 px-8 rounded-md transition duration-300"
            >
              Contact Us
            </Link>
            <Link 
              href="/services" 
              className="border border-white text-white hover:bg-white/10 font-medium py-3 px-8 rounded-md transition duration-300"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;