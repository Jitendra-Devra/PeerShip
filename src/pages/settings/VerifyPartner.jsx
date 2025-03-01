import React from "react";
import { Shield, Upload, Check } from "lucide-react";

const VerifyPartner = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center">
        <Shield size={24} className="mr-2 text-blue-500" /> Verify for Delivery Partner
      </h2>
      
      <div className="space-y-6">
        <div className="p-4 border border-blue-100 rounded-lg bg-blue-50">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Verification Requirements</h3>
          <p className="text-gray-600">To become a verified delivery partner, please upload the following documents:</p>
          
          <ul className="mt-4 space-y-2">
            <li className="flex items-center text-gray-700">
              <Check size={16} className="text-green-500 mr-2" /> Government-issued ID (Driver's License, Passport)
            </li>
            <li className="flex items-center text-gray-700">
              <Check size={16} className="text-green-500 mr-2" /> Proof of Address (Utility Bill, Bank Statement)
            </li>
            <li className="flex items-center text-gray-700">
              <Check size={16} className="text-green-500 mr-2" /> Proof of Insurance
            </li>
          </ul>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ID Upload */}
          <div className="border border-dashed border-blue-300 rounded-lg p-6 flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
            <Upload size={32} className="text-blue-500 mb-4" />
            <p className="text-sm text-gray-600 text-center mb-2">Upload Government ID</p>
            <label className="bg-blue-600 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-700 transition-colors duration-300">
              Choose File
              <input type="file" className="hidden" />
            </label>
          </div>
          
          {/* Address Proof Upload */}
          <div className="border border-dashed border-blue-300 rounded-lg p-6 flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
            <Upload size={32} className="text-blue-500 mb-4" />
            <p className="text-sm text-gray-600 text-center mb-2">Upload Proof of Address</p>
            <label className="bg-blue-600 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-700 transition-colors duration-300">
              Choose File
              <input type="file" className="hidden" />
            </label>
          </div>
          
          {/* Insurance Proof Upload */}
          <div className="border border-dashed border-blue-300 rounded-lg p-6 flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
            <Upload size={32} className="text-blue-500 mb-4" />
            <p className="text-sm text-gray-600 text-center mb-2">Upload Proof of Insurance</p>
            <label className="bg-blue-600 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-700 transition-colors duration-300">
              Choose File
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button className="bg-blue-600 text-white rounded-lg px-6 py-2 hover:bg-blue-700 transition-colors duration-300">
            Submit for Verification
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyPartner;