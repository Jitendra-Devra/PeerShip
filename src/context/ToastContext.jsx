import React, { createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/ToastStyles.css';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const showToast = (message) => {
    toast.success(message, {
      className: 'toast-message',
      bodyClassName: 'toast-message',
      position: "top-right",
      autoClose: 2000, // Changed from default 5000ms to 2000ms (2 seconds)
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer className="toast-container" limit={1}/>
    </ToastContext.Provider>
  );
};