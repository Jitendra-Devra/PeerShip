import React, { useState } from 'react';

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'normal',
    userType: 'sender' // New field to identify if user is a sender or delivery partner
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('general'); // For FAQ tab navigation
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulating form submission
    console.log('Support request submitted:', formData);
    setSubmitted(true);
    
    // Reset form after submission (in a real app, you might do this after successful API response)
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        priority: 'normal',
        userType: 'sender'
      });
      setSubmitted(false);
    }, 5000);
  };
  
  // Reorganized FAQs by category from Peership content
  const faqCategories = {
    general: [
      {
        question: "What is Peership?",
        answer: "Peership is a peer-to-peer delivery platform that connects people who need items delivered with verified users who can help. Our service allows Senders to request fast, reliable deliveries and Delivery Partners to earn money by delivering packages along routes they're already traveling."
      },
      {
        question: "Is Peership available in my area?",
        answer: "Peership is currently available in select service areas. We're expanding rapidly, so check our website regularly for updates on new service areas."
      },
      {
        question: "How is my personal information protected?",
        answer: "We take data security seriously. All personal information is encrypted and stored securely. Please review our Privacy Policy for complete details."
      },
      {
        question: "What items are prohibited from delivery?",
        answer: "Prohibited items include but are not limited to: illegal goods, hazardous materials, firearms, controlled substances, and excessively valuable items. See our Terms & Conditions for a complete list."
      }
    ],
    sender: [
      {
        question: "How do I request a delivery?",
        answer: "1. Log in to your Peership account\n2. Click \"New Delivery\" and enter package details\n3. Specify pickup and delivery locations\n4. Set your delivery urgency (standard or urgent)\n5. Review the delivery fee and confirm your request"
      },
      {
        question: "How are delivery fees calculated?",
        answer: "Delivery fees are based on distance, package size, urgency level, and current demand. You'll always see the exact fee before confirming your delivery request."
      },
      {
        question: "How do I track my delivery?",
        answer: "Once your delivery is accepted, you can track its progress in real-time through the \"My Deliveries\" section of your account. You'll also receive notifications when your package is picked up and delivered."
      },
      {
        question: "What if my item is damaged during delivery?",
        answer: "All deliveries include basic protection based on your declared item value. If damage occurs, please report it immediately through our \"Report an Issue\" feature in the delivery details."
      },
      {
        question: "Can I cancel a delivery request?",
        answer: "Yes, you can cancel a delivery before it's accepted without any fees. Cancellations after acceptance may incur a fee based on delivery progress."
      }
    ],
    partner: [
      {
        question: "How do I become a Delivery Partner?",
        answer: "1. Create a Peership account\n2. Navigate to \"Become a Delivery Partner\"\n3. Submit required verification documents (government ID)\n4. Complete our background verification process\n5. Once approved, you can start accepting delivery requests"
      },
      {
        question: "How do I find deliveries to complete?",
        answer: "Browse available deliveries in your area through the \"Available Deliveries\" section. You can filter by location, timing, and package size to find deliveries that match your route."
      },
      {
        question: "When and how do I get paid?",
        answer: "After successfully completing a delivery and receiving confirmation from the Sender, payment is automatically credited to your Peership wallet. You can withdraw funds to your bank account from the \"Wallet\" section."
      },
      {
        question: "What if I can't complete a delivery I've accepted?",
        answer: "If circumstances prevent you from completing a delivery, please contact support immediately. Repeated cancellations may affect your rating and ability to accept future deliveries."
      },
      {
        question: "Am I responsible for damaged items?",
        answer: "As a Delivery Partner, you're responsible for handling packages with care. If items are damaged during transit due to negligence, you may be liable up to the declared value of the item."
      }
    ]
  };
  
  // Safety tips from Peership content
  const safetyTips = {
    sender: [
      "Always verify the Delivery Partner's profile and ratings before accepting",
      "Package items securely to prevent damage",
      "Accurately describe your item and its value",
      "Use the in-app messaging for all communication"
    ],
    partner: [
      "Verify the sender's identity before accepting packages",
      "Inspect packages for proper packaging before accepting",
      "Document the condition of packages with photos when applicable",
      "Follow all traffic laws and safety regulations during delivery"
    ]
  };
  
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white">
      <header className="text-center mb-10 border-b pb-6">
        <h1 className="text-4xl font-bold mb-3 text-blue-700">PEERSHIP SUPPORT</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          At Peership, we're committed to making your peer-to-peer delivery experience as smooth as possible. 
          Whether you're a Sender looking to get your items delivered or a Delivery Partner earning money through our platform, we're here to help.
        </p>
      </header>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700 border-b pb-2">About Peership</h2>
        <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
          <p className="mb-4">Peership is a peer-to-peer delivery platform that connects people who need items delivered with verified users who can help. Our service allows:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li className="font-medium"><span className="text-blue-700">Senders</span> to request fast, reliable deliveries for their items</li>
            <li className="font-medium"><span className="text-blue-700">Delivery Partners</span> to earn money by delivering packages along routes they're already traveling</li>
            <li className="font-medium"><span className="text-blue-700">Both parties</span> to benefit from a secure, transparent, and community-driven delivery system</li>
          </ul>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700 border-b pb-2">Frequently Asked Questions</h2>
        
        <div className="mb-6">
          <div className="flex border-b">
            <button 
              className={`py-2 px-4 font-medium ${activeTab === 'general' ? 'border-b-2 border-blue-600 text-blue-700' : 'text-gray-600'}`}
              onClick={() => setActiveTab('general')}
            >
              General
            </button>
            <button 
              className={`py-2 px-4 font-medium ${activeTab === 'sender' ? 'border-b-2 border-blue-600 text-blue-700' : 'text-gray-600'}`}
              onClick={() => setActiveTab('sender')}
            >
              For Senders
            </button>
            <button 
              className={`py-2 px-4 font-medium ${activeTab === 'partner' ? 'border-b-2 border-blue-600 text-blue-700' : 'text-gray-600'}`}
              onClick={() => setActiveTab('partner')}
            >
              For Delivery Partners
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {faqCategories[activeTab].map((faq, index) => (
            <div key={index} className="border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
              <h3 className="font-medium text-lg mb-2 text-blue-700">{faq.question}</h3>
              <p className="text-gray-700 whitespace-pre-line">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700 border-b pb-2">Safety Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-5 bg-green-50">
            <h3 className="text-xl font-medium mb-3 text-green-700">For Senders</h3>
            <ul className="space-y-2">
              {safetyTips.sender.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border rounded-lg p-5 bg-indigo-50">
            <h3 className="text-xl font-medium mb-3 text-indigo-700">For Delivery Partners</h3>
            <ul className="space-y-2">
              {safetyTips.partner.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700 border-b pb-2">Community Guidelines</h2>
        <div className="bg-yellow-50 p-6 rounded-lg shadow-sm">
          <p className="mb-4">Peership thrives on mutual respect and trust. We expect all users to:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <li className="flex items-center bg-white p-3 rounded shadow-sm">
              <span className="text-yellow-500 mr-2 text-xl">✓</span>
              <span>Communicate respectfully</span>
            </li>
            <li className="flex items-center bg-white p-3 rounded shadow-sm">
              <span className="text-yellow-500 mr-2 text-xl">✓</span>
              <span>Provide honest ratings and feedback</span>
            </li>
            <li className="flex items-center bg-white p-3 rounded shadow-sm">
              <span className="text-yellow-500 mr-2 text-xl">✓</span>
              <span>Honor commitments and scheduled deliveries</span>
            </li>
            <li className="flex items-center bg-white p-3 rounded shadow-sm">
              <span className="text-yellow-500 mr-2 text-xl">✓</span>
              <span>Report any suspicious activity or policy violations</span>
            </li>
          </ul>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700 border-b pb-2">Contact Support</h2>
        {submitted ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded shadow-sm">
            <p className="font-medium text-lg mb-1">Thank you for contacting us!</p>
            <p>We've received your support request and will get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="userType" className="block mb-1 font-medium">I am a</label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                >
                  <option value="sender">Sender</option>
                  <option value="partner">Delivery Partner</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="priority" className="block mb-1 font-medium">Priority</label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block mb-1 font-medium">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block mb-1 font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                required
              ></textarea>
            </div>
            
            <div>
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md shadow-sm hover:shadow transition-all duration-200"
              >
                Submit Request
              </button>
            </div>
          </form>
        )}
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700 border-b pb-2">Other Ways to Reach Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
            <h3 className="font-medium text-lg mb-2 text-blue-700">Email</h3>
            <p>support@peership.com</p>
          </div>
          <div className="border p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
            <h3 className="font-medium text-lg mb-2 text-blue-700">Live Chat</h3>
            <p>Available 9am-6pm</p>
            <p className="text-sm text-gray-600">Monday through Friday</p>
          </div>
          <div className="border p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
            <h3 className="font-medium text-lg mb-2 text-blue-700">Emergency Support</h3>
            <p>24/7 emergency line</p>
            <p className="text-sm text-gray-600">For urgent delivery issues</p>
          </div>
        </div>
      </section>
      
      <footer className="mt-16 pt-8 border-t text-center text-gray-600">
        <p>Thank you for being part of the Peership community!</p>
      </footer>
    </div>
  );
};

export default Support;