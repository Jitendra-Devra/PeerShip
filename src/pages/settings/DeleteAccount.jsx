import React, { useState } from 'react';

const DeleteAccount = () => {
  const [confirmation, setConfirmation] = useState('');
  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [showFinalWarning, setShowFinalWarning] = useState(false);
  const [accountDeleted, setAccountDeleted] = useState(false);
  
  const possibleReasons = [
    { value: 'not-useful', label: 'I don\'t find the service useful' },
    { value: 'too-expensive', label: 'Subscription cost is too high' },
    { value: 'found-alternative', label: 'I found a better alternative' },
    { value: 'privacy-concerns', label: 'Privacy concerns' },
    { value: 'too-complex', label: 'The service is too complicated to use' },
    { value: 'bugs', label: 'Too many bugs or technical issues' },
    { value: 'other', label: 'Other reason' }
  ];
  
  const validateStep1 = () => {
    const newErrors = {};
    
    if (!reason) {
      newErrors.reason = 'Please select a reason';
    }
    
    if (reason === 'other' && !otherReason.trim()) {
      newErrors.otherReason = 'Please specify your reason';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateStep2 = () => {
    const newErrors = {};
    
    if (!password) {
      newErrors.password = 'Please enter your password';
    }
    
    if (confirmation !== 'DELETE') {
      newErrors.confirmation = 'Please type DELETE to confirm';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setShowFinalWarning(true);
    }
  };
  
  const handleDeleteAccount = () => {
    // In a real application, this would call an API to delete the account
    console.log('Account deletion confirmed with password and reason:', {
      reason: reason === 'other' ? otherReason : reason,
      password
    });
    
    // Simulate successful deletion
    setAccountDeleted(true);
  };
  
  if (accountDeleted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center">
          <div className="bg-red-100 border border-red-300 text-red-700 px-6 py-8 rounded-lg mb-6">
            <h2 className="text-2xl font-bold mb-4">Account Deleted</h2>
            <p className="mb-4">Your account has been permanently deleted.</p>
            <p>All your personal data has been removed from our systems.</p>
          </div>
          
          <a href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md">
            Return to Homepage
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2 text-red-600">Delete Account</h1>
      <p className="text-gray-700 mb-6">We're sorry to see you go. This process will permanently delete your account and all associated data.</p>
      
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-8">
        <h2 className="font-semibold text-yellow-800 mb-2">Important Information</h2>
        <ul className="list-disc list-inside space-y-1 text-yellow-800">
          <li>This action <span className="font-bold">cannot</span> be undone</li>
          <li>All your personal data will be permanently deleted</li>
          <li>You will lose access to all your content and purchased items</li>
          <li>Any active subscriptions will be canceled</li>
        </ul>
      </div>
      
      {showFinalWarning ? (
        <div className="border border-red-500 p-6 rounded-lg bg-red-50">
          <h2 className="text-xl font-bold text-red-700 mb-4">Final Warning</h2>
          <p className="mb-6">You are about to permanently delete your account. This action cannot be reversed, and all your data will be lost.</p>
          
          <div className="flex space-x-4">
            <button
              onClick={() => setShowFinalWarning(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteAccount}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md"
            >
              Permanently Delete My Account
            </button>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-6">
          <div className="flex mb-6">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'} mr-2`}>1</div>
            <div className="h-1 w-10 bg-gray-200 self-center mr-2"></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>2</div>
          </div>
          
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Help us improve</h2>
              <p className="mb-4">Please let us know why you're deleting your account:</p>
              
              <div className="space-y-3 mb-6">
                {possibleReasons.map((item) => (
                  <div key={item.value} className="flex items-start">
                    <input
                      type="radio"
                      id={item.value}
                      name="reason"
                      value={item.value}
                      checked={reason === item.value}
                      onChange={(e) => setReason(e.target.value)}
                      className="mt-1 mr-2"
                    />
                    <label htmlFor={item.value}>{item.label}</label>
                  </div>
                ))}
                
                {reason === 'other' && (
                  <div className="ml-6 mt-2">
                    <label htmlFor="otherReason" className="block mb-1">Please specify:</label>
                    <textarea
                      id="otherReason"
                      value={otherReason}
                      onChange={(e) => setOtherReason(e.target.value)}
                      className="w-full p-2 border rounded-md"
                      rows="3"
                    ></textarea>
                    {errors.otherReason && <p className="text-red-600 text-sm mt-1">{errors.otherReason}</p>}
                  </div>
                )}
              </div>
              {errors.reason && <p className="text-red-600 text-sm mb-4">{errors.reason}</p>}
            </div>
          )}
          
          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
              
              <div className="mb-4">
                <label htmlFor="password" className="block mb-1 font-medium">Enter your password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
              </div>
              
              <div className="mb-6">
                <label htmlFor="confirmation" className="block mb-1 font-medium">Type DELETE to confirm</label>
                <input
                  type="text"
                  id="confirmation"
                  value={confirmation}
                  onChange={(e) => setConfirmation(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="DELETE"
                />
                {errors.confirmation && <p className="text-red-600 text-sm mt-1">{errors.confirmation}</p>}
              </div>
            </div>
          )}
          
          <div className="flex justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md"
              >
                Back
              </button>
            ) : (
              <a href="/account" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md">
                Cancel
              </a>
            )}
            
            <button
              onClick={handleNextStep}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md"
            >
              {step === 1 ? 'Continue' : 'Delete Account'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;