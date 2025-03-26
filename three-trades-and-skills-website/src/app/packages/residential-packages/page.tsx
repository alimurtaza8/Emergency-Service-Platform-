"use client";

import React, { useState } from 'react';
// import Image from "next/image";
import { 
  Diamond, 
  CheckCircle, 
  ChevronRight, 
  Shield, 
  Clock, 
//   AlertCircle,
  BadgeCheck,
  Gem,
  Sparkles
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import Header from '@/components/Header';


// export default function ResidentialPackagesPage() {
const ResidentialPackages = () => {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const router = useRouter();

  const plans = [
    {
      id: "single-diamond",
      title: "Single Diamond",
      price: 75,
      period: "per year",
      icon: Diamond,
      popular: false,
      mainFeatures: [
        "Free electrical inspection",
        "Qualified electrician report",
        "Lock in your hourly rate",
        "Speak with a person, not a machine"
      ],
      rateInfo: [
        "Normal Rate $140/hr/man. Your rate $135/hr/man.",
        "Savings of $5 an hour.",
        "Standard hours: 7am – 5pm $135/hr/man.",
        "After hours: 5pm – 9pm $350/hr/man.",
        "Night hours, weekends, holidays not included."
      ]
    },
    {
      id: "double-diamond",
      title: "Double Diamond",
      price: 150,
      period: "per year",
      icon: Gem,
      popular: true,
      mainFeatures: [
        "Money back guaranteed",
        "Services available 24 hours on weekdays",
        "Lower hourly rate",
        "Discounted labor on bigger projects"
      ],
      rateInfo: [
        "Normal Rate $140/hr/man. Your rate $125/hr/man.",
        "Savings of $15 an hour.",
        "Standard hours: 7am – 5pm $125/hr/man.",
        "Evening hours: 5pm – 9pm $350/hr/man.",
        "Night hours: 9pm – 7am $600/hr/man."
      ],
      discounts: [
        "$0 – $10,000 – normal rates apply.",
        "$10,000 – $20,000 – 5% off labor.",
        "$20,000 – $30,000 – 10% off labor."
      ]
    },
    {
      id: "triple-diamond",
      title: "Triple Diamond",
      price: 300,
      period: "per year",
      icon: Sparkles,
      popular: false,
      mainFeatures: [
        "Services available 24/7/365",
        "Including major holidays",
        "Peace of mind coverage",
        "Lowest hourly rate"
      ],
      rateInfo: [
        "Normal Rate $140/hr/man. Your rate $115/hr/man.",
        "Saving of $25 an hour.",
        "Standard hours: 7am – 5pm $130/hr/man.",
        "Evening hours: 5pm – 9pm $350/hr/man.",
        "Night hours: 9pm – 7am $600/hr/man."
      ],
      holidayRates: [
        "Standard hours: 7am – 5pm $500/hr/man.",
        "Evening hours: 5pm – 9pm $750/hr/man.",
        "Night hours: 9pm – 7am $1,000/hr/man. (Guaranteed appearance*)"
      ]
    }
  ];

  const handlePackageSelection = (plan: typeof plans[0]) => {
    router.push(`/checkout?planId=${plan.id}&planName=${plan.title}&planPrice=${plan.price}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-white pt-20">
      {/* <ResidentialHero /> */}
      
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40" />
        <div className="absolute grid grid-cols-6 gap-20 opacity-[0.015] top-0 left-0 w-full h-full rotate-12 scale-150">
          {[...Array(42)].map((_, i) => (
            <div key={i} className="w-20 h-20 bg-blue-950 rounded-full"/>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full mb-6 border border-blue-100">
            <Diamond className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-blue-800 font-medium">Residential Service Packages</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6">
            Choose Your Perfect Service Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the service tier that best suits your residential electrical needs. From basic coverage to comprehensive 24/7 support, we have a plan for every home.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`
                relative overflow-hidden rounded-2xl p-8
                ${plan.popular 
                  ? 'bg-gradient-to-b from-blue-950 to-blue-900 text-white' 
                  : 'bg-white border-2 border-gray-100'}
                ${hoveredPlan === index ? 'transform scale-[1.02]' : ''}
                transition-all duration-300 h-full
              `}>
                {/* Plan Icon */}
                <div className={`
                  w-16 h-16 rounded-xl flex items-center justify-center mb-6
                  ${plan.popular ? 'bg-white/10' : 'bg-blue-50'}
                `}>
                  <plan.icon className={`
                    w-8 h-8
                    ${plan.popular ? 'text-white' : 'text-blue-600'}
                  `} />
                </div>

                {/* Plan Details */}
                <div className="mb-8">
                  <h3 className={`
                    text-2xl font-bold mb-2
                    ${plan.popular ? 'text-white' : 'text-blue-950'}
                  `}>
                    {plan.title}
                  </h3>
                  <div className="flex items-baseline mb-4">
                    <span className={`
                      text-4xl font-bold
                      ${plan.popular ? 'text-white' : 'text-blue-950'}
                    `}>
                      ${plan.price}
                    </span>
                    <span className={`
                      ml-2
                      ${plan.popular ? 'text-blue-200' : 'text-gray-600'}
                    `}>
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* Main Features List */}
                <div className="mb-6">
                  <h4 className={`
                    font-semibold text-sm uppercase tracking-wider mb-3
                    ${plan.popular ? 'text-blue-100' : 'text-gray-500'}
                  `}>
                    Key Benefits
                  </h4>
                  <ul className="space-y-3 mb-6">
                    {plan.mainFeatures.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start">
                        <CheckCircle className={`
                          w-5 h-5 mr-3 mt-0.5 flex-shrink-0
                          ${plan.popular ? 'text-blue-300' : 'text-blue-600'}
                        `} />
                        <span className={
                          plan.popular ? 'text-blue-100' : 'text-gray-600'
                        }>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rate Information */}
                <div className="mb-6">
                  <h4 className={`
                    font-semibold text-sm uppercase tracking-wider mb-3
                    ${plan.popular ? 'text-blue-100' : 'text-gray-500'}
                  `}>
                    Rate Information
                  </h4>
                  <ul className="space-y-2 mb-4">
                    {plan.rateInfo.map((info, iIndex) => (
                      <li key={iIndex} className={`text-sm ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                        {info}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Discount Information for Double Diamond */}
                {plan.discounts && (
                  <div className="mb-6">
                    <h4 className={`
                      font-semibold text-sm uppercase tracking-wider mb-3
                      ${plan.popular ? 'text-blue-100' : 'text-gray-500'}
                    `}>
                      Project Discounts
                    </h4>
                    <ul className="space-y-2 mb-4">
                      {plan.discounts.map((discount, dIndex) => (
                        <li key={dIndex} className={`text-sm ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                          {discount}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Holiday Rates for Triple Diamond */}
                {plan.holidayRates && (
                  <div className="mb-6">
                    <h4 className={`
                      font-semibold text-sm uppercase tracking-wider mb-3
                      ${plan.popular ? 'text-blue-100' : 'text-gray-500'}
                    `}>
                      Holiday Rates
                    </h4>
                    <ul className="space-y-2 mb-4">
                      {plan.holidayRates.map((rate, rIndex) => (
                        <li key={rIndex} className={`text-sm ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                          {rate}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={() => handlePackageSelection(plan)}
                  className={`
                    w-full py-4 rounded-xl font-medium flex items-center justify-center group
                    ${plan.popular 
                      ? 'bg-white text-blue-950 hover:bg-blue-50' 
                      : 'bg-blue-950 text-white hover:bg-blue-900'}
                    transition-all duration-300
                  `}
                >
                  Buy Now
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information Section */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-blue-950 mb-6">Important Information for All Tiers</h2>
          <ul className="space-y-3 grid md:grid-cols-2 gap-x-8">
            {[
              "Anything not stated above is not included.",
              "If an emergency call requires us to pull off another job during standard business hours, a $500 surcharge plus standard hourly rates will apply.",
              "Normal scheduling applies. Non-emergency calls are scheduled normally.",
              "*Guarantees dependent on unforeseen conditions – road closures, extreme weather conditions, etc.",
              "Drive time one way is included.",
              "If material exceeds $250, a deposit for 100% of material will be required.",
              "All payments due within 30 days of project completion.",
              "Contract is void if personnel ever feels threatened, intimidated, or knowingly put into a dangerous situation.",
              "If denied access upon arrival, a service charge of 4 labor hours per man will apply.",
              "Your security is paramount. Criminal background checks are done on all personnel.",
              "Inspection includes audit of panels, receptacles in wet locations, emergency lighting, and overall electrical safety.",
              "If a detailed electrical inspection is required, additional time and material charges will apply."
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-blue-600" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-gray-200">
          {[
            { 
              icon: Shield, 
              title: "Guaranteed Service", 
              description: "Fully insured professionals with extensive experience" 
            },
            { 
              icon: Clock, 
              title: "Prompt Response", 
              description: "Fast service according to your selected tier" 
            },
            { 
              icon: BadgeCheck, 
              title: "Licensed Technicians", 
              description: "Qualified electricians for every job, big or small" 
            }
          ].map((item, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-950 mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default function ResidentialPackagesPage() {
  return (
    <div>
      <Header />
      <ResidentialPackages />
    </div>
  )
}