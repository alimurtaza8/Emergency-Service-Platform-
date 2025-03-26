// "use client";

// import React, { useState ,useRef} from 'react';
// import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaCheckCircle } from 'react-icons/fa';
// import Header from '@/components/Header';
// import emailjs from "@emailjs/browser";
// import { 
//   Mail, Phone, MapPin, Send, 
//   Loader2, CheckCircle, 
//   Facebook, Twitter, Linkedin, Instagram,
//   Shield
// } from 'lucide-react';


// const Contact = () => {

//   const formRef = useRef<HTMLFormElement>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
//   const [error, setError] = useState("");

//   const [formState, setFormState] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     service: '',
//     message: '',
//   });
  
//   const [formStatus, setFormStatus] = useState({
//     submitted: false,
//     error: false,
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormState((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // const handleSubmit = (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   // Here you would typically handle the form submission to your backend
//   //   // For demonstration purposes, we'll simulate a successful submission
    
//   //   setTimeout(() => {
//   //     setFormStatus({ submitted: true, error: false });
//   //     setFormState({
//   //       name: '',
//   //       email: '',
//   //       phone: '',
//   //       service: '',
//   //       message: '',
//   //     });
//   //   }, 1000);
//   // };


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formRef.current) return;

//     try {
//       setIsSubmitting(true);
//       setError("");
      
//       // Using environment variables for EmailJS credentials
//       const result = await emailjs.sendForm(
//         process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
//         process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
//         formRef.current,
//         process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
//       );

//       console.log('Email sent successfully!', result.text);
//       setSubmitStatus('success');
//       if (formRef.current) {
//         formRef.current.reset();
//       }
      
//       // Reset submit status after 3 seconds
//       setTimeout(() => setSubmitStatus(null), 3000);
//     } catch (error) {
//       console.error('Failed to send email:', error);
//       setSubmitStatus('error');
//       if (error instanceof Error) {
//         setError(error.message);
//       } else {
//         setError("Failed to send message. Please try again.");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };


//   return (
//     <div className="bg-gray-50">
//       {/* Hero Section */}
//       <div className="bg-white text-blue-900 py-16">
//         <div className="container mx-auto px-4 mt-10">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
//           <p className="text-xl max-w-3xl">
//             Have questions or need to schedule service? Our team is ready to assist you with all your electrical needs.
//           </p>
//         </div>
//       </div>

//       {/* Contact Information Section */}
//       <div className="container mx-auto px-4 py-16">
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
//           <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
//             <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
//               <FaMapMarkerAlt className="text-blue-600 text-2xl" />
//             </div>
//             <h3 className="text-lg font-semibold text-center mb-2">Our Location</h3>
//             <p className="text-gray-600 text-center">
//               123 Electrical Avenue<br />
//               Summit County, CO 80498
//             </p>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
//             <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
//               <FaPhoneAlt className="text-blue-600 text-2xl" />
//             </div>
//             <h3 className="text-lg font-semibold text-center mb-2">Phone Number</h3>
//             <p className="text-gray-600 text-center">
//               Office: (970) 555-1234<br />
//               Emergency: (970) 555-5678
//             </p>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
//             <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
//               <FaEnvelope className="text-blue-600 text-2xl" />
//             </div>
//             <h3 className="text-lg font-semibold text-center mb-2">Email Address</h3>
//             <p className="text-gray-600 text-center">
//               info@gacservices.com<br />
//               support@gacservices.com
//             </p>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
//             <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
//               <FaClock className="text-blue-600 text-2xl" />
//             </div>
//             <h3 className="text-lg font-semibold text-center mb-2">Business Hours</h3>
//             <p className="text-gray-600 text-center">
//               Monday-Friday: 8AM-6PM<br />
//               Weekend: 9AM-4PM
//             </p>
//           </div>
//         </div>

//         <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
//           {/* Map Section */}
//           <div className="lg:w-1/2 h-80 lg:h-auto relative">
//             {/* Replace with actual Google Map component or iframe */}
//             <div className="bg-gray-300 w-full h-full flex items-center justify-center">
//               <p className="text-gray-600">Map Integration Here</p>
//               {/* 
//                 Example Google Maps iframe:
//                 <iframe 
//                   src="https://www.google.com/maps/embed?pb=..." 
//                   width="100%" 
//                   height="100%" 
//                   style={{ border: 0 }} 
//                   allowFullScreen 
//                   loading="lazy"
//                 ></iframe>
//               */}
//             </div>
//           </div>

//           {/* Contact Form */}
//            <div className="lg:w-1/2 p-8 lg:p-12">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
            
//             {formStatus.submitted ? (
//               <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
//                 <FaCheckCircle className="text-green-500 text-4xl mb-4 mx-auto" />
//                 <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You!</h3>
//                 <p className="text-green-700">
//                   Your message has been received. Our team will contact you shortly.
//                 </p>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit}>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <div>
//                     <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={formState.name}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formState.email}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     />
//                   </div>
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <div>
//                     <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       name="phone"
//                       value={formState.phone}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="service" className="block text-gray-700 font-medium mb-2">Service Needed</label>
//                     <select
//                       id="service"
//                       name="service"
//                       value={formState.service}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     >
//                       <option value="">Select a service</option>
//                       <option value="residential">Residential Electrical</option>
//                       <option value="commercial">Commercial Electrical</option>
//                       <option value="industrial">Industrial Electrical</option>
//                       <option value="heatTape">Heat Tape Installation</option>
//                       <option value="remodels">Remodels</option>
//                       <option value="emergencyService">Emergency Service</option>
//                       <option value="other">Other</option>
//                     </select>
//                   </div>
//                 </div>
                
//                 <div className="mb-6">
//                   <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     value={formState.message}
//                     onChange={handleChange}
//                     rows={5}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                   ></textarea>
//                 </div>
                
//                 {/* <button
//                   type="submit"
//                   className="w-full bg-blue-900 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-300"
//                 onClick={handleSubmit}
//                 >
//                   Send Message
//                 </button>  */}
//                  <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="group relative w-full px-6 py-4 bg-blue-950 text-white rounded-xl font-medium overflow-hidden"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-700 translate-x-full group-hover:translate-x-0 transition-transform duration-300"/>
//                 <span className="relative flex items-center justify-center">
//                   {isSubmitting ? (
//                     <Loader2 className="w-5 h-5 animate-spin mr-2" />
//                   ) : submitStatus === 'success' ? (
//                     <CheckCircle className="w-5 h-5 mr-2" />
//                   ) : (
//                     <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
//                   )}
//                   {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Message Sent!' : 'Send Message'}
//                 </span>
//               </button>



//               </form>
//             )}
//           </div> 
//         </div>
//       </div>

//       {/* FAQ Section */}
//       <div className="bg-gray-100 py-16">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
//           <div className="max-w-3xl mx-auto space-y-6">
//             {[
//               {
//                 question: "What areas do you service in Summit County?",
//                 answer: "We provide electrical services throughout Summit County, including Breckenridge, Frisco, Dillon, Silverthorne, Keystone, and surrounding areas."
//               },
//               {
//                 question: "Do you offer emergency electrical services?",
//                 answer: "Yes, we offer 24/7 emergency electrical services for urgent issues. Please call our emergency line at (970) 555-5678 for immediate assistance."
//               },
//               {
//                 question: "Are your electricians licensed and insured?",
//                 answer: "Absolutely. All our electricians are fully licensed, insured, and have undergone extensive training and certification. We pride ourselves on professional, code-compliant work."
//               },
//               {
//                 question: "How quickly can you schedule an appointment?",
//                 answer: "For standard service requests, we typically schedule appointments within 1-3 business days. Emergency services are available same-day."
//               }
//             ].map((faq, index) => (
//               <div key={index} className="bg-white rounded-lg shadow-md p-6">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-3">{faq.question}</h3>
//                 <p className="text-gray-600">{faq.answer}</p>
//               </div>
//             ))}
//           </div>
          
//           <div className="text-center mt-12">
//             <p className="text-gray-600">
//               Don't see your question here? Contact us directly and we'll be happy to help.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       {/* <div className="bg-blue-800 text-white py-16">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold mb-6">Need Immediate Assistance?</h2>
//           <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//             Our emergency service team is available 24/7 to respond to urgent electrical issues.
//           </p>
//           <div className="inline-block bg-white text-blue-800 hover:bg-blue-100 font-bold py-4 px-8 rounded-md text-xl transition duration-300">
//             Call (970) 555-5678
//           </div>
//         </div>
//       </div> */}
//     </div>
//   );
// };

// // export default ContactPage;
// export default function ContactPage() {
//   return (
//     <div>
//       <Header />
//       <Contact />
//     </div>
//   )
// }











////////////////////////////////////////////////////


"use client";

import React, { useState, useRef } from 'react';
// import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaCheckCircle } from 'react-icons/fa';
import Header from '@/components/Header';
import emailjs from "@emailjs/browser";
import { 
  ChevronDown, Loader2, CheckCircle, Send,
  MapPin, Phone, Mail, Clock, AlertCircle
} from 'lucide-react';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [,setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    try {
      setIsSubmitting(true);
      setError("");
      
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setSubmitStatus('success');
      formRef.current.reset();
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
      setError(error instanceof Error ? error.message : "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqItems = [
    {
      question: "What areas do you service?",
      answer: "We provide services throughout Summit County including Breckenridge, Frisco, Dillon, and surrounding areas."
    },
    {
      question: "Do you offer emergency services?",
      answer: "Yes, 24/7 emergency services available. Call (970) 555-5678 for immediate assistance."
    },
    {
      question: "Are your technicians certified?",
      answer: "All technicians are licensed, insured, and undergo regular training."
    },
    {
      question: "What's your response time?",
      answer: "Standard appointments within 1-3 business days. Emergency services available same-day."
    }
  ];

  return (
    <div className="bg-gray-50 mt-10">
      <div className="bg-white text-blue-900 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl max-w-3xl opacity-90">
            Connect with our expert team for all your service needs. We&apos;re here to help 24/7.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Contact Cards */}
          {[
            { icon: <MapPin size={24} />, title: "Our Location", 
              content: "123 Service Lane\nSummit County, CO 80498" },
            { icon: <Phone size={24} />, title: "Contact", 
              content: "Office: (970) 555-1234\nEmergency: (970) 555-5678" },
            { icon: <Mail size={24} />, title: "Email", 
              content: "info@threetrades.com\nsupport@threetrades.com" },
            { icon: <Clock size={24} />, title: "Hours", 
              content: "Mon-Fri: 8AM-6PM\nSat-Sun: 9AM-4PM" }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 whitespace-pre-line">{item.content}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="lg:w-1/2 h-96">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3075.860986997989!2d-106.06583292357568!3d39.58628347160191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876a5c9f53caf4a1%3A0x7748f0d48b37b2e9!2sSummit%20County%2C%20CO%2C%20USA!5e0!3m2!1sen!2sin!4v1716992055910!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          <div className="lg:w-1/2 p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Send a Message</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Service</label>
                  <select
                    name="service"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    onChange={handleChange}
                  >
                    <option value="">Select Service</option>
                    <option value="electrical">Electrical</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="hvac">HVAC</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Sending...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="transform -rotate-45" />
                    Send Message
                  </>
                )}
              </button>

              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
                  <AlertCircle />
                  {error || "Failed to send message. Please try again."}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Common Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <h3 className="text-lg font-semibold">{item.question}</h3>
                  <ChevronDown className={`transform transition-transform ${
                    openFaq === index ? 'rotate-180' : ''
                  }`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 py-4 pt-0 text-gray-600">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ContactPage() {
  return (
    <div>
      <Header />
      <Contact />
    </div>
  )
}