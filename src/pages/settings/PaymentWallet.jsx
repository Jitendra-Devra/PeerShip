import React, { useState } from "react";
import { DollarSign, CreditCard, Plus, ArrowDown, ArrowUp, X, Check, ExternalLink, Download, AlertCircle } from "lucide-react";

const PaymentWallet = () => {
  // State management
  const [balance, setBalance] = useState(132.40);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [addAmount, setAddAmount] = useState("");
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: "Visa", lastFour: "4567", expiry: "05/2026", isDefault: true },
    { id: 2, type: "Mastercard", lastFour: "8901", expiry: "11/2025", isDefault: false }
  ]);
  const [transactions, setTransactions] = useState([
    { id: 1, type: "received", amount: 45.00, date: "Feb 20, 2025", description: "Received Payment" },
    { id: 2, type: "withdrawal", amount: 80.00, date: "Feb 15, 2025", description: "Withdrawal" },
    { id: 3, type: "received", amount: 120.00, date: "Feb 10, 2025", description: "Refund" },
    { id: 4, type: "withdrawal", amount: 35.50, date: "Feb 5, 2025", description: "Purchase" }
  ]);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [newCardDetails, setNewCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: ""
  });
  const [activeTab, setActiveTab] = useState("all");
  const [notification, setNotification] = useState(null);

  // Handle add money
  const handleAddMoney = () => {
    if (addAmount && !isNaN(parseFloat(addAmount))) {
      const amount = parseFloat(addAmount);
      setBalance(prev => parseFloat((prev + amount).toFixed(2)));
      
      // Add to transactions
      const newTransaction = {
        id: transactions.length + 1,
        type: "received",
        amount: amount,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        description: "Added to Wallet"
      };
      
      setTransactions([newTransaction, ...transactions]);
      setAddAmount("");
      setShowAddMoneyModal(false);
      
      // Show notification
      showNotification("Money added successfully!", "success");
    }
  };

  // Handle withdraw
  const handleWithdraw = () => {
    if (withdrawAmount && !isNaN(parseFloat(withdrawAmount))) {
      const amount = parseFloat(withdrawAmount);
      
      if (amount > balance) {
        showNotification("Insufficient balance!", "error");
        return;
      }
      
      setBalance(prev => parseFloat((prev - amount).toFixed(2)));
      
      // Add to transactions
      const newTransaction = {
        id: transactions.length + 1,
        type: "withdrawal",
        amount: amount,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        description: "Withdrawal"
      };
      
      setTransactions([newTransaction, ...transactions]);
      setWithdrawAmount("");
      setShowWithdrawModal(false);
      
      // Show notification
      showNotification("Withdrawal successful!", "success");
    }
  };

  // Handle add payment method
  const handleAddPaymentMethod = () => {
    const newPaymentMethod = {
      id: paymentMethods.length + 1,
      type: detectCardType(newCardDetails.cardNumber),
      lastFour: newCardDetails.cardNumber.slice(-4),
      expiry: newCardDetails.expiry,
      isDefault: paymentMethods.length === 0
    };
    
    setPaymentMethods([...paymentMethods, newPaymentMethod]);
    setShowAddPaymentModal(false);
    setNewCardDetails({
      cardNumber: "",
      expiry: "",
      cvv: "",
      name: ""
    });
    
    // Show notification
    showNotification("Payment method added successfully!", "success");
  };

  // Detect card type based on number
  const detectCardType = (number) => {
    const firstDigit = number[0];
    if (firstDigit === "4") return "Visa";
    if (firstDigit === "5") return "Mastercard";
    if (firstDigit === "3") return "Amex";
    return "Card";
  };

  // Handle remove payment method
  const handleRemovePaymentMethod = (id) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    showNotification("Payment method removed", "info");
  };

  // Set as default payment method
  const setAsDefault = (id) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
    showNotification("Default payment method updated", "success");
  };

  // Filter transactions based on active tab
  const filteredTransactions = activeTab === "all" 
    ? transactions 
    : transactions.filter(t => t.type === activeTab);

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
  };

  // NEW: Export transactions to CSV
  const exportTransactions = () => {
    // Decide which transactions to export based on active tab
    const dataToExport = activeTab === "all" 
      ? transactions 
      : transactions.filter(t => t.type === activeTab);
    
    // Create CSV headers
    const headers = ["Transaction ID", "Type", "Amount", "Date", "Description"];
    
    // Create CSV content
    let csvContent = headers.join(",") + "\n";
    
    // Add each transaction to CSV
    dataToExport.forEach(transaction => {
      const row = [
        transaction.id,
        transaction.type,
        transaction.amount,
        transaction.date,
        transaction.description
      ].join(",");
      csvContent += row + "\n";
    });
    
    // Create a blob with the CSV data
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    
    // Create a download link
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    // Set link properties
    link.setAttribute("href", url);
    link.setAttribute("download", `wallet_transactions_${activeTab}_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = "hidden";
    
    // Append link to document, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success notification
    showNotification("Transaction history exported successfully!", "success");
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-3xl mx-auto">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center">
           ₹ Payment Wallet Settings
      </h2>
      
      {/* Balance Card */}
      <div className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Current Balance</h3>
          <span className="text-3xl font-bold">{formatCurrency(balance)}</span>
        </div>
        
        <div className="flex space-x-4">
          <button 
            onClick={() => setShowAddMoneyModal(true)}
            className="bg-white text-blue-600 rounded-lg px-4 py-2 flex items-center hover:bg-blue-50 transition-all duration-300 hover:shadow-md"
          >
            <Plus size={18} className="mr-2" /> Add Money
          </button>
          <button 
            onClick={() => setShowWithdrawModal(true)}
            className="bg-white text-blue-600 rounded-lg px-4 py-2 flex items-center hover:bg-blue-50 transition-all duration-300 hover:shadow-md"
          >
            <ArrowUp size={18} className="mr-2" /> Withdraw
          </button>
        </div>
      </div>
      
      <div className="space-y-8">
        {/* Payment Methods Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Payment Methods</h3>
          
          <div className="space-y-3">
            {paymentMethods.map(method => (
              <div 
                key={method.id} 
                className={`border rounded-lg p-4 flex items-center justify-between transition-all duration-300 hover:shadow-md ${method.isDefault ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
              >
                <div className="flex items-center">
                  <CreditCard size={24} className={`mr-3 ${method.isDefault ? 'text-blue-500' : 'text-gray-500'}`} />
                  <div>
                    <div className="flex items-center">
                      <p className="font-medium text-gray-800">{method.type} •••• {method.lastFour}</p>
                      {method.isDefault && (
                        <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">Default</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!method.isDefault && (
                    <button 
                      onClick={() => setAsDefault(method.id)}
                      className="text-blue-500 text-sm hover:text-blue-600 transition-colors"
                    >
                      Set Default
                    </button>
                  )}
                  <button 
                    onClick={() => handleRemovePaymentMethod(method.id)}
                    className="text-red-500 text-sm hover:text-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => setShowAddPaymentModal(true)}
            className="mt-4 border border-dashed border-blue-300 rounded-lg p-4 w-full flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors duration-300"
          >
            <Plus size={20} className="mr-2" /> Add New Payment Method
          </button>
        </div>
        
        {/* Transaction History Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Transaction History</h3>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button 
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${activeTab === "all" ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:text-blue-500"}`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveTab("received")}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${activeTab === "received" ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:text-blue-500"}`}
              >
                Income
              </button>
              <button 
                onClick={() => setActiveTab("withdrawal")}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${activeTab === "withdrawal" ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:text-blue-500"}`}
              >
                Expenses
              </button>
            </div>
          </div>
          
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map(transaction => (
                <div 
                  key={transaction.id} 
                  className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full mr-3 ${transaction.type === "received" ? "bg-green-100" : "bg-red-100"}`}>
                      {transaction.type === "received" ? (
                        <ArrowDown size={16} className="text-green-600" />
                      ) : (
                        <ArrowUp size={16} className="text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <p className={`font-medium ${transaction.type === "received" ? "text-green-600" : "text-red-600"}`}>
                    {transaction.type === "received" ? "+" : "-"}{formatCurrency(transaction.amount)}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No transactions found
              </div>
            )}
          </div>
          
          {transactions.length > 0 && (
            <button 
              onClick={exportTransactions}
              className="mt-4 w-full py-2 border border-gray-200 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center"
            >
              <Download size={16} className="mr-2" /> Export Transaction History
            </button>
          )}
        </div>
      </div>

      {/* Add Money Modal with Blurred Background */}
      {showAddMoneyModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-transparent flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl transform transition-all animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Add Money to Wallet</h3>
              <button 
                onClick={() => setShowAddMoneyModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Amount</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                <input 
                  type="number" 
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  placeholder="0.00"
                  min="1"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Payment Method</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
                {paymentMethods.map(method => (
                  <option key={method.id} value={method.id}>
                    {method.type} •••• {method.lastFour} {method.isDefault ? '(Default)' : ''}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowAddMoneyModal(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddMoney}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!addAmount || isNaN(parseFloat(addAmount)) || parseFloat(addAmount) <= 0}
              >
                Add Money
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal with Blurred Background */}
      {showWithdrawModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-transparent flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl transform transition-all animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Withdraw Money</h3>
              <button 
                onClick={() => setShowWithdrawModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-2">
              <p className="text-gray-600">Available Balance: <span className="font-semibold">{formatCurrency(balance)}</span></p>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Amount</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                <input 
                  type="number" 
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="0.00"
                  min="1"
                  max={balance}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Withdraw To</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
                {paymentMethods.map(method => (
                  <option key={method.id} value={method.id}>
                    {method.type} •••• {method.lastFour} {method.isDefault ? '(Default)' : ''}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowWithdrawModal(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleWithdraw}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!withdrawAmount || isNaN(parseFloat(withdrawAmount)) || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > balance}
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Payment Method Modal with Blurred Background */}
      {showAddPaymentModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-transparent flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl transform transition-all animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Add Payment Method</h3>
              <button 
                onClick={() => setShowAddPaymentModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Card Number</label>
                <input 
                  type="text" 
                  value={newCardDetails.cardNumber}
                  onChange={(e) => setNewCardDetails({...newCardDetails, cardNumber: e.target.value})}
                  placeholder="1234 5678 9012 3456"
                  maxLength="16"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-700 mb-2">Expiry Date</label>
                  <input 
                    type="text" 
                    value={newCardDetails.expiry}
                    onChange={(e) => setNewCardDetails({...newCardDetails, expiry: e.target.value})}
                    placeholder="MM/YYYY"
                    maxLength="7"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 mb-2">CVV</label>
                  <input 
                    type="text" 
                    value={newCardDetails.cvv}
                    onChange={(e) => setNewCardDetails({...newCardDetails, cvv: e.target.value})}
                    placeholder="123"
                    maxLength="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Name on Card</label>
                <input 
                  type="text" 
                  value={newCardDetails.name}
                  onChange={(e) => setNewCardDetails({...newCardDetails, name: e.target.value})}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button 
                onClick={() => setShowAddPaymentModal(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddPaymentMethod}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!newCardDetails.cardNumber || !newCardDetails.expiry || !newCardDetails.cvv || !newCardDetails.name}
              >
                Add Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white font-medium flex items-center transform transition-all animate-slideInRight ${
          notification.type === 'success' ? 'bg-green-500' :
          notification.type === 'error' ? 'bg-red-500' :
          'bg-blue-500'
        }`}>
          {notification.type === 'success' ? <Check size={18} className="mr-2" /> :
           notification.type === 'error' ? <AlertCircle size={18} className="mr-2" /> :
           <ExternalLink size={18} className="mr-2" />}
          {notification.message}
        </div>
      )}

      {/* CSS keyframes for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PaymentWallet;