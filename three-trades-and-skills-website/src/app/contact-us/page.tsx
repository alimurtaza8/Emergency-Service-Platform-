"use client";

import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaCheckCircle } from 'react-icons/fa';

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission to your backend
    // For demonstration purposes, we'll simulate a successful submission
    
    setTimeout(() => {
      setFormStatus({ submitted: true, error: false });
      setFormState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
    }, 1000);
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white text-black py-16">
        <div className="container mx-auto px-4 mt-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-3xl">
            Have questions or need to schedule service? Our team is ready to assist you with all your electrical needs.
          </p>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <FaMapMarkerAlt className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">Our Location</h3>
            <p className="text-gray-600 text-center">
              123 Electrical Avenue<br />
              Summit County, CO 80498
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <FaPhoneAlt className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">Phone Number</h3>
            <p className="text-gray-600 text-center">
              Office: (970) 555-1234<br />
              Emergency: (970) 555-5678
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <FaEnvelope className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">Email Address</h3>
            <p className="text-gray-600 text-center">
              info@gacservices.com<br />
              support@gacservices.com
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <FaClock className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">Business Hours</h3>
            <p className="text-gray-600 text-center">
              Monday-Friday: 8AM-6PM<br />
              Weekend: 9AM-4PM
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Map Section */}
          <div className="lg:w-1/2 h-80 lg:h-auto relative">
            {/* Replace with actual Google Map component or iframe */}
            <div className="bg-gray-300 w-full h-full flex items-center justify-center">
              <p className="text-gray-600">Map Integration Here</p>
              {/* 
                Example Google Maps iframe:
                <iframe 
                  src="https://www.google.com/maps/embed?pb=..." 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                ></iframe>
              */}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-1/2 p-8 lg:p-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
            
            {formStatus.submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <FaCheckCircle className="text-green-500 text-4xl mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You!</h3>
                <p className="text-green-700">
                  Your message has been received. Our team will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-gray-700 font-medium mb-2">Service Needed</label>
                    <select
                      id="service"
                      name="service"
                      value={formState.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select a service</option>
                      <option value="residential">Residential Electrical</option>
                      <option value="commercial">Commercial Electrical</option>
                      <option value="industrial">Industrial Electrical</option>
                      <option value="heatTape">Heat Tape Installation</option>
                      <option value="remodels">Remodels</option>
                      <option value="emergencyService">Emergency Service</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-300"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What areas do you service in Summit County?",
                answer: "We provide electrical services throughout Summit County, including Breckenridge, Frisco, Dillon, Silverthorne, Keystone, and surrounding areas."
              },
              {
                question: "Do you offer emergency electrical services?",
                answer: "Yes, we offer 24/7 emergency electrical services for urgent issues. Please call our emergency line at (970) 555-5678 for immediate assistance."
              },
              {
                question: "Are your electricians licensed and insured?",
                answer: "Absolutely. All our electricians are fully licensed, insured, and have undergone extensive training and certification. We pride ourselves on professional, code-compliant work."
              },
              {
                question: "How quickly can you schedule an appointment?",
                answer: "For standard service requests, we typically schedule appointments within 1-3 business days. Emergency services are available same-day."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600">
              Don't see your question here? Contact us directly and we'll be happy to help.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Immediate Assistance?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our emergency service team is available 24/7 to respond to urgent electrical issues.
          </p>
          <div className="inline-block bg-white text-blue-800 hover:bg-blue-100 font-bold py-4 px-8 rounded-md text-xl transition duration-300">
            Call (970) 555-5678
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;