import React, { useState } from 'react';
import Navbar from '../components/Navbar';
const PrivacyPolicy = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <>
    <Navbar />
    <div className="max-w-4xl mx-auto my-12 p-6 bg-white rounded-lg shadow-sm">
      
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-blue-700">PEERSHIP - PRIVACY POLICY</h1>
        <p className="text-gray-600 mt-2">Last Updated: March 6, 2025</p>
      </div>
      
      <div className="mb-8">
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <p className="text-gray-800">
            Welcome to Peership. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
          </p>
        </div>
      </div>
      
      <section className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
          onClick={() => toggleSection(1)}
        >
          <h2 className="text-xl font-semibold text-gray-800">1. INFORMATION WE COLLECT</h2>
          <svg 
            className={`w-6 h-6 text-gray-500 transform transition-transform ${expandedSection === 1 ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {expandedSection === 1 && (
          <div className="mt-2 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-2 text-gray-700">1.1 Information You Provide to Us</h3>
            <p className="mb-4 text-gray-700">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc ml-6 mb-4 text-gray-700">
              <li>Account information (name, email address, username, password)</li>
              <li>Profile information (profile picture, bio, interests)</li>
              <li>Content you create, share, or upload</li>
              <li>Communication data (messages, comments, feedback)</li>
              <li>Payment information (if applicable)</li>
            </ul>
            
            <h3 className="text-lg font-medium mb-2 text-gray-700">1.2 Information We Collect Automatically</h3>
            <p className="mb-4 text-gray-700">
              When you use our Service, we automatically collect certain information, including:
            </p>
            <ul className="list-disc ml-6 mb-4 text-gray-700">
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, time spent on site, features used)</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Location data (with your permission)</li>
            </ul>
          </div>
        )}
      </section>
      
      <section className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
          onClick={() => toggleSection(2)}
        >
          <h2 className="text-xl font-semibold text-gray-800">2. HOW WE USE YOUR INFORMATION</h2>
          <svg 
            className={`w-6 h-6 text-gray-500 transform transition-transform ${expandedSection === 2 ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {expandedSection === 2 && (
          <div className="mt-2 p-4 rounded-lg border border-gray-200">
            <p className="mb-4 text-gray-700">
              We use your information for various purposes, including:
            </p>
            <ul className="list-disc ml-6 mb-4 text-gray-700">
              <li>Providing, maintaining, and improving our services</li>
              <li>Processing transactions and managing your account</li>
              <li>Facilitating communication between peers</li>
              <li>Personalizing your experience</li>
              <li>Sending notifications and updates</li>
              <li>Monitoring and analyzing usage patterns</li>
              <li>Detecting and preventing fraudulent or unauthorized activities</li>
            </ul>
          </div>
        )}
      </section>
      
      <section className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
          onClick={() => toggleSection(3)}
        >
          <h2 className="text-xl font-semibold text-gray-800">3. INFORMATION SHARING AND DISCLOSURE</h2>
          <svg 
            className={`w-6 h-6 text-gray-500 transform transition-transform ${expandedSection === 3 ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {expandedSection === 3 && (
          <div className="mt-2 p-4 rounded-lg border border-gray-200">
            <p className="mb-4 text-gray-700">
              We may share your information with:
            </p>
            <ul className="list-disc ml-6 mb-4 text-gray-700">
              <li>Other users (as per your privacy settings)</li>
              <li>Service providers who help us deliver our services</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners (only with your consent)</li>
              <li>In connection with a merger, sale, or acquisition</li>
            </ul>
            <p className="text-gray-700">
              We will never sell your personal information to third parties for marketing purposes.
            </p>
          </div>
        )}
      </section>
      
      <section className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
          onClick={() => toggleSection(4)}
        >
          <h2 className="text-xl font-semibold text-gray-800">4. YOUR PRIVACY RIGHTS AND CHOICES</h2>
          <svg 
            className={`w-6 h-6 text-gray-500 transform transition-transform ${expandedSection === 4 ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {expandedSection === 4 && (
          <div className="mt-2 p-4 rounded-lg border border-gray-200">
            <p className="mb-4 text-gray-700">
              You have certain rights regarding your personal information:
            </p>
            <ul className="list-disc ml-6 mb-4 text-gray-700">
              <li>Access, update, or delete your personal information</li>
              <li>Change your account and privacy settings</li>
              <li>Opt-out of marketing communications</li>
              <li>Request data portability</li>
              <li>Object to the processing of your data</li>
              <li>Disable cookies through your browser settings</li>
            </ul>
            <p className="text-gray-700">
              To exercise these rights, please contact us using the information provided in the "Contact Us" section.
            </p>
          </div>
        )}
      </section>
      
      <section className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
          onClick={() => toggleSection(5)}
        >
          <h2 className="text-xl font-semibold text-gray-800">5. DATA SECURITY</h2>
          <svg 
            className={`w-6 h-6 text-gray-500 transform transition-transform ${expandedSection === 5 ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {expandedSection === 5 && (
          <div className="mt-2 p-4 rounded-lg border border-gray-200">
            <p className="mb-4 text-gray-700">
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            <p className="text-gray-700">
              We regularly review our security procedures and implement industry-standard practices to safeguard your data.
            </p>
          </div>
        )}
      </section>
      
      <section className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
          onClick={() => toggleSection(6)}
        >
          <h2 className="text-xl font-semibold text-gray-800">6. ADDITIONAL INFORMATION</h2>
          <svg 
            className={`w-6 h-6 text-gray-500 transform transition-transform ${expandedSection === 6 ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {expandedSection === 6 && (
          <div className="mt-2 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-2 text-gray-700">6.1 Data Retention</h3>
            <p className="mb-4 text-gray-700">
              We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
            </p>
            
            <h3 className="text-lg font-medium mb-2 text-gray-700">6.2 Children's Privacy</h3>
            <p className="mb-4 text-gray-700">
              Our service is not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13.
            </p>
            
            <h3 className="text-lg font-medium mb-2 text-gray-700">6.3 International Data Transfers</h3>
            <p className="mb-4 text-gray-700">
              Your information may be transferred to and processed in countries other than your country of residence, where data protection laws may differ.
            </p>
            
            <h3 className="text-lg font-medium mb-2 text-gray-700">6.4 Third-Party Links</h3>
            <p className="mb-4 text-gray-700">
              Our service may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties.
            </p>
            
            <h3 className="text-lg font-medium mb-2 text-gray-700">6.5 Changes to This Privacy Policy</h3>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </div>
        )}
      </section>
      
      <div className="mt-10 pt-6 border-t border-gray-200">
        <div className="flex items-center mb-4">
          <input 
            type="checkbox" 
            id="accept-privacy" 
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="accept-privacy" className="ml-2 text-gray-700">
            I have read and understand the Peership Privacy Policy
          </label>
        </div>
        
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
          Accept and Continue
        </button>
        
        <p className="mt-6 text-sm text-gray-600">
          For questions about this Privacy Policy, please contact us at:
          <br />
          Email: jitendradevra01@gmail.com
          <br />
          Last updated: March 6, 2025
        </p>
      </div>
    </div>
    </>
  );
};

export default PrivacyPolicy;