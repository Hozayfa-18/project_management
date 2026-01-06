import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from './ui/Button';
import Icon from './AppIcon';

const DisclaimerModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const isDashboardRoute = location.pathname === '/dashboard-overview';
    const storageKey = isDashboardRoute ? 'hasSeenDashboardDisclaimer' : 'hasSeenDisclaimer';
    
    // Check if user has already dismissed the modal for this route
    const hasSeenDisclaimer = localStorage.getItem(storageKey);
    
    // Reset modal state when route changes
    setIsOpen(false);
    
    if (!hasSeenDisclaimer) {
      // Show modal after a brief delay to ensure smooth rendering
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const handleClose = () => {
    setIsOpen(false);
    // Remember that user has seen the disclaimer for the current route
    const isDashboardRoute = location.pathname === '/dashboard-overview';
    const storageKey = isDashboardRoute ? 'hasSeenDashboardDisclaimer' : 'hasSeenDisclaimer';
    localStorage.setItem(storageKey, 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-4 transition-opacity duration-200">
      <div className="w-full max-w-lg bg-surface rounded-lg shadow-xl border border-border overflow-hidden transform transition-all duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-warning-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning-100 rounded-full flex items-center justify-center">
              <Icon name="AlertTriangle" size={24} color="#F59E0B" />
            </div>
            <h2 className="text-xl font-semibold text-text-primary">Preview Notice</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-secondary-600 hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-colors duration-200"
            aria-label="Close"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            <p className="text-text-primary leading-relaxed">
              This is a <strong>preview demonstration</strong> of the application interface.
            </p>
            <p className="text-text-secondary leading-relaxed">
              The original application is an <strong>internal web tool</strong> that contains confidential data and information that cannot be displayed publicly.
            </p>
            <p className="text-text-secondary leading-relaxed">
              All data, content, and information shown in this preview are <strong>for demonstration purposes only</strong> and do not represent actual production data.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-border bg-secondary-50">
          <Button
            onClick={handleClose}
            variant="default"
            size="default"
          >
            I Understand
          </Button>
        </div>
      </div>

      {/* Click outside to close */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={handleClose}
      />
    </div>
  );
};

export default DisclaimerModal;

