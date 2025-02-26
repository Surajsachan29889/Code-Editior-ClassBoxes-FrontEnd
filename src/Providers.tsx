"use client"
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from './context/useContext';
import { store } from './app/store'
import { Provider } from 'react-redux'

function Providers({ children }: { children: React.ReactNode }) {

  
  return (
    <ThemeProvider>
      <Provider store={store}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          {children}
          <ToastContainer position="top-right" />
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default Providers;