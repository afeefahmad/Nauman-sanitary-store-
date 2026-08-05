import React, { createContext, useContext, useState, useEffect } from 'react';

const InquiryContext = createContext();

export function InquiryProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('nauman_inquiry_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('nauman_inquiry_cart', JSON.stringify(items));
    } catch (e) {}
  }, [items]);

  const addToInquiry = (product) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id || (i.name === product.name && i.brand === product.brand));
      if (existing) {
        return prev.map(i =>
          (i.id === product.id || (i.name === product.name && i.brand === product.brand))
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsOpen(true);
  };

  const removeFromInquiry = (productId) => {
    setItems(prev => prev.filter(i => i.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setItems(prev =>
      prev
        .map(i => {
          if (i.id === productId) {
            const newQty = i.qty + delta;
            return newQty > 0 ? { ...i, qty: newQty } : null;
          }
          return i;
        })
        .filter(Boolean)
    );
  };

  const clearInquiry = () => setItems([]);

  const totalCount = items.reduce((sum, i) => sum + i.qty, 0);

  const sendWhatsAppInquiry = () => {
    if (items.length === 0) return;
    const phone = '923008118085';
    let message = `Hello Nauman Sanitary Store! 👋\nI would like to inquire about the following products:\n\n`;
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* (Brand: ${item.brand || 'N/A'}) - Qty: ${item.qty}\n`;
    });
    message += `\nPlease let me know the pricing and availability. Thank you!`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
  };

  return (
    <InquiryContext.Provider
      value={{
        items,
        addToInquiry,
        removeFromInquiry,
        updateQuantity,
        clearInquiry,
        totalCount,
        isOpen,
        setIsOpen,
        sendWhatsAppInquiry
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (!context) {
    return {
      items: [],
      addToInquiry: () => {},
      removeFromInquiry: () => {},
      updateQuantity: () => {},
      clearInquiry: () => {},
      totalCount: 0,
      isOpen: false,
      setIsOpen: () => {},
      sendWhatsAppInquiry: () => {}
    };
  }
  return context;
}
