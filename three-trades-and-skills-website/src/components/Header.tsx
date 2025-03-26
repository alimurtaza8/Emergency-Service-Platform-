// // components/Header/Header.tsx
// "use client";

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// // import Image from 'next/image';
// // import { FaShoppingCart } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// const Header: React.FC = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // Handle scroll effect for sticky header
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 20) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <header 
//       className={`w-full fixed top-0 z-50 transition-all duration-300 ${
//         isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
//       }`}
//     >
//       <div className="container mx-auto px-4 flex justify-between items-center ">
//         {/* Logo */}
//         {/* <Link href="/" className="flex items-center">
//           <div className="relative h-16 w-48">
//             <Image 
//               src="/images/logo-three.jpg" 
//               alt="3 Skilled Trades and Services" 
//               fill
//               style={{ objectFit: 'contain' }}
//               priority
//             />
//           </div>
//         </Link> */}


// <Link href="/" className="flex items-center space-x-3 group">
//             <div className="relative flex items-center">
//               <div className="w-12 h-12 bg-gradient-to-r from-blue-950 to-blue-800 rounded-2xl flex items-center justify-center transform transition-all duration-300 group-hover:rotate-6">
//                 {/* <Car className="w-7 h-7 text-white transform transition-all duration-300 group-hover:-rotate-6" /> */}
//               </div>
//               <div className="absolute -right-1 -top-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white" />
//             </div>
//             <div className="flex flex-col">
//               <span className="text-2xl font-bold text-blue-950">Three Trade And Skills</span>
//               <span className="text-xs text-blue-600 font-medium">Services Based Platform</span>
//             </div>
//           </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center space-x-6">
//           <Link href="/" className="text-gray-800 font-semibold hover:text-red-800 transition-colors">
//             HOME
//           </Link>
//           {/* <div className="relative group"> */}
//           <div className="relative inline-block"> {/* Added wrapper */}
//             <Link href="/#" className="text-gray-800 font-semibold hover:text-red-700 transition-colors flex items-center"
//             onMouseEnter={(e) => e.preventDefault()}> 
//               SERVICES
//               <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </Link>
//              {/* <p  className="text-gray-800 font-semibold hover:text-red-700 transition-colors flex items-center">
//               SERVICES
//               <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </p> */}
//             <div className="absolute left-0 mt-1 w-48 bg-white shadow-lg rounded-md hidden group-hover:block">
//               <div className="py-1">
//                 {/* <Link href="/services/plumbing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Heating</Link> */}
//                 <Link href="/services/electric" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Electrical</Link>
//                 <Link href="/services/hvac" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Hvac</Link>
//                 {/* <Link href="/services/electric" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Electrical</Link> */}
//                 <Link href="/services/plumbing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Plumbing</Link>
//               </div>
//             </div>
//           </div>
//           <div className="relative group">
//             <Link href="/packages" className="text-gray-800 font-semibold hover:text-red-700 transition-colors flex items-center">
//               PACKAGES
//               <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </Link>
//             <div className="absolute left-0 mt-1 w-48 bg-white shadow-lg rounded-md hidden group-hover:block">
//               <div className="py-1">
//                 <Link href="/packages/residential-packages" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Residential</Link>
//                 <Link href="/packages/business-packages" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Business</Link>
//               </div>
//             </div>
//           </div>
//           <Link href="/about-us" className="text-gray-800 font-semibold hover:text-red-700 transition-colors">
//             ABOUT US
//           </Link>
//           <Link href="/contact-us" className="text-gray-800 font-semibold hover:text-red-700 transition-colors">
//             CONTACT US
//           </Link>
         
//         </nav>

//         {/* Shopping Cart */}
//          <div className="flex items-center">
//            {/* <Link href="/cart" className="flex items-center text-gray-800 hover:text-red-700 transition-colors">
//             <span className="mr-2 font-semibold">$0.00</span>
//             <div className="relative">
//               <FaShoppingCart size={24} />
//               <span className="absolute -top-2 -right-2 bg-red-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">0</span>
//             </div>
//           </Link>   */}
//           <button className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-8 rounded-md transition-all duration-300">
//            <Link href="/login">
//               LOGIN
//           </Link>
//           </button>
          
//           {/* Mobile Menu Button */}
//           <button 
//             className="ml-4 md:hidden"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           >
//             <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               {isMobileMenuOpen ? (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               ) : (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               )}
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {isMobileMenuOpen && (
//         <motion.div 
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: 'auto' }}
//           exit={{ opacity: 0, height: 0 }}
//           transition={{ duration: 0.3 }}
//           className="md:hidden bg-white"
//         >
//           <div className="px-4 py-2 space-y-1">
//             <Link href="/" className="block py-2 text-red-700 font-semibold">HOME</Link>
//             <div className="py-2">
//               <button 
//                 className="flex items-center justify-between w-full text-gray-800 font-semibold"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   const submenu = e.currentTarget.nextElementSibling;
//                   if (submenu) submenu.classList.toggle('hidden');
//                 }}
//               >
//                 SERVICES
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>
//               <div className="pl-4 mt-1 hidden">
//                 <Link href="/services/electric" className="block py-2 text-sm text-gray-700">Electrical</Link>
//                 <Link href="/services/hvac" className="block py-2 text-sm text-gray-700">Hvac</Link>
//                 <Link href="/services/plumbing" className="block py-2 text-sm text-gray-700">Plumbing</Link>
//               </div>
//             </div>
//             <div className="py-2">
//               <button 
//                 className="flex items-center justify-between w-full text-gray-800 font-semibold"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   const submenu = e.currentTarget.nextElementSibling;
//                   if (submenu) submenu.classList.toggle('hidden');
//                 }}
//               >
//                 PACKAGES
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>
//               <div className="pl-4 mt-1 hidden">
//                 <Link href="/packages/residential-packages" className="block py-2 text-sm text-gray-700">Residential</Link>
//                 <Link href="/packages/business-packages" className="block py-2 text-sm text-gray-700">Business</Link>
//                 {/* <Link href="/packages/membership" className="block py-2 text-sm text-gray-700">Membership</Link> */}
//               </div>
//             </div>
//             <Link href="/about-us" className="block py-2 text-gray-800 font-semibold">ABOUT US</Link>
//             <Link href="/contact-us" className="block py-2 text-gray-800 font-semibold">CONTACT US</Link>
//           </div>
//         </motion.div>
//       )}
//     </header>
//   );
// };

