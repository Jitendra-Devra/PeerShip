import React from "react";
import { DollarSign, CreditCard, Plus, ArrowDown, ArrowUp } from "lucide-react";

const PaymentWallet = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center">
        <DollarSign size={24} className="mr-2 text-blue-500" /> Payment Wallet Settings
      </h2>
      
      <div className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Current Balance</h3>
          <span className="text-2xl font-bold">$132.40</span>
        </div>
        
        <div className="flex space-x-4">
          <button className="bg-white text-blue-600 rounded-lg px-4 py-2 flex items-center hover:bg-blue-50 transition-colors duration-300">
            <Plus size={18} className="mr-2" /> Add Money
          </button>
          <button className="bg-white text-blue-600 rounded-lg px-4 py-2 flex items-center hover:bg-blue-50 transition-colors duration-300">
            <ArrowUp size={18} className="mr-2" /> Withdraw
          </button>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Payment Methods</h3>
          
          <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between mb-4">
            <div className="flex items-center">
              <CreditCard size={24} className="text-blue-500 mr-3" />
              <div>
                <p className="font-medium text-gray-800">Visa •••• 4567</p>
                <p className="text-sm text-gray-500">Expires 05/2026</p>
              </div>
            </div>
            <button className="text-red-500 text-sm hover:text-red-600">Remove</button>
          </div>
          
          <button className="border border-dashed border-blue-300 rounded-lg p-4 w-full flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors duration-300">
            <Plus size={20} className="mr-2" /> Add New Payment Method
          </button>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Transaction History</h3>
          
          <div className="space-y-2">
            <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <ArrowDown size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Received Payment</p>
                  <p className="text-sm text-gray-500">Feb 20, 2025</p>
                </div>
              </div>
              <p className="font-medium text-green-600">+$45.00</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <ArrowUp size={16} className="text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Withdrawal</p>
                  <p className="text-sm text-gray-500">Feb 15, 2025</p>
                </div>
              </div>
              <p className="font-medium text-red-600">-$80.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentWallet;