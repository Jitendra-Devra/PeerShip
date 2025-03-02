import React, { useState } from 'react';

const TermsCondition = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-blue-700">PEERSHIP - TERMS AND CONDITIONS</h1>
        <p className="text-gray-600 mt-2">Last Updated: March 1, 2025</p>
      </div>
      
      <div className="mb-8">
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <p className="text-gray-800">
            Welcome to Peership ("we," "us," or "our"), a peer-to-peer delivery platform that connects users who need items delivered ("Senders") with verified users who can deliver those items ("Delivery Partners").
          </p>
          <p className="text-gray-800 mt-2">
            These Terms and Conditions ("Terms") govern your access to and use of the Peership website, mobile application, and services (collectively, the "Service"). By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access the Service.
          </p>
        </div>
      </div>
      
      <section className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
          onClick={() => toggleSection(1)}
        >
          <h2 className="text-xl font-semibold text-gray-800">1. ELIGIBILITY AND ACCOUNT REGISTRATION</h2>
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
            <h3 className="text-lg font-medium mb-2 text-gray-700">1.1 Eligibility</h3>
            <p className="mb-4 text-gray-700">
              To use our Service, you must be at least 18 years old and capable of forming a legally binding contract. By using the Service, you represent and warrant that you meet these requirements.
            </p>
            
            <h3 className="text-lg font-medium mb-2 text-gray-700">1.2 Account Registration</h3>
            <p className="mb-4 text-gray-700">
              To become a user on Peership, you must:
            </p>
            <ul className="list-disc ml-6 mb-4 text-gray-700">
              <li>Create an account with accurate, complete, and updated information</li>
              <li>Choose a password that you will keep secure</li>
              <li>Not share your account credentials with others</li>
            </ul>
            
            <h3 className="text-lg font-medium mb-2 text-gray-700">1.3 Verification Process</h3>
            <p className="mb-4 text-gray-700">
              To become a Delivery Partner, you must complete our verification process, which includes:
            </p>
            <ul className="list-disc ml-6 mb-4 text-gray-700">
              <li>Providing valid government-issued identification</li>
              <li>Submitting to background checks where applicable</li>
              <li>Providing any additional information requested for verification purposes</li>
            </ul>
            <p className="text-gray-700">
              We reserve the right to deny or revoke verification status at our discretion.
            </p>
          </div>
        )}
      </section>
      
      <section className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
          onClick={() => toggleSection(2)}
        >
          <h2 className="text-xl font-semibold text-gray-800">2. SERVICE DESCRIPTION</h2>
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
            <h3 className="text-lg font-medium mb-2 text-gray-700">2.1 Peer-to-Peer Delivery</h3>
            <p className="mb-4 text-gray-700">
              Peership facilitates peer-to-peer delivery services between Senders and Delivery Partners. We do not provide delivery services directly but serve as a platform connecting users.
            </p>
            
            <h3 className="text-lg font-medium mb-2 text-gray-700">2.2 User Relationships</h3>
            <p className="mb-4 text-gray-700">
              Senders and Delivery Partners enter into direct agreements for delivery services. Peership is not a party to these agreements but facilitates the transaction, payment processing, and communication.
            </p>
            
            <h3 className="text-lg font-medium mb-2 text-gray-700">2.3 No Employment Relationship</h3>
            <p className="text-gray-700">
              Delivery Partners are independent contractors and not employees of Peership. We do not control the manner or means by which Delivery Partners perform deliveries.
            </p>
          </div>
        )}
      </section>
      
      <section className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
          onClick={() => toggleSection(3)}
        >
          <h2 className="text-xl font-semibold text-gray-800">3. SENDER RESPONSIBILITIES</h2>
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
            <h3 className="text-lg font-medium mb-2 text-gray-700">3.1 Accurate Information</h3>
            <p className="mb-4 text-gray-700">
              Senders must provide accurate and complete information about:
            </p>
            <ul className="list-disc ml-6 mb-4 text-gray-700">
              <li>Item descriptions</li>
              <li>Pickup and delivery locations</li>
              <li>Delivery timeframes</li>
              <li>Special handling instructions</li>
            </ul>
            
            <h3 className="text-lg font-medium mb-2 text-gray-700">3.2 Prohibited Items</h3>
            <p className="mb-4 text-gray-700">
              Senders may not request delivery of:
            </p>
            <ul className="list-disc ml-6 mb-4 text-gray-700">
              <li>Illegal items</li>
              <li>Dangerous or hazardous materials</li>
              <li>Firearms, weapons, or ammunition</li>
              <li>Controlled substances</li>
              <li>Perishable items without proper disclosure</li>
              <li>Items that violate third-party rights</li>
              <li>Items exceeding weight or dimension limitations set by Peership</li>
            </ul>
            
            <h3 className="text-lg font-medium mb-2 text-gray-700">3.3 Package Preparation</h3>
            <p className="mb-4 text-gray-700">
              Senders are responsible for proper packaging to prevent damage during transit.
            </p>
            
            <h3 className="text-lg font-medium mb-2 text-gray-700">3.4 Item Value Declaration</h3>
            <p className="text-gray-700">
              Senders must declare the accurate value of items being delivered. Peership's liability is limited to the declared value.
            </p>
          </div>
        )}
      </section>
      
      <section className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
          onClick={() => toggleSection(4)}
        >
          <h2 className="text-xl font-semibold text-gray-800">4. DELIVERY PARTNER RESPONSIBILITIES</h2>
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
            <h3 className="text-lg font-medium mb-2 text-gray-700">4.1 Service Standards</h3>
            <p className="mb-4 text-gray-700">
              Delivery Partners must:
            </p>
            <ul className="list-disc ml-6 mb-4 text-gray-700">
              <li>Complete deliveries in a timely manner according to agreed timeframes</li>
              <li>Handle items with reasonable care</li>
              <li>Follow Sender instructions for delivery</li>
              <li>Communicate promptly regarding delivery status</li>
              <li>Obtain proof of delivery when required</li>
            </ul>
            
            <h3 className="text-lg font-medium mb-2 text-gray-700">4.2 Compliance with Laws</h3>
            <p className="mb-4 text-gray-700">
              Delivery Partners must comply with all applicable laws and regulations while performing deliveries, including:
            </p>
            <ul className="list-disc ml-6 mb-4 text-gray-700">
              <li>Traffic laws</li>
              <li>Transportation regulations</li>
              <li>Health and safety requirements</li>
            </ul>
            
            <h3 className="text-lg font-medium mb-2 text-gray-700">4.3 Insurance and Liability</h3>
            <p className="text-gray-700">
              Delivery Partners acknowledge they are responsible for:
            </p>
            <ul className="list-disc ml-6 mb-4 text-gray-700">
              <li>Their own insurance coverage</li>
              <li>Damage to items in their possession</li>
              <li>Any accidents or incidents that occur during delivery</li>
            </ul>
          </div>
        )}
      </section>
      
      <section className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
          onClick={() => toggleSection(5)}
        >
          <h2 className="text-xl font-semibold text-gray-800">5. PAYMENT TERMS</h2>
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
            <h3 className="text-lg font-medium mb-2 text-gray-700">5.1 Fee Structure</h3>
            <ul className="list-disc ml-6 mb-4 text-gray-700">
              <li>Senders pay delivery fees as displayed before confirming a delivery request</li>
              <li>Peership retains a service fee from each transaction</li>
              <li>Delivery Partners receive the remaining amount after Peership's service fee</li>
            </ul>
            
            <h3 className="text-lg font-medium mb-2 text-gray-700">5.2 Payment Processing</h3>
            <ul className="list-disc ml-6 mb-4 text-gray-700">
              <li>All payments are processed through Peership's platform</li>
              <li>Direct payments between Senders and Delivery Partners are prohibited</li>
            </ul>
            
            <h3 className="text-lg font-medium mb-2 text-gray-700">5.3 Wallet and Withdrawals</h3>
            <ul className="list-disc ml-6 mb-4 text-gray-700">
              <li>Payments to Delivery Partners are deposited into their Peership wallet</li>
              <li>Delivery Partners may withdraw funds according to our withdrawal policies</li>
              <li>Withdrawal methods and timelines are subject to change</li>
            </ul>
            
            <h3 className="text-lg font-medium mb-2 text-gray-700">5.4 Taxes</h3>
            <ul className="list-disc ml-6 mb-4 text-gray-700">
              <li>Delivery Partners are responsible for reporting and paying all applicable taxes</li>
              <li>Peership may provide tax documentation where required by law</li>
              <li>Peership is not responsible for tax withholding for Delivery Partners</li>
            </ul>
          </div>
        )}
      </section>
      
      <section className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
          onClick={() => toggleSection(6)}
        >
          <h2 className="text-xl font-semibold text-gray-800">6. ADDITIONAL TERMS</h2>
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
            <p className="mb-4 text-gray-700">
              For complete details on the following sections, please refer to our full Terms and Conditions:
            </p>
            <ul className="list-disc ml-6 mb-4 text-gray-700">
              <li>Cancellations and Disputes</li>
              <li>Rating and Feedback System</li>
              <li>Platform Rules and Prohibitions</li>
              <li>Liability and Limitations</li>
              <li>Termination and Suspension</li>
              <li>Changes to Terms</li>
              <li>Privacy Policy</li>
              <li>Governing Law and Jurisdiction</li>
              <li>Dispute Resolution</li>
            </ul>
            <p className="text-sm text-gray-600">
  The complete Terms and Conditions document is available <a href="/peership-terms-conditions.pdf" download="Peership-Terms-and-Conditions.pdf" className="text-blue-600 hover:underline">here</a>.
</p>
          </div>
        )}
      </section>
      
      <div className="mt-10 pt-6 border-t border-gray-200">
        <div className="flex items-center mb-4">
          <input 
            type="checkbox" 
            id="accept-terms" 
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="accept-terms" className="ml-2 text-gray-700">
            I have read and agree to the Peership Terms and Conditions
          </label>
        </div>
        
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
          Accept and Continue
        </button>
        
        <p className="mt-6 text-sm text-gray-600">
          For questions about these Terms, please contact us at:
          <br />
          Email: support@peership.com
          <br />
          Last updated: March 1, 2025
        </p>
      </div>
    </div>
  );
};

export default TermsCondition;