// export default Header;







// //////////////////////////////////////////////////////////////

// New updated Header code

// components/Header/Header.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// import Image from 'next/image';
// import { FaShoppingCart } from 'react-icons/fa';
// import { motion } from 'framer-motion';
import {  Transition } from '@headlessui/react';
import { Fragment } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownHover = (menu: string) => {
    setOpenDropdown(menu);
  };

  const handleDropdownLeave = () => {
    setTimeout(() => {
      setOpenDropdown(null);
    }, 300);
  };

  const servicesMenu = [
    { name: 'Electrical', href: '/services/electric' },
    { name: 'HVAC', href: '/services/hvac' },
    { name: 'Plumbing', href: '/services/plumbing' }
  ];

  const packagesMenu = [
    { name: 'Residential', href: '/packages/residential-packages' },
    { name: 'Business', href: '/packages/business-packages' }
  ];

  return (
    <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-950 to-blue-800 rounded-2xl flex items-center justify-center transform transition-all duration-300 group-hover:rotate-6">
              {/* <Car className="w-7 h-7 text-white transform transition-all duration-300 group-hover:-rotate-6" /> */}
            </div>
            <div className="absolute -right-1 -top-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-blue-950">Three Trade And Skills</span>
            <span className="text-xs text-blue-600 font-medium">Services Based Platform</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="nav-link text-gray-800 font-semibold hover:text-red-800">HOME</Link>

          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => handleDropdownHover('services')}
            onMouseLeave={handleDropdownLeave}
          >
            <button className="nav-link flex items-center text-gray-800 font-semibold hover:text-red-800">
              SERVICES
              <ChevronDownIcon className="ml-1 h-4 w-4" />
            </button>
            
            <Transition
              show={openDropdown === 'services'}
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <div className="absolute top-full left-0 w-48 pt-2">
                <div className="bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {servicesMenu.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onMouseEnter={() => handleDropdownHover('services')}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </Transition>
          </div>

          {/* Packages Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => handleDropdownHover('packages')}
            onMouseLeave={handleDropdownLeave}
          >
            <button className="nav-link flex items-center text-gray-800 font-semibold hover:text-red-800">
              PACKAGES
              <ChevronDownIcon className="ml-1 h-4 w-4" />
            </button>
            
            <Transition
              show={openDropdown === 'packages'}
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <div className="absolute top-full left-0 w-48 pt-2">
                <div className="bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {packagesMenu.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onMouseEnter={() => handleDropdownHover('packages')}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </Transition>
          </div>

          <Link href="/about-us" className="nav-link text-gray-800 font-semibold hover:text-red-800">ABOUT US</Link>
          <Link href="/contact-us" className="nav-link text-gray-800 font-semibold hover:text-red-800">CONTACT US</Link>
        </nav>

        {/* CTA Section */}
        <div className="flex items-center gap-4">
          {/* <Link href="/login" className="cta-button">
            LOGIN
          </Link> */}
          {/* <button className="nav-link bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-8 rounded-md transition-all duration-300">
            <Link href="/login">
              LOGIN
            </Link>
          </button> */}

<button className="hidden md:inline-block nav-link bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-8 rounded-md transition-all duration-300">
  <Link href="/login">
    LOGIN
  </Link>
</button>

          
          {/* Mobile Menu Button */}
           <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <MenuIcon className="w-6 h-6 text-gray-800" />
          </button> 
        </div>
      </div>

      {/* Mobile Navigation */}
      <Transition
        show={isMobileMenuOpen}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-1">
            <MobileNavLink href="/">HOME</MobileNavLink>
            
            <MobileDropdown title="SERVICES">
              {servicesMenu.map((item) => (
                <MobileNavLink key={item.name} href={item.href}>
                  {item.name}
                </MobileNavLink>
              ))}
            </MobileDropdown>

            <MobileDropdown title="PACKAGES">
              {packagesMenu.map((item) => (
                <MobileNavLink key={item.name} href={item.href}>
                  {item.name}
                </MobileNavLink>
              ))}
            </MobileDropdown>

            <MobileNavLink href="/about-us">ABOUT US</MobileNavLink>
            <MobileNavLink href="/contact-us">CONTACT US</MobileNavLink>
            <MobileNavLink href="/login">LOGIN</MobileNavLink>
          </div>
        </div>
      </Transition>
    </header>
  );
};

// Helper Components
const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const MobileNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="block py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-lg">
    {children}
  </Link>
);

const MobileDropdown = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-1">
      <button
        className="w-full flex justify-between items-center py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`pl-4 space-y-1 ${isOpen ? 'block' : 'hidden'}`}>
        {children}
      </div>
    </div>
  );
};

export default Header;








/////////////////////////

