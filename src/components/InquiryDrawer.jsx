import React, { useEffect } from 'react';
import { useInquiry } from '../context/InquiryContext';
import { ShoppingBag, X, Plus, Minus, Trash2, MessageSquare, ShieldCheck } from 'lucide-react';
import './InquiryDrawer.css';

export default function InquiryDrawer() {
  const { items, isOpen, setIsOpen, removeFromInquiry, updateQuantity, clearInquiry, sendWhatsAppInquiry, totalCount } = useInquiry();

  // Scroll lock & Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div className="inquiry-drawer-root animate-in fade-in duration-300">
      {/* Backdrop overlay click to close */}
      <div 
        className="inquiry-drawer-backdrop" 
        onClick={() => setIsOpen(false)} 
        title="Close cart overlay" 
      />

      {/* Drawer Container */}
      <div className="inquiry-drawer-container animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="inquiry-drawer-header">
          {/* Subtle gold ambient glow */}
          <div className="inquiry-drawer-header-glow" />

          <div className="inquiry-drawer-header-content">
            <div className="inquiry-drawer-header-icon">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="inquiry-drawer-header-title-row">
                <h3 className="inquiry-drawer-title">Inquiry Cart</h3>
                <span className="inquiry-drawer-badge">
                  Quote
                </span>
              </div>
              <p className="inquiry-drawer-subtitle">
                <span className="inquiry-drawer-status-dot animate-pulse" />
                <span style={{ fontWeight: 600, color: '#e2e8f0' }}>{totalCount}</span> item{totalCount !== 1 ? 's' : ''} in quote request
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setIsOpen(false)}
            className="inquiry-drawer-close-btn"
            title="Close Cart"
            aria-label="Close Inquiry Cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="inquiry-drawer-body">
          {items.length === 0 ? (
            <div className="inquiry-drawer-empty">
              <div className="inquiry-drawer-empty-icon-wrap">
                <div className="inquiry-drawer-empty-icon-glow" />
                <ShoppingBag className="inquiry-drawer-empty-icon" />
              </div>
              <h4 className="inquiry-drawer-empty-title">Your Quote List is Empty</h4>
              <p className="inquiry-drawer-empty-desc">
                Browse our luxury sanitaryware catalog and click <span className="inquiry-drawer-highlight">"Inquire"</span> to build your quote request.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="inquiry-drawer-item">
                <div className="inquiry-drawer-item-info">
                  <div className="inquiry-drawer-item-img-wrap">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="inquiry-drawer-item-img"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/prod-commode.png';
                        }}
                      />
                    ) : (
                      <div className="inquiry-drawer-item-placeholder">
                        <span>SANITARY</span>
                      </div>
                    )}
                  </div>
                  <div className="inquiry-drawer-item-text">
                    <h4 className="inquiry-drawer-item-name" title={item.name}>
                      {item.name}
                    </h4>
                    <div className="inquiry-drawer-item-brand-wrap">
                      <span className="inquiry-drawer-item-brand">
                        {item.brand || 'Unbranded'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="inquiry-drawer-item-controls">
                  <div className="inquiry-drawer-qty-box">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="inquiry-drawer-qty-btn"
                      title="Decrease Quantity"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="inquiry-drawer-qty-val">{item.qty}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="inquiry-drawer-qty-btn"
                      title="Increase Quantity"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeFromInquiry(item.id)}
                    className="inquiry-drawer-del-btn"
                    title="Remove Item"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="inquiry-drawer-footer">
            <button
              onClick={sendWhatsAppInquiry}
              className="inquiry-drawer-submit-btn"
            >
              <MessageSquare className="w-4 h-4 inquiry-drawer-submit-icon" />
              <span>Send Inquiry via WhatsApp</span>
            </button>

            <div className="inquiry-drawer-footer-row">
              <button
                onClick={clearInquiry}
                className="inquiry-drawer-clear-btn"
              >
                <Trash2 className="w-3.5 h-3.5 inquiry-drawer-clear-icon" /> Clear All
              </button>

              <span className="inquiry-drawer-support">
                <ShieldCheck className="w-3.5 h-3.5 inquiry-drawer-support-icon" /> Official Direct Support
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